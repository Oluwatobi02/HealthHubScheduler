from flask import Blueprint, request, jsonify
from app.models.patient import Patient
from app.models.hcp import TimeSlot, HealthCareProfessional
from datetime import datetime


hcp_bp = Blueprint('healthcareprofessionals', __name__)


@hcp_bp.route('/', methods=['POST'])
def create_hcp():
    pass

@hcp_bp.route('/')
def get_all_hcps():
    hcps = HealthCareProfessional.objects()
    return jsonify([hcp.to_dict() for hcp in hcps])