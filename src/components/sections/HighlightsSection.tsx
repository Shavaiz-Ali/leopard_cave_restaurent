interface Highlight {
  icon: React.ReactNode;
  title: string;
  description: string;
  backgroundImage: string;
}

interface HighlightsSectionProps {
  highlights: Highlight[];
}

export default function HighlightsSection({ highlights }: HighlightsSectionProps) {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 md:mb-16 text-primary">
          Experience Highlights
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {highlights.map((highlight, index) => (
            <div
              key={index}
              className="rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden group"
            >
              {highlight.backgroundImage ? (
                <div className="relative h-72 md:h-80">
                  <img
                    src={highlight.backgroundImage}
                    alt={highlight.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />
                  <div className="relative h-full flex flex-col items-center justify-end p-5 md:p-6 text-center space-y-2 md:space-y-3">
                    <div className="p-2 md:p-3 bg-white/20 backdrop-blur-sm rounded-full">
                      {highlight.icon}
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-white drop-shadow-lg">
                      {highlight.title}
                    </h3>
                    <p className="text-white/95 drop-shadow-md text-xs md:text-sm leading-relaxed">
                      {highlight.description}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center p-6 md:p-8 text-center space-y-3 md:space-y-4 bg-card h-72 md:h-80 justify-center">
                  <div className="p-3 md:p-4 bg-primary/10 rounded-2xl">
                    {highlight.icon}
                  </div>
                  <h3 className="text-lg md:text-xl font-bold">{highlight.title}</h3>
                  <p className="text-muted-foreground text-sm md:text-base">{highlight.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
