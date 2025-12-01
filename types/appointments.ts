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
