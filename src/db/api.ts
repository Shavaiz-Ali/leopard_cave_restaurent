import type { Reservation, ReservationItem } from '@/types/types';
import { supabase } from '@/utils/supabase';

interface CreateReservationWithItems {
  reservation: Omit<Reservation, 'id' | 'created_at' | 'updated_at'>;
  items: Omit<ReservationItem, 'id' | 'reservation_id' | 'created_at'>[];
}

export const createReservation = async (data: CreateReservationWithItems) => {
  console.log('Creating reservation with data:', data);
  
  const { data: reservationData, error: reservationError } = await supabase
    .from('reservations')
    .insert([data.reservation])
    .select()
    .maybeSingle();

  if (reservationError) {
    console.error('❌ Error creating reservation:', {
      message: reservationError.message,
      code: reservationError.code,
      details: reservationError.details,
      hint: reservationError.hint
    });
    throw reservationError;
  }

  console.log('✅ Reservation created:', reservationData);

  if (data.items.length > 0 && reservationData?.id) {
    const itemsWithReservationId = data.items.map(item => ({
      ...item,
      reservation_id: reservationData.id
    }));

    console.log('Creating reservation items:', itemsWithReservationId);
    
    const { error: itemsError } = await supabase
      .from('reservation_items')
      .insert(itemsWithReservationId);

    if (itemsError) {
      console.error('❌ Error creating reservation items:', {
        message: itemsError.message,
        code: itemsError.code,
        details: itemsError.details,
        hint: itemsError.hint
      });
      throw itemsError;
    }
    
    console.log('✅ Reservation items created');
  }

  return reservationData;
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

export const getReservationsByPhone = async (phoneNumber: string) => {
  const { data, error } = await supabase
    .from('reservations')
    .select('*, reservation_items(*)')
    .eq('phone_number', phoneNumber)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching reservations by phone:', error);
    throw error;
  }

  return Array.isArray(data) ? data : [];
};

export const cancelReservation = async (id: string) => {
  const { data, error } = await supabase
    .from('reservations')
    .update({ status: 'cancelled', advance_payment_status: 'pending' })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error cancelling reservation:', error);
    throw error;
  }

  return data;
};
