import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

interface MenuImage {
  id: string;
  title: string;
  url: string;
  sort_order: number;
}

interface MenuSectionProps {
  dbMenuImages: MenuImage[];
}

export default function MenuSection({ dbMenuImages }: MenuSectionProps) {
  const [selectedImage, setSelectedImage] = useState<MenuImage | null>(null);

  return (
    <>
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-2">Discover Our Menu</h2>
            <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Savor authentic local dishes and international cuisine, prepared with the finest ingredients
            </p>
          </div>

          {dbMenuImages.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {dbMenuImages.slice(0, 6).map((menu) => (
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
              <div className="text-center mt-10 md:hidden">
                <Link
                  to="/menu"
                  className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all duration-300"
                >
                  View Full Menu
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-16 text-muted-foreground border border-border rounded-xl">
              Menu is currently being updated.
            </div>
          )}
        </div>
      </section>

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
