import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Reservation', path: '/reservation' },
  { name: 'Location', path: '/location' },
  { name: 'About Us', path: '/about' },
  { name: 'Blogs', path: '/blogs' },
  { name: 'Resort', path: '/leopard-cave-resort' },
];

const navItemsBeforeMenu = [
  { name: 'Home', path: '/' },
  { name: 'Gallery', path: '/gallery' },
];

const navItemsAfterMenu = [
  { name: 'Reservation', path: '/reservation' },
  { name: 'Location', path: '/location' },
  { name: 'About Us', path: '/about' },
  { name: 'Blogs', path: '/blogs' },
  { name: 'Resort', path: '/leopard-cave-resort' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isMenuActive = location.pathname === '/menu' || location.pathname === '/menu-cards' || location.pathname === '/menu-images';

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/20 bg-black/50 backdrop-blur-lg supports-[backdrop-filter]:bg-black/50">
      <div className="container flex h-20 items-center justify-between px-4 md:px-6 max-w-7xl mx-auto">
        <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity flex-shrink-0">
          <img 
            src="https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260403/file-aozbm8hrcgzk.jpeg" 
            alt="Leopard Cave Logo" 
            className="h-11 w-11 object-cover rounded-full border-2 border-white shadow-lg"
          />
          <span className="text-sm md:text-base font-bold tracking-tight text-white leading-none drop-shadow-lg whitespace-nowrap">
            Leopard Cave Restaurant
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex gap-3 xl:gap-4 items-center">
          {navItemsBeforeMenu.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "text-xs xl:text-sm font-semibold transition-all duration-300 hover:text-primary hover:scale-105 drop-shadow-md px-2 xl:px-3 py-2 rounded-md whitespace-nowrap",
                location.pathname === item.path 
                  ? "text-primary bg-white/20 backdrop-blur-sm border-b-2 border-primary" 
                  : "text-white/90 hover:bg-white/10"
              )}
            >
              {item.name}
            </Link>
          ))}
          
          {/* Menu Link - No Dropdown */}
          <Link
            to="/menu"
            className={cn(
              "text-xs xl:text-sm font-semibold transition-all duration-300 hover:text-primary hover:scale-105 drop-shadow-md px-2 xl:px-3 py-2 rounded-md whitespace-nowrap",
              isMenuActive
                ? "text-primary bg-white/20 backdrop-blur-sm border-b-2 border-primary" 
                : "text-white/90 hover:bg-white/10"
            )}
          >
            Menu
          </Link>

          {navItemsAfterMenu.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "text-xs xl:text-sm font-semibold transition-all duration-300 hover:text-primary hover:scale-105 drop-shadow-md px-2 xl:px-3 py-2 rounded-md whitespace-nowrap",
                location.pathname === item.path 
                  ? "text-primary bg-white/20 backdrop-blur-sm border-b-2 border-primary" 
                  : "text-white/90 hover:bg-white/10"
              )}
            >
              {item.name}
            </Link>
          ))}

          <Button asChild size="sm" className="ml-2 xl:ml-4 rounded-full font-bold shadow-lg hover:scale-105 hover:bg-white hover:text-primary hover:shadow-white/50 transition-all duration-300 bg-primary text-primary-foreground whitespace-nowrap text-xs xl:text-sm px-4 xl:px-6">
            <Link to="/reservation" target="_blank" rel="noopener noreferrer">Book Now</Link>
          </Button>
        </div>

        {/* Mobile Nav */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon" className="hover:bg-white/20">
              <Menu className="h-6 w-6 text-white" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <div className="flex flex-col gap-4 mt-8">
              {navItemsBeforeMenu.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-lg font-semibold transition-colors hover:text-primary px-4 py-2 rounded-md",
                    location.pathname === item.path ? "bg-primary/10 text-primary" : "text-muted-foreground"
                  )}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Menu Link - No Dropdown */}
              <Link
                to="/menu"
                onClick={() => setIsOpen(false)}
                className={cn(
                  "text-lg font-semibold transition-colors hover:text-primary px-4 py-2 rounded-md",
                  isMenuActive ? "bg-primary/10 text-primary" : "text-muted-foreground"
                )}
              >
                Menu
              </Link>

              {navItemsAfterMenu.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-lg font-semibold transition-colors hover:text-primary px-4 py-2 rounded-md",
                    location.pathname === item.path ? "bg-primary/10 text-primary" : "text-muted-foreground"
                  )}
                >
                  {item.name}
                </Link>
              ))}

              <Button asChild size="lg" className="mt-4 rounded-full font-bold hover:scale-105 hover:bg-secondary hover:shadow-primary/50 transition-all duration-300" onClick={() => setIsOpen(false)}>
                <Link to="/reservation" target="_blank" rel="noopener noreferrer">Book Now</Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="w-full border-t bg-muted/30 py-12">
      <div className="container px-4 md:px-8 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        <div>
          <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
            <img 
              src="https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260403/file-aozbm8hrcgzk.jpeg" 
              alt="Leopard Cave Logo" 
              className="h-10 w-10 object-cover rounded-full border-2 border-primary shadow-lg"
            />
            <span className="text-xl font-bold text-primary uppercase">Leopard Cave Restaurant</span>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs mx-auto md:mx-0">
            A unique dining experience with breathtaking panoramic views of the stunning Attabad Lake.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4 text-foreground">Contact Us</h3>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li>Above Attabad Lake, Gojal, Hunza</li>
            <li>Gilgit-Baltistan, Pakistan</li>
            <li>Email: Leopardcaverestaurantofficial@gmail.com</li>
            <li>Phone: +92 316 0605535</li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4 text-foreground">Follow Us</h3>
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            {/* Social Media Icons */}
            <div className="flex gap-4 justify-center md:justify-start">
              <a 
                href="https://wa.me/923160605535" 
                target="_blank" 
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-green-600 hover:bg-green-700 flex items-center justify-center text-white transition-all hover:scale-110 shadow-md"
                aria-label="WhatsApp"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </a>
              <a 
                href="https://www.facebook.com/profile.php?id=61582236326778" 
                target="_blank" 
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center text-white transition-all hover:scale-110 shadow-md"
                aria-label="Facebook"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a 
                href="https://www.instagram.com/leopard.cave.restaurant?igsh=MXZ0eWtsN3NoMW1zaQ==" 
                target="_blank" 
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-600 via-pink-600 to-orange-600 hover:opacity-90 flex items-center justify-center text-white transition-all hover:scale-110 shadow-md"
                aria-label="Instagram"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                </svg>
              </a>
              <a 
                href="https://www.tiktok.com/@leopard.cave.restaurant?_r=1&_t=ZS-954evnj7xI8" 
                target="_blank" 
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-black hover:bg-gray-800 flex items-center justify-center text-white transition-all hover:scale-110 shadow-md"
                aria-label="TikTok"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              </a>
            </div>
            
            {/* Promotional Section - Right Side */}
            <div className="flex flex-col items-center md:items-start md:pl-6 md:border-l md:border-border">
              <p className="text-xs text-muted-foreground mb-2 text-center md:text-left">
                For Digital Marketing Services
              </p>
              <a 
                href="https://futurenaire.netlify.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
              >
                Visit Futurenaire
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
          
          {/* Opening Hours Below */}
          <div className="text-sm text-muted-foreground space-y-1 mt-6">
            <p className="font-semibold">Opening Hours</p>
            <p>Monday - Sunday</p>
            <p>8:00 AM - 12:00 Midnight</p>
          </div>
        </div>
      </div>
      <div className="container mt-12 pt-8 border-t px-4 md:px-8 max-w-7xl mx-auto text-center">
        <p className="text-xs text-muted-foreground">© 2026 Leopard Cave Restaurant. All rights reserved.</p>
      </div>
    </footer>
  );
}
