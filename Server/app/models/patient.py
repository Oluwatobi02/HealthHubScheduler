from flask_mongoengine import MongoEngine
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
import uuid

db = MongoEngine()


class Notification(db.EmbeddedDocument):
    id = db.StringField(default=str(uuid.uuid4()), required=True, unique=True)
    message = db.StringField(required=True)
    tag = db.StringField(required=True)
    created_at = db.DateTimeField(required=True)

    
    def to_dict(self):
        return {
            "id": self.id,
            "message": self.message,
            "tag": self.tag,
            "created_at": self.created_at
        }


class BasicInfo(db.EmbeddedDocument):
    home_number = db.StringField(required=True)
    work_number = db.StringField()
    age = db.IntField(required=True)
    address = db.StringField(required=True)
    weight = db.StringField(required=True)
    height = db.StringField(required=True)

class EmergencyContact(db.EmbeddedDocument):
    name = db.StringField(required=True)
    email = db.EmailField(required=True)
    home_number = db.StringField(required=True)
    work_number = db.StringField(required=True)
    address = db.StringField(required=True)

class MedicalHistory(db.EmbeddedDocument):
    allergies = db.StringField()
    medications = db.StringField()
    medical_problems = db.StringField()

class MedicalRecord(db.EmbeddedDocument):
    basic_info = db.EmbeddedDocumentField(BasicInfo)
    emergency_contact = db.EmbeddedDocumentField(EmergencyContact)
    medical_history = db.EmbeddedDocumentField(MedicalHistory)

class Patient(db.Document):
    email = db.EmailField(required=True, unique=True)
    password_hash = db.StringField(required=True)
    name = db.StringField(required=True)
    medical_record = db.EmbeddedDocumentField(MedicalRecord)
    notifications = db.ListField(db.EmbeddedDocumentField(Notification))



    
    def add_notification(self, message, tag):
        notification = Notification(message=message, tag=tag, created_at=datetime.now())
        self.notifications.append(notification)

    # def view_appointments()
    def notifications_to_dict(self):
        return [noti.to_dict() for noti in self.notifications]

    def to_dict(self):
        return {
            "id": str(self.id),
            "email": self.email,
            "name": self.name,
            "medical_record": {
                "basic_info": {
                    "home_number": self.medical_record.basic_info.home_number,
                    "work_number": self.medical_record.basic_info.work_number,
                    "age": self.medical_record.basic_info.age,
                    "address": self.medical_record.basic_info.address,
                    "weight": self.medical_record.basic_info.weight,
                    "height": self.medical_record.basic_info.height
                },
                "emergency_contact": {
                    "name": self.medical_record.emergency_contact.name,
                    "email": self.medical_record.emergency_contact.email,
                    "home_number": self.medical_record.emergency_contact.home_number,
                    "work_number": self.medical_record.emergency_contact.work_number,
                    "address": self.medical_record.emergency_contact.address
                },
                "medical_history": {
                    "allergies": self.medical_record.medical_history.allergies,
                    "medications": self.medical_record.medical_history.medications,
                    "medical_problems": self.medical_record.medical_history.medical_problems
                }
            },
        }

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
