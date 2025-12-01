import { useState, useEffect } from "react";
import { Appointment, AppointmentFormData, Patient } from "@/types/appointments";

interface AppointmentFormProps {
  patient: Patient;
  editingAppointment: Appointment | null;
  onSave: (data: AppointmentFormData) => void;
  onCancel: () => void;
}

export function AppointmentForm({
  patient,
  editingAppointment,
  onSave,
  onCancel,
}: AppointmentFormProps) {
  const [formData, setFormData] = useState<AppointmentFormData>({
    speciality: "",
    studyType: "",
    date: "",
    time: "",
    location: "",
    phone: "",
    notes: "",
  });

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (editingAppointment) {
      setFormData({
        speciality: editingAppointment.speciality,
        studyType: editingAppointment.studyType,
        date: editingAppointment.date,
        time: editingAppointment.time,
        location: editingAppointment.location,
        phone: editingAppointment.phone,
        notes: editingAppointment.notes || "",
      });
      setShowForm(true);
    }
  }, [editingAppointment]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setFormData({
      speciality: "",
      studyType: "",
      date: "",
      time: "",
      location: "",
      phone: "",
      notes: "",
    });
    setShowForm(false);
  };

  const handleCancel = () => {
    setFormData({
      speciality: "",
      studyType: "",
      date: "",
      time: "",
      location: "",
      phone: "",
      notes: "",
    });
    setShowForm(false);
    onCancel();
  };

  if (!showForm) {
    return (
      <div className="mb-3">
        <button
          onClick={() => setShowForm(true)}
          className="w-full py-2 px-4 text-sm bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-sm transition-colors"
        >
          + Agregar Nuevo Turno para {patient}
        </button>
      </div>
    );
  }

  return (
    <div className="mb-3 bg-gray-800 border-2 border-blue-600 rounded-md p-3 shadow-md">
      <h2 className="text-lg font-bold text-gray-200 mb-2">
        {editingAppointment ? "Editar Turno" : `Nuevo Turno para ${patient}`}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">
              Especialidad *
            </label>
            <input
              type="text"
              required
              value={formData.speciality}
              onChange={(e) =>
                setFormData({ ...formData, speciality: e.target.value })
              }
              placeholder="Ej: Flebólogo, Cardiólogo"
              className="w-full px-2 py-1 text-sm bg-gray-900 text-gray-200 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">
              Estudio / Tipo *
            </label>
            <input
              type="text"
              required
              value={formData.studyType}
              onChange={(e) =>
                setFormData({ ...formData, studyType: e.target.value })
              }
              placeholder="Ej: Rayos X, Ecografía"
              className="w-full px-2 py-1 text-sm bg-gray-900 text-gray-200 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">
              Fecha *
            </label>
            <input
              type="date"
              required
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              className="w-full px-2 py-1 text-sm bg-gray-900 text-gray-200 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">
              Hora *
            </label>
            <input
              type="time"
              required
              value={formData.time}
              onChange={(e) =>
                setFormData({ ...formData, time: e.target.value })
              }
              className="w-full px-2 py-1 text-sm bg-gray-900 text-gray-200 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-300 mb-1">
            Ubicación *
          </label>
          <input
            type="text"
            required
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            placeholder="Hospital / Clínica / Dirección"
            className="w-full px-2 py-1 text-sm bg-gray-900 text-gray-200 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-300 mb-1">
            Teléfono *
          </label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            placeholder="Número de contacto"
            className="w-full px-2 py-1 text-sm bg-gray-900 text-gray-200 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-300 mb-1">
            Notas (opcional)
          </label>
          <textarea
            value={formData.notes}
            onChange={(e) =>
              setFormData({ ...formData, notes: e.target.value })
            }
            placeholder="Información adicional..."
            rows={2}
            className="w-full px-2 py-1 text-sm bg-gray-900 text-gray-200 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="flex gap-2 pt-1">
          <button
            type="submit"
            className="flex-1 py-2 px-4 text-sm bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-colors"
          >
            {editingAppointment ? "Guardar Cambios" : "Agregar Turno"}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="flex-1 py-2 px-4 text-sm bg-gray-700 hover:bg-gray-600 text-gray-200 font-semibold rounded-md transition-colors"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
