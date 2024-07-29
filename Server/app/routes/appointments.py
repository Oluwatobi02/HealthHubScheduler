from flask import Blueprint, request, jsonify
from app.models.patient import Patient



appointments_bp = Blueprint('appointments', __name__)
