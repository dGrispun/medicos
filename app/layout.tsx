import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Medicos - Gestión de Turnos Médicos",
  description: "Administrador de turnos y tareas médicas para Caro y Daro",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
