import BackButton from "@/components/common/BackButton";
import SEO from "@/components/common/SEO";
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';

export default function MolidaBlog() {
  return (
    <>
      <SEO 
        title="Molida - A Traditional Hunza Dish | Leopard Cave Restaurant"
        description="Discover Molida, a unique traditional Hunza dish made with flour, bread, sour ingredients, and desi ghee. Learn about this authentic Hunza Valley food at Leopard Cave Restaurant."
        keywords="Molida, Hunza food, traditional Hunza dish, Hunza cuisine, Pakistani food, Gilgit Baltistan food, Leopard Cave Restaurant"
      />
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
                    src="https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260403/file-ap0prtnxzqww.jpg"
                    alt="Molida - Traditional Hunza Dish"
                    className="w-full h-full object-cover"
                  />
                </AspectRatio>
              </div>

              <CardContent className="p-8 md:p-12 space-y-8">
                <div className="space-y-4">
                  <h1 className="text-3xl md:text-5xl font-extrabold text-primary tracking-tight">
                    Molida – A Traditional Hunza Dish
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
                  <h2 className="text-2xl md:text-3xl font-bold text-primary mt-8">What is Molida?</h2>
                  <p>
                    Molida is a cherished traditional dish from the Hunza Valley, representing the rich culinary heritage of the region. This unique comfort food has been passed down through generations, embodying the simplicity and resourcefulness of Hunza's mountain communities. Made with basic ingredients that were readily available to the people of Hunza, Molida showcases how traditional cooking methods can transform simple components into a delicious and satisfying meal.
                  </p>

                  <h2 className="text-2xl md:text-3xl font-bold text-primary mt-8">The Traditional Preparation Process</h2>
                  <p>
                    The preparation of Molida is a time-honored process that requires patience and skill. Here's how this traditional dish is made:
                  </p>

                  <h3 className="text-xl md:text-2xl font-bold text-primary mt-6">Step 1: Preparing the Dough</h3>
                  <p>
                    The process begins with mixing flour and water to create a smooth, pliable dough. The flour used is typically whole wheat flour, which is locally grown in the terraced fields of Hunza Valley. The dough is kneaded thoroughly until it reaches the perfect consistency.
                  </p>

                  <h3 className="text-xl md:text-2xl font-bold text-primary mt-6">Step 2: Making the Bread (Roti)</h3>
                  <p>
                    Once the dough is ready, it is rolled out and cooked into traditional flatbread, known locally as roti or shapick. The bread is typically cooked on a hot griddle or traditional stone oven, giving it a slightly charred, rustic flavor that is characteristic of Hunza cuisine.
                  </p>

                  <h3 className="text-xl md:text-2xl font-bold text-primary mt-6">Step 3: Adding the Sour Element</h3>
                  <p>
                    What makes Molida unique is the addition of a sour ingredient. Traditionally, this could be fermented yogurt, buttermilk, or a local sour dairy product. This tangy element is mixed with the bread, creating a distinctive flavor profile that balances richness with acidity.
                  </p>

                  <h3 className="text-xl md:text-2xl font-bold text-primary mt-6">Step 4: Hand-Crushing and Mixing</h3>
                  <p>
                    The bread is then crushed and mixed by hand, a process that requires skill and experience. This manual mixing ensures that all ingredients are evenly distributed and creates the characteristic texture of Molida. The crushing process breaks down the bread into smaller pieces that absorb the flavors of the other ingredients.
                  </p>

                  <h3 className="text-xl md:text-2xl font-bold text-primary mt-6">Step 5: Adding Oil and Desi Ghee</h3>
                  <p>
                    The final touch involves adding oil and traditional Hunza desi ghee (clarified butter). The desi ghee is particularly special, as it's made from the milk of local yaks and cows that graze on the high-altitude pastures of Hunza. This gives the ghee a unique, rich flavor that cannot be replicated. The oil and ghee are mixed thoroughly, coating every piece of the crushed bread mixture.
                  </p>

                  <h2 className="text-2xl md:text-3xl font-bold text-primary mt-8">The Final Result</h2>
                  <p>
                    The result is Molida – a unique, flavorful dish that is both comforting and nourishing. The combination of textures, from the soft bread pieces to the smooth ghee coating, creates a satisfying eating experience. The tangy notes from the sour ingredient balance perfectly with the rich, buttery flavor of the desi ghee.
                  </p>

                  <h2 className="text-2xl md:text-3xl font-bold text-primary mt-8">Cultural Significance</h2>
                  <p>
                    Molida is more than just food; it's a connection to Hunza's past and a symbol of the valley's culinary traditions. In the harsh mountain winters, when fresh ingredients were scarce, dishes like Molida provided essential nutrition and warmth. Today, it remains a beloved comfort food, often prepared during family gatherings and special occasions.
                  </p>

                  <p>
                    The dish also represents the communal nature of Hunza culture. The hand-mixing process often brings family members together, with recipes and techniques passed down from grandmothers to mothers to daughters, preserving the authentic taste and method through generations.
                  </p>

                  <h2 className="text-2xl md:text-3xl font-bold text-primary mt-8">Experience Molida at Leopard Cave Restaurant</h2>
                  <p>
                    At Leopard Cave Restaurant, we are proud to serve authentic Molida prepared using traditional methods and the finest local ingredients. Our chefs have learned the art of making Molida from local families who have been preparing this dish for generations. We use organic flour from Hunza's terraced fields and pure desi ghee from local farms to ensure an authentic taste.
                  </p>

                  <p>
                    When you visit us, you can enjoy Molida while taking in the breathtaking views of Attabad Lake. It's the perfect way to experience the true flavors of Hunza Valley in a setting that showcases the region's natural beauty.
                  </p>

                  <h2 className="text-2xl md:text-3xl font-bold text-primary mt-8">Nutritional Benefits</h2>
                  <p>
                    Molida is not only delicious but also nutritious. The whole wheat flour provides essential fiber and complex carbohydrates, while the desi ghee offers healthy fats and fat-soluble vitamins. The fermented dairy component adds probiotics that support digestive health. This combination makes Molida a wholesome meal that sustained the people of Hunza through generations.
                  </p>

                  <div className="bg-primary/5 p-6 rounded-2xl mt-8 border border-primary/10">
                    <h3 className="text-xl font-bold text-primary mb-4">Visit Us to Try Authentic Molida</h3>
                    <p className="mb-4">
                      Experience the authentic taste of traditional Hunza cuisine at Leopard Cave Restaurant. Our Molida is prepared fresh daily using time-honored methods and the finest local ingredients.
                    </p>
                    <Button asChild className="rounded-full font-bold">
                      <Link to="/reservation" target="_blank" rel="noopener noreferrer">Reserve Your Table</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
