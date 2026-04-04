export interface Reservation {
  id?: string;
  full_name: string;
  phone_number: string;
  reservation_date: string;
  reservation_time: string;
  guests_count: number;
  special_requests?: string;
  created_at?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: string;
  price?: number;
}

export interface Attraction {
  id: string;
  name: string;
  description: string;
  image?: string;
}
