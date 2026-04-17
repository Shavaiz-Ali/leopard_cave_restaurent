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
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-2">Experience Highlights</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {highlights.map((highlight, index) => (
            <div
              key={index}
              className="group relative aspect-[4/5] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
            >
              <img
                src={highlight.backgroundImage}
                alt={highlight.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="relative h-full flex flex-col justify-end p-5 md:p-6">
                <div className="mb-3">{highlight.icon}</div>
                <h3 className="text-lg md:text-xl font-medium text-white mb-2">{highlight.title}</h3>
                <p className="text-white/85 text-sm leading-relaxed">{highlight.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
