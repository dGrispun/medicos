import { Appointment } from "@/types/appointments";

interface AppointmentCardProps {
  appointment: Appointment;
  onToggleStatus: (id: string) => void;
  onEdit: (appointment: Appointment) => void;
  onDelete: (id: string) => void;
}

export function AppointmentCard({
  appointment,
  onToggleStatus,
  onEdit,
  onDelete,
}: AppointmentCardProps) {
  const isPending = appointment.status === "pending";
  const formattedDate = new Date(appointment.date).toLocaleDateString("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div
      className={`border rounded-md p-3 transition-all ${
        isPending
          ? "bg-white border-blue-300 shadow-sm"
          : "bg-gray-50 border-gray-300 opacity-80"
      }`}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-base font-bold text-gray-800">
              {appointment.speciality}
            </h3>
            {!isPending && (
              <span className="text-green-600 text-base">✓</span>
            )}
          </div>
          <p className="text-gray-600 text-sm font-medium mb-1">
            {appointment.studyType}
          </p>
        </div>
        <span
          className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
            isPending
              ? "bg-yellow-100 text-yellow-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {isPending ? "Pendiente" : "Completado"}
        </span>
      </div>

      <div className="space-y-1 mb-2 text-xs text-gray-700">
        <div className="flex items-center gap-2">
          <span className="font-semibold">📅</span>
          <span>{formattedDate} a las {appointment.time}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-semibold">📍</span>
          <span>{appointment.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-semibold">📞</span>
          <span>{appointment.phone}</span>
        </div>
        {appointment.notes && (
          <div className="flex items-start gap-2 mt-2 pt-2 border-t border-gray-200">
            <span className="font-semibold">📝</span>
            <span className="text-gray-600 text-xs italic">{appointment.notes}</span>
          </div>
        )}
      </div>

      <div className="flex gap-1.5">
        <button
          onClick={() => onToggleStatus(appointment.id)}
          className={`flex-1 py-1.5 px-2 text-xs rounded-md font-medium transition-colors ${
            isPending
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "bg-yellow-500 hover:bg-yellow-600 text-white"
          }`}
        >
          {isPending ? "Marcar Completado" : "Marcar Pendiente"}
        </button>
        <button
          onClick={() => onEdit(appointment)}
          className="py-1.5 px-2 text-xs rounded-md font-medium bg-blue-100 hover:bg-blue-200 text-blue-700 transition-colors"
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(appointment.id)}
          className="py-1.5 px-2 text-xs rounded-md font-medium bg-red-100 hover:bg-red-200 text-red-700 transition-colors"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}
