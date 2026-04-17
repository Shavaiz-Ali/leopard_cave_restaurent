import BackButton from "@/components/common/BackButton";
import SEO from "@/components/common/SEO";
import { Tent, Building2, Calendar, Users, DollarSign, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { toast } from 'sonner';

export default function LeopardCaveResort() {
  const handleCampingBooking = () => {
    toast.info('Camping Services Temporarily Unavailable', {
      description: 'Currently, camping services are not available due to maintenance. Please contact us on WhatsApp for more information.',
      duration: 6000,
      action: {
        label: 'Contact on WhatsApp',
        onClick: () => window.open('https://wa.me/923160605535', '_blank')
      },
    });
  };

  return (
    <>
      <SEO 
        title="Resort - Camping & Luxury Stay | Leopard Cave Restaurant"
        description="Experience camping and upcoming resort facilities at Leopard Cave. Enjoy nature, adventure, and stunning views of Attabad Lake in Hunza Valley."
        keywords="camping Hunza, resort Hunza, Attabad Lake camping, luxury stay Hunza, Leopard Cave resort"
      />
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
            <div className="mb-6">
              <BackButton />
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
                <Tent className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-primary mb-3">
                Resort & Camping
              </h1>
              <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
                Experience nature, adventure, and comfort at Leopard Cave
              </p>
            </div>
          </div>
        </section>

        {/* Camping Section */}
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
            <div className="text-center mb-8">
              <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-2">Camping Adventures</h2>
              <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                Book your camping experience at Leopard Cave and enjoy the natural beauty of Hunza Valley under the stars
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 max-w-5xl mx-auto">
              {/* Camping Package */}
              <div className="rounded-xl overflow-hidden border border-border shadow-sm bg-card">
                <div className="relative aspect-video">
                  <img
                    src="https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260330/file-alt7c1sucni8.jpeg"
                    alt="Camping at Leopard Cave"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="p-5 space-y-4">
                  <h3 className="text-lg font-medium text-foreground">Camping Package</h3>
                  
                  <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium text-foreground">Price per Tent:</span>
                      </div>
                      <span className="text-lg font-semibold text-primary">PKR 3,000</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <Users className="h-3.5 w-3.5 text-primary" />
                        <span className="text-muted-foreground">Max Capacity:</span>
                      </div>
                      <span className="font-medium text-foreground">3 People</span>
                    </div>
                    <div className="text-xs text-muted-foreground text-center pt-2 border-t border-border">
                      Per night rate
                    </div>
                  </div>

                  <ul className="space-y-1.5 text-xs text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-primary mt-0.5" />
                      <span>Premium camping tents with bedding</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-primary mt-0.5" />
                      <span>Bonfire and BBQ facilities</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-primary mt-0.5" />
                      <span>Guided hiking tours</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-primary mt-0.5" />
                      <span>Restaurant access</span>
                    </li>
                  </ul>
                  
                  <Button 
                    onClick={handleCampingBooking}
                    className="w-full px-5 py-2.5 rounded-lg text-sm font-medium"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Book Camping
                  </Button>
                </div>
              </div>

              {/* What to Expect */}
              <div className="rounded-xl overflow-hidden border border-border shadow-sm">
                <div className="relative aspect-video">
                  <img
                    src="https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260330/file-alrz5b3t9ce8.png"
                    alt="Nature Experience"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-lg font-medium text-white">What to Expect</h3>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    Our camping site is located in a pristine natural setting with direct access to the Baskochi Track.
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Experience the tranquility of nature, enjoy stargazing, and wake up to breathtaking mountain views. Perfect for families, groups, and adventure enthusiasts!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Resort Section - Coming Soon */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="max-w-4xl mx-auto px-4 md:px-8 lg:px-16">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center p-3 bg-muted/50 rounded-full mb-4">
                <Building2 className="h-6 w-6 text-muted-foreground" />
              </div>
              <h2 className="text-xl md:text-2xl font-semibold text-muted-foreground mb-3">Leopard Cave Resort</h2>
              <div className="inline-block px-4 py-1.5 bg-amber-500/10 rounded-full mb-3">
                <span className="text-xs font-medium text-amber-600">Coming Soon</span>
              </div>
              <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                We are planning to build a premium resort facility at Leopard Cave. Stay tuned for updates!
              </p>
            </div>

            <div className="bg-card rounded-xl border border-border shadow-sm p-6 text-center">
              <h3 className="text-base font-medium text-foreground mb-3">Future Plans</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                The Leopard Cave Resort will offer luxury accommodation with modern amenities while maintaining harmony with the natural environment.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Follow us on social media to stay updated on the resort development progress!
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
