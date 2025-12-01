import { Patient } from "@/types/appointments";

interface PatientSelectorProps {
  selectedPatient: Patient;
  onSelectPatient: (patient: Patient) => void;
}

export function PatientSelector({ selectedPatient, onSelectPatient }: PatientSelectorProps) {
  return (
    <div className="flex gap-2 mb-3">
      <button
        onClick={() => onSelectPatient("Caro")}
        className={`flex-1 py-2 px-4 text-sm rounded-md font-semibold transition-all ${
          selectedPatient === "Caro"
            ? "bg-blue-600 text-white shadow-lg"
            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
        }`}
      >
        Caro
      </button>
      <button
        onClick={() => onSelectPatient("Daro")}
        className={`flex-1 py-2 px-4 text-sm rounded-md font-semibold transition-all ${
          selectedPatient === "Daro"
            ? "bg-blue-600 text-white shadow-lg"
            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
        }`}
      >
        Daro
      </button>
    </div>
  );
}
