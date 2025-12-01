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
    <div className="bg-gray-900 text-white p-3 rounded-md border border-gray-700">
      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
        Resumen - {patientName}
      </h3>
      <div className="space-y-2">
        <div className="flex items-center justify-between p-2 bg-gray-800 rounded">
          <div className="text-xs text-gray-400">Pendientes</div>
          <div className="text-lg font-bold text-yellow-400">{pendingCount}</div>
        </div>
        <div className="flex items-center justify-between p-2 bg-gray-800 rounded">
          <div className="text-xs text-gray-400">Completados</div>
          <div className="text-lg font-bold text-green-400">{completedCount}</div>
        </div>
        <div className="p-2 bg-gray-800 rounded">
          <div className="text-xs text-gray-400 mb-1">Próximo Turno</div>
          <div className="text-sm font-semibold text-blue-400">
            {nextAppointment || "Sin turnos"}
          </div>
        </div>
      </div>
    </div>
  );
}
