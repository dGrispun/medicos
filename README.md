# Medical Appointments Manager - Medicos

A Next.js application for managing medical appointments and tasks for patients Caro and Daro.

## Features

- 👥 **Multi-patient management** - Switch between Caro and Daro
- 📋 **Task tracking** - Pending and completed appointments
- 💾 **Persistent storage** - Data saved in localStorage
- 📱 **Responsive design** - Works on desktop and mobile
- 🎨 **Clean UI** - Built with Tailwind CSS
- 🔍 **Filtering** - Filter by status and specialty

## Tech Stack

- **Next.js 14+** with App Router
- **TypeScript**
- **Tailwind CSS**
- **React Hooks** for state management
- **localStorage** for data persistence

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd Medicos
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Make sure Tailwind CSS is configured. If starting fresh, your `tailwind.config.ts` should include:
```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
export default config;
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
Medicos/
├── app/
│   └── page.tsx              # Main page component
├── components/
│   ├── AppointmentCard.tsx   # Individual appointment card
│   ├── AppointmentForm.tsx   # Form for creating/editing appointments
│   ├── AppointmentList.tsx   # List view with filters
│   ├── CountersHeader.tsx    # Statistics header
│   └── PatientSelector.tsx   # Patient switcher
├── hooks/
│   └── usePersistentState.ts # localStorage persistence hook
├── types/
│   └── appointments.ts       # TypeScript interfaces
└── README.md
```

## Usage

### Switching Patients
Click on the "Caro" or "Daro" buttons at the top to switch between patients.

### Adding New Appointments
1. Click "Agregar Nuevo Turno"
2. Fill in all required fields
3. Click "Agregar Turno" to save

### Editing Appointments
1. Click "Editar" on any appointment card
2. Modify the fields
3. Click "Guardar Cambios"

### Marking Appointments
- Click "Marcar Completado" to move an appointment to the completed list
- Click "Marcar Pendiente" to move it back to pending

### Filtering
Use the dropdown filters to view:
- All appointments, pending only, or completed only
- Specific specialties

## Data Persistence

All data is stored in `localStorage` under the key `medical-appointments-v1`. The app will:
- Load sample data on first visit
- Persist all changes automatically
- Maintain data across page refreshes

To reset data, clear your browser's localStorage or open Developer Tools and run:
```javascript
localStorage.removeItem('medical-appointments-v1')
```

## Deployment to Vercel

1. Push your code to GitHub

2. Go to [vercel.com](https://vercel.com) and sign in

3. Click "New Project" and import your GitHub repository

4. Vercel will auto-detect Next.js and configure build settings

5. Click "Deploy"

Your app will be live at `https://your-project-name.vercel.app`

## Sample Data

The app comes pre-loaded with sample appointments:

**Caro:**
- 5/12/2025: Rayos X, Ecografía abdominal, Electrocardiograma
- 9/1/2026: Flebólogo

**Daro:**
- 10/12/2025: Clínica Médica
- 15/12/2025: Análisis de sangre

## License

MIT

## Author

Built with ❤️ for managing medical appointments
