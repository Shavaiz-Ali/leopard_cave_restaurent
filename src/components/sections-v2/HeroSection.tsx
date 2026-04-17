import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, ArrowRight } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

interface HeroSectionProps {
  heroImages: string[];
}

export default function HeroSection({ heroImages }: HeroSectionProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <section className="relative h-[85vh] md:h-screen w-full overflow-hidden">
      {/* Background Slideshow */}
      {heroImages.map((image, index) => (
        <div
          key={index}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000 ease-in-out",
            index === currentImageIndex ? "opacity-100" : "opacity-0"
          )}
        >
          <img
            src={image}
            alt={`Restaurant view ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 z-10" />

      {/* Content Container - Centered */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-semibold text-white leading-tight mb-4 tracking-tight">
              Welcome to Leopard Cave Restaurant
            </h1>
            <p className="text-sm md:text-base text-white/80 mb-8 max-w-xl mx-auto leading-relaxed">
              Enjoy delicious local and international cuisine with a breathtaking view of Attabad Lake
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/menu"
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all duration-300"
              >
                View Menu
              </Link>
              <Link
                to="/reservation"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg border border-white/30 text-white text-sm font-medium hover:bg-white/10 transition-all duration-300"
              >
                Reserve Table
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Social Links - Theme colors */}
      <div className="fixed bottom-6 right-4 md:bottom-8 md:right-8 z-30 flex flex-col gap-3">
        <a
          href="https://www.facebook.com/profile.php?id=61582236326778"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3.5 bg-primary hover:bg-primary/90 rounded-full transition-all duration-300 text-primary-foreground shadow-lg"
          aria-label="Facebook"
        >
          <Facebook className="h-5 w-5" />
        </a>
        <a
          href="https://www.instagram.com/leopard.cave.restaurant?igsh=MXZ0eWtsN3NoMW1zaQ=="
          target="_blank"
          rel="noopener noreferrer"
          className="p-3.5 bg-primary hover:bg-primary/90 rounded-full transition-all duration-300 text-primary-foreground shadow-lg"
          aria-label="Instagram"
        >
          <Instagram className="h-5 w-5" />
        </a>
      </div>
    </section>
  );
}
