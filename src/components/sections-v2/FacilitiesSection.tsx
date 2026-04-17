interface Facility {
  icon: React.ReactNode;
  title: string;
  description: string;
  featured?: boolean;
  backgroundImage?: string;
}

interface FacilitiesSectionProps {
  facilities: Facility[];
}

export default function FacilitiesSection({ facilities }: FacilitiesSectionProps) {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-2">Our Facilities</h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            Experience amenities designed for your comfort and convenience
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {facilities.map((facility, index) => (
            <div
              key={index}
              className={`group rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 ${
                facility.featured ? 'ring-1 ring-primary/30' : 'bg-card'
              }`}
            >
              {facility.backgroundImage ? (
                <div className="relative h-48 md:h-56">
                  <img
                    src={facility.backgroundImage}
                    alt={facility.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="relative h-full flex flex-col justify-end p-4 md:p-5">
                    <div className="mb-2">{facility.icon}</div>
                    <h3 className="text-base md:text-lg font-medium text-white mb-1">{facility.title}</h3>
                    <p className="text-white/80 text-xs md:text-sm leading-relaxed">{facility.description}</p>
                  </div>
                </div>
              ) : (
                <div className="p-5 md:p-6 flex flex-col items-start h-full">
                  <div className="mb-3 text-primary">{facility.icon}</div>
                  <h3 className="text-base font-medium text-foreground mb-2">{facility.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">{facility.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
