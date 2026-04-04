import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Mountain, Utensils, MapPin, Heart, Clock, Wifi, ParkingCircle, Users, ChefHat, Sparkles, Leaf, Star, Facebook, Instagram } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import SEO from '@/components/common/SEO';

export default function Home() {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const featuredVideoRef = useRef<HTMLVideoElement | null>(null);

  const handleVideoPlay = (index: number) => {
    videoRefs.current.forEach((video, i) => {
      if (video && i !== index && !video.paused) {
        video.pause();
      }
    });
  };

  // Intersection Observer for featured video autoplay
  useEffect(() => {
    const featuredVideo = featuredVideoRef.current;
    if (!featuredVideo) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Video is in view, autoplay
            featuredVideo.play().catch(() => {
              // Autoplay might be blocked by browser
            });
          } else {
            // Video is out of view, pause
            if (!featuredVideo.paused) {
              featuredVideo.pause();
            }
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of video is visible
    );

    observer.observe(featuredVideo);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Intersection Observer for all videos (mobile + desktop)
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    videoRefs.current.forEach((video) => {
      if (!video) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Video is in view - do nothing (let user control play)
            } else {
              // Video is out of view - auto pause
              if (!video.paused) {
                video.pause();
              }
            }
          });
        },
        { 
          threshold: 0.25, // Trigger when 25% of video is visible
          rootMargin: '0px' // No margin
        }
      );

      observer.observe(video);
      observers.push(observer);
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  const highlights = [
    { 
      icon: <Mountain className="h-8 w-8 text-white" />, 
      title: 'Panoramic Views', 
      description: 'Stunning 360-degree views of the vibrant blue Attabad Lake.',
      backgroundImage: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260330/file-alrz5b3t962o.png'
    },
    { 
      icon: <Utensils className="h-8 w-8 text-white" />, 
      title: 'Unique Ambiance', 
      description: 'Experience dining in a cozy, cave-inspired wooden interior.',
      backgroundImage: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260330/file-als6qwq3iwhs.jpeg'
    },
    { 
      icon: <Clock className="h-8 w-8 text-white" />, 
      title: 'Lunch & Dinner', 
      description: 'Open daily for flavorful lunch and unforgettable dinner experiences.',
      backgroundImage: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260330/file-alt9l5yl2qkg.jpeg'
    },
    { 
      icon: <Heart className="h-8 w-8 text-white" />, 
      title: 'Family Friendly', 
      description: 'A peaceful environment ideal for families, couples, and tourists.',
      backgroundImage: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260330/file-alskgm8i562o.jpeg'
    },
    { 
      icon: <ChefHat className="h-8 w-8 text-white" />, 
      title: 'Delicious Cuisine', 
      description: 'Authentic local and international dishes prepared with fresh ingredients.',
      backgroundImage: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260330/file-alt9l5yl1uyo.jpeg'
    },
    { 
      icon: <Leaf className="h-8 w-8 text-white" />, 
      title: 'Natural Setting', 
      description: 'Surrounded by breathtaking mountains and pristine natural beauty.',
      backgroundImage: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260330/file-alrz5b3t9ce8.png'
    },
  ];

  const facilities = [
    { 
      icon: (
        <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <svg className="h-10 w-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
        </svg>
      ), 
      title: 'Free Wi-Fi', 
      description: 'Stay connected with complimentary high-speed internet access throughout the restaurant.' 
    },
    { 
      icon: (
        <svg className="h-10 w-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      ), 
      title: 'Free Parking', 
      description: 'Ample secure parking space available for all our guests and visitors.' 
    },
    { 
      icon: (
        <svg className="h-10 w-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ), 
      title: 'Family-Friendly Area', 
      description: 'Dedicated comfortable spaces designed for families with children of all ages.' 
    },
    { 
      icon: (
        <svg className="h-10 w-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
        </svg>
      ), 
      title: 'Top-Quality Service', 
      description: 'Exceptional food service with premium fresh ingredients and expert preparation.' 
    },
    { 
      icon: (
        <svg className="h-10 w-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ), 
      title: 'Excellent Cleanliness', 
      description: 'Maintained to the highest standards of hygiene, sanitation, and safety protocols.' 
    },
    { 
      icon: (
        <svg className="h-10 w-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ), 
      title: 'Eco-Friendly Design', 
      description: 'Natural, sustainable architecture harmoniously blending with the mountain environment.' 
    },
  ];

  const galleryImages = [
    { id: '1', src: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260330/file-alrz5b3t962o.png', alt: 'Stunning mountain view from restaurant' },
    { id: '2', src: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260330/file-alrz5b3t9ce8.png', alt: 'Scenic landscape and dining area' },
    { id: '3', src: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260330/file-alrz4vbkcq9s.png', alt: 'Beautiful restaurant ambiance' },
    { id: '4', src: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260329/file-akxqj3o5lnnk.png', alt: 'Rustic cave dining with stunning views' },
    { id: '5', src: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260329/file-akxqj3o5mj9c.png', alt: 'Rustic hillside restaurant at sunset' },
    { id: '6', src: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260329/file-akxcbezm1x4w.jpeg', alt: 'Restaurant exterior view' },
    { id: '7', src: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260329/file-akxcbezm29s0.jpeg', alt: 'Scenic mountain backdrop' },
    { id: '8', src: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260329/file-akxcbezm1e68.jpeg', alt: 'Restaurant entrance and surroundings' },
    { id: '9', src: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260330/file-als6qwq3iwhs.jpeg', alt: 'Restaurant interior dining area' },
    { id: '10', src: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260330/file-als6qgxumtc0.jpeg', alt: 'Cozy seating arrangement' },
    { id: '11', src: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260330/file-als6qwq3idj4.jpeg', alt: 'Panoramic lake view from restaurant' },
    { id: '12', src: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260330/file-als6qwq3j2te.jpeg', alt: 'Outdoor seating with mountain views' },
    { id: '13', src: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260330/file-alskgm8i562o.jpeg', alt: 'Restaurant dining space' },
    { id: '14', src: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260330/file-alskgm8i4n40.jpeg', alt: 'Beautiful interior setup' },
    { id: '15', src: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260330/file-alskgm8i5ips.jpeg', alt: 'Cozy dining atmosphere' },
    { id: '16', src: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260330/file-alskgm8i4agw.jpeg', alt: 'Restaurant seating area' },
    { id: '17', src: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260330/file-alskgm8i5ce8.jpeg', alt: 'Welcoming restaurant interior' },
    { id: '18', src: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260330/file-alsqut6b73eo.jpeg', alt: 'Restaurant dining experience' },
    { id: '19', src: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260330/file-alsqude2b6kg.jpeg', alt: 'Elegant restaurant setting' },
    { id: '20', src: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260330/file-alsqude2anls.jpeg', alt: 'Comfortable dining area' },
    { id: '21', src: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260330/file-alsqut6b7mdc.jpeg', alt: 'Inviting restaurant atmosphere' },
    { id: '22', src: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260330/file-alsqude2bcw0.jpeg', alt: 'Charming restaurant interior' },
    { id: '23', src: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260330/file-alsxg0o2o7wg.jpeg', alt: 'Restaurant ambiance and decor' },
    { id: '24', src: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260330/file-alsxg0o2pg5c.jpeg', alt: 'Dining area with natural light' },
    { id: '25', src: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260330/file-alsxg0o2okjk.jpeg', alt: 'Cozy restaurant corner' },
    { id: '26', src: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260330/file-alsxg0o2p9ts.jpeg', alt: 'Spacious dining hall' },
    { id: '27', src: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260330/file-alsxf53kvcao.jpeg', alt: 'Warm restaurant interior' },
    { id: '28', src: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260330/file-alt9l5yl2qkg.jpeg', alt: 'Restaurant dining setup' },
    { id: '29', src: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260330/file-alt9l5yl1uyo.jpeg', alt: 'Elegant table arrangement' },
    { id: '30', src: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260330/file-alt9l5yl27ls.jpeg', alt: 'Cozy dining corner' },
    { id: '31', src: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260330/file-alt9l5yl2ww0.jpeg', alt: 'Beautiful restaurant interior' },
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

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    // Show content after 2 seconds
    const contentTimer = setTimeout(() => {
      setShowContent(true);
      setShowText(true);
    }, 2000);

    return () => clearTimeout(contentTimer);
  }, []);

  useEffect(() => {
    // Hide text after 5 seconds of being visible
    if (showText) {
      const textTimer = setTimeout(() => {
        setShowText(false);
      }, 5000);

      return () => clearTimeout(textTimer);
    }
  }, [showText]);

  useEffect(() => {
    // Start slideshow after content appears
    if (showContent) {
      // Immediately switch to second image when content appears
      setCurrentImageIndex(1);
      
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => {
          // Cycle through all images except the logo (index 0)
          const nextIndex = prevIndex + 1;
          return nextIndex >= heroImages.length ? 1 : nextIndex;
        });
      }, 2000); // Changed to 2 seconds for smooth balanced transitions

      return () => clearInterval(interval);
    }
  }, [showContent, heroImages.length]);

  return (
    <>
      <SEO 
        title="Leopard Cave Restaurant | Best Restaurant in Hunza & Attabad Lake"
        description="Discover Leopard Cave Restaurant – one of the best restaurants in Hunza near Attabad Lake. Enjoy local Hunza food, Pakistani & international dishes with a beautiful natural view."
        keywords="best restaurants in Hunza, best food in Hunza, best food in Hunza Valley, best places to eat in Hunza, best restaurant in Karimabad Hunza, restaurants at Attabad Lake, Hunza food, local food in Hunza, best places in Hunza, where to eat in Hunza, Hunza traditional food, restaurants in Gilgit Baltistan, best restaurants in Gilgit Baltistan"
      />
      <div className="flex flex-col w-full relative">
      {/* Social Media Icons - Fixed Bottom Right Corner */}
      <div className="fixed bottom-8 right-8 z-40 flex flex-col gap-4">
        <a
          href="https://www.facebook.com/profile.php?id=61582236326778"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-2xl hover:scale-110 transition-all duration-300 hover:shadow-primary/50"
          aria-label="Visit our Facebook page"
        >
          <Facebook className="h-6 w-6" />
        </a>
        <a
          href="https://www.instagram.com/leopard.cave.restaurant?igsh=MXZ0eWtsN3NoMW1zaQ=="
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-2xl hover:scale-110 transition-all duration-300 hover:shadow-primary/50"
          aria-label="Visit our Instagram page"
        >
          <Instagram className="h-6 w-6" />
        </a>
        <a
          href="https://www.tiktok.com/@leopard.cave.restaurant?_r=1&_t=ZS-954evnj7xI8"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-2xl hover:scale-110 transition-all duration-300 hover:shadow-primary/50"
          aria-label="Visit our TikTok page"
        >
          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
          </svg>
        </a>
      </div>

      {/* Hero Section - Full Screen with Navigation Overlay */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden" style={{ backgroundColor: currentImageIndex === 0 ? '#000000' : '#1a1a1a' }}>
        {heroImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Leopard Cave Restaurant view ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/50 z-10" />
        {showContent && (
          <div className="relative z-20 w-full h-full flex flex-col items-center justify-center py-12 px-4">
            {/* Center Text Section */}
            <div className="flex-1 flex items-center justify-center">
              {showText && (
                <div className="text-center space-y-4 animate-fade-in">
                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-amber-400 tracking-tight drop-shadow-2xl">
                    Welcome to Leopard Cave Restaurant
                  </h1>
                  <p className="text-lg md:text-xl text-cyan-100 font-medium drop-shadow-xl max-w-3xl mx-auto">
                    Enjoy delicious local and international cuisine with a breathtaking view of Attabad Lake
                  </p>
                </div>
              )}
            </div>

            {/* Bottom Buttons Section - Only visible after text disappears */}
            {!showText && (
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center animate-fade-in mb-12">
                <Button size="lg" asChild className="rounded-full text-base md:text-lg px-8 md:px-10 py-5 md:py-6 font-bold shadow-2xl hover:scale-105 hover:bg-white/10 hover:shadow-primary/50 hover:border-2 hover:border-white transition-all duration-300 bg-primary border-2 border-transparent backdrop-blur-sm">
                  <Link to="/menu" className="hover:text-white">Menu</Link>
                </Button>
                <Button size="lg" asChild className="rounded-full text-base md:text-lg px-8 md:px-10 py-5 md:py-6 font-bold shadow-2xl hover:scale-105 hover:bg-white/10 hover:shadow-primary/50 hover:border-2 hover:border-white transition-all duration-300 bg-primary border-2 border-transparent backdrop-blur-sm">
                  <Link to="/reservation" className="hover:text-white">Reserve Table</Link>
                </Button>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-background">
        <div className="container px-4 md:px-8 max-w-7xl mx-auto">
          <div className="text-center space-y-3 mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-primary">Explore Our Beautiful Space</h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover the stunning views, cozy interiors, and delicious cuisine that make Leopard Cave Restaurant unforgettable
            </p>
          </div>

          {/* Featured Video */}
          <div className="mb-16">
            <Card className="overflow-hidden border-none shadow-2xl bg-card max-w-4xl mx-auto">
              <CardContent className="p-6 md:p-8">
                <div className="space-y-4 mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-primary text-center">Welcome to Leopard Cave Restaurant</h2>
                  <p className="text-base md:text-lg text-muted-foreground text-center leading-relaxed">
                    A perfect place for families, friends, and groups to relax and enjoy. Experience a peaceful and natural environment with breathtaking surroundings. Our restaurant is designed with a unique, nature-inspired aesthetic, built using natural elements to create a truly authentic and calming atmosphere.
                  </p>
                </div>
                <div className="relative rounded-xl overflow-hidden shadow-xl">
                  <video 
                    ref={(el) => { 
                      videoRefs.current[0] = el; 
                      featuredVideoRef.current = el;
                    }}
                    controls 
                    controlsList="nodownload"
                    disablePictureInPicture
                    onPlay={() => handleVideoPlay(0)}
                    onContextMenu={(e) => e.preventDefault()}
                    className="w-full h-auto"
                    style={{ maxHeight: '500px' }}
                    muted
                    playsInline
                  >
                    <source src="https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260331/file-ami9gyitjabk.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  {/* Watermark Overlay - Positioned to avoid controls */}
                  <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm px-4 py-2 rounded-lg pointer-events-none z-10">
                    <p className="text-white text-sm font-semibold">www.leopardcaverestaurant.com</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Video Reels Preview - Max 4 */}
          <div className="mb-16">
            <div className="text-center space-y-3 mb-8">
              <h3 className="text-xl md:text-2xl font-bold text-primary">More Videos & Reels</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-card">
                <CardContent className="p-0 relative">
                  <div className="relative" style={{ maxHeight: '350px', overflow: 'hidden' }}>
                    <video 
                      ref={(el) => { videoRefs.current[1] = el; }}
                      controls 
                      controlsList="nodownload"
                      disablePictureInPicture
                      onPlay={() => handleVideoPlay(1)}
                      onContextMenu={(e) => e.preventDefault()}
                      className="w-full h-auto"
                      style={{ maxHeight: '350px' }}
                    >
                      <source src="https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260331/file-ami98mm4ey2o.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded text-xs pointer-events-none z-10">
                    <p className="text-white font-semibold">www.leopardcaverestaurant.com</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-card">
                <CardContent className="p-0 relative">
                  <div className="relative" style={{ maxHeight: '350px', overflow: 'hidden' }}>
                    <video 
                      ref={(el) => { videoRefs.current[2] = el; }}
                      controls 
                      controlsList="nodownload"
                      disablePictureInPicture
                      onPlay={() => handleVideoPlay(2)}
                      onContextMenu={(e) => e.preventDefault()}
                      className="w-full h-auto"
                      style={{ maxHeight: '350px' }}
                    >
                      <source src="https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260331/file-ami9atjcwyrk.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded text-xs pointer-events-none z-10">
                    <p className="text-white font-semibold">www.leopardcaverestaurant.com</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-card">
                <CardContent className="p-0 relative">
                  <div className="relative" style={{ maxHeight: '350px', overflow: 'hidden' }}>
                    <video 
                      ref={(el) => { videoRefs.current[3] = el; }}
                      controls 
                      controlsList="nodownload"
                      disablePictureInPicture
                      onPlay={() => handleVideoPlay(3)}
                      onContextMenu={(e) => e.preventDefault()}
                      className="w-full h-auto"
                      style={{ maxHeight: '350px' }}
                    >
                      <source src="https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260401/file-ao0pk0xvdbsw.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded text-xs pointer-events-none z-10">
                    <p className="text-white font-semibold">www.leopardcaverestaurant.com</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-card">
                <CardContent className="p-0 relative">
                  <div className="relative" style={{ maxHeight: '350px', overflow: 'hidden' }}>
                    <video 
                      ref={(el) => { videoRefs.current[4] = el; }}
                      controls 
                      controlsList="nodownload"
                      disablePictureInPicture
                      onPlay={() => handleVideoPlay(4)}
                      onContextMenu={(e) => e.preventDefault()}
                      className="w-full h-auto"
                      style={{ maxHeight: '350px' }}
                    >
                      <source src="https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260331/file-ami9b9bltekg.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded text-xs pointer-events-none z-10">
                    <p className="text-white font-semibold">www.leopardcaverestaurant.com</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="text-center mt-8">
              <Button size="lg" asChild className="rounded-full text-lg px-10 py-6 font-bold shadow-xl hover:scale-105 hover:bg-secondary hover:shadow-primary/50 transition-all duration-300">
                <Link to="/videos">View More Videos</Link>
              </Button>
            </div>
          </div>

          {/* Gallery Images */}
          <div className="text-center space-y-3 mb-8">
            <h3 className="text-xl md:text-2xl font-bold text-primary">Our Gallery</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {galleryImages.slice(0, 8).map((image) => (
              <Card key={image.id} className="overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-card group">
                <CardContent className="p-0 relative">
                  <div className="relative w-full bg-muted" style={{ paddingBottom: '100%' }}>
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="absolute inset-0 w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="text-white text-xs md:text-sm font-medium leading-tight">{image.alt}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button size="lg" asChild className="rounded-full text-lg px-10 py-6 font-bold shadow-xl hover:scale-105 hover:bg-secondary hover:shadow-primary/50 transition-all duration-300">
              <Link to="/gallery">View More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="py-20 bg-muted/30">
        <div className="container px-4 md:px-8 max-w-7xl mx-auto">
          <div className="text-center space-y-3 mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-primary">Our Premium Facilities</h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience world-class amenities designed for your comfort and convenience
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((facility, index) => (
              <Card 
                key={index} 
                className={`border-none shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden ${
                  facility.featured ? 'ring-2 ring-primary' : 'bg-card'
                }`}
              >
                {facility.backgroundImage ? (
                  <div className="relative h-64">
                    <img 
                      src={facility.backgroundImage} 
                      alt={facility.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40" />
                    <CardContent className="relative h-full flex flex-col items-center justify-center p-8 text-center space-y-4">
                      <div className="p-4 rounded-2xl mb-2 bg-white/20 backdrop-blur-sm">
                        {facility.icon}
                      </div>
                      <h3 className="text-xl font-bold text-white drop-shadow-lg">{facility.title}</h3>
                      <p className="text-white/95 drop-shadow-md">{facility.description}</p>
                      {facility.featured && (
                        <span className="inline-block px-4 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full uppercase">
                          Featured
                        </span>
                      )}
                    </CardContent>
                  </div>
                ) : (
                  <CardContent className="flex flex-col items-center p-8 text-center space-y-4 h-64 justify-center">
                    <div className="p-4 rounded-2xl mb-2 bg-primary/10">
                      {facility.icon}
                    </div>
                    <h3 className="text-xl font-bold">{facility.title}</h3>
                    <p className="text-muted-foreground">{facility.description}</p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-20 bg-background container px-4 md:px-8 max-w-7xl mx-auto text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-3xl md:text-5xl font-bold text-primary">A One-of-a-Kind Experience</h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Leopard Cave Restaurant offers a one-of-a-kind dining experience located above the stunning Attabad Lake.
            Surrounded by nature, this beautiful space combines cave-inspired architecture, warm wooden interiors,
            and panoramic views of one of the most scenic lakes in the region.
          </p>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-20 bg-muted/30">
        <div className="container px-4 md:px-8 max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 text-primary">Experience Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {highlights.map((highlight, index) => (
              <Card key={index} className="border-none shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden group">
                {highlight.backgroundImage ? (
                  <div className="relative h-80">
                    <img 
                      src={highlight.backgroundImage} 
                      alt={highlight.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />
                    <CardContent className="relative h-full flex flex-col items-center justify-end p-6 text-center space-y-3">
                      <div className="p-3 bg-white/20 backdrop-blur-sm rounded-full">
                        {highlight.icon}
                      </div>
                      <h3 className="text-xl font-bold text-white drop-shadow-lg">{highlight.title}</h3>
                      <p className="text-white/95 drop-shadow-md text-sm leading-relaxed">{highlight.description}</p>
                    </CardContent>
                  </div>
                ) : (
                  <CardContent className="flex flex-col items-center p-8 text-center space-y-4 bg-card h-80 justify-center">
                    <div className="p-4 bg-primary/10 rounded-2xl mb-2">
                      {highlight.icon}
                    </div>
                    <h3 className="text-xl font-bold">{highlight.title}</h3>
                    <p className="text-muted-foreground">{highlight.description}</p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Location CTA with Embedded Map */}
      <section className="py-20 container px-4 md:px-8 max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-6">
          <h2 className="text-2xl md:text-4xl font-bold text-primary">Visit Us Today</h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            We are located at the heart of the Hunza valley, offering the best views of Attabad Lake.
            Come and experience nature like never before.
          </p>
        </div>
        
        {/* Embedded Google Map */}
        <div className="w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-primary/10">
          <iframe
            width="100%"
            height="450"
            frameBorder="0"
            style={{ border: 0 }}
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed/v1/place?key=AIzaSyB_LJOYJL-84SMuxNB7LtRGhxEQLjswvy0&language=en&region=cn&q=Leopard+Cave+Restaurant+Attabad+Lake+Hunza"
            allowFullScreen
            title="Leopard Cave Restaurant Location - Above Attabad Lake, Hunza"
            className="w-full"
          />
        </div>

        <div className="flex flex-col items-center gap-6 mt-8">
          <div className="text-center space-y-2">
            <h3 className="text-xl font-bold text-primary">Leopard Cave Restaurant</h3>
            <p className="text-muted-foreground font-semibold">Karakoram Highway, Above Attabad Lake</p>
            <p className="text-muted-foreground">Gojal Valley, Hunza, Gilgit-Baltistan, Pakistan</p>
            <p className="text-muted-foreground font-semibold mt-4">📞 Phone: +92 316 0605535</p>
            <p className="text-muted-foreground">📧 Email: Leopardcaverestaurantofficial@gmail.com</p>
            <p className="text-muted-foreground text-sm mt-2">Open Daily: 8:00 AM - 12:00 Midnight</p>
          </div>
          <Button variant="link" asChild className="text-primary font-bold text-lg hover:text-secondary transition-colors duration-300">
            <a 
              href="https://www.google.com/maps/dir/?api=1&destination=Leopard+Cave+Restaurant+Attabad+Lake+Hunza" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <MapPin className="h-5 w-5" />
              Get Directions
            </a>
          </Button>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="py-20 bg-muted/30">
        <div className="container px-4 md:px-8 max-w-7xl mx-auto">
          <div className="text-center space-y-3 mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-primary">What Our Guests Say</h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Real reviews from our valued customers across Google Maps, Facebook, and social media
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reviews.map((review) => (
              <Card key={review.id} className="border-none shadow-xl hover:shadow-2xl transition-all duration-300 bg-card">
                <CardContent className="p-8 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold">{review.name}</h3>
                      <p className="text-sm text-muted-foreground">{review.platform} • {review.date}</p>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{review.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button size="lg" asChild className="rounded-full text-lg px-10 py-6 font-bold shadow-xl hover:scale-105 hover:bg-secondary hover:shadow-primary/50 transition-all duration-300">
              <Link to="/reservation">Book Your Experience</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
