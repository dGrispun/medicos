interface CountersHeaderProps {
  patientName: string;
  pendingCount: number;
  completedCount: number;
  nextAppointment: string | null;
}

export function CountersHeader({
  patientName,
  pendingCount,
  completedCount,
  nextAppointment,
}: CountersHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-blue-700 to-blue-800 text-white p-3 rounded-md shadow-md mb-3">
      <h1 className="text-xl font-bold mb-2">Turnos Médicos - {patientName}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <div className="bg-white/10 backdrop-blur-sm rounded-md p-2">
          <div className="text-xs opacity-90">Pendientes</div>
          <div className="text-2xl font-bold">{pendingCount}</div>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-md p-2">
          <div className="text-xs opacity-90">Completados</div>
          <div className="text-2xl font-bold">{completedCount}</div>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-md p-2">
          <div className="text-xs opacity-90">Próximo Turno</div>
          <div className="text-sm font-semibold">
            {nextAppointment || "Sin turnos"}
          </div>
        </div>
      </div>
    </div>
  );
}
