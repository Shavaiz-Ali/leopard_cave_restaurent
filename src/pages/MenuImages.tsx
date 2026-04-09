import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import SEO from '@/components/common/SEO';
import BackButton from '@/components/common/BackButton';
import { supabase } from '@/utils/supabase';

interface MenuImage {
  id: string;
  title: string;
  url: string;
  sort_order: number;
}

export default function MenuImages() {
  const [menuImages, setMenuImages] = useState<MenuImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenuImages = async () => {
      try {
        const { data, error } = await supabase
          .from('menu_images')
          .select('id, title, url, sort_order')
          .order('sort_order', { ascending: true })
          .order('created_at', { ascending: false });

        if (error) throw error;
        setMenuImages(data || []);
      } catch (error) {
        console.error('Error fetching menu images:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuImages();
  }, []);

  return (
    <>
      <SEO 
        title="Menu - Local Hunza Food & International Cuisine"
        description="Explore our menu featuring authentic local dishes of Hunza, traditional Pakistani cuisine, and international favorites. Best restaurant menu in Hunza Valley with fresh ingredients and local specialties."
        keywords="Hunza local food, local dishes of Hunza, Hunza food menu, best restaurants in Hunza menu, traditional Hunza cuisine, Pakistani food Hunza, restaurant menu Gilgit Baltistan"
      />
      <div className="flex flex-col w-full min-h-screen py-16 bg-background">
        <div className="container px-4 md:px-8 max-w-7xl mx-auto space-y-12">
          <BackButton />
          {/* Title Only */}
          <div className="text-center">
            <h1 className="text-4xl md:text-7xl font-extrabold text-primary tracking-tight uppercase">
              Our Menu
            </h1>
          </div>

          {/* Menu Images Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-20 text-muted-foreground">
              Loading menu...
            </div>
          ) : menuImages.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground border-2 border-dashed rounded-3xl">
              Our new menu pages are being updated. Please check back later or view our menu cards.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8">
              {menuImages.map((menu) => (
                <Card key={menu.id} className="overflow-hidden border-none shadow-2xl hover:shadow-primary/20 transition-all duration-300 bg-card">
                  <CardContent className="p-0">
                    <div className="relative">
                      <img
                        src={menu.url}
                        alt={menu.title}
                        className="w-full h-auto object-contain bg-muted"
                      />
                    </div>
                    <div className="p-6 flex justify-center">
                      <Button size="lg" asChild className="rounded-full text-lg px-10 py-6 font-bold shadow-xl hover:scale-105 hover:bg-secondary hover:shadow-primary/50 transition-all duration-300">
                        <Link to="/reservation" target="_blank" rel="noopener noreferrer">Reserve Now</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Call to Action */}
          <div className="text-center mt-20 p-12 bg-muted/50 rounded-3xl space-y-6 border border-primary/10">
            <h3 className="text-2xl md:text-3xl font-bold text-primary">Ready to Dine with Us?</h3>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">
              Reserve your table now and experience the unique flavors and breathtaking views at Leopard Cave Restaurant
            </p>
            <Button size="lg" asChild className="rounded-full text-lg px-12 py-7 font-bold shadow-xl hover:scale-105 hover:bg-secondary hover:shadow-primary/50 transition-all duration-300">
              <Link to="/reservation" target="_blank" rel="noopener noreferrer">Book Your Table</Link>
            </Button>
          </div>

          <div className="text-center p-12 bg-muted/50 rounded-3xl space-y-4 border border-primary/10">
            <h3 className="text-2xl font-bold">Special Dietary Requirements?</h3>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Please inform our staff about any allergies or dietary restrictions. We are happy to customize our dishes for you.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
