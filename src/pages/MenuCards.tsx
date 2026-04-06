import { useState, useEffect } from "react";
import BackButton from "@/components/common/BackButton";
import SEO from "@/components/common/SEO";
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Utensils, ShoppingCart, Plus, Minus, Trash2, Search, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { supabase } from '@/utils/supabase';

interface CartItem {
  id: string;
  name: string;
  price: string;
  quantity: number;
}

interface MenuItem {
  id: string;
  name: string;
  price: string;
  description: string;
  category_id: string;
  categories: { name: string } | null;
}

interface Category {
  id: string;
  name: string;
}

export default function MenuCards() {
  const navigate = useNavigate();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{ id: string; name: string; price: string } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch active categories
        const { data: catData, error: catError } = await supabase
          .from('categories')
          .select('id, name')
          .eq('status', 'Active')
          .order('created_at', { ascending: true });

        if (catError) throw catError;
        setCategories(catData || []);

        // Fetch all menu items with their category name
        const { data: itemData, error: itemError } = await supabase
          .from('menu_items')
          .select(`
            id, name, price, description, category_id,
            categories ( name )
          `)
          .order('created_at', { ascending: true });

        if (itemError) throw itemError;
        setMenuItems((itemData as any) || []);
      } catch (err: any) {
        setError('Failed to load menu. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuData();
  }, []);

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

  const getFilteredItemsForCategory = (categoryId: string) => {
    return menuItems.filter(item =>
      item.category_id === categoryId &&
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

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

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="text-muted-foreground font-medium text-lg">Loading menu...</p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="text-center py-24">
            <p className="text-destructive text-lg font-medium">{error}</p>
          </div>
        )}

        {/* Menu Items by Category */}
        {!loading && !error && categories.map((category) => {
          const filteredItems = getFilteredItemsForCategory(category.id);
          if (filteredItems.length === 0) return null;

          return (
            <div key={category.id} className="space-y-6">
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-primary uppercase">{category.name}</h2>
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

        {/* Empty State */}
        {!loading && !error && categories.length === 0 && (
          <div className="text-center py-20">
            <Utensils className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground text-xl font-medium">Menu is being updated. Please check back soon!</p>
          </div>
        )}

        {/* No search results */}
        {!loading && !error && categories.length > 0 && menuItems.length > 0 &&
          categories.every(cat => getFilteredItemsForCategory(cat.id).length === 0) && (
          <div className="text-center py-20">
            <Search className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground text-xl font-medium">No items match "<span className="text-primary">{searchQuery}</span>"</p>
          </div>
        )}

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
