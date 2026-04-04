import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { X, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function PromotionalPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Only show popup on home page
    if (location.pathname !== '/') {
      setIsVisible(false);
      return;
    }

    // Show popup after 10 seconds
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 10000);

    return () => clearTimeout(showTimer);
  }, [location.pathname]);

  useEffect(() => {
    if (isVisible) {
      // Auto-hide popup after 15-20 seconds (using 17 seconds as middle value)
      const hideTimer = setTimeout(() => {
        setIsVisible(false);
      }, 17000);

      return () => clearTimeout(hideTimer);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300 p-4">
      <Card className="relative max-w-md w-full border-none shadow-2xl rounded-3xl overflow-hidden animate-in zoom-in-95 duration-300">
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/80 hover:bg-background transition-colors"
          aria-label="Close popup"
        >
          <X className="h-5 w-5 text-foreground" />
        </button>
        
        <CardContent className="p-8 md:p-12 text-center space-y-6">
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="p-4 bg-primary/10 rounded-full">
                <svg className="h-12 w-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            
            <h3 className="text-2xl md:text-3xl font-bold text-primary">
              Digital Services
            </h3>
            
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              For <span className="font-bold text-foreground">Digital Marketing Services</span> & <span className="font-bold text-foreground">Website Development</span>, contact us
            </p>
          </div>

          <Button 
            asChild 
            size="lg" 
            className="w-full h-14 text-lg font-bold rounded-2xl"
          >
            <a 
              href="https://futurenaire.netlify.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2"
            >
              Visit Futurenaire
              <ExternalLink className="h-5 w-5" />
            </a>
          </Button>

          <p className="text-xs text-muted-foreground">
            This popup will close automatically in a few seconds
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
