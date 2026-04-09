import { useState, useEffect } from "react";
import BackButton from "@/components/common/BackButton";
import SEO from "@/components/common/SEO";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, User, BookOpen, Share2, Star, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/utils/supabase';
import type { Blog } from '@/types/types';

// Legacy static blogs that have dedicated pages — these always show
const legacyBlogs = [
  {
    id: 'legacy-1',
    title: 'Top Hunza Foods You Must Try',
    excerpt: 'Your ultimate guide to authentic Hunza Valley cuisine. Discover the must-try traditional dishes from Chapshuro to Molida, and everything in between.',
    date: 'March 2026',
    author: 'Leopard Cave Team',
    slug: 'hunza-food-guide',
    image: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260330/file-als6qwq3iwhs.jpeg',
    featured: true,
    isLegacy: true
  },
  {
    id: 'legacy-2',
    title: 'Burush Shapick – Traditional Hunza Flatbread',
    excerpt: 'Discover the authentic Hunza flatbread crafted with caramelized onions, aromatic herbs, and walnut oil. A culinary masterpiece passed down through generations.',
    date: 'March 2026',
    author: 'Leopard Cave Team',
    slug: 'burush-shapick-traditional-flatbread',
    image: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260403/file-ap0on1oy73ls.jpeg',
    isLegacy: true
  },
  {
    id: 'legacy-3',
    title: 'Chapshuro – The Famous Hunza Street Food',
    excerpt: 'Discover the iconic meat-filled pastry of Hunza Valley. Learn about the traditional preparation, cultural significance, and where to find the best Chapshuro.',
    date: 'March 2026',
    author: 'Leopard Cave Team',
    slug: 'chapshuro-hunza-street-food',
    image: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260403/file-ap0peo4iyeio.jpg',
    isLegacy: true
  },
  {
    id: 'legacy-4',
    title: 'Molida – A Traditional Hunza Dish',
    excerpt: 'Explore the unique traditional Hunza dish made with flour, bread, sour ingredients, and desi ghee. A comfort food passed down through generations.',
    date: 'March 2026',
    author: 'Leopard Cave Team',
    slug: 'molida-traditional-hunza-dish',
    image: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260403/file-ap0prtnxzqww.jpg',
    isLegacy: true
  },
  {
    id: 'legacy-5',
    title: 'Giyalin – Traditional Hunza Woven Bread Basket',
    excerpt: 'Discover the traditional handwoven bread basket of Hunza Valley. Learn about this cultural artifact\'s significance, craftsmanship, and role in Hunza cuisine.',
    date: 'March 2026',
    author: 'Leopard Cave Team',
    slug: 'giyalin-traditional-bread-basket',
    image: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260403/file-ap0qne5qvcow.jpg',
    isLegacy: true
  },
  {
    id: 'legacy-6',
    title: 'Famous Dry Fruits of Hunza Valley',
    excerpt: 'Discover the world-famous dry fruits of Hunza including apricots, walnuts, almonds, and mulberries. Learn about their health benefits and cultural importance.',
    date: 'March 2026',
    author: 'Leopard Cave Team',
    slug: 'hunza-dry-fruits',
    image: 'https://miaoda-site-img.s3cdn.medo.dev/images/KLing_e195ba9e-9e16-4429-811a-22fa27464c75.jpg',
    isLegacy: true
  },
  {
    id: 'legacy-7',
    title: 'Culture of Hunza Valley',
    excerpt: 'Explore the rich culture of Hunza Valley including traditional dress, cultural dances, festivals, and the unique lifestyle of Hunza people.',
    date: 'March 2026',
    author: 'Leopard Cave Team',
    slug: 'hunza-culture',
    image: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260403/file-apmrwg5agikg.jpg',
    isLegacy: true
  },
  {
    id: 'legacy-8',
    title: 'About the History of Attabad Lake',
    excerpt: 'Discover the fascinating story behind the formation of Attabad Lake and how it transformed the landscape of Hunza Valley.',
    date: 'March 2026',
    author: 'Leopard Cave Team',
    slug: 'attabad-lake-history',
    image: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260403/file-apmrpvdkxr7k.jpg',
    isLegacy: true
  }
];

export default function Blogs() {
  const [dbBlogs, setDbBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data, error } = await supabase
          .from('blogs')
          .select('*')
          .eq('status', 'Active')
          .order('featured', { ascending: false })
          .order('created_at', { ascending: false });

        if (error) throw error;
        if (data) setDbBlogs(data);
      } catch {
        // Silently fail — legacy blogs still render
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // Merge DB blogs on top, then legacy blogs
  const allBlogs = [
    ...dbBlogs.map(b => ({
      id: b.id,
      title: b.title,
      excerpt: b.excerpt,
      date: new Date(b.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      author: b.author,
      slug: b.slug,
      image: b.image,
      featured: b.featured,
      isLegacy: false,
    })),
    ...legacyBlogs,
  ];

  return (
    <>
      <SEO 
        title="Blogs - Hunza Food & Travel Guide | Best Restaurant in Hunza"
        description="Read about Hunza traditional food, local dishes, Attabad Lake history, and Hunza Valley culture. Discover the best food in Hunza and travel tips from Leopard Cave Restaurant."
        keywords="Hunza food, Hunza traditional food, local food in Hunza, best food in Hunza Valley, Hunza culture, Attabad Lake, best places in Hunza, Hunza travel guide"
      />
      <div className="flex flex-col w-full min-h-screen py-16 bg-background">
        <div className="container px-4 md:px-8 max-w-7xl mx-auto space-y-12 mt-8">
          <BackButton />
          <div className="text-center space-y-4 pt-8">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-primary/10 rounded-full">
                <BookOpen className="h-12 w-12 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-7xl font-extrabold text-primary tracking-tight uppercase">Blogs</h1>
            <p className="text-lg md:text-2xl text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed">
              Explore stories, history, and insights about Leopard Cave Restaurant and the beautiful Hunza Valley
            </p>
          </div>

        {/* Social Media Quick Links */}
        <div className="flex justify-center">
          <Button asChild size="lg" variant="outline" className="rounded-full font-bold">
            <Link to="/social-media" className="flex items-center gap-2">
              <Share2 className="h-5 w-5" />
              Visit Our Social Media Pages
            </Link>
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allBlogs.map((blog) => (
              <Card key={blog.id} className="border-none shadow-2xl bg-card overflow-hidden group hover:-translate-y-2 transition-all duration-300 rounded-3xl">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {blog.featured && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-primary text-primary-foreground px-3 py-1 text-xs font-bold flex items-center gap-1">
                        <Star className="h-3 w-3 fill-current" />
                        Featured
                      </Badge>
                    </div>
                  )}
                </div>
                <CardHeader className="p-6 pb-4">
                  <CardTitle className="text-2xl font-bold text-primary line-clamp-2">
                    {blog.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-6 space-y-4">
                  <p className="text-muted-foreground leading-relaxed line-clamp-3">
                    {blog.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{blog.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{blog.author}</span>
                    </div>
                  </div>
                  <Button asChild className="w-full rounded-full font-bold">
                    <Link to={`/blog/${blog.slug}`}>Read More</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
    </>
  );
}

