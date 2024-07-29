from flask import Blueprint, request, jsonify
from app.models.patient import Patient



hcp_bp = Blueprint('healthcare-professionals', __name__)
