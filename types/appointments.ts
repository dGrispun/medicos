export type Patient = "Caro" | "Daro";

export type Status = "pending" | "done";

export interface Appointment {
  id: string;
  patient: Patient;
  speciality: string;
  studyType: string;
  status: Status;
  date: string; // ISO date format
  time: string;
  location: string;
  phone: string;
  notes?: string;
  created_at?: string;
  updated_at?: string;
}

// Database type (snake_case for Supabase)
export interface AppointmentDB {
  id: string;
  patient: Patient;
  speciality: string;
  study_type: string;
  status: Status;
  date: string;
  time: string;
  location: string;
  phone: string;
  notes?: string;
  created_at?: string;
  updated_at?: string;
}

export interface AppointmentFormData {
  speciality: string;
  studyType: string;
  date: string;
  time: string;
  location: string;
  phone: string;
  notes?: string;
}
