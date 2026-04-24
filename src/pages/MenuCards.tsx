import { useState, useEffect } from "react";
import BackButton from "@/components/common/BackButton";
import SEO from "@/components/common/SEO";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Utensils, Search, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/utils/supabase';
import { useReservation } from '@/contexts/ReservationContext';

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
  const { addItem, selectedItems } = useReservation();
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
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
            <div className="mb-6">
              <BackButton />
            </div>
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
                <Utensils className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-primary mb-3">
                Our Menu
              </h1>
              <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
                Explore our delicious food and beverage offerings, inspired by the flavors of the Hunza valley
              </p>
            </div>

            {/* Search Box */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search for food items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2.5 text-sm rounded-lg border-border focus:border-primary shadow-sm"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
            {/* Loading State */}
            {loading && (
              <div className="flex flex-col items-center justify-center py-16 gap-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-muted-foreground text-sm">Loading menu...</p>
              </div>
            )}

            {/* Error State */}
            {!loading && error && (
              <div className="text-center py-16">
                <p className="text-destructive text-sm">{error}</p>
              </div>
            )}

            {/* Menu Items by Category */}
            {!loading && !error && categories.map((category) => {
              const filteredItems = getFilteredItemsForCategory(category.id);
              if (filteredItems.length === 0) return null;

              return (
                <div key={category.id} className="mb-16">
                  <div className="text-center mb-8">
                    <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-2">{category.name}</h2>
                    <div className="h-0.5 w-12 bg-primary/30 mx-auto rounded-full" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {filteredItems.map((item) => (
                      <div
                        key={item.id}
                        className="group relative overflow-hidden rounded-xl bg-card shadow-sm hover:shadow-md transition-all duration-300 p-5"
                      >
                        <div className="flex flex-col h-full">
                          <div className="flex-1 mb-3">
                            <h3 className="text-lg font-medium text-card-foreground mb-2">{item.name}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-2">{item.description}</p>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold text-primary">{item.price}</span>
                            <Button
                              size="sm"
                              onClick={() => addItem(item as any)}
                              className="px-4 py-1.5 rounded-lg text-xs"
                            >
                              Reserve
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* Empty State */}
            {!loading && !error && categories.length === 0 && (
              <div className="text-center py-16">
                <Utensils className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground text-sm">Menu is being updated. Please check back soon!</p>
              </div>
            )}

            {/* No search results */}
            {!loading && !error && categories.length > 0 && menuItems.length > 0 &&
              categories.every(cat => getFilteredItemsForCategory(cat.id).length === 0) && (
              <div className="text-center py-16">
                <Search className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground text-sm">No items match "<span className="text-primary">{searchQuery}</span>"</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
