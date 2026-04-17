import { useState, useEffect } from 'react';
import { Mountain, Utensils, Clock, Heart, ChefHat, Leaf } from 'lucide-react';
import SEO from '@/components/common/SEO';
import { supabase } from '@/utils/supabase';
import type { Blog } from '@/types/types';
import HeroSection from '@/components/sections-v2/HeroSection';
import MenuSection from '@/components/sections-v2/MenuSection';
import GallerySection from '@/components/sections-v2/GallerySection';
import FacilitiesSection from '@/components/sections-v2/FacilitiesSection';
import IntroSection from '@/components/sections-v2/IntroSection';
import HighlightsSection from '@/components/sections-v2/HighlightsSection';
import LocationSection from '@/components/sections-v2/LocationSection';
import BlogsSection from '@/components/sections-v2/BlogsSection';
import TestimonialsSection from '@/components/sections-v2/TestimonialsSection';

interface MenuImage {
  id: string;
  title: string;
  url: string;
  sort_order: number;
}

interface GalleryItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  title: string;
  alt_text: string | null;
  description: string | null;
  storage_path: string | null;
  featured: boolean;
  created_at: string;
}

export default function Home() {
  const [dbGalleryItems, setDbGalleryItems] = useState<GalleryItem[]>([]);
  const [dbBlogs, setDbBlogs] = useState<Blog[]>([]);
  const [dbMenuImages, setDbMenuImages] = useState<MenuImage[]>([]);
  const [galleryLoading, setGalleryLoading] = useState(true);

  const highlights = [
    {
      icon: <Mountain className="h-6 w-6 md:h-8 md:w-8 text-white" />,
      title: 'Panoramic Views',
      description: 'Stunning 360-degree views of the vibrant blue Attabad Lake.',
      backgroundImage: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260330/file-alrz5b3t962o.png'
    },
    {
      icon: <Utensils className="h-6 w-6 md:h-8 md:w-8 text-white" />,
      title: 'Unique Ambiance',
      description: 'Experience dining in a cozy, cave-inspired wooden interior.',
      backgroundImage: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260330/file-als6qwq3iwhs.jpeg'
    },
    {
      icon: <Clock className="h-6 w-6 md:h-8 md:w-8 text-white" />,
      title: 'Lunch & Dinner',
      description: 'Open daily for flavorful lunch and unforgettable dinner experiences.',
      backgroundImage: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260330/file-alt9l5yl2qkg.jpeg'
    },
    {
      icon: <Heart className="h-6 w-6 md:h-8 md:w-8 text-white" />,
      title: 'Family Friendly',
      description: 'A peaceful environment ideal for families, couples, and tourists.',
      backgroundImage: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260330/file-alskgm8i562o.jpeg'
    },
    {
      icon: <ChefHat className="h-6 w-6 md:h-8 md:w-8 text-white" />,
      title: 'Delicious Cuisine',
      description: 'Authentic local and international dishes prepared with fresh ingredients.',
      backgroundImage: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260330/file-alt9l5yl1uyo.jpeg'
    },
    {
      icon: <Leaf className="h-6 w-6 md:h-8 md:w-8 text-white" />,
      title: 'Natural Setting',
      description: 'Surrounded by breathtaking mountains and pristine natural beauty.',
      backgroundImage: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260330/file-alrz5b3t9ce8.png'
    },
  ];

  const facilities = [
    {
      icon: (
        <svg className="h-8 w-8 md:h-10 md:w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      title: 'Baskochi Track Access',
      description: 'Direct access to the scenic Baskochi Track route leading to the beautiful Baskochi Meadows.',
      featured: true,
      backgroundImage: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260330/file-alt7c1sucni8.jpeg'
    },
    {
      icon: (
        <svg className="h-8 w-8 md:h-10 md:w-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
        </svg>
      ),
      title: 'Free Wi-Fi',
      description: 'Stay connected with complimentary high-speed internet access throughout the restaurant.'
    },
    {
      icon: (
        <svg className="h-8 w-8 md:h-10 md:w-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      ),
      title: 'Free Parking',
      description: 'Ample secure parking space available for all our guests and visitors.'
    },
    {
      icon: (
        <svg className="h-8 w-8 md:h-10 md:w-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: 'Family-Friendly Area',
      description: 'Dedicated comfortable spaces designed for families with children of all ages.'
    },
    {
      icon: (
        <svg className="h-8 w-8 md:h-10 md:w-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
        </svg>
      ),
      title: 'Top-Quality Service',
      description: 'Exceptional food service with premium fresh ingredients and expert preparation.'
    },
    {
      icon: (
        <svg className="h-8 w-8 md:h-10 md:w-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Excellent Cleanliness',
      description: 'Maintained to the highest standards of hygiene, sanitation, and safety protocols.'
    },
    {
      icon: (
        <svg className="h-8 w-8 md:h-10 md:w-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 3 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Eco-Friendly Design',
      description: 'Natural, sustainable architecture harmoniously blending with the mountain environment.'
    },
  ];

  const reviews = [
    { id: '1', name: 'Muhammad Asif', platform: 'Google Maps', rating: 5, text: 'Excellent location with stunning views of Attabad Lake. The food was delicious, especially the local dishes. Staff was very friendly and helpful. The cave-style architecture is unique and beautiful. Highly recommended for families and tourists visiting Hunza.', date: '2 weeks ago' },
    { id: '2', name: 'Ayesha Khan', platform: 'Google Maps', rating: 5, text: 'What a wonderful experience! The restaurant has amazing views and the ambiance is perfect. We tried the trout fish and mutton karahi - both were excellent. The service was quick and the staff was very polite. Great place to stop for lunch or dinner while traveling through Hunza.', date: '1 month ago' },
    { id: '3', name: 'Ali Raza', platform: 'Google Maps', rating: 5, text: 'One of the best restaurants in Hunza Valley. The location is spectacular, right above Attabad Lake with panoramic views. Food quality is top-notch and reasonably priced. The wooden interior and cave design make it very cozy. Perfect spot for photography and dining. Must visit!', date: '3 weeks ago' },
    { id: '4', name: 'Zainab Ahmed', platform: 'Google Maps', rating: 5, text: 'Beautiful restaurant with breathtaking lake views! The food was fresh and tasty. We loved the local cuisine and the hospitality. The restaurant is clean and well-maintained. Great place to relax and enjoy the natural beauty of Hunza. Will definitely visit again!', date: '1 month ago' },
    { id: '5', name: 'Imran Shah', platform: 'Google Maps', rating: 5, text: 'Fantastic dining experience! The restaurant offers a unique cave-style ambiance with stunning views of Attabad Lake. Food was delicious and authentic. Staff was very accommodating and friendly. The location is easily accessible from the Karakoram Highway. Highly recommend for anyone visiting the area!', date: '2 months ago' },
  ];

  const heroImages = [
    'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260403/file-aozbm8hrcgzk.jpeg',
    'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260329/file-akxu72ukunsw.jpeg',
    'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260329/file-akxqj3o5lnnk.png',
    'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260329/file-akxqj3o5mj9c.png',
    'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260329/file-akxcbezm1x4w.jpeg',
    'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260328/file-ak6ebe7y2n7k.png',
    'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260329/file-akxcbezm29s0.jpeg',
    'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260329/file-akxcbezm1e68.jpeg',
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [galleryRes, blogsRes, menusRes] = await Promise.all([
          supabase.from('gallery').select('*').order('created_at', { ascending: false }),
          supabase.from('blogs').select('*').eq('status', 'Active').order('featured', { ascending: false }).order('created_at', { ascending: false }).limit(3),
          supabase.from('menu_images').select('id, title, url, sort_order').order('sort_order', { ascending: true }).order('created_at', { ascending: false })
        ]);

        if (galleryRes.data) setDbGalleryItems(galleryRes.data);
        if (blogsRes.data) setDbBlogs(blogsRes.data);
        if (menusRes.data) setDbMenuImages(menusRes.data);
      } catch (error) {
        console.error('Error fetching data for landing page:', error);
      } finally {
        setGalleryLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <SEO
        title="Leopard Cave Restaurant | Best Restaurant in Hunza & Attabad Lake"
        description="Discover Leopard Cave Restaurant – one of the best restaurants in Hunza near Attabad Lake. Enjoy local Hunza food, Pakistani & international dishes with a beautiful natural view."
        keywords="best restaurants in Hunza, best food in Hunza, best food in Hunza Valley, best places to eat in Hunza, best restaurant in Karimabad Hunza, restaurants at Attabad Lake, Hunza food, local food in Hunza, best places in Hunza, where to eat in Hunza, Hunza traditional food, restaurants in Gilgit Baltistan, best restaurants in Gilgit Baltistan"
      />
      <div className="flex flex-col w-full relative">
        <HeroSection heroImages={heroImages} />
        <MenuSection dbMenuImages={dbMenuImages} />
        <GallerySection dbGalleryItems={dbGalleryItems} galleryLoading={galleryLoading} />
        <FacilitiesSection facilities={facilities} />
        <IntroSection />
        <HighlightsSection highlights={highlights} />
        <LocationSection />
        <BlogsSection dbBlogs={dbBlogs} />
        <TestimonialsSection reviews={reviews} />
      </div>
    </>
  );
}
