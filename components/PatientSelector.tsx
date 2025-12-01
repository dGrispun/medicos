import { Patient } from "@/types/appointments";

interface PatientSelectorProps {
  selectedPatient: Patient;
  onSelectPatient: (patient: Patient) => void;
}

export function PatientSelector({ selectedPatient, onSelectPatient }: PatientSelectorProps) {
  return (
    <div className="flex gap-4 mb-8">
      <button
        onClick={() => onSelectPatient("Caro")}
        className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
          selectedPatient === "Caro"
            ? "bg-blue-600 text-white shadow-lg"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        Caro
      </button>
      <button
        onClick={() => onSelectPatient("Daro")}
        className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
          selectedPatient === "Daro"
            ? "bg-blue-600 text-white shadow-lg"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        Daro
      </button>
    </div>
  );
}
