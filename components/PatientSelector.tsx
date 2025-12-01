import { Patient } from "@/types/appointments";

interface PatientSelectorProps {
  selectedPatient: Patient;
  onSelectPatient: (patient: Patient) => void;
}

export function PatientSelector({ selectedPatient, onSelectPatient }: PatientSelectorProps) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Paciente</h3>
      <button
        onClick={() => onSelectPatient("Caro")}
        className={`w-full py-2 px-3 text-sm rounded-md font-semibold transition-all text-left ${
          selectedPatient === "Caro"
            ? "bg-blue-600 text-white shadow-lg"
            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
        }`}
      >
        👤 Caro
      </button>
      <button
        onClick={() => onSelectPatient("Daro")}
        className={`w-full py-2 px-3 text-sm rounded-md font-semibold transition-all text-left ${
          selectedPatient === "Daro"
            ? "bg-blue-600 text-white shadow-lg"
            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
        }`}
      >
        👤 Daro
      </button>
    </div>
  );
}
