import BackButton from "@/components/common/BackButton";
import SEO from "@/components/common/SEO";
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';

export default function GiyalinBlog() {
  return (
    <>
      <SEO 
        title="Giyalin - Traditional Hunza Woven Bread Basket | Leopard Cave Restaurant"
        description="Discover Giyalin, the traditional handwoven bread basket of Hunza Valley. Learn about this cultural artifact's significance, craftsmanship, and role in Hunza cuisine."
        keywords="Giyalin, Hunza basket, traditional crafts, Hunza culture, handwoven basket, Pakistani handicrafts, Gilgit Baltistan, Leopard Cave Restaurant"
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
                    src="https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260403/file-ap0qne5qvcow.jpg"
                    alt="Giyalin - Traditional Hunza Woven Bread Basket"
                    className="w-full h-full object-cover"
                  />
                </AspectRatio>
              </div>

              <CardContent className="p-8 md:p-12 space-y-8">
                <div className="space-y-4">
                  <h1 className="text-3xl md:text-5xl font-extrabold text-primary tracking-tight">
                    Giyalin – Traditional Hunza Woven Bread Basket
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
                  <h2 className="text-2xl md:text-3xl font-bold text-primary mt-8">What is Giyalin?</h2>
                  <p>
                    Giyalin is a traditional handwoven bread basket that has been an integral part of Hunza households for centuries. More than just a functional item, the Giyalin represents the rich craftsmanship, cultural heritage, and practical wisdom of the Hunza people. This beautifully woven basket serves as both a storage container for bread and a serving platter, embodying the perfect marriage of form and function.
                  </p>

                  <p>
                    The name "Giyalin" comes from the Burushaski language, the native tongue of Hunza. These baskets are instantly recognizable by their distinctive circular shape, intricate woven patterns, and the natural golden-brown color of the materials used in their construction. Each Giyalin is a unique piece of functional art, reflecting the skill and creativity of its maker.
                  </p>

                  <h2 className="text-2xl md:text-3xl font-bold text-primary mt-8">The Art of Weaving Giyalin</h2>

                  <h3 className="text-xl md:text-2xl font-bold text-primary mt-6">Traditional Materials</h3>
                  <p>
                    Giyalin baskets are traditionally woven from natural materials sourced from the Hunza Valley:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Willow Branches:</strong> The primary material, harvested from willow trees that grow along the mountain streams</li>
                    <li><strong>Mulberry Twigs:</strong> Sometimes used for their flexibility and strength</li>
                    <li><strong>Apricot Wood Strips:</strong> Occasionally incorporated for decorative patterns</li>
                    <li><strong>Natural Dyes:</strong> Derived from local plants and minerals for colored patterns</li>
                  </ul>

                  <h3 className="text-xl md:text-2xl font-bold text-primary mt-6">The Weaving Process</h3>

                  <p><strong>Step 1: Harvesting and Preparing Materials</strong></p>
                  <p>
                    The process begins with harvesting willow branches during the optimal season, typically in late winter or early spring when the sap is low. The branches are carefully selected for their flexibility and strength. They are then stripped of their bark, soaked in water to increase pliability, and split into thin, workable strips.
                  </p>

                  <p><strong>Step 2: Creating the Base</strong></p>
                  <p>
                    The weaving starts from the center of what will become the basket's base. The artisan arranges several strips in a star pattern, then begins weaving additional strips in a circular motion, gradually expanding outward. This creates the characteristic spiral pattern seen in traditional Giyalin baskets.
                  </p>

                  <p><strong>Step 3: Building the Walls</strong></p>
                  <p>
                    Once the base reaches the desired diameter (typically 12-18 inches), the weaver begins to angle the strips upward to form the shallow walls of the basket. The walls are kept relatively low – usually only 2-3 inches high – as the Giyalin is designed to be a flat serving basket rather than a deep storage container.
                  </p>

                  <p><strong>Step 4: Creating Decorative Patterns</strong></p>
                  <p>
                    Skilled weavers incorporate decorative patterns into the basket by varying the weaving technique or introducing strips of different colors. Common patterns include geometric designs, spirals, and traditional Hunza motifs. These patterns are not just decorative – they often carry cultural significance and can indicate the basket's origin or the weaver's family.
                  </p>

                  <p><strong>Step 5: Finishing the Edge</strong></p>
                  <p>
                    The rim of the Giyalin is finished with a special braided edge that reinforces the basket and gives it a polished appearance. This edge is crucial for the basket's durability, as it prevents the woven strips from unraveling over time.
                  </p>

                  <p><strong>Step 6: Drying and Curing</strong></p>
                  <p>
                    After weaving is complete, the basket is left to dry naturally in the sun. As it dries, the willow strips tighten and harden, creating a sturdy yet lightweight basket. The natural drying process can take several days, depending on weather conditions.
                  </p>

                  <h2 className="text-2xl md:text-3xl font-bold text-primary mt-8">Cultural Significance</h2>

                  <h3 className="text-xl md:text-2xl font-bold text-primary mt-6">A Symbol of Hospitality</h3>
                  <p>
                    In Hunza culture, the Giyalin is intimately connected with hospitality and food sharing. When guests arrive, bread is traditionally served in a Giyalin basket, symbolizing welcome and abundance. The presentation of food in a beautifully woven Giyalin demonstrates respect for guests and pride in one's cultural heritage.
                  </p>

                  <h3 className="text-xl md:text-2xl font-bold text-primary mt-6">Passed Down Through Generations</h3>
                  <p>
                    The art of weaving Giyalin is traditionally passed down from mother to daughter, grandmother to granddaughter. Young girls learn the craft by watching their elders and gradually taking on more complex weaving tasks. A well-made Giyalin can last for decades, often becoming a cherished family heirloom passed down through generations.
                  </p>

                  <h3 className="text-xl md:text-2xl font-bold text-primary mt-6">Wedding Traditions</h3>
                  <p>
                    Giyalin baskets play a special role in Hunza wedding traditions. A bride often receives several Giyalin baskets as part of her dowry, and she may also weave special baskets as gifts for her new family. The quality and beauty of these baskets reflect the bride's skill and preparation for married life.
                  </p>

                  <h2 className="text-2xl md:text-3xl font-bold text-primary mt-8">Practical Uses of Giyalin</h2>

                  <h3 className="text-xl md:text-2xl font-bold text-primary mt-6">Bread Storage and Serving</h3>
                  <p>
                    The primary function of Giyalin is storing and serving bread. The basket's woven structure allows air circulation, which helps keep bread fresh longer by preventing moisture buildup. The flat, wide design makes it easy to stack multiple pieces of flatbread, and the basket can be easily carried from kitchen to dining area.
                  </p>

                  <h3 className="text-xl md:text-2xl font-bold text-primary mt-6">Drying Foods</h3>
                  <p>
                    Giyalin baskets are also used for drying various foods in the sun. Their woven structure allows air to circulate around the food while protecting it from insects and debris. They're commonly used for drying:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Apricots and other fruits</li>
                    <li>Herbs and medicinal plants</li>
                    <li>Seeds and grains</li>
                    <li>Cheese curds</li>
                  </ul>

                  <h3 className="text-xl md:text-2xl font-bold text-primary mt-6">Ceremonial Uses</h3>
                  <p>
                    During festivals and special occasions, Giyalin baskets are used to present special foods and gifts. They may be filled with dried fruits, nuts, or traditional sweets and given as offerings or presents. The basket itself, especially if beautifully crafted, is considered a valuable gift.
                  </p>

                  <h2 className="text-2xl md:text-3xl font-bold text-primary mt-8">The Craftsmanship Behind Giyalin</h2>

                  <h3 className="text-xl md:text-2xl font-bold text-primary mt-6">Skill and Patience Required</h3>
                  <p>
                    Creating a high-quality Giyalin requires considerable skill and patience. An experienced weaver can complete a basket in 6-8 hours, but beginners may take several days. The process demands:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Steady Hands:</strong> To maintain consistent tension in the weaving</li>
                    <li><strong>Good Eye:</strong> To create symmetrical patterns and shapes</li>
                    <li><strong>Physical Strength:</strong> To manipulate the stiff willow strips</li>
                    <li><strong>Patience:</strong> To complete the intricate weaving without rushing</li>
                    <li><strong>Creativity:</strong> To design unique patterns and decorative elements</li>
                  </ul>

                  <h3 className="text-xl md:text-2xl font-bold text-primary mt-6">Regional Styles</h3>
                  <p>
                    Different areas of Hunza have developed their own distinctive Giyalin styles:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Karimabad Style:</strong> Known for tight, dense weaving and geometric patterns</li>
                    <li><strong>Gojal Style:</strong> Features more open weaving and often incorporates colored strips</li>
                    <li><strong>Nagar Style:</strong> Characterized by larger baskets with elaborate edge designs</li>
                  </ul>

                  <h2 className="text-2xl md:text-3xl font-bold text-primary mt-8">Giyalin in Modern Times</h2>

                  <h3 className="text-xl md:text-2xl font-bold text-primary mt-6">Preserving Traditional Crafts</h3>
                  <p>
                    In recent years, there has been a renewed interest in preserving traditional crafts like Giyalin weaving. Local organizations and cultural groups are working to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Document traditional weaving techniques</li>
                    <li>Teach young people the craft</li>
                    <li>Create markets for handmade baskets</li>
                    <li>Recognize master weavers and their contributions</li>
                  </ul>

                  <h3 className="text-xl md:text-2xl font-bold text-primary mt-6">Contemporary Uses</h3>
                  <p>
                    While Giyalin baskets continue to serve their traditional purposes, they have also found new uses in modern Hunza homes and beyond:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Decorative Items:</strong> Displayed as wall art or table centerpieces</li>
                    <li><strong>Gift Baskets:</strong> Used to present gifts of local products to tourists</li>
                    <li><strong>Restaurant Service:</strong> Used in restaurants to serve traditional bread authentically</li>
                    <li><strong>Export Items:</strong> Sold to collectors and enthusiasts of traditional crafts worldwide</li>
                  </ul>

                  <h2 className="text-2xl md:text-3xl font-bold text-primary mt-8">The Environmental Aspect</h2>
                  <p>
                    Giyalin baskets represent sustainable, eco-friendly craftsmanship:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Renewable Materials:</strong> Made from fast-growing willow and mulberry</li>
                    <li><strong>Biodegradable:</strong> Eventually returns to the earth without pollution</li>
                    <li><strong>Zero Waste:</strong> Every part of the harvested branches is used</li>
                    <li><strong>Long-lasting:</strong> Reduces need for frequent replacement</li>
                    <li><strong>No Chemicals:</strong> Created without synthetic materials or harmful processes</li>
                  </ul>

                  <h2 className="text-2xl md:text-3xl font-bold text-primary mt-8">Caring for Your Giyalin</h2>
                  <p>
                    To ensure a Giyalin basket lasts for generations:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Keep Dry:</strong> Store in a dry place to prevent mold</li>
                    <li><strong>Avoid Direct Sunlight:</strong> Prolonged sun exposure can make the willow brittle</li>
                    <li><strong>Clean Gently:</strong> Wipe with a slightly damp cloth; avoid soaking</li>
                    <li><strong>Handle with Care:</strong> The woven structure is strong but can be damaged by rough handling</li>
                    <li><strong>Occasional Oiling:</strong> A light application of natural oil can help maintain flexibility</li>
                  </ul>

                  <h2 className="text-2xl md:text-3xl font-bold text-primary mt-8">Experience Giyalin at Leopard Cave Restaurant</h2>
                  <p>
                    At Leopard Cave Restaurant, we honor Hunza traditions by serving our authentic Hunza breads in traditional Giyalin baskets. Each basket used in our restaurant is handwoven by local artisans, supporting the preservation of this ancient craft while providing our guests with an authentic cultural experience.
                  </p>

                  <p>
                    When you order traditional Hunza bread like Burush Shapick or Chapshuro, it will be presented to you in a beautiful Giyalin basket, just as it has been served in Hunza homes for centuries. This presentation is not just about aesthetics – it's about connecting you with the rich cultural heritage of Hunza Valley.
                  </p>

                  <p>
                    We also offer authentic Giyalin baskets for purchase, allowing you to take home a piece of Hunza craftsmanship. Each basket comes with information about the artisan who made it and care instructions to help it last for years to come.
                  </p>

                  <h2 className="text-2xl md:text-3xl font-bold text-primary mt-8">Supporting Local Artisans</h2>
                  <p>
                    By using and promoting Giyalin baskets, Leopard Cave Restaurant actively supports local artisans and helps preserve traditional crafts. We work directly with weavers from various parts of Hunza, ensuring they receive fair compensation for their skilled work. This support helps keep the tradition alive and provides income for families who maintain these ancient skills.
                  </p>

                  <div className="bg-primary/5 p-6 rounded-2xl mt-8 border border-primary/10">
                    <h3 className="text-xl font-bold text-primary mb-4">Experience Authentic Hunza Traditions</h3>
                    <p className="mb-4">
                      Visit Leopard Cave Restaurant to experience traditional Hunza cuisine served in authentic Giyalin baskets. Immerse yourself in the rich cultural heritage of Hunza Valley while enjoying breathtaking views of Attabad Lake.
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
