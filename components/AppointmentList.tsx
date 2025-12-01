import { Appointment, Status } from "@/types/appointments";
import { AppointmentCard } from "./AppointmentCard";

interface AppointmentListProps {
  appointments: Appointment[];
  filterStatus: Status | "all";
  filterSpeciality: string;
  onToggleStatus: (id: string) => void;
  onEdit: (appointment: Appointment) => void;
  onDelete: (id: string) => void;
  onFilterStatusChange: (status: Status | "all") => void;
  onFilterSpecialityChange: (speciality: string) => void;
  availableSpecialities: string[];
}

export function AppointmentList({
  appointments,
  filterStatus,
  filterSpeciality,
  onToggleStatus,
  onEdit,
  onDelete,
  onFilterStatusChange,
  onFilterSpecialityChange,
  availableSpecialities,
}: AppointmentListProps) {
  const filteredAppointments = appointments.filter((apt) => {
    if (filterStatus !== "all" && apt.status !== filterStatus) return false;
    if (filterSpeciality !== "all" && apt.speciality !== filterSpeciality)
      return false;
    return true;
  });

  const pendingAppointments = filteredAppointments.filter(
    (apt) => apt.status === "pending"
  );
  const completedAppointments = filteredAppointments.filter(
    (apt) => apt.status === "done"
  );

  return (
    <div>
      {/* Filters */}
      <div className="mb-3 flex flex-col sm:flex-row gap-2">
        <div className="flex-1">
          <label className="block text-xs font-medium text-gray-300 mb-1">
            Filtrar por estado
          </label>
          <select
            value={filterStatus}
            onChange={(e) =>
              onFilterStatusChange(e.target.value as Status | "all")
            }
            className="w-full px-2 py-1 text-sm bg-gray-800 text-gray-200 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Todos</option>
            <option value="pending">Pendientes</option>
            <option value="done">Completados</option>
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-xs font-medium text-gray-300 mb-1">
            Filtrar por especialidad
          </label>
          <select
            value={filterSpeciality}
            onChange={(e) => onFilterSpecialityChange(e.target.value)}
            className="w-full px-2 py-1 text-sm bg-gray-800 text-gray-200 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Todas</option>
            {availableSpecialities.map((spec) => (
              <option key={spec} value={spec}>
                {spec}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Pending Appointments */}
        {(filterStatus === "all" || filterStatus === "pending") && (
          <div className="mb-4">
            <h2 className="text-lg font-bold text-gray-200 mb-2">
              📋 Turnos Pendientes ({pendingAppointments.length})
            </h2>
            {pendingAppointments.length === 0 ? (
              <p className="text-gray-400 italic">No hay turnos pendientes.</p>
            ) : (
              <div className="space-y-2">
                {pendingAppointments
                  .sort(
                    (a, b) =>
                      new Date(a.date + " " + a.time).getTime() -
                      new Date(b.date + " " + b.time).getTime()
                  )
                  .map((appointment) => (
                    <AppointmentCard
                      key={appointment.id}
                      appointment={appointment}
                      onToggleStatus={onToggleStatus}
                      onEdit={onEdit}
                      onDelete={onDelete}
                    />
                  ))}
              </div>
            )}
          </div>
        )}

        {/* Completed Appointments */}
        {(filterStatus === "all" || filterStatus === "done") && (
          <div>
            <h2 className="text-lg font-bold text-gray-200 mb-2">
              ✅ Turnos Completados ({completedAppointments.length})
            </h2>
            {completedAppointments.length === 0 ? (
              <p className="text-gray-400 italic">No hay turnos completados.</p>
            ) : (
              <div className="space-y-2">
                {completedAppointments
                  .sort(
                    (a, b) =>
                      new Date(b.date + " " + b.time).getTime() -
                      new Date(a.date + " " + a.time).getTime()
                  )
                  .map((appointment) => (
                    <AppointmentCard
                      key={appointment.id}
                      appointment={appointment}
                      onToggleStatus={onToggleStatus}
                      onEdit={onEdit}
                      onDelete={onDelete}
                    />
                  ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
