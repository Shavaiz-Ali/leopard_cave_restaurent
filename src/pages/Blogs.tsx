import { useState, useEffect } from "react";
import BackButton from "@/components/common/BackButton";
import SEO from "@/components/common/SEO";
import { Calendar, User, BookOpen, Star, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { supabase } from '@/utils/supabase';
import type { Blog } from '@/types/types';

export default function Blogs() {
  const [dbBlogs, setDbBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

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
        // Silently fail
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <>
      <SEO 
        title="Blogs - Hunza Food & Travel Guide | Best Restaurant in Hunza"
        description="Read about Hunza traditional food, local dishes, Attabad Lake history, and Hunza Valley culture. Discover the best food in Hunza and travel tips from Leopard Cave Restaurant."
        keywords="Hunza food, Hunza traditional food, local food in Hunza, best food in Hunza Valley, Hunza culture, Attabad Lake, best places in Hunza, Hunza travel guide"
      />
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
            <div className="mb-6">
              <BackButton />
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-primary mb-3">
                Blogs
              </h1>
              <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
                Explore stories, history, and insights about Leopard Cave Restaurant and the beautiful Hunza Valley
              </p>
            </div>
          </div>
        </section>

        {/* Blogs Grid */}
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
            {loading ? (
              <div className="flex justify-center items-center py-16">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : dbBlogs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {dbBlogs.map((blog) => (
                  <div 
                    key={blog.id} 
                    className="group relative aspect-[4/5] rounded-xl overflow-hidden shadow-sm border border-border cursor-pointer"
                    onClick={() => setSelectedBlog(blog)}
                  >
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                    {blog.featured && (
                      <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1">
                        <Star className="h-3 w-3 fill-current" />
                        Featured
                      </div>
                    )}
                    <div className="relative h-full flex flex-col justify-end p-5">
                      <h3 className="text-lg font-medium text-white mb-2 line-clamp-2">
                        {blog.title}
                      </h3>
                      <p className="text-sm text-white/80 line-clamp-2 mb-3">
                        {blog.excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-white/70">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>{new Date(blog.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="h-3.5 w-3.5" />
                          <span>{blog.author}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 text-muted-foreground border border-border rounded-xl bg-card">
                No blogs available at the moment. Please check back soon!
              </div>
            )}
          </div>
        </section>

        {/* Blog Dialog */}
        <Dialog open={!!selectedBlog} onOpenChange={(open) => !open && setSelectedBlog(null)}>
          <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto pt-12">
            <DialogTitle className="sr-only">
              {selectedBlog?.title || 'Blog Post'}
            </DialogTitle>
            {selectedBlog && (
              <div className="space-y-6">
                <div className="rounded-xl overflow-hidden">
                  <img
                    src={selectedBlog.image}
                    alt={selectedBlog.title}
                    className="w-full h-64 md:h-80 object-cover"
                  />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(selectedBlog.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{selectedBlog.author}</span>
                    </div>
                  </div>
                  <h2 className="text-xl md:text-2xl font-semibold text-foreground">
                    {selectedBlog.title}
                  </h2>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    {selectedBlog.excerpt}
                  </p>
                  {selectedBlog.content && (
                    <div className="text-sm md:text-base text-muted-foreground leading-relaxed whitespace-pre-wrap">
                      {selectedBlog.content}
                    </div>
                  )}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
