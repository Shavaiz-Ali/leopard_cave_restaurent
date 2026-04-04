import BackButton from "@/components/common/BackButton";
import SEO from "@/components/common/SEO";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tent, Building2, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function LeopardCaveResort() {
  return (
    <div className="flex flex-col w-full min-h-screen py-16 bg-background">
      <div className="container px-4 md:px-8 max-w-7xl mx-auto space-y-16 mt-8">
        <BackButton />
        <div className="text-center space-y-4 pt-8">
          <h1 className="text-4xl md:text-7xl font-extrabold text-primary tracking-tight uppercase">Resort</h1>
          <p className="text-lg md:text-2xl text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed">
            Experience nature, adventure, and comfort at Leopard Cave
          </p>
        </div>

        {/* Campaigns Section */}
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="p-4 bg-primary/10 rounded-full">
                <Tent className="h-12 w-12 text-primary" />
              </div>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-primary">Camping Adventures</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Book your camping experience at Leopard Cave and enjoy the natural beauty of Hunza Valley under the stars
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="border-none shadow-2xl bg-card overflow-hidden rounded-3xl">
              <div className="relative h-64 overflow-hidden">
                <img
                  src="https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260330/file-alt7c1sucni8.jpeg"
                  alt="Camping at Leopard Cave"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader className="p-6">
                <CardTitle className="text-2xl font-bold text-primary">Camping Packages</CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6 space-y-4">
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">✓</span>
                    <span>Premium camping tents with comfortable bedding</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">✓</span>
                    <span>Bonfire and BBQ facilities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">✓</span>
                    <span>Guided hiking tours to Baskochi Meadows</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">✓</span>
                    <span>Stunning views of Attabad Lake</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">✓</span>
                    <span>Restaurant dining access</span>
                  </li>
                </ul>
                <Button asChild className="w-full rounded-full font-bold text-lg py-6">
                  <Link to="/campaign-reservation">
                    <Calendar className="h-5 w-5 mr-2" />
                    Book Camping Now
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-none shadow-2xl bg-card overflow-hidden rounded-3xl">
              <div className="relative h-64 overflow-hidden">
                <img
                  src="https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260330/file-alrz5b3t9ce8.png"
                  alt="Nature Experience"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader className="p-6">
                <CardTitle className="text-2xl font-bold text-primary">What to Expect</CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6 space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Our camping site is located in a pristine natural setting with direct access to the Baskochi Track. Experience the tranquility of nature, enjoy stargazing, and wake up to breathtaking mountain views.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Perfect for families, groups, and adventure enthusiasts looking for an authentic outdoor experience in Hunza Valley.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Resort Section - Coming Soon */}
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="p-4 bg-muted rounded-full">
                <Building2 className="h-12 w-12 text-muted-foreground" />
              </div>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-muted-foreground">Leopard Cave Resort</h2>
            <div className="inline-block px-6 py-3 bg-amber-500/20 rounded-full">
              <span className="text-xl font-bold text-amber-600">Coming Soon</span>
            </div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We are planning to build a premium resort facility at Leopard Cave. Construction has not started yet, but stay tuned for updates!
            </p>
          </div>

          <Card className="border-none shadow-2xl bg-muted/30 overflow-hidden rounded-3xl max-w-4xl mx-auto">
            <CardContent className="p-8 md:p-12 text-center space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold text-primary">Future Plans</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                The Leopard Cave Resort will offer luxury accommodation with modern amenities while maintaining harmony with the natural environment. The resort will feature comfortable rooms, spa facilities, and exclusive dining experiences with panoramic views of Attabad Lake.
              </p>
              <p className="text-muted-foreground">
                Follow us on social media to stay updated on the resort development progress and be the first to know when bookings open!
              </p>
              <Button asChild variant="outline" className="rounded-full font-bold">
                <Link to="/social-media">Follow Our Social Media</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
