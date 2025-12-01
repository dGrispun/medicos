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
    <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-lg mb-6">
      <h1 className="text-3xl font-bold mb-4">Turnos Médicos - {patientName}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
          <div className="text-sm opacity-90">Pendientes</div>
          <div className="text-3xl font-bold">{pendingCount}</div>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
          <div className="text-sm opacity-90">Completados</div>
          <div className="text-3xl font-bold">{completedCount}</div>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
          <div className="text-sm opacity-90">Próximo Turno</div>
          <div className="text-lg font-semibold">
            {nextAppointment || "Sin turnos"}
          </div>
        </div>
      </div>
    </div>
  );
}
