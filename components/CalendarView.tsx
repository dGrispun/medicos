import { Appointment } from "@/types/appointments";

interface CalendarViewProps {
  appointments: Appointment[];
  onSelectAppointment?: (appointment: Appointment) => void;
}

export function CalendarView({ appointments, onSelectAppointment }: CalendarViewProps) {
  // Group appointments by date
  const appointmentsByDate = appointments.reduce((acc, apt) => {
    const date = apt.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(apt);
    return acc;
  }, {} as Record<string, Appointment[]>);

  // Get unique dates sorted
  const dates = Object.keys(appointmentsByDate).sort();
  
  // Get current month info
  const now = new Date();
  const currentMonth = now.toLocaleDateString('es-AR', { month: 'long', year: 'numeric' });

  return (
    <div className="bg-gray-800 rounded-md p-3 border border-gray-700">
      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
        📅 Calendario
      </h3>
      <div className="text-sm text-gray-300 font-semibold mb-3 capitalize">{currentMonth}</div>
      
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {dates.length === 0 ? (
          <p className="text-xs text-gray-500 italic">No hay turnos agendados</p>
        ) : (
          dates.map(date => {
            const dateObj = new Date(date + 'T00:00:00');
            const dayName = dateObj.toLocaleDateString('es-AR', { weekday: 'short' });
            const dayNumber = dateObj.getDate();
            const monthShort = dateObj.toLocaleDateString('es-AR', { month: 'short' });
            const dayAppointments = appointmentsByDate[date];
            
            const pendingCount = dayAppointments.filter(a => a.status === 'pending').length;
            const doneCount = dayAppointments.filter(a => a.status === 'done').length;

            return (
              <div
                key={date}
                className="bg-gray-900 rounded border border-gray-700 p-2 hover:border-blue-600 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div className="text-center">
                      <div className="text-xs text-gray-500 uppercase">{dayName}</div>
                      <div className="text-lg font-bold text-gray-200">{dayNumber}</div>
                      <div className="text-xs text-gray-500">{monthShort}</div>
                    </div>
                    <div className="h-8 w-px bg-gray-700"></div>
                    <div className="flex gap-2">
                      {pendingCount > 0 && (
                        <span className="text-xs bg-yellow-900 text-yellow-200 px-2 py-0.5 rounded-full">
                          {pendingCount} ⏳
                        </span>
                      )}
                      {doneCount > 0 && (
                        <span className="text-xs bg-green-900 text-green-200 px-2 py-0.5 rounded-full">
                          {doneCount} ✓
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="space-y-1 mt-2">
                  {dayAppointments.map(apt => (
                    <div
                      key={apt.id}
                      onClick={() => onSelectAppointment?.(apt)}
                      className="text-xs text-gray-400 hover:text-gray-200 transition-colors flex items-center gap-1"
                    >
                      <span className="font-mono">{apt.time}</span>
                      <span>•</span>
                      <span className="truncate">{apt.speciality}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
