"use client";

import { useState, useMemo } from "react";
import { Appointment, Patient, Status, AppointmentFormData } from "@/types/appointments";
import { usePersistentState } from "@/hooks/usePersistentState";
import { PatientSelector } from "@/components/PatientSelector";
import { CountersHeader } from "@/components/CountersHeader";
import { AppointmentForm } from "@/components/AppointmentForm";
import { AppointmentList } from "@/components/AppointmentList";

// Initial sample data
const getInitialAppointments = (): Appointment[] => {
  return [
    // Caro's appointments
    {
      id: "1",
      patient: "Caro",
      speciality: "Radiología",
      studyType: "Rayos X",
      status: "pending",
      date: "2025-12-05",
      time: "09:00",
      location: "Hospital Central - Av. Corrientes 1234",
      phone: "011-4567-8901",
      notes: "Traer orden médica",
    },
    {
      id: "2",
      patient: "Caro",
      speciality: "Gastroenterología",
      studyType: "Ecografía abdominal",
      status: "pending",
      date: "2025-12-05",
      time: "14:30",
      location: "Clínica San José - Av. Santa Fe 2345",
      phone: "011-4567-8902",
      notes: "Ayuno de 8 horas",
    },
    {
      id: "3",
      patient: "Caro",
      speciality: "Cardiología",
      studyType: "Electrocardiograma",
      status: "pending",
      date: "2025-12-05",
      time: "16:00",
      location: "Centro Médico Dr. Pérez - Calle 9 de Julio 567",
      phone: "011-4567-8903",
    },
    {
      id: "4",
      patient: "Caro",
      speciality: "Flebología",
      studyType: "Consulta y ecografía doppler",
      status: "pending",
      date: "2026-01-09",
      time: "10:30",
      location: "Consultorio Dr. Martínez - Av. Belgrano 890",
      phone: "011-4567-8904",
      notes: "Confirmar turno 48hs antes",
    },
    // Daro's appointments
    {
      id: "5",
      patient: "Daro",
      speciality: "Clínica Médica",
      studyType: "Consulta general y control",
      status: "pending",
      date: "2025-12-10",
      time: "11:00",
      location: "Centro de Salud Municipal - Av. Rivadavia 1122",
      phone: "011-4567-8905",
    },
    {
      id: "6",
      patient: "Daro",
      speciality: "Laboratorio",
      studyType: "Análisis de sangre completo",
      status: "pending",
      date: "2025-12-15",
      time: "08:00",
      location: "Laboratorio Central - Calle Mitre 333",
      phone: "011-4567-8906",
      notes: "Ayuno de 12 horas. Traer orden médica.",
    },
  ];
};

export default function Home() {
  const [appointments, setAppointments] = usePersistentState<Appointment[]>(
    "medical-appointments-v1",
    getInitialAppointments()
  );
  
  const [selectedPatient, setSelectedPatient] = useState<Patient>("Caro");
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  const [filterStatus, setFilterStatus] = useState<Status | "all">("all");
  const [filterSpeciality, setFilterSpeciality] = useState<string>("all");

  // Filter appointments for the selected patient
  const patientAppointments = useMemo(
    () => appointments.filter((apt) => apt.patient === selectedPatient),
    [appointments, selectedPatient]
  );

  // Calculate statistics
  const pendingCount = useMemo(
    () => patientAppointments.filter((apt) => apt.status === "pending").length,
    [patientAppointments]
  );

  const completedCount = useMemo(
    () => patientAppointments.filter((apt) => apt.status === "done").length,
    [patientAppointments]
  );

  const nextAppointment = useMemo(() => {
    const pending = patientAppointments
      .filter((apt) => apt.status === "pending")
      .sort(
        (a, b) =>
          new Date(a.date + " " + a.time).getTime() -
          new Date(b.date + " " + b.time).getTime()
      );

    if (pending.length === 0) return null;

    const next = pending[0];
    return new Date(next.date).toLocaleDateString("es-AR", {
      day: "numeric",
      month: "short",
    });
  }, [patientAppointments]);

  // Get unique specialities for filter
  const availableSpecialities = useMemo(() => {
    const specialities = new Set(
      patientAppointments.map((apt) => apt.speciality)
    );
    return Array.from(specialities).sort();
  }, [patientAppointments]);

  // Toggle appointment status
  const handleToggleStatus = (id: string) => {
    setAppointments((prev) =>
      prev.map((apt) =>
        apt.id === id
          ? { ...apt, status: apt.status === "pending" ? "done" : "pending" }
          : apt
      )
    );
  };

  // Save new or edited appointment
  const handleSaveAppointment = (data: AppointmentFormData) => {
    if (editingAppointment) {
      // Edit existing
      setAppointments((prev) =>
        prev.map((apt) =>
          apt.id === editingAppointment.id
            ? { ...apt, ...data }
            : apt
        )
      );
      setEditingAppointment(null);
    } else {
      // Create new
      const newAppointment: Appointment = {
        id: Date.now().toString(),
        patient: selectedPatient,
        ...data,
        status: "pending",
      };
      setAppointments((prev) => [...prev, newAppointment]);
    }
  };

  // Start editing an appointment
  const handleEditAppointment = (appointment: Appointment) => {
    setEditingAppointment(appointment);
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingAppointment(null);
  };

  // Delete appointment
  const handleDeleteAppointment = (id: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar este turno?")) {
      setAppointments((prev) => prev.filter((apt) => apt.id !== id));
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-3 px-2 sm:px-4">
      <div className="max-w-7xl mx-auto">
        <PatientSelector
          selectedPatient={selectedPatient}
          onSelectPatient={setSelectedPatient}
        />

        <CountersHeader
          patientName={selectedPatient}
          pendingCount={pendingCount}
          completedCount={completedCount}
          nextAppointment={nextAppointment}
        />

        <AppointmentForm
          patient={selectedPatient}
          editingAppointment={editingAppointment}
          onSave={handleSaveAppointment}
          onCancel={handleCancelEdit}
        />

        <AppointmentList
          appointments={patientAppointments}
          filterStatus={filterStatus}
          filterSpeciality={filterSpeciality}
          onToggleStatus={handleToggleStatus}
          onEdit={handleEditAppointment}
          onDelete={handleDeleteAppointment}
          onFilterStatusChange={setFilterStatus}
          onFilterSpecialityChange={setFilterSpeciality}
          availableSpecialities={availableSpecialities}
        />
      </div>
    </main>
  );
}
