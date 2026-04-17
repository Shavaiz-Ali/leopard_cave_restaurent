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
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary">
            Our Premium Facilities
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Experience world-class amenities designed for your comfort and convenience
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {facilities.map((facility, index) => (
            <div
              key={index}
              className={`rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden ${
                facility.featured ? 'ring-2 ring-primary' : 'bg-card'
              }`}
            >
              {facility.backgroundImage ? (
                <div className="relative h-60 md:h-64">
                  <img
                    src={facility.backgroundImage}
                    alt={facility.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40" />
                  <div className="relative h-full flex flex-col items-center justify-center p-6 md:p-8 text-center space-y-3 md:space-y-4">
                    <div className="p-3 md:p-4 rounded-2xl bg-white/20 backdrop-blur-sm">
                      {facility.icon}
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-white drop-shadow-lg">
                      {facility.title}
                    </h3>
                    <p className="text-white/95 drop-shadow-md text-sm md:text-base">
                      {facility.description}
                    </p>
                    {facility.featured && (
                      <span className="inline-block px-3 md:px-4 py-1 bg-primary text-primary-foreground text-xs md:text-sm font-bold rounded-full uppercase">
                        Featured
                      </span>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center p-6 md:p-8 text-center space-y-3 md:space-y-4 h-60 md:h-64 justify-center">
                  <div className="p-3 md:p-4 rounded-2xl bg-primary/10">
                    {facility.icon}
                  </div>
                  <h3 className="text-lg md:text-xl font-bold">{facility.title}</h3>
                  <p className="text-muted-foreground text-sm md:text-base">{facility.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
