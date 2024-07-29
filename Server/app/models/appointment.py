from flask_mongoengine import MongoEngine
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
from app.models.patient import Patient
from app.models.hcp import HealthCareProfessional
from app.models.receptionist import Receptionist
from uuid import uuid4
db = MongoEngine()

class Prescription(db.EmbeddedDocument):
    _id = db.StringField(default=str(uuid4(), required=True))
    medicine = db.StringField(required=True)
    dosage = db.StringField()
    frequency = db.StringField()
    duration = db.StringField()
    notes = db.StringField()

class Appointment(db.Document):
    patient_id = db.ReferenceField(Patient, required=True)
    health_care_professional_id = db.ReferenceField(HealthCareProfessional, required=True)
    date = db.DateTimeField(required=True)
    reason = db.StringField(required=True)
    type = db.StringField()
    prescriptions = db.ListField(db.EmbeddedDocumentField(Prescription))
    notes = db.StringField()
    status = db.StringField(default="Pending")
    receptionist = db.ReferenceField(Receptionist)
    created_at = db.DateTimeField(default=datetime.now())
    updated_at = db.DateTimeField(default=datetime.now())


    def update_status(self, status):
        self.status = status
        self.updated_at = datetime.now()
    
    def add_prescription(self, prescription):
        self.prescriptions.append(prescription)
        self.updated_at = datetime.now()
    