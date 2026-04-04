import SEO from "@/components/common/SEO";
import BackButton from '@/components/common/BackButton';
import { NEARBY_ATTRACTIONS } from '@/lib/constants';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { MapPin, Wind, Mountain, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const icons = [
  <Wind key="1" className="h-10 w-10 text-primary" />,
  <Mountain key="2" className="h-10 w-10 text-primary" />,
];

export default function NearbyPlaces() {
  // Separate Baskochi Meadows from other attractions
  const baskochi = NEARBY_ATTRACTIONS.find(a => a.id === '3');
  const otherAttractions = NEARBY_ATTRACTIONS.filter(a => a.id !== '3');

  return (
    <div className="flex flex-col w-full min-h-screen py-16 bg-background">
      <div className="container px-4 md:px-8 max-w-7xl mx-auto space-y-16 mt-8">
        <BackButton />
        <div className="text-center space-y-4 pt-8">
          <h1 className="text-4xl md:text-7xl font-extrabold text-primary tracking-tight uppercase">Nearby Attractions</h1>
          <p className="text-lg md:text-2xl text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed">
            Located near the iconic Attabad Lake, our restaurant gives you easy access to one of the most beautiful tourist destinations.
            Enjoy boating, sightseeing, and nature walks before or after your dining experience.
          </p>
        </div>

        {/* Featured: Baskochi Meadows */}
        {baskochi && (
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            {/* Background Image with Overlay */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ 
                backgroundImage: `url('https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260401/file-anzpaa9jyn0g.jpeg')`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30" />
            </div>

            {/* Content */}
            <div className="relative z-10 p-8 md:p-16 min-h-[600px] flex flex-col justify-end">
              <div className="space-y-6 max-w-4xl">
                <div className="inline-block px-4 py-2 bg-primary/90 backdrop-blur rounded-full">
                  <span className="text-sm font-bold text-primary-foreground uppercase tracking-wider">Featured Destination</span>
                </div>
                
                <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
                  {baskochi.name}
                </h2>
                
                <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl">
                  {baskochi.description}
                </p>

                <div className="flex flex-wrap gap-4 pt-4">
                  <Button 
                    size="lg" 
                    className="rounded-full text-lg px-8 py-6 font-bold shadow-xl hover:scale-105 transition-all"
                    onClick={() => window.open('https://baskochi-meadows-ainabad.lovable.app/', '_blank')}
                  >
                    <ExternalLink className="h-5 w-5 mr-2" />
                    Visit Baskochi Website
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    onClick={() => {}}
                    className="rounded-full text-lg px-8 py-6 font-bold shadow-xl bg-white/10 backdrop-blur border-white/30 cursor-default"
                  >
                    <MapPin className="h-5 w-5 mr-2" />
                    Starts from Our Restaurant
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other Attractions */}
        <div className="space-y-8">
          <h2 className="text-3xl md:text-5xl font-bold text-primary text-center">More Nearby Attractions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {otherAttractions.map((attraction, index) => (
              <Card key={attraction.id} className="border-none shadow-2xl bg-card overflow-hidden group hover:-translate-y-2 transition-all duration-300 rounded-3xl">
                <div className="relative">
                  <AspectRatio ratio={16/9}>
                    <img
                      src={attraction.image}
                      alt={attraction.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </AspectRatio>
                  <div className="absolute top-6 left-6 p-4 bg-white/90 backdrop-blur rounded-2xl shadow-lg">
                    {icons[index % icons.length]}
                  </div>
                </div>
                <CardHeader className="p-8 pb-4">
                  <CardTitle className="text-2xl md:text-3xl font-bold text-primary flex items-center gap-3">
                    {attraction.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {attraction.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
