from flask import Blueprint, request, jsonify
from app.models.patient import Patient
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.services.auth_service import AuthService



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