from flask import Blueprint, request, jsonify
from app.services.auth_service import AuthService



auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])   # expecting name, email, password, 
def register():
    data = request.get_json()
    email, password, name, basic_info, medical_history, emergency_contact = data['email'], data['password'], data['name'], data['patientInfo'], data['medicalRecords'], data['emergencyContact']
    result = AuthService.register_patient(email, password, name, basic_info, medical_history, emergency_contact)
    if result:
        return jsonify(message="Successfully registered", success=True)
    return jsonify(message="Please fill in all details correctly and log in if you already have an account with us", success=False)


@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email, password, is_staff = data['email'], data['password'], data['isStaff']
    result, user = AuthService.authenticate_patient(email, password)
    if result:
        return jsonify(token=result, success=True, message="Successfully logged in", email=email, user=user)
    return jsonify(message="Email or Password is incorrect", success=False)

@auth_bp.route('/register-hcp', methods=['POST'])
def register_hcp():
    data = request.get_json()
    email, password, name, specialization = data['email'], data['password'], data['name'], data['specialization']
    result = AuthService.register_hcp(email, password, name, specialization)
    if result:
        return jsonify(message="Successfully registered", success=True)
    return jsonify(message="Please fill in all details correctly and log in if you already have an account with us", success=False)
@auth_bp.route('/login-hcp', methods=['POST'])
def login_hcp():
    data = request.get_json()
    email, password = data['email'], data['password']
    result, user = AuthService.authenticate_hcp(email, password)
    if result:
        return jsonify(token=result, success=True, message="Successfully logged in", email=email, user=user)