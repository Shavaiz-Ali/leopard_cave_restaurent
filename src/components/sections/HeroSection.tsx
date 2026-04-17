import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram } from 'lucide-react';

interface HeroSectionProps {
  heroImages: string[];
}

export default function HeroSection({ heroImages }: HeroSectionProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const contentTimer = setTimeout(() => {
      setShowContent(true);
      setShowText(true);
    }, 1000);
    return () => clearTimeout(contentTimer);
  }, []);

  useEffect(() => {
    if (showText) {
      const textTimer = setTimeout(() => {
        setShowText(false);
      }, 4000);
      return () => clearTimeout(textTimer);
    }
  }, [showText]);

  useEffect(() => {
    if (showContent) {
      setCurrentImageIndex(1);
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => {
          const nextIndex = prevIndex + 1;
          return nextIndex >= heroImages.length ? 1 : nextIndex;
        });
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [showContent, heroImages.length]);

  return (
    <section className="relative h-[90vh] md:h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Images */}
      {heroImages.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Leopard Cave Restaurant view ${index + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}

      {/* Overlay Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-black/80 z-10" />

      {/* Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {showContent && showText && (
          <div className="space-y-4 md:space-y-6 animate-fade-in-up">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-amber-400 tracking-tight leading-tight drop-shadow-2xl">
              Welcome to Leopard Cave Restaurant
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-cyan-100 font-medium drop-shadow-xl max-w-3xl mx-auto leading-relaxed">
              Enjoy delicious local and international cuisine with a breathtaking view of Attabad Lake
            </p>
          </div>
        )}

        {showContent && (
          <div className="mt-8 md:mt-12 flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-center animate-fade-in-delayed">
            <Link
              to="/menu"
              className="inline-flex items-center justify-center px-8 py-4 text-base md:text-lg font-bold text-white rounded-full bg-primary hover:bg-primary/90 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 backdrop-blur-sm"
            >
              Menu
            </Link>
            <Link
              to="/reservation"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 text-base md:text-lg font-bold text-white rounded-full bg-transparent border-2 border-white hover:bg-white/10 hover:shadow-2xl hover:scale-105 transition-all duration-300 backdrop-blur-sm"
            >
              Reserve Table
            </Link>
          </div>
        )}
      </div>

      {/* Social Media Icons - Fixed Bottom Right */}
      <div className="fixed bottom-6 right-4 sm:bottom-8 sm:right-8 z-40 flex flex-col gap-3">
        <a
          href="https://www.facebook.com/profile.php?id=61582236326778"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 bg-primary hover:bg-primary/90 text-white rounded-full shadow-xl hover:scale-110 transition-all duration-300"
          aria-label="Visit our Facebook page"
        >
          <Facebook className="h-5 w-5 sm:h-6 sm:w-6" />
        </a>
        <a
          href="https://www.instagram.com/leopard.cave.restaurant?igsh=MXZ0eWtsN3NoMW1zaQ=="
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 bg-primary hover:bg-primary/90 text-white rounded-full shadow-xl hover:scale-110 transition-all duration-300"
          aria-label="Visit our Instagram page"
        >
          <Instagram className="h-5 w-5 sm:h-6 sm:w-6" />
        </a>
        <a
          href="https://www.tiktok.com/@leopard.cave.restaurant?_r=1&_t=ZS-954evnj7xI8"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 bg-primary hover:bg-primary/90 text-white rounded-full shadow-xl hover:scale-110 transition-all duration-300"
          aria-label="Visit our TikTok page"
        >
          <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
          </svg>
        </a>
      </div>
    </section>
  );
}
