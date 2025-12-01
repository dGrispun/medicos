# Configuración de Supabase

## Paso 1: Crear una cuenta en Supabase

1. Ve a https://supabase.com
2. Crea una cuenta gratuita
3. Crea un nuevo proyecto

## Paso 2: Crear la tabla en Supabase

1. En tu proyecto de Supabase, ve a **SQL Editor**
2. Copia y ejecuta este SQL:

```sql
-- Create appointments table
CREATE TABLE appointments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  patient TEXT NOT NULL CHECK (patient IN ('Caro', 'Daro')),
  speciality TEXT NOT NULL,
  study_type TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'done')),
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  location TEXT NOT NULL,
  phone TEXT NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations for now (you can restrict later)
CREATE POLICY "Enable all access for appointments" ON appointments
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Create index for faster queries
CREATE INDEX idx_appointments_patient ON appointments(patient);
CREATE INDEX idx_appointments_status ON appointments(status);
CREATE INDEX idx_appointments_date ON appointments(date);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_appointments_updated_at
  BEFORE UPDATE ON appointments
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();
```

## Paso 3: Obtener las credenciales

1. En Supabase, ve a **Settings** > **API**
2. Copia:
   - **Project URL** (ejemplo: `https://xxxxxxxxxxxx.supabase.co`)
   - **anon public** key (la key larga que empieza con `eyJ...`)

## Paso 4: Configurar variables de entorno

1. En tu proyecto, crea un archivo `.env.local` en la raíz (al lado de `package.json`)
2. Pega esto con tus valores:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ey...
```

## Paso 5: Reiniciar el servidor

```bash
# Detén el servidor si está corriendo (Ctrl+C)
npm run dev
```

## ✅ Listo!

Ahora tu app está conectada a Supabase. Los datos se guardarán en la nube y podrás:
- Acceder desde cualquier navegador/dispositivo
- Los datos persisten permanentemente
- Sincronización en tiempo real entre pestañas/dispositivos

## Verificar que funciona

1. Abre http://localhost:3000
2. Agrega un turno nuevo
3. Ve a Supabase > **Table Editor** > `appointments`
4. Deberías ver tu turno guardado allí!

## Desplegar en Vercel

Cuando subas a Vercel, agrega las mismas variables de entorno:
1. En Vercel, ve a tu proyecto > **Settings** > **Environment Variables**
2. Agrega `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Redeploy
