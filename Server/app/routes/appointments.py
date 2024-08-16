from flask import Blueprint, request, jsonify
from app import socketio
from flask_jwt_extended import jwt_required, get_jwt_identity
from uuid import uuid4
from app.models.patient import Patient, Notification
from app.services.appointment_service import AppointmentService
limit = 3


appointments_bp = Blueprint('appointments', __name__)

@appointments_bp.route('/', methods=['POST'])
@jwt_required()
def create_appointments():
    appointment = request.get_json()
    is_date_valid = AppointmentService.is_appointment_available(appointment)
    if is_date_valid:
        AppointmentService.create_appointment(appointment)
        notification = Notification(id = str(uuid4()), message=f"Appoitnment created sucessfully", tag="appointment")
        socketio.emit('notification', notification.to_dict())
        print(notification.to_dict())
        # print(str(notification.to_dict()))
        return jsonify(success=True, message="Created appointment successfully")
    else:
        return jsonify(success=False, message="Can not create appointment at this moment")
    
@appointments_bp.route('/<patient_id>')
def get_patient_appointments(patient_id):
    page = request.args.get('page')
    skip = int(page) * limit
    patient_appointments = AppointmentService.get_patient_appointments(patient_id, skip, limit)
    has_more = len(patient_appointments) == limit
    return jsonify(appointments=patient_appointments, has_more=has_more)