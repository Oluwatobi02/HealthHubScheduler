from app.models.appointment import Appointment
from app.models.patient import Patient
from app.utils import algorithms, helper

class AppointmentService:

    @staticmethod
    def create_appointment(appointment):
        patient_appointment = Appointment(
            patient_id = appointment['patient_id'], 
            health_care_professional_id=appointment['health_care_professional_id'],
            date = helper.convert_date(appointment['date']),
            reason = appointment['reason']
            )
        try:
            patient_appointment.save()
            patient = Patient.objects(id=appointment['patient_id']).first()
            patient.add_notification(f"Appointment created successfully for {appointment['date']} ", "Appointments")
            patient.save()        
        except: 
            return False
        return True
    @staticmethod
    def get_hcp_appointments(hcp_id):
        return Appointment.objects(health_care_professional_id=hcp_id)
    
    @staticmethod
    def get_patient_appointments(patient_id,skip,limit):
        appointnments =  Appointment.objects(patient_id=patient_id).skip(skip).limit(limit).order_by('-date')
        return [app.to_dict() for app in appointnments]
    
    @staticmethod
    def is_appointment_available(appointment):
        appointments = AppointmentService.get_hcp_appointments(appointment['health_care_professional_id'])
        if appointments:
            appointments_dates = [app['date'] for app in appointments]
            return algorithms.check_nearby_dates(appointment['date'], appointments_dates)
        return True