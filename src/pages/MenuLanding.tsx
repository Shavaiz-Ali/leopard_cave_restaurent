import BackButton from "@/components/common/BackButton";
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Utensils } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function MenuLanding() {
  const [activeView, setActiveView] = useState<'none' | 'cards' | 'images'>('none');

  const menuImages = [
    { id: '1', src: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260331/file-amj39vjuheyo.jpeg', title: 'Menu Page 1' },
    { id: '2', src: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260331/file-amj39vjuhla8.jpeg', title: 'Menu Page 2' },
    { id: '3', src: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260331/file-amj39frlksu8.jpeg', title: 'Menu Page 3' },
    { id: '4', src: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260331/file-amj39vjugpog.jpeg', title: 'Menu Page 4' },
    { id: '5', src: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260331/file-amj39vjugd1c.jpeg', title: 'Menu Page 5' },
  ];

  const menuItems = [
    // Local Delights (Items 1-3)
    { 
      id: '1', 
      name: 'Burush Shapick', 
      category: 'Local Delights', 
      price: 'PKR 650',
      description: 'Authentic local flatbread, crafted with caramelized onions and an aromatic blend of handpicked local herbs, then lightly drizzled with rich walnut oil tradition and the essence of mountain flavors to every bite.'
    },
    { 
      id: '2', 
      name: 'Chap Shuroo', 
      category: 'Local Delights', 
      price: 'PKR 1,000',
      description: 'Tender boneless yak meat, slow-braised with caramelized onions and wild local herbs for a deep, earthy flavor. Served with hand-kneaded traditional wheat dough, home-style potato wedges, and a savory local dipping sauce.'
    },
    { 
      id: '3', 
      name: 'Chicken Deroo', 
      category: 'Local Delights', 
      price: 'PKR 500',
      description: 'Boneless chicken cooked with fragrant local herbs, onion wrapped in freshly baked local wheat shapick, served with golden home-style potato wedges and a vibrant, tangy local chutney.'
    },

    // Valley Soups (Items 4-6)
    { 
      id: '4', 
      name: 'Dawdo Soup', 
      category: 'Valley Soups', 
      price: 'PKR 450',
      description: 'A nourishing, slow-cooked soup made with homemade laksha flat noodles, tender halize mountain yak meat cuts, and ba page chap, gently simmered with aromatic local herbs.'
    },
    { 
      id: '5', 
      name: 'Hari Soup', 
      category: 'Valley Soups', 
      price: 'PKR 750',
      description: 'Local barley, handmade laksha (noodles), halize (fermented grains), and mixed mountain herbs. Slow-cooked over an open fire, it brings the deep, smoky flavors of our highland home straight to your bowl.'
    },
    { 
      id: '6', 
      name: 'Shirijoon Soup', 
      category: 'Valley Soups', 
      price: 'PKR 2,000',
      description: 'A rich and earthy mountain delicacy made with wild morel mushrooms handpicked from the highland forests. Slow-cooked with golden onions, fresh cream, this soup brings out the deep, nutty flavor of the prized shrijoon (morel).'
    },

    // From the Mountain Pod (Item 7)
    { 
      id: '7', 
      name: 'Hot & Sour', 
      category: 'From the Mountain Pod', 
      price: 'PKR 500',
      description: 'A classic, flavors - spicy heat from chili and pepper, and a tangy kick from vinegar or fermented ingredients. Traditionally made with a rich broth, includes a mix of local mountain vegetables, free-range chicken.'
    },
    { 
      id: '11', 
      name: 'Chicken Corn Soup', 
      category: 'From the Mountain Pod', 
      price: 'PKR 450',
      description: 'A comforting blend of tender chicken and sweet corn in a rich, flavorful broth.'
    },

    // Mountain Greens (Items 8-9)
    { 
      id: '8', 
      name: 'Hari Ka Biranze Salad', 
      category: 'Mountain Greens', 
      price: 'PKR 600',
      description: 'Made with hari (local barley) and biranze (mulberry) - toasted to perfection with onions, tomatoes, and cucumber a honey-apple cider vinaigrette, finished with a touch of homeland burushe. It\'s a vibrant fusion of highland flavors.'
    },
    { 
      id: '9', 
      name: 'Fresh Garden Salad', 
      category: 'Mountain Greens', 
      price: 'PKR 400',
      description: 'Vibrant celebration of freshness, crafted with local mountain vegetables grown in pure air and soil. This salad brings together crisp greens, seasonal roots, and wild herbs, all handpicked from the heart of the highlands.'
    },

    // Bite Before the Peak (Item 10 + variations)
    { 
      id: '10', 
      name: 'Mountain Yak Karahi', 
      category: 'Bite Before the Peak', 
      price: 'PKR 3,000 (1kg)',
      description: 'A traditional karahi, made with tender cuts of locally raised yak meat slow-cooked in a fragrant blend of fresh mountain tomatoes, halizi (turmeric), and gawkomaricho (black pepper), this dish is fired up with maricho (chilies) for a rich in flavor. Served with a side of fresh seasonal salad and warm local roti.'
    },
    { 
      id: '10b', 
      name: 'Pasture Mutton Karahi', 
      category: 'Bite Before the Peak', 
      price: 'PKR 3,500 (1kg)',
      description: 'Tender pasture-raised mutton cooked in traditional karahi style with aromatic spices and fresh herbs.'
    },
    { 
      id: '10c', 
      name: 'Free Range Chicken Karahi', 
      category: 'Bite Before the Peak', 
      price: 'PKR 2,700 (1kg)',
      description: 'Free-range chicken prepared in authentic karahi style with rich tomato-based gravy and mountain spices.'
    },

    // Others (Items 12-13)
    { 
      id: '12', 
      name: 'Balling Kham', 
      category: 'Others', 
      price: 'PKR 3,200',
      description: 'A traditional highland specialty featuring authentic local ingredients and time-honored cooking methods.'
    },
    { 
      id: '13', 
      name: 'Chap Za Laksha', 
      category: 'Others', 
      price: 'Price on request',
      description: 'Traditional handmade noodles served with authentic local accompaniments and flavorful broth.'
    },

    // Glacier Flow Beverages (Items 14-20)
    { 
      id: '14', 
      name: 'Chamuse', 
      category: 'Glacier Flow Beverages', 
      price: 'PKR 500',
      description: 'A pure and refreshing drink made from sun-dried local apricots crystal rise mountain water. No sugar, no additive, just the natural sweetness of the fruit.'
    },
    { 
      id: '15', 
      name: 'Peak Fruit Fizz', 
      category: 'Glacier Flow Beverages', 
      price: 'PKR 500',
      description: 'Fresh mountain apricots muddled with wild local herbs, sparkling mountain ice water, and a touch of homeland honey served over crushed ice.'
    },
    { 
      id: '16', 
      name: 'Season\'s Essence', 
      category: 'Glacier Flow Beverages', 
      price: 'PKR 600',
      description: 'A refreshing blend crafted from the freshest fruits of the season handpicked at peak ripeness from local orchards and gardens. Each glass captures the true taste of nature.'
    },
    { 
      id: '17', 
      name: 'Lemon Peak Spark', 
      category: 'Glacier Flow Beverages', 
      price: 'PKR 300',
      description: 'A refreshing burst of mountain-grown mint, zesty ginger, fresh lemon, and a dash of local honey lightly sparkling with mountain soda water.'
    },
    { 
      id: '18', 
      name: 'Soft Drinks', 
      category: 'Glacier Flow Beverages', 
      price: 'PKR 150',
      description: 'Selection of popular carbonated beverages.'
    },
    { 
      id: '19', 
      name: 'Small Water', 
      category: 'Glacier Flow Beverages', 
      price: 'PKR 100',
      description: 'Pure mountain spring water in small bottle.'
    },
    { 
      id: '20', 
      name: 'Large Water', 
      category: 'Glacier Flow Beverages', 
      price: 'PKR 100',
      description: 'Pure mountain spring water in large bottle.'
    },

    // Peak Warmth (Items 21-29)
    { 
      id: '21', 
      name: 'Cappuccino', 
      category: 'Peak Warmth', 
      price: 'PKR 400',
      description: 'Rich espresso topped with steamed milk foam.'
    },
    { 
      id: '22', 
      name: 'Americano', 
      category: 'Peak Warmth', 
      price: 'PKR 300',
      description: 'Bold espresso diluted with hot water.'
    },
    { 
      id: '23', 
      name: 'Espresso', 
      category: 'Peak Warmth', 
      price: 'PKR 300',
      description: 'Strong, concentrated coffee shot.'
    },
    { 
      id: '24', 
      name: 'Latte', 
      category: 'Peak Warmth', 
      price: 'PKR 400',
      description: 'Smooth espresso with steamed milk.'
    },
    { 
      id: '25', 
      name: 'Rose Petal Tea', 
      category: 'Peak Warmth', 
      price: 'PKR 200',
      description: 'Delicate tea infused with fragrant rose petals.'
    },
    { 
      id: '26', 
      name: 'Mountain Tea', 
      category: 'Peak Warmth', 
      price: 'PKR 150',
      description: 'Traditional highland tea blend.'
    },
    { 
      id: '27', 
      name: 'Honey Tea', 
      category: 'Peak Warmth', 
      price: 'PKR 250',
      description: 'Soothing tea sweetened with pure local honey.'
    },
    { 
      id: '28', 
      name: 'Matka Chai', 
      category: 'Peak Warmth', 
      price: 'PKR 250',
      description: 'Traditional clay pot tea with authentic flavor.'
    },
    { 
      id: '29', 
      name: 'Dhood Patti Chai', 
      category: 'Peak Warmth', 
      price: 'PKR 250',
      description: 'Creamy milk tea brewed to perfection.'
    },

    // Highlanders Snacks (Items 30-35)
    { 
      id: '30', 
      name: 'Highland Yak Burger', 
      category: 'Highlanders Snacks', 
      price: 'PKR 1,300',
      description: 'Featuring a juicy yak meat patty, grilled to perfection and layered with caramelized onions, melted cheese, and a handful of fresh local greens. Soft, toasted bun and served with a side of crispy homeland-style potato wedges.'
    },
    { 
      id: '31', 
      name: 'Zinger Crunch Burger', 
      category: 'Highlanders Snacks', 
      price: 'PKR 1,150',
      description: 'A deep-fried chicken fillet, marinated in bold seasonings and fried to golden perfection. Layered with fresh lettuce, creamy garlic mayo, and served in a soft toasted bun for the perfect crunch in every bite.'
    },
    { 
      id: '32', 
      name: 'Crispy Cluck', 
      category: 'Highlanders Snacks', 
      price: 'PKR 1,450',
      description: 'Juicy, tender pieces of free-range chicken, marinated in house spices and double-crisped. Served hot with a crunchy outer layer and bursting with homeland potato wedges.'
    },
    { 
      id: '33', 
      name: 'Walnut Dip', 
      category: 'Highlanders Snacks', 
      price: 'Price on request',
      description: 'Rich, creamy dip made from locally sourced walnuts with aromatic spices.'
    },
    { 
      id: '34', 
      name: 'Homeland Potato Fries', 
      category: 'Highlanders Snacks', 
      price: 'PKR 550',
      description: 'Crispy golden fries made from fresh highland potatoes.'
    },
    { 
      id: '35', 
      name: 'Homeland Potato Chili Fries', 
      category: 'Highlanders Snacks', 
      price: 'PKR 750',
      description: 'Crispy fries loaded with rich chili, melted cheese, handpick herbs. Served with garlic mayo.'
    },

    // From the Mountain Wok (Items 36-37)
    { 
      id: '36', 
      name: 'Mountain Yak Chili Dry', 
      category: 'From the Mountain Wok', 
      price: 'PKR 1,300',
      description: 'A bold fusion of spice and mountain flavor our Mountain Yak Chili Dry features tender strips of yak meat, stir-fried with fresh chilies, garlic, and onions in a smoky, spicy glaze. Served with classic egg fried rice.'
    },
    { 
      id: '37', 
      name: 'Sweet & Sour Chicken', 
      category: 'From the Mountain Wok', 
      price: 'PKR 1,500',
      description: 'A vibrant twist on our Mountain Sweet & Sour Chicken tender free-range chicken, stir-fried with local vegetables and glazed in a tangy-sweet & sour sauce a unique highland flavor served with fragrant steamed rice.'
    },

    // Mountain Feast (Item 38)
    { 
      id: '38', 
      name: 'Grilled Beef Steak', 
      category: 'Mountain Feast', 
      price: 'PKR 3,000',
      description: 'Tender yak meat, marinated in fresh onion juice and a blend of local herbs, flame-grilled for a rich, smoky flavor creamy mashed potatoes and finished with a traditional gakowmarcho sauce for a bold, local touch.'
    },
  ];

  const categories = [
    'Local Delights',
    'Valley Soups',
    'From the Mountain Pod',
    'Mountain Greens',
    'Bite Before the Peak',
    'Others',
    'Glacier Flow Beverages',
    'Peak Warmth',
    'Highlanders Snacks',
    'From the Mountain Wok',
    'Mountain Feast'
  ];

  return (
    <div className="flex flex-col w-full min-h-screen py-16 bg-background">
      <div className="container px-4 md:px-8 max-w-7xl mx-auto space-y-8 mt-8">
        <BackButton />
        {/* Prominent Title */}
        <div className="text-center pt-8">
          <h1 className="text-5xl md:text-8xl font-black text-primary tracking-tight uppercase drop-shadow-2xl">
            Our Menu
          </h1>
        </div>

        {/* Cover Photo - Full Display Without Cropping */}
        <div className="relative overflow-hidden rounded-3xl shadow-2xl w-full">
          <img
            src="https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260331/file-an0w7ir91af4.png"
            alt="Menu Cover"
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Two Buttons Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto w-full">
          <Button 
            size="lg" 
            onClick={() => setActiveView('cards')}
            variant={activeView === 'cards' ? 'default' : 'outline'}
            className={`w-full rounded-full text-lg px-8 py-7 font-bold shadow-xl hover:scale-105 transition-all duration-300 border-2 ${
              activeView === 'cards' 
                ? 'bg-primary text-primary-foreground border-primary shadow-primary/50' 
                : 'border-primary/50 hover:bg-primary/10'
            }`}
          >
            View Menu Cards
          </Button>
          <Button 
            size="lg" 
            onClick={() => setActiveView('images')}
            variant={activeView === 'images' ? 'default' : 'outline'}
            className={`w-full rounded-full text-lg px-8 py-7 font-bold shadow-xl hover:scale-105 transition-all duration-300 border-2 ${
              activeView === 'images' 
                ? 'bg-primary text-primary-foreground border-primary shadow-primary/50' 
                : 'border-primary/50 hover:bg-primary/10'
            }`}
          >
            View Menu Images
          </Button>
        </div>

        {/* Menu Cards Content */}
        {activeView === 'cards' && (
          <div className="space-y-12 mt-12 animate-in fade-in duration-500">
            {categories.map((category) => (
              <div key={category} className="space-y-6">
                <div className="text-center">
                  <h2 className="text-3xl md:text-4xl font-bold text-primary uppercase">{category}</h2>
                  <div className="h-1 w-20 bg-primary mx-auto mt-4 rounded-full" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {menuItems.filter(item => item.category === category).map((item) => (
                    <Card key={item.id} className="overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-card group flex flex-col">
                      <CardContent className="p-6 flex flex-col justify-between h-full space-y-4">
                        <div className="flex-1 flex flex-col space-y-3">
                          <div className="flex justify-center">
                            <div className="p-3 bg-primary/10 rounded-full">
                              <Utensils className="h-8 w-8 text-primary" />
                            </div>
                          </div>
                          <h3 className="text-xl font-bold text-primary text-center">{item.name}</h3>
                          <p className="text-sm text-muted-foreground text-center line-clamp-4">{item.description}</p>
                          <p className="text-2xl font-extrabold text-secondary text-center">{item.price}</p>
                        </div>
                        <Button size="sm" asChild className="w-full rounded-full font-bold shadow-lg hover:scale-105 transition-all duration-300">
                          <Link to="/reservation">Reserve Table</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Menu Images Content */}
        {activeView === 'images' && (
          <div className="grid grid-cols-1 gap-8 mt-12 animate-in fade-in duration-500">
            {menuImages.map((menu) => (
              <Card key={menu.id} className="overflow-hidden border-none shadow-2xl hover:shadow-primary/20 transition-all duration-300 bg-card">
                <CardContent className="p-0">
                  <div className="relative">
                    <img
                      src={menu.src}
                      alt={menu.title}
                      className="w-full h-auto object-contain bg-muted"
                    />
                  </div>
                  <div className="p-6 flex justify-center">
                    <Button size="lg" asChild className="rounded-full text-lg px-10 py-6 font-bold shadow-xl hover:scale-105 hover:bg-secondary hover:shadow-primary/50 transition-all duration-300">
                      <Link to="/reservation">Reserve Now</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
