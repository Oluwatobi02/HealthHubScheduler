from flask_mongoengine import MongoEngine
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
from app.models.patient import Patient

db = MongoEngine()

class TimeSlot(db.EmbeddedDocument):
    start_time = db.DateTimeField(required=True)
    end_time = db.DateTimeField(required=True)
    



class HealthCareProfessional(db.Document):
    email = db.EmailField(required=True, unique=True)
    password_hash = db.StringField(required=True)
    name = db.StringField(required=True)
    specialization = db.StringField(required=True)
    time_slot = db.ListField(TimeSlot)
    created_at = db.DateTimeField(default=datetime.now())
    updated_at = db.DateTimeField(default=datetime.now())


    def to_dict(self):
        return {
            "email": self.email,
            "name": self.name,
            "specialization": self.specialization,
            "time_slot": self.time_slot,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)