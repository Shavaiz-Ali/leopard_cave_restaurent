import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function LocationSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-2">Visit Us</h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            We are located at the heart of the Hunza valley
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div className="rounded-xl overflow-hidden shadow-sm border border-border">
            <iframe
              width="100%"
              height="350"
              className="w-full h-80 md:h-96"
              frameBorder="0"
              style={{ border: 0 }}
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed/v1/place?key=AIzaSyB_LJOYJL-84SMuxNB7LtRGhxEQLjswvy0&language=en&region=cn&q=Leopard+Cave+Restaurant+Attabad+Lake+Hunza"
              allowFullScreen
              title="Leopard Cave Restaurant Location"
            />
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-foreground mb-1">Address</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Karakoram Highway, Above Attabad Lake<br />
                    Gojal Valley, Hunza, Gilgit-Baltistan, Pakistan
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-foreground mb-1">Phone</h3>
                  <p className="text-sm text-muted-foreground">+92 316 0605535</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-foreground mb-1">Email</h3>
                  <p className="text-sm text-muted-foreground">Leopardcaverestaurantofficial@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-foreground mb-1">Hours</h3>
                  <p className="text-sm text-muted-foreground">Open Daily: 8:00 AM - 12:00 Midnight</p>
                </div>
              </div>
            </div>

            <a
              href="https://www.google.com/maps/dir/?api=1&destination=Leopard+Cave+Restaurant+Attabad+Lake+Hunza"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full md:w-auto px-6 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all duration-300"
            >
              Get Directions
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
