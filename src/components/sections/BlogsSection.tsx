import { Link } from 'react-router-dom';
import { Star, Calendar, User } from 'lucide-react';
import type { Blog } from '@/types/types';

interface BlogsSectionProps {
  dbBlogs: Blog[];
}

export default function BlogsSection({ dbBlogs }: BlogsSectionProps) {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary">
            Latest Stories & Insights
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Read about Hunza's food, history, and culture
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {dbBlogs.length > 0 ? (
            dbBlogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-card rounded-2xl shadow-xl overflow-hidden group hover:-translate-y-2 transition-all duration-300"
              >
                <div className="relative h-56 md:h-64 overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {blog.featured && (
                    <div className="absolute top-4 right-4">
                      <span className="inline-flex items-center gap-1 bg-primary text-primary-foreground px-3 py-1 text-xs font-bold rounded-full">
                        <Star className="h-3 w-3 fill-current" /> Featured
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-5 md:p-6 space-y-4">
                  <h3 className="text-xl md:text-2xl font-bold text-primary line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed line-clamp-3 text-sm md:text-base">
                    {blog.excerpt}
                  </p>
                  <div className="flex items-center gap-3 md:gap-4 text-xs md:text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{blog.author}</span>
                    </div>
                  </div>
                  <Link
                    to={`/blog/${blog.slug}`}
                    className="inline-flex w-full items-center justify-center px-6 py-3 font-bold text-white rounded-full bg-primary hover:bg-secondary transition-all duration-300"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-muted-foreground text-lg border-2 border-dashed rounded-2xl bg-card">
              More stories coming soon!
            </div>
          )}
        </div>

        <div className="text-center mt-10 md:mt-12">
          <Link
            to="/blogs"
            className="inline-flex items-center justify-center px-8 md:px-10 py-4 md:py-6 text-lg md:text-xl font-bold text-white rounded-full bg-primary hover:bg-secondary shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Read All Blogs
          </Link>
        </div>
      </div>
    </section>
  );
}
