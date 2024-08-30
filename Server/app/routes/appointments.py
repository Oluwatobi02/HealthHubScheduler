from flask import Blueprint, request, jsonify
import json
from app import socketio
from flask_jwt_extended import jwt_required, get_jwt_identity
from uuid import uuid4
from app.models.patient import Patient, Notification
from app.redis import r
from app.services.appointment_service import AppointmentService
limit = 2


appointments_bp = Blueprint('appointments', __name__)

@appointments_bp.route('/', methods=['POST'])
@jwt_required()
def create_appointments():
    patient_id = get_jwt_identity()
    appointment = request.get_json()
    is_date_valid = AppointmentService.is_appointment_available(appointment)
    if is_date_valid:
        AppointmentService.create_appointment(appointment)
        r.delete(f'patient_appointments_{patient_id}')
        socketio.emit('notification', True)
        return jsonify(success=True, message="Created appointment successfully")
    else:
        return jsonify(success=False, message="Can not create appointment at this moment")
    
@appointments_bp.route('/', methods=['GET'])
@jwt_required()
def get_patient_appointments():
    patient_id = request.args.get('patientid')
    get_all = request.args.get('all', 'false') == 'true'
    is_cache_valid = r.exists(f"patient_appointments_{patient_id}")
    if not is_cache_valid:
        patient_appointments = AppointmentService.get_patient_appointments(patient_id)
        r.set(f"patient_appointments_{patient_id}", json.dumps(patient_appointments))
    page = request.args.get('page', 0)
    skip = int(page) * limit
    patient_appointments = json.loads(r.get(f"patient_appointments_{patient_id}"))
    if get_all:
        appointments = patient_appointments
    else:
        appointments = patient_appointments[skip: skip+limit]
    has_more = len(appointments) == limit
    return jsonify(appointments=appointments, has_more=has_more)
@appointments_bp.route('/testing')
def test():
    return jsonify(success=True)
@appointments_bp.route('/upcoming', methods=['GET'])
@jwt_required()
def get_patient_upcoming_appointments():
    patient_id = request.args.get('patientid')
    get_all = request.args.get('all', 'false') == 'true'
    is_cache_valid = r.exists(f"patient_appointments_upcoming_{patient_id}")
    if not is_cache_valid:
        patient_appointments = AppointmentService.get_patient_upcoming_appointments(patient_id)
        r.set(f"patient_appointments_upcoming_{patient_id}", json.dumps(patient_appointments))
    page = request.args.get('page', 0)
    skip = int(page) * limit
    patient_appointments = json.loads(r.get(f"patient_appointments_upcoming_{patient_id}"))
    if get_all:
        appointments = patient_appointments
    else:
        appointments = patient_appointments[skip: skip+limit]
    has_more = len(appointments) == limit
    return jsonify(appointments=appointments, has_more=has_more)