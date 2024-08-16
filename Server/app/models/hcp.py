from flask_mongoengine import MongoEngine
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
from app.models.patient import Patient, Notification

db = MongoEngine()

class TimeSlot(db.EmbeddedDocument):
    start_time = db.DateTimeField(required=True)
    end_time = db.DateTimeField(required=True)

    def to_dict(self):
        return {
            "start_time": self.start_time,
            "end_time": self.end_time
        }
    



class HealthCareProfessional(db.Document):
    email = db.EmailField(required=True, unique=True)
    password_hash = db.StringField(required=True)
    name = db.StringField(required=True)
    specialization = db.StringField(required=True)
    time_slot = db.ListField(db.EmbeddedDocumentField(TimeSlot))
    created_at = db.DateTimeField(default=datetime.now())
    updated_at = db.DateTimeField(default=datetime.now())
    notifications = db.ListField(db.EmbeddedDocumentField(Notification))



    def to_dict(self):
        return {
            "id": str(self.id),
            "email": self.email,
            "name": self.name,
            "specialization": self.specialization,
            "time_slot": [slot.to_dict() for slot in self.time_slot],
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
    
    def add_notification(self, message, tag):
        notification = Notification(message=message, tag=tag, created_at=datetime.now())
        self.notifications.append(notification)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    

class Receptionist(db.Document):
    email = db.EmailField(required=True, unique=True)
    password_hash = db.StringField(required=True)
    name = db.StringField(required=True)
    created_at = db.DateTimeField(default=datetime.now())
    updated_at = db.DateTimeField(default=datetime.now())
    notifications = db.ListField(db.EmbeddedDocumentField(Notification))

    def to_dict(self):
        return {
            "email": self.email,
            "name": self.name,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    
    def add_notification(self, message, tag):
        notification = Notification(message=message, tag=tag, created_at=datetime.now())
        self.notifications.append(notification)




