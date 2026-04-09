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
