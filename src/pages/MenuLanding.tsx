import { useState, useEffect } from 'react';
import BackButton from "@/components/common/BackButton";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Utensils, Image, List, Search, Loader2 } from 'lucide-react';
import SEO from '@/components/common/SEO';
import { supabase } from '@/utils/supabase';
import { useNavigate } from 'react-router-dom';

interface MenuImage {
  id: string;
  title: string;
  url: string;
  sort_order: number;
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

export default function MenuLanding() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'cards' | 'images'>('cards');
  const [searchQuery, setSearchQuery] = useState('');
  const [menuImages, setMenuImages] = useState<MenuImage[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch menu images
        const { data: imagesData, error: imagesError } = await supabase
          .from('menu_images')
          .select('id, title, url, sort_order')
          .order('sort_order', { ascending: true })
          .order('created_at', { ascending: false });

        if (imagesError) throw imagesError;
        setMenuImages(imagesData || []);

        // Fetch categories
        const { data: catData, error: catError } = await supabase
          .from('categories')
          .select('id, name')
          .eq('status', 'Active')
          .order('created_at', { ascending: true });

        if (catError) throw catError;
        setCategories(catData || []);

        // Fetch menu items
        const { data: itemData, error: itemError } = await supabase
          .from('menu_items')
          .select(`
            id, name, price, description, category_id,
            categories ( name )
          `)
          .order('created_at', { ascending: true });

        if (itemError) throw itemError;
        setMenuItems((itemData as any) || []);
      } catch (error) {
        console.error('Error fetching menu data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
        title="Menu - Local Hunza Food & International Cuisine | Leopard Cave"
        description="Explore our delicious menu featuring authentic local dishes of Hunza, traditional Pakistani cuisine, and international favorites at Leopard Cave Restaurant."
        keywords="Hunza local food, local dishes of Hunza, Hunza food menu, best restaurants in Hunza menu, traditional Hunza cuisine"
      />
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
            <div className="mb-6">
              <BackButton />
            </div>
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
                <Utensils className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-primary mb-3">
                Our Menu
              </h1>
              <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
                Explore our delicious menu featuring authentic local dishes and international cuisine
              </p>
            </div>

            {/* Tab Navigation */}
            <div className="flex justify-center gap-4 mb-8">
              <Button
                variant={activeTab === 'cards' ? 'default' : 'outline'}
                onClick={() => setActiveTab('cards')}
                className="px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300"
              >
                <List className="h-4 w-4 mr-2" />
                Menu Cards
              </Button>
              <Button
                variant={activeTab === 'images' ? 'default' : 'outline'}
                onClick={() => setActiveTab('images')}
                className="px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300"
              >
                <Image className="h-4 w-4 mr-2" />
                Menu Images
              </Button>
            </div>

            {/* Search Box (only for cards tab) */}
            {activeTab === 'cards' && (
              <div className="max-w-2xl mx-auto mb-8">
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
            )}
          </div>
        </section>

        {/* Menu Preview */}
        {/* <section className="py-8 md:py-12">
          <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
            <div className="text-center mb-6">
              <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-2">Menu Preview</h2>
              <p className="text-sm text-muted-foreground">Get a glimpse of our menu</p>
            </div>
            <div className="relative overflow-hidden rounded-xl shadow-sm">
              <img
                src="https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260331/file-an0w7ir91af4.png"
                alt="Menu Cover - Leopard Cave Restaurant"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </section> */}

        {/* Content */}
        <section className="py-8 md:py-12">
          <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
            {loading && (
              <div className="flex flex-col items-center justify-center py-12 gap-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-muted-foreground text-sm">Loading...</p>
              </div>
            )}

            {!loading && activeTab === 'cards' && (
              <div>
                {/* Menu Items by Category */}
                {categories.map((category) => {
                  const filteredItems = getFilteredItemsForCategory(category.id);
                  if (filteredItems.length === 0) return null;

                  return (
                    <div key={category.id} className="mb-12">
                      <div className="text-center mb-6">
                        <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">{category.name}</h3>
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
                                <h4 className="text-lg font-medium text-card-foreground mb-2">{item.name}</h4>
                                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-2">{item.description}</p>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-semibold text-primary">{item.price}</span>
                                <Button
                                  size="sm"
                                  onClick={() => navigate(`/reservation?items=${item.id}`)}
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
                {categories.length === 0 && (
                  <div className="text-center py-12">
                    <Utensils className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                    <p className="text-muted-foreground text-sm">Menu is being updated. Please check back soon!</p>
                  </div>
                )}

                {/* No search results */}
                {categories.length > 0 && menuItems.length > 0 &&
                  categories.every(cat => getFilteredItemsForCategory(cat.id).length === 0) && (
                  <div className="text-center py-12">
                    <Search className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                    <p className="text-muted-foreground text-sm">No items match "<span className="text-primary">{searchQuery}</span>"</p>
                  </div>
                )}
              </div>
            )}

            {!loading && activeTab === 'images' && (
              <div>
                {menuImages.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground border border-border rounded-xl">
                    Our new menu pages are being updated. Please check back later.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {menuImages.map((menu) => (
                      <div
                        key={menu.id}
                        className="group relative aspect-[4/5] rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-all duration-300"
                      >
                        <img
                          src={menu.url}
                          alt={menu.title}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                        <div className="relative h-full flex flex-col justify-end p-5 md:p-6">
                          <h3 className="text-lg md:text-xl font-medium text-white mb-2">{menu.title}</h3>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
