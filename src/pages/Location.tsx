import BackButton from "@/components/common/BackButton";
import SEO from "@/components/common/SEO";
import { MapPin, Phone, Mail, Clock, Compass, Mountain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';

export default function Location() {
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
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
            <div className="mb-6">
              <BackButton />
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-primary mb-3">
                Find Us
              </h1>
              <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
                Visit us for a unique dining experience above Attabad Lake
              </p>
            </div>
          </div>
        </section>

        {/* Tabs */}
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
            <Tabs defaultValue="find-us" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-muted/50 rounded-lg border border-border p-1 mb-8 h-auto">
                <TabsTrigger value="find-us" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-sm font-medium py-2 rounded-md">
                  Find Us
                </TabsTrigger>
                <TabsTrigger value="nearby-places" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-sm font-medium py-2 rounded-md">
                  Nearby Places
                </TabsTrigger>
              </TabsList>

              {/* Find Us Section */}
              <TabsContent value="find-us" className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Contact Details */}
                  <div className="space-y-4">
                    <div className="p-5 bg-card rounded-xl border border-border shadow-sm">
                      <h3 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-primary" />
                        Contact Details
                      </h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="mt-1 p-2 bg-primary/10 rounded-md">
                            <MapPin className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-foreground">Address</h4>
                            <p className="text-sm text-muted-foreground">Baskochi Trek Ainabad Gojal Hunza Gilgit Baltistan Pakistan</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <div className="mt-1 p-2 bg-primary/10 rounded-md">
                            <Phone className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-foreground">Phone</h4>
                            <p className="text-sm text-muted-foreground">0316 0605535</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <div className="mt-1 p-2 bg-primary/10 rounded-md">
                            <Mail className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-foreground">Email</h4>
                            <p className="text-sm text-muted-foreground">leopardcaverestaurantofficial@gmail.com</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <div className="mt-1 p-2 bg-primary/10 rounded-md">
                            <Clock className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-foreground">Opening Hours</h4>
                            <p className="text-sm text-muted-foreground">Daily: 8:00 AM - 12:00 AM</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Button className="w-full px-5 py-2.5 rounded-lg text-sm font-medium" asChild>
                      <a href={`https://www.google.com/maps/dir/?api=1&destination=${locationQuery}`} target="_blank" rel="noopener noreferrer">
                        Get Directions
                      </a>
                    </Button>
                  </div>
                  
                  {/* Map */}
                  <div className="h-[400px] lg:h-auto rounded-xl overflow-hidden border border-border shadow-sm">
                    <iframe
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      style={{ border: 0 }}
                      referrerPolicy="no-referrer-when-downgrade"
                      src={`https://www.google.com/maps/embed/v1/place?key=${mapApiKey}&language=en&region=cn&q=${locationQuery}`}
                      allowFullScreen
                      className="rounded-xl"
                    ></iframe>
                  </div>
                </div>
              </TabsContent>

              {/* Nearby Places Section */}
              <TabsContent value="nearby-places" className="space-y-8">
                <div className="text-center">
                  <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-2">Explore Nearby Attractions</h2>
                  <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                    Discover the stunning natural beauty and tourist destinations near Leopard Cave Restaurant
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {nearbyPlaces.map((place) => (
                    <div key={place.id} className="group relative aspect-[4/5] rounded-xl overflow-hidden shadow-sm border border-border">
                      <img
                        src={place.image}
                        alt={place.name}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                      <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1.5 rounded-full text-xs font-medium">
                        {place.distance}
                      </div>
                      <div className="relative h-full flex flex-col justify-end p-5">
                        <h3 className="text-lg font-medium text-white mb-2 flex items-center gap-2">
                          <Mountain className="h-5 w-5" />
                          {place.name}
                        </h3>
                        <p className="text-sm text-white/80 line-clamp-3">
                          {place.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </div>
    </>
  );
}
