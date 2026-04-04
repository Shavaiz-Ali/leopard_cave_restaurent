import BackButton from "@/components/common/BackButton";
import SEO from "@/components/common/SEO";
import { MapPin, Phone, Mail, Clock, Navigation, Mountain, Camera, Compass } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Location() {
  const [activeSection, setActiveSection] = useState<'find-us' | 'nearby-places'>('find-us');
  const mapApiKey = 'AIzaSyB_LJOYJL-84SMuxNB7LtRGhxEQLjswvy0';
  const locationQuery = 'Leopard+Cave+Restaurant+Attabad+Lake+Hunza';

  const nearbyPlaces = [
    {
      id: '1',
      name: 'Attabad Lake',
      description: 'Crystal-clear turquoise lake formed in 2010, perfect for boating and photography',
      distance: '0.5 km',
      image: 'https://miaoda-site-img.s3cdn.medo.dev/images/KLing_c4b47cca-490c-48f9-a67b-ecdd736e60c5.jpg'
    },
    {
      id: '2',
      name: 'Passu Cones',
      description: 'Iconic pyramid-shaped peaks, one of the most photographed mountains in Pakistan',
      distance: '15 km',
      image: 'https://miaoda-site-img.s3cdn.medo.dev/images/KLing_8c4a3094-b7d2-48a5-b9d2-bbb7b5f81e5b.jpg'
    },
    {
      id: '3',
      name: 'Baskochi Meadows',
      description: 'Stunning alpine meadows with panoramic mountain views, accessible via hiking trail from our restaurant',
      distance: 'Starts from Restaurant',
      image: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260401/file-anzpaa9jyn0g.jpeg'
    }
  ];

  return (
    <>
      <SEO 
        title="Location - Best Restaurant in Hunza at Attabad Lake | Leopard Cave"
        description="Find Leopard Cave Restaurant at Attabad Lake, Hunza. The best restaurant in Karimabad Hunza offering local food with stunning lake views in Gilgit Baltistan."
        keywords="best restaurant in Karimabad Hunza, restaurants at Attabad Lake, Leopard Cave Restaurant location, best places in Hunza, where to eat in Hunza, Hunza restaurant location"
      />
      <div className="flex flex-col w-full min-h-screen py-16 bg-background">
        <div className="container px-4 md:px-8 max-w-7xl mx-auto space-y-12 mt-8">
          <div className="text-center space-y-4 pt-8">
        <BackButton />
            <h1 className="text-4xl md:text-7xl font-extrabold text-primary tracking-tight uppercase whitespace-nowrap">Location</h1>
            <p className="text-lg md:text-2xl text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed">
              Discover our location and explore nearby attractions
            </p>
          </div>

          {/* Section Toggle Buttons */}
          <div className="flex justify-center gap-4 flex-wrap">
            <Button
              size="lg"
              variant={activeSection === 'find-us' ? 'default' : 'outline'}
              onClick={() => setActiveSection('find-us')}
              className="rounded-full font-bold text-base px-8 py-6 whitespace-nowrap"
            >
              <MapPin className="h-5 w-5 mr-2" />
              Find Us
            </Button>
            <Button
              size="lg"
              variant={activeSection === 'nearby-places' ? 'default' : 'outline'}
              onClick={() => setActiveSection('nearby-places')}
              className="rounded-full font-bold text-base px-8 py-6 whitespace-nowrap"
            >
              <Compass className="h-5 w-5 mr-2" />
              Nearby Places
            </Button>
          </div>

          {/* Find Us Section */}
          {activeSection === 'find-us' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12 items-center animate-in fade-in duration-500">
              <Card className="border-none shadow-2xl bg-card overflow-hidden rounded-3xl h-full flex flex-col justify-center">
                <CardHeader className="p-8 pb-4">
                  <CardTitle className="text-3xl md:text-4xl font-bold text-primary mb-2 flex items-center gap-3">
                    <MapPin className="h-8 w-8" /> Contact Details
                  </CardTitle>
                  <CardDescription className="text-lg text-muted-foreground">
                    Visit us for a unique dining experience above Attabad Lake.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-muted/50 border border-primary/10">
                      <Navigation className="h-6 w-6 text-primary shrink-0" />
                      <div className="space-y-1">
                        <h3 className="text-lg font-bold">Address</h3>
                        <p className="text-muted-foreground">Baskochi Trek Ainabad Gojal Hunza Gilgit Baltistan Pakistan</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-muted/50 border border-primary/10">
                      <Phone className="h-6 w-6 text-primary shrink-0" />
                      <div className="space-y-1">
                        <h3 className="text-lg font-bold">Phone Number</h3>
                        <p className="text-muted-foreground">03160605535</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-muted/50 border border-primary/10">
                      <Mail className="h-6 w-6 text-primary shrink-0" />
                      <div className="space-y-1">
                        <h3 className="text-lg font-bold">Email</h3>
                        <p className="text-muted-foreground">leopardcaverestaurantofficial@gmail.com</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-muted/50 border border-primary/10">
                      <Clock className="h-6 w-6 text-primary shrink-0" />
                      <div className="space-y-1">
                        <h3 className="text-lg font-bold">Opening Hours</h3>
                        <p className="text-muted-foreground">Daily: 8:00 AM - 12:00 AM</p>
                      </div>
                    </div>
                  </div>
                  <Button size="lg" className="w-full h-14 text-xl font-bold rounded-2xl tracking-widest uppercase" asChild>
                    <a href={`https://www.google.com/maps/dir/?api=1&destination=${locationQuery}`} target="_blank" rel="noopener noreferrer">
                      Get Directions
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <div className="h-[500px] lg:h-full rounded-3xl overflow-hidden shadow-2xl border-8 border-white/5 bg-muted">
                <iframe
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  style={{ border: 0 }}
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps/embed/v1/place?key=${mapApiKey}&language=en&region=cn&q=${locationQuery}`}
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}

          {/* Nearby Places Section */}
          {activeSection === 'nearby-places' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="text-center space-y-4">
                <h2 className="text-3xl md:text-5xl font-bold text-primary">Explore Nearby Attractions</h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Discover the stunning natural beauty and tourist destinations near Leopard Cave Restaurant
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {nearbyPlaces.map((place) => (
                  <Card key={place.id} className="border-none shadow-2xl bg-card overflow-hidden rounded-3xl group hover:-translate-y-2 transition-all duration-300">
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={place.image}
                        alt={place.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full font-bold text-sm">
                        {place.distance}
                      </div>
                    </div>
                    <CardHeader className="p-6">
                      <CardTitle className="text-2xl font-bold text-primary flex items-center gap-2">
                        <Mountain className="h-6 w-6" />
                        {place.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-6 pb-6">
                      <p className="text-muted-foreground leading-relaxed">
                        {place.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center pt-8">
                <Button asChild size="lg" className="rounded-full font-bold text-lg px-10 py-6">
                  <Link to="/nearby">
                    <Camera className="h-5 w-5 mr-2" />
                    View Full Nearby Places Page
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
