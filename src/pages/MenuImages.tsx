import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Utensils } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
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
  const [selectedImage, setSelectedImage] = useState<MenuImage | null>(null);

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
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
            <div className="mb-6">
              <BackButton />
            </div>
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
                <Utensils className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-primary mb-3">
                Our Menu
              </h1>
              <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
                Explore our delicious menu featuring authentic local dishes and international cuisine
              </p>
            </div>
          </div>
        </section>

        {/* Menu Images Grid */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="aspect-[4/5] rounded-xl bg-muted animate-pulse" />
                ))}
              </div>
            ) : menuImages.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground border border-border rounded-xl">
                Our new menu pages are being updated. Please check back later.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {menuImages.map((menu) => (
                  <div
                    key={menu.id}
                    className="group relative aspect-[4/5] rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-all duration-300"
                    onClick={() => setSelectedImage(menu)}
                  >
                    <img
                      src={menu.url}
                      alt={menu.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                    <div className="relative h-full flex flex-col justify-end p-5 md:p-6">
                      <h3 className="text-lg md:text-xl font-medium text-white mb-2">{menu.title}</h3>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Image Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent className="sm:max-w-4xl p-0 overflow-hidden">
          <DialogTitle className="sr-only">
            {selectedImage?.title || 'Menu Item'}
          </DialogTitle>
          {selectedImage && (
            <div>
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="w-full h-auto max-h-[80vh] object-contain"
              />
              <div className="p-6">
                <h3 className="text-lg font-medium">{selectedImage.title}</h3>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
