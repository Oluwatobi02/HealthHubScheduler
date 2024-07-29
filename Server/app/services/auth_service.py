from app.models.patient import Patient, BasicInfo, MedicalRecord, EmergencyContact, MedicalHistory
from app.models.hcp import HealthCareProfessional
from app.utils.token import generate_token

class AuthService:
    @staticmethod
    def register_patient(email, password, name, basic_info, medical_history, emergency_contact):


        if Patient.objects(email=email).first():
            return False 
        try:
            
            basic_inf = BasicInfo(**basic_info)
            emergency_cont = EmergencyContact(**emergency_contact)
            medical_hist = MedicalHistory(**medical_history)
            medical_record = MedicalRecord(basic_info=basic_inf, emergency_contact=emergency_cont, medical_history=medical_hist)
            patient = Patient(email=email, name=name, medical_record=medical_record)
            patient.set_password(password)
            patient.add_notification("Welcome to HealthHub")
            patient.save()
            return True
        except:
            return False
    
    @staticmethod
    def authenticate_patient(email, password):
        patient = Patient.objects(email=email).first()
        if patient and patient.check_password(password):
            return generate_token(patient), patient.to_dict()
        return None, {}
    


    @staticmethod
    def register_hcp(email, password, name, specialization):
        if HealthCareProfessional.objects(email=email).first():
            return False
        try:
            hcp = HealthCareProfessional(email=email, name=name, specialization=specialization)
            hcp.set_password(password)
            hcp.save()
            return True
        except:
            return False
        
    @staticmethod
    def authenticate_hcp(email, password):
        hcp = HealthCareProfessional.objects(email=email).first()
        if hcp and hcp.check_password(password):
            return generate_token(hcp), hcp.to_dict()
        return None, {} 

    
