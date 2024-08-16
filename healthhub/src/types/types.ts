import { Socket } from "socket.io-client";

export interface Patient {
    id: string;
    email: string;
    name: string;
    medical_record: MedicalRecord;
}
export interface MedicalRecord {
basic_info: BasicInfo;
emergency_contact: EmergencyContact;
medical_history: MedicalHistory;

}
export interface BasicInfo {
    home_number: string;
    work_number?: string;
    age: number;
    address: string
    weight?: number;
    height?: string;
    picture?: string;
}
export interface EmergencyContact {
    name: string;
    email: string;
    home_number: string;
    work_number: string;
    address: string;
}
export interface MedicalHistory {
    allergies?: string;
    medications?: string;
    medical_problems?: string;
}



export interface Appointment {
    id?: string;
    patient_id?: string;
    health_care_professional_id?: string;
    date?: string;
    reason?: string;
    type?: string;
    prescriptions?: Prescription[];
    notes?: string;
    status?: string;
    location?: string;
    receptionist?: string;
    created_at?: string;
    updated_at?: string;
}


export interface Prescription {
    _id: string;
    medicine: string;
    dosage: string;
    frequency: string;
    duration: string;
    notes: string;
}

export interface FAppointment {
    id: string;
    date: string;
    health_care_professional: {
        name: string;
        specialization: string;
        contact: string;
        picture?: string;
    },
    patient: {
        name: string;
        age: number;
        contact: string;
    },
    prescriptions?: Prescription[];
    location?: string;
    notes?: string;
    reason?: string;
    status?: string;
    type?: string;
    updated_at?: string;
    created_at?: string;
}

export interface HealthCareProfessional {
    id: string;
    email: string;
    name: string;
    picture?: string;
    specialization: string;
    time_slot: TimeSlot[];
    created_at: string;
    updated_at: string;
}

export interface TimeSlot {
    start_time: string;
    end_time: string;
}

export interface Notification {
    id: string;
    message: string;
    tag: string;
    created_at: string;
}

export interface Receptionist {
    id: string;
    email: string;
    name: string;
    picture?: string;
    created_at: string;
    updated_at: string;
}
export interface WebSocketContextType {
    socket: Socket | null;
    registerEvent: <T>(event: string, handler: (data: T) => void) => void;
    emitEvent: (event: string, data: any) => void;
  }
export type WebSocketEvent = 'new_appointment' | 'update_appointment' | 'notification';

export interface ToastProps {
    promise: (resolve : (n : number) => void, reject : (n : number) => void) => void;
    label: string;
}