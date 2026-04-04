import BackButton from "@/components/common/BackButton";
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';

export default function AttabadLakeHistory() {
  return (
    <div className="flex flex-col w-full min-h-screen py-16 bg-background">
      <div className="container px-4 md:px-8 max-w-5xl mx-auto space-y-12 mt-8">
        <BackButton />
        <div className="pt-8">
          <Button variant="outline" asChild className="mb-6 rounded-full">
            <Link to="/blogs" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Blogs
            </Link>
          </Button>

          <Card className="border-none shadow-2xl bg-card rounded-3xl overflow-hidden">
            <div className="relative">
              <AspectRatio ratio={16/9}>
                <img
                  src="https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260403/file-apmrpvdkxr7k.jpg"
                  alt="Attabad Lake with boat and turquoise water"
                  className="w-full h-full object-cover"
                />
              </AspectRatio>
            </div>

            <CardContent className="p-8 md:p-12 space-y-8">
              <div className="space-y-4">
                <h1 className="text-3xl md:text-5xl font-extrabold text-primary tracking-tight">
                  About the History of Attabad Lake
                </h1>
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>March 2026</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>Leopard Cave Team</span>
                  </div>
                </div>
              </div>

              <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground leading-relaxed">
                <h2 className="text-2xl md:text-3xl font-bold text-primary mt-8">The Formation of Attabad Lake</h2>
                <p>
                  On January 4, 2010, a massive landslide occurred in the Attabad village of Gojal Valley in Hunza, Gilgit-Baltistan, Pakistan. This catastrophic event blocked the flow of the Hunza River, creating what is now known as Attabad Lake. The landslide buried the village of Attabad and claimed 20 lives, while also displacing thousands of people from the surrounding areas.
                </p>

                <p>
                  The blockage of the Hunza River resulted in the formation of a massive lake that stretched over 21 kilometers in length. The rising water submerged several villages, including Ayeenabad, and destroyed approximately 12 kilometers of the Karakoram Highway, which is the main artery connecting Pakistan with China.
                </p>

                <h2 className="text-2xl md:text-3xl font-bold text-primary mt-8">Impact on Local Communities</h2>
                <p>
                  The disaster had a profound impact on the local communities. More than 6,000 people were displaced, and many lost their homes, agricultural lands, and livelihoods. The submersion of the Karakoram Highway cut off the upper Hunza region from the rest of Pakistan, creating severe economic and social challenges for the residents.
                </p>

                <p>
                  However, the resilient people of Hunza adapted to these challenges. The government and local authorities worked together to construct tunnels through the mountains to restore connectivity. Today, the Karakoram Highway passes through these tunnels, allowing travelers to continue their journey through this spectacular region.
                </p>

                <h2 className="text-2xl md:text-3xl font-bold text-primary mt-8">Transformation into a Tourist Destination</h2>
                <p>
                  While the formation of Attabad Lake was a tragedy, it has transformed into one of the most stunning tourist attractions in Pakistan. The lake's brilliant turquoise-blue color, created by the fine rock particles suspended in the water, attracts thousands of visitors each year. The dramatic landscape, with towering mountains surrounding the pristine waters, offers breathtaking views and photo opportunities.
                </p>

                <p>
                  Local communities have embraced tourism as a new source of livelihood. Boat services operate on the lake, allowing visitors to experience its beauty up close. Restaurants, hotels, and guesthouses have been established along the lake's shores, providing employment opportunities and economic growth for the region.
                </p>

                <h2 className="text-2xl md:text-3xl font-bold text-primary mt-8">Leopard Cave Restaurant and Attabad Lake</h2>
                <p>
                  Leopard Cave Restaurant is one such initiative born from the community's determination to rebuild and thrive. Located right above Attabad Lake, our restaurant offers visitors a unique dining experience with panoramic views of the lake and surrounding mountains. We are proud to be part of the region's recovery and growth, serving delicious local and international cuisine while showcasing the natural beauty of Hunza.
                </p>

                <p>
                  Our restaurant is built with a cave-inspired design using natural materials, reflecting the rugged beauty of the landscape. We aim to provide not just a meal, but an unforgettable experience that connects visitors with the history, culture, and natural splendor of this remarkable place.
                </p>

                <h2 className="text-2xl md:text-3xl font-bold text-primary mt-8">Visiting Attabad Lake Today</h2>
                <p>
                  Today, Attabad Lake stands as a symbol of resilience and natural beauty. Visitors can enjoy boat rides on the lake, explore the surrounding areas, and learn about the region's history. The lake is accessible year-round, though the best time to visit is from April to October when the weather is pleasant and the views are at their most spectacular.
                </p>

                <p>
                  Whether you're a nature lover, adventure seeker, or simply looking for a peaceful retreat, Attabad Lake and the surrounding Hunza Valley offer an experience like no other. We invite you to visit Leopard Cave Restaurant and witness the beauty of Attabad Lake while enjoying our warm hospitality and delicious food.
                </p>
              </div>

              <div className="pt-8 border-t">
                <Button size="lg" asChild className="rounded-full font-bold">
                  <Link to="/reservation">Reserve Your Table</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
