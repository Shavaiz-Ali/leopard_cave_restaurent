import { MapPin } from 'lucide-react';

export default function LocationSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 md:space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary">
            Visit Us Today
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            We are located at the heart of the Hunza valley, offering the best views of Attabad Lake.
            Come and experience nature like never before.
          </p>
        </div>

        <div className="w-full rounded-2xl overflow-hidden shadow-xl border-4 border-primary/10">
          <iframe
            width="100%"
            height="350"
            className="md:h-[450px] w-full"
            frameBorder="0"
            style={{ border: 0 }}
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed/v1/place?key=AIzaSyB_LJOYJL-84SMuxNB7LtRGhxEQLjswvy0&language=en&region=cn&q=Leopard+Cave+Restaurant+Attabad+Lake+Hunza"
            allowFullScreen
            title="Leopard Cave Restaurant Location - Above Attabad Lake, Hunza"
          />
        </div>

        <div className="flex flex-col items-center gap-6 md:gap-8">
          <div className="text-center space-y-3">
            <h3 className="text-xl md:text-2xl font-bold text-primary">
              Leopard Cave Restaurant
            </h3>
            <p className="text-muted-foreground font-semibold text-base md:text-lg">
              Karakoram Highway, Above Attabad Lake
            </p>
            <p className="text-muted-foreground text-sm md:text-base">
              Gojal Valley, Hunza, Gilgit-Baltistan, Pakistan
            </p>
            <p className="text-muted-foreground font-semibold mt-4 text-sm md:text-base">
              📞 Phone: +92 316 0605535
            </p>
            <p className="text-muted-foreground text-sm md:text-base">
              📧 Email: Leopardcaverestaurantofficial@gmail.com
            </p>
            <p className="text-muted-foreground text-xs md:text-sm mt-2">
              Open Daily: 8:00 AM - 12:00 Midnight
            </p>
          </div>
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=Leopard+Cave+Restaurant+Attabad+Lake+Hunza"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary font-bold text-lg hover:text-secondary transition-colors duration-300"
          >
            <MapPin className="h-5 w-5" />
            Get Directions
          </a>
        </div>
      </div>
    </section>
  );
}
