import { Link } from 'react-router-dom';

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
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary">
            Discover Our Menu
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Savor authentic local dishes and international cuisine, prepared with the finest ingredients
          </p>
        </div>

        {dbMenuImages.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {dbMenuImages.slice(0, 3).map((menu) => (
              <div
                key={menu.id}
                className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={menu.url}
                    alt={menu.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 bg-muted"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <h3 className="text-white text-xl font-bold">{menu.title}</h3>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-muted-foreground border-2 border-dashed rounded-2xl">
            Menu is currently being updated.
          </div>
        )}

        <div className="text-center mt-12 md:mt-16">
          <Link
            to="/menu-images"
            className="inline-flex items-center justify-center px-8 md:px-10 py-4 md:py-6 text-lg md:text-xl font-bold text-white rounded-full bg-primary hover:bg-secondary shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            View Full Menu
          </Link>
        </div>
      </div>
    </section>
  );
}
