from flask import Blueprint, request, jsonify
from app.models.patient import Patient
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.services.auth_service import AuthService
from app.utils import helper
from app.redis import r


patients_bp = Blueprint('patients', __name__)



@patients_bp.route('/', methods=['GET'])
def get_patients():
    patients = Patient.objects().all()
    return jsonify(patients), 200

    

@patients_bp.route('/patient', methods=['GET'])
@jwt_required()
def get_patient():
    _id = get_jwt_identity()
    patient = Patient.objects(id=_id).first()
    return jsonify(patient=patient.to_dict())


@patients_bp.route('/notifications', methods=['GET'])
@jwt_required()
def get_notification():
    _id = get_jwt_identity()
    patient = Patient.objects(id=_id).first()
    notifications = patient.notifications_to_dict()
    return jsonify(helper.reverse_array(notifications))