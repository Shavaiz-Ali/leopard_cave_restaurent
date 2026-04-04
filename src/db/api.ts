import { supabase } from './supabase';
import type { Reservation } from '@/types/types';

export const createReservation = async (reservation: Omit<Reservation, 'id' | 'created_at'>) => {
  const { data, error } = await supabase
    .from('reservations')
    .insert([reservation])
    .select()
    .maybeSingle();

  if (error) {
    console.error('Error creating reservation:', error);
    throw error;
  }

  return data;
};

export const getReservations = async () => {
  const { data, error } = await supabase
    .from('reservations')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching reservations:', error);
    throw error;
  }

  return Array.isArray(data) ? data : [];
};
