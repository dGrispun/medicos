import { createClient } from '@supabase/supabase-js';
import { Appointment, AppointmentDB } from '@/types/appointments';

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Convert between camelCase (app) and snake_case (database)
const toApp = (db: AppointmentDB): Appointment => ({
  ...db,
  studyType: db.study_type,
});

const toDb = (app: Partial<Appointment>): Partial<AppointmentDB> => {
  const { studyType, ...rest } = app as any;
  return {
    ...rest,
    study_type: studyType,
  };
};

// API functions
export const appointmentsApi = {
  // Get all appointments
  async getAll(): Promise<Appointment[]> {
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .order('date', { ascending: true });

    if (error) {
      console.error('Error fetching appointments:', error);
      return [];
    }

    return (data || []).map(toApp);
  },

  // Create appointment
  async create(appointment: Omit<Appointment, 'id'>): Promise<Appointment | null> {
    const dbData = toDb(appointment);
    const { data, error } = await supabase
      .from('appointments')
      .insert([dbData])
      .select()
      .single();

    if (error) {
      console.error('Error creating appointment:', error);
      return null;
    }

    return data ? toApp(data) : null;
  },

  // Update appointment
  async update(id: string, updates: Partial<Appointment>): Promise<Appointment | null> {
    const dbUpdates = toDb(updates);
    const { data, error } = await supabase
      .from('appointments')
      .update(dbUpdates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating appointment:', error);
      return null;
    }

    return data ? toApp(data) : null;
  },

  // Delete appointment
  async delete(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('appointments')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting appointment:', error);
      return false;
    }

    return true;
  },

  // Subscribe to real-time changes
  subscribeToChanges(callback: () => void) {
    const subscription = supabase
      .channel('appointments_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'appointments' },
        callback
      )
      .subscribe();

    return subscription;
  }
};
