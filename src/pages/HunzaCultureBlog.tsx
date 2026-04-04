import BackButton from "@/components/common/BackButton";
import SEO from "@/components/common/SEO";
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';

export default function HunzaCultureBlog() {
  return (
    <>
      <SEO 
        title="Culture of Hunza Valley - Traditions, Dress & Lifestyle | Leopard Cave"
        description="Explore the rich culture of Hunza Valley including traditional dress, cultural dances, festivals, and the unique lifestyle of Hunza people in Gilgit Baltistan, Pakistan."
        keywords="Hunza culture, Hunza traditions, Hunza dress, Hunza festivals, Burushaski language, Hunza lifestyle, Gilgit Baltistan culture, Pakistani culture"
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
                    src="https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260403/file-apmrwg5agikg.jpg"
                    alt="Culture of Hunza Valley - Traditional Celebration"
                    className="w-full h-full object-cover"
                  />
                </AspectRatio>
              </div>

              <CardContent className="p-8 md:p-12 space-y-8">
                <div className="space-y-4">
                  <h1 className="text-3xl md:text-5xl font-extrabold text-primary tracking-tight">
                    Culture of Hunza Valley
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
                  <h2 className="text-2xl md:text-3xl font-bold text-primary mt-8">Introduction to Hunza Culture</h2>
                  <p>
                    Nestled in the heart of the Karakoram mountain range, Hunza Valley is not only famous for its breathtaking landscapes but also for its rich and vibrant culture. The people of Hunza have preserved their unique traditions, language, and way of life for centuries, creating a cultural tapestry that fascinates visitors from around the world.
                  </p>

                  <p>
                    The Hunza culture is characterized by warmth, hospitality, progressive values, and a deep connection to nature. Despite modernization, the people of Hunza have managed to maintain their cultural identity while embracing education and development, making it one of the most literate and progressive regions in Pakistan.
                  </p>

                  <h2 className="text-2xl md:text-3xl font-bold text-primary mt-8">Language and Communication</h2>
                  <p>
                    The primary language spoken in Hunza is <strong>Burushaski</strong>, a language isolate with no known linguistic relatives. This makes it one of the most unique languages in the world. Burushaski has its own distinct grammar, vocabulary, and phonetic system.
                  </p>

                  <p>
                    In addition to Burushaski, many Hunza people are multilingual, speaking:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Urdu:</strong> The national language of Pakistan</li>
                    <li><strong>English:</strong> Widely spoken due to high literacy rates</li>
                    <li><strong>Wakhi:</strong> Spoken in upper Hunza (Gojal region)</li>
                    <li><strong>Shina:</strong> Spoken in some areas bordering Gilgit</li>
                  </ul>

                  <p>
                    The high literacy rate in Hunza (over 90%) is a source of pride for the community, with education being highly valued by all families.
                  </p>

                  <h2 className="text-2xl md:text-3xl font-bold text-primary mt-8">Traditional Dress</h2>

                  <h3 className="text-xl md:text-2xl font-bold text-primary mt-6">Women's Traditional Attire</h3>
                  <p>
                    Hunza women's traditional dress is both elegant and practical, designed for the mountain climate:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Shalwar Kameez:</strong> Long tunic with loose trousers, often in vibrant colors</li>
                    <li><strong>Dupatta:</strong> A long scarf draped over the shoulders or head</li>
                    <li><strong>Embroidery:</strong> Intricate hand-embroidered patterns on the neckline and sleeves</li>
                    <li><strong>Traditional Cap:</strong> Decorated caps worn during festivals and special occasions</li>
                    <li><strong>Jewelry:</strong> Silver jewelry including necklaces, earrings, and bracelets with traditional designs</li>
                  </ul>

                  <h3 className="text-xl md:text-2xl font-bold text-primary mt-6">Men's Traditional Attire</h3>
                  <p>
                    Men's traditional dress in Hunza includes:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Shalwar Kameez:</strong> Similar to women's but with simpler designs</li>
                    <li><strong>Waistcoat:</strong> Often worn over the kameez, sometimes embroidered</li>
                    <li><strong>Traditional Cap:</strong> The distinctive Hunza cap (similar to the Pakol or Chitrali cap)</li>
                    <li><strong>Shawl:</strong> Woolen shawls for warmth in cold weather</li>
                  </ul>

                  <p>
                    During festivals and celebrations, both men and women wear their finest traditional attire, often featuring elaborate embroidery and bright colors that reflect the joy and vibrancy of Hunza culture.
                  </p>

                  <h2 className="text-2xl md:text-3xl font-bold text-primary mt-8">Cultural Dances and Music</h2>

                  <h3 className="text-xl md:text-2xl font-bold text-primary mt-6">Traditional Dances</h3>
                  <p>
                    Dance is an integral part of Hunza culture, performed during festivals, weddings, and celebrations:
                  </p>

                  <p><strong>1. Attan Dance</strong></p>
                  <p>
                    A traditional group dance performed in a circle, with rhythmic movements synchronized to the beat of drums. Both men and women participate, creating a mesmerizing display of unity and joy.
                  </p>

                  <p><strong>2. Sword Dance</strong></p>
                  <p>
                    Performed by men, this dance involves skillful movements with swords, demonstrating agility and coordination. It's often performed during major festivals and celebrations.
                  </p>

                  <p><strong>3. Women's Folk Dances</strong></p>
                  <p>
                    Women perform graceful dances with flowing movements, often accompanied by traditional songs. These dances tell stories of daily life, love, and the beauty of nature.
                  </p>

                  <h3 className="text-xl md:text-2xl font-bold text-primary mt-6">Traditional Music</h3>
                  <p>
                    Hunza music features traditional instruments including:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Duff (Frame Drum):</strong> The primary percussion instrument</li>
                    <li><strong>Surnai:</strong> A wind instrument similar to a clarinet</li>
                    <li><strong>Traditional Flutes:</strong> Made from local materials</li>
                    <li><strong>Vocals:</strong> Folk songs passed down through generations</li>
                  </ul>

                  <h2 className="text-2xl md:text-3xl font-bold text-primary mt-8">Festivals and Celebrations</h2>

                  <h3 className="text-xl md:text-2xl font-bold text-primary mt-6">Navroz (New Year)</h3>
                  <p>
                    Celebrated on March 21st, Navroz marks the beginning of spring and the new year. The celebration includes:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Traditional dances and music performances</li>
                    <li>Special foods and feasts</li>
                    <li>Community gatherings and sports competitions</li>
                    <li>Polo matches (Hunza's favorite sport)</li>
                  </ul>

                  <h3 className="text-xl md:text-2xl font-bold text-primary mt-6">Ginani Festival</h3>
                  <p>
                    Celebrated in spring when apricot blossoms bloom, this festival marks the beginning of the agricultural season. Communities come together to celebrate with music, dance, and traditional foods.
                  </p>

                  <h3 className="text-xl md:text-2xl font-bold text-primary mt-6">Harvest Festival</h3>
                  <p>
                    Celebrated in autumn after the harvest, this festival is a time of thanksgiving for the year's bounty. Families share their harvest with neighbors and the community.
                  </p>

                  <h2 className="text-2xl md:text-3xl font-bold text-primary mt-8">Lifestyle and Daily Life</h2>

                  <h3 className="text-xl md:text-2xl font-bold text-primary mt-6">Agriculture and Farming</h3>
                  <p>
                    Agriculture is the backbone of Hunza's economy and lifestyle:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Terraced Farming:</strong> Ingenious terraced fields carved into mountainsides</li>
                    <li><strong>Organic Methods:</strong> Traditional organic farming without chemicals</li>
                    <li><strong>Main Crops:</strong> Wheat, barley, potatoes, and various fruits</li>
                    <li><strong>Fruit Orchards:</strong> Apricots, apples, cherries, walnuts, and mulberries</li>
                  </ul>

                  <h3 className="text-xl md:text-2xl font-bold text-primary mt-6">Water Management</h3>
                  <p>
                    The people of Hunza have developed sophisticated irrigation systems over centuries:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Channels (Kuls):</strong> Ancient water channels bringing glacial meltwater to fields</li>
                    <li><strong>Community Management:</strong> Water distribution managed fairly by the community</li>
                    <li><strong>Sustainable Practices:</strong> Efficient use of water resources</li>
                  </ul>

                  <h3 className="text-xl md:text-2xl font-bold text-primary mt-6">Architecture</h3>
                  <p>
                    Traditional Hunza architecture is adapted to the mountain environment:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Stone and Wood Construction:</strong> Using local materials</li>
                    <li><strong>Flat Roofs:</strong> Used for drying fruits and as outdoor living spaces</li>
                    <li><strong>Small Windows:</strong> To conserve heat in winter</li>
                    <li><strong>Central Hearth:</strong> For heating and cooking</li>
                  </ul>

                  <h2 className="text-2xl md:text-3xl font-bold text-primary mt-8">Social Structure and Values</h2>

                  <h3 className="text-xl md:text-2xl font-bold text-primary mt-6">Community and Cooperation</h3>
                  <p>
                    Hunza society is built on strong community bonds:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Collective Work:</strong> Community members help each other with farming and construction</li>
                    <li><strong>Shared Resources:</strong> Water and grazing lands managed collectively</li>
                    <li><strong>Mutual Support:</strong> Strong social safety net within the community</li>
                  </ul>

                  <h3 className="text-xl md:text-2xl font-bold text-primary mt-6">Gender Equality</h3>
                  <p>
                    Hunza is known for its progressive approach to gender equality:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Education:</strong> Girls and boys have equal access to education</li>
                    <li><strong>Work:</strong> Women actively participate in agriculture and business</li>
                    <li><strong>Decision Making:</strong> Women have a voice in family and community decisions</li>
                    <li><strong>No Purdah:</strong> Women move freely and interact openly in society</li>
                  </ul>

                  <h3 className="text-xl md:text-2xl font-bold text-primary mt-6">Hospitality</h3>
                  <p>
                    Hunza is famous for its warm hospitality:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Guests are treated with utmost respect and generosity</li>
                    <li>Offering tea and food to visitors is a sacred duty</li>
                    <li>Strangers are welcomed as friends</li>
                    <li>Helping travelers is considered an honor</li>
                  </ul>

                  <h2 className="text-2xl md:text-3xl font-bold text-primary mt-8">Religion and Spirituality</h2>
                  <p>
                    The majority of Hunza's population follows Ismaili Islam, a branch of Shia Islam. The community is known for its:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Moderate Approach:</strong> Emphasis on education, pluralism, and tolerance</li>
                    <li><strong>Spiritual Leader:</strong> Guidance from the Aga Khan</li>
                    <li><strong>Community Service:</strong> Strong focus on helping others and community development</li>
                    <li><strong>Interfaith Harmony:</strong> Respect for other religions and beliefs</li>
                  </ul>

                  <h2 className="text-2xl md:text-3xl font-bold text-primary mt-8">Traditional Crafts and Arts</h2>
                  <p>
                    Hunza has a rich tradition of handicrafts:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Embroidery:</strong> Intricate needlework on clothing and textiles</li>
                    <li><strong>Carpet Weaving:</strong> Traditional woolen carpets with geometric patterns</li>
                    <li><strong>Woodwork:</strong> Carved wooden items and furniture</li>
                    <li><strong>Jewelry Making:</strong> Silver jewelry with traditional designs</li>
                    <li><strong>Pottery:</strong> Traditional clay pots and vessels</li>
                  </ul>

                  <h2 className="text-2xl md:text-3xl font-bold text-primary mt-8">Food Culture</h2>
                  <p>
                    Food is central to Hunza culture, with traditional dishes that have sustained the community for generations:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Organic Ingredients:</strong> All food is grown organically</li>
                    <li><strong>Seasonal Eating:</strong> Diet changes with the seasons</li>
                    <li><strong>Preservation:</strong> Traditional methods of drying and storing food</li>
                    <li><strong>Communal Meals:</strong> Eating together strengthens family and community bonds</li>
                  </ul>

                  <h2 className="text-2xl md:text-3xl font-bold text-primary mt-8">Modern Hunza: Balancing Tradition and Progress</h2>
                  <p>
                    Today's Hunza successfully balances tradition with modernity:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Education:</strong> High literacy rates and emphasis on higher education</li>
                    <li><strong>Technology:</strong> Adoption of modern technology while preserving traditions</li>
                    <li><strong>Tourism:</strong> Welcoming visitors while maintaining cultural integrity</li>
                    <li><strong>Environmental Conservation:</strong> Protecting natural resources for future generations</li>
                  </ul>

                  <h2 className="text-2xl md:text-3xl font-bold text-primary mt-8">Experience Hunza Culture at Leopard Cave Restaurant</h2>
                  <p>
                    At Leopard Cave Restaurant, we celebrate and showcase Hunza culture through our authentic cuisine, traditional hospitality, and cultural ambiance. Our staff, many of whom are from local Hunza families, are happy to share stories about their culture and traditions.
                  </p>

                  <p>
                    We regularly feature traditional Hunza dishes prepared using age-old recipes and methods. Our restaurant's design incorporates elements of traditional Hunza architecture, creating an authentic atmosphere where you can experience the culture while enjoying spectacular views of Attabad Lake.
                  </p>

                  <p>
                    Visit us to not just taste Hunza cuisine, but to experience the warmth, hospitality, and rich cultural heritage that makes Hunza Valley truly special.
                  </p>

                  <div className="bg-primary/5 p-6 rounded-2xl mt-8 border border-primary/10">
                    <h3 className="text-xl font-bold text-primary mb-4">Experience Authentic Hunza Culture</h3>
                    <p className="mb-4">
                      Immerse yourself in the rich culture of Hunza Valley at Leopard Cave Restaurant. Enjoy traditional cuisine, warm hospitality, and breathtaking views.
                    </p>
                    <Button asChild className="rounded-full font-bold">
                      <Link to="/reservation">Reserve Your Table</Link>
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
