export interface Reservation {
  id?: string;
  full_name: string;
  phone_number: string;
  reservation_date: string;
  reservation_time: string;
  guests_count: number;
  special_requests?: string;
  total_amount?: number;
  advance_payment?: number;
  payment_method?: 'jazzcash' | 'easypaisa' | 'crypto';
  status?: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  advance_payment_status?: 'pending' | 'received';
  created_at?: string;
  updated_at?: string;
}

export interface ReservationItem {
  id?: string;
  reservation_id?: string;
  menu_item_id: string;
  menu_item_name: string;
  price: number;
  quantity: number;
  created_at?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  category_id?: string;
  price?: string;
  categories?: { name: string } | null;
  category?: string
}

export interface Attraction {
  id: string;
  name: string;
  description: string;
  image?: string;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  image_storage_path: string | null;
  author: string;
  featured: boolean;
  status: string;
  created_at: string;
  updated_at: string;
}
