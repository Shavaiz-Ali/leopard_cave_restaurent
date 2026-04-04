import BackButton from "@/components/common/BackButton";
import SEO from "@/components/common/SEO";
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Utensils, ShoppingCart, Plus, Minus, Trash2, Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

interface CartItem {
  id: string;
  name: string;
  price: string;
  quantity: number;
}

export default function MenuCards() {
  const navigate = useNavigate();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{ id: string; name: string; price: string } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
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

  const handleAddToCart = () => {
    if (!selectedItem) return;
    
    const existingItem = cart.find(item => item.id === selectedItem.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === selectedItem.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...selectedItem, quantity: 1 }]);
    }
    setShowDialog(false);
    setSelectedItem(null);
  };

  const handleGoToReservation = () => {
    if (!selectedItem) return;
    
    // Add current item to cart if not already there
    const existingItem = cart.find(item => item.id === selectedItem.id);
    let finalCart = cart;
    
    if (existingItem) {
      finalCart = cart.map(item => 
        item.id === selectedItem.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      finalCart = [...cart, { ...selectedItem, quantity: 1 }];
    }
    
    // Navigate to reservation with all cart items
    const itemIds = finalCart.map(item => item.id).join(',');
    navigate(`/reservation?items=${itemIds}`);
  };

  const updateQuantity = (id: string, change: number) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + change;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

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
    <>
      <SEO 
        title="Menu - Best Hunza Food & Traditional Dishes | Leopard Cave Restaurant"
        description="Explore the best food in Hunza Valley at Leopard Cave Restaurant. Authentic Hunza traditional food including Chapshuro, Molida, local soups, and international cuisine near Attabad Lake."
        keywords="Hunza food, local food in Hunza, Hunza traditional food, best food in Hunza, best food in Hunza Valley, Hunza cuisine, traditional Hunza dishes, restaurants at Attabad Lake, where to eat in Hunza"
      />
      <div className="flex flex-col w-full min-h-screen py-16 bg-background">
        <div className="container px-4 md:px-8 max-w-7xl mx-auto space-y-12">
          <BackButton />
          {/* Hero Section */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 via-primary/10 to-background p-12 md:p-16 text-center shadow-2xl border border-primary/20">
            <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(white,transparent_85%)]" />
            <div className="relative space-y-6">
              <div className="flex justify-center">
                <div className="p-4 bg-primary/10 rounded-full">
                  <Utensils className="h-12 w-12 text-primary" />
                </div>
              </div>
              <h1 className="text-4xl md:text-7xl font-extrabold text-primary tracking-tight uppercase">
                Our Menu
              </h1>
              <p className="text-lg md:text-2xl text-muted-foreground max-w-3xl mx-auto font-medium leading-relaxed">
                Explore our delicious food and beverage offerings, inspired by the flavors of the Hunza valley
              </p>
            <div className="flex justify-center gap-4 mt-6">
              <Button size="lg" asChild variant="outline" className="rounded-full text-lg px-8 py-6 font-bold shadow-xl hover:scale-105 transition-all duration-300">
                <Link to="/menu">View Menu Images</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Search Box */}
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search for food items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-6 text-lg rounded-full border-2 border-primary/20 focus:border-primary shadow-lg"
            />
          </div>
        </div>

        {/* Menu Items by Category */}
        {categories.map((category) => {
          const filteredItems = menuItems.filter(item => 
            item.category === category && 
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
          );
          
          // Only show category if it has matching items
          if (filteredItems.length === 0) return null;
          
          return (
            <div key={category} className="space-y-6">
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-primary uppercase">{category}</h2>
                <div className="h-1 w-20 bg-primary mx-auto mt-4 rounded-full" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredItems.map((item) => (
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
                      <Button 
                        size="sm" 
                        onClick={() => {
                          setSelectedItem({ id: item.id, name: item.name, price: item.price });
                          setShowDialog(true);
                        }}
                        className="w-full rounded-full font-bold shadow-lg hover:scale-105 transition-all duration-300"
                      >
                        Reserve Table
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}

        {/* Call to Action */}
        <div className="text-center mt-20 p-12 bg-muted/50 rounded-3xl space-y-6 border border-primary/10">
          <h3 className="text-2xl md:text-3xl font-bold text-primary">Ready to Dine with Us?</h3>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            Reserve your table now and experience the unique flavors and breathtaking views at Leopard Cave Restaurant
          </p>
          <Button size="lg" asChild className="rounded-full text-lg px-12 py-7 font-bold shadow-xl hover:scale-105 hover:bg-secondary hover:shadow-primary/50 transition-all duration-300">
            <Link to="/reservation" target="_blank" rel="noopener noreferrer">Book Your Table</Link>
          </Button>
        </div>
      </div>

      {/* Floating Cart Button */}
      {cart.length > 0 && (
        <div className="fixed bottom-8 right-8 z-40">
          <Button
            size="lg"
            onClick={() => {
              const itemIds = cart.map(item => item.id).join(',');
              navigate(`/reservation?items=${itemIds}`);
            }}
            className="rounded-full shadow-2xl hover:scale-110 transition-all duration-300 px-6 py-6 flex items-center gap-3"
          >
            <ShoppingCart className="h-6 w-6" />
            <span className="font-bold">View Cart ({getTotalItems()})</span>
          </Button>
        </div>
      )}

      {/* Confirmation Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-primary">Add to Order</DialogTitle>
            <DialogDescription className="text-base pt-2">
              {selectedItem && (
                <div className="space-y-2">
                  <p className="font-semibold text-foreground text-lg">{selectedItem.name}</p>
                  <p className="text-muted-foreground">{selectedItem.price}</p>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <p className="text-sm text-muted-foreground">
              Would you like to add more items or proceed to reservation?
            </p>
            
            {/* Show current cart if not empty */}
            {cart.length > 0 && (
              <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                <p className="text-sm font-semibold text-foreground">Current Cart ({getTotalItems()} items):</p>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{item.name}</span>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => updateQuantity(item.id, -1)}
                          className="h-6 w-6 p-0"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="font-semibold w-6 text-center">{item.quantity}</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => updateQuantity(item.id, 1)}
                          className="h-6 w-6 p-0"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeFromCart(item.id)}
                          className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <DialogFooter className="flex-col sm:flex-col gap-2">
            <Button
              onClick={handleAddToCart}
              variant="outline"
              className="w-full rounded-full font-bold"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add More Items
            </Button>
            <Button
              onClick={handleGoToReservation}
              className="w-full rounded-full font-bold"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Go to Reservation
            </Button>
            <Button
              onClick={() => {
                setShowDialog(false);
                setSelectedItem(null);
              }}
              variant="ghost"
              className="w-full"
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
    </>
  );
}
