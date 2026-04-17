import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Star } from 'lucide-react';
import type { Blog } from '@/types/types';

interface BlogsSectionProps {
  dbBlogs: Blog[];
}

export default function BlogsSection({ dbBlogs }: BlogsSectionProps) {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-12">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-2">Latest Stories</h2>
            <p className="text-sm md:text-base text-muted-foreground">Read about Hunza's food, history, and culture</p>
          </div>
          {dbBlogs.length > 0 && (
            <Link
              to="/blogs"
              className="hidden md:inline-flex items-center text-sm font-medium text-primary hover:opacity-80 transition-opacity mt-4 md:mt-0"
            >
              View All
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          )}
        </div>

        {dbBlogs.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {dbBlogs.map((blog) => (
                <article key={blog.id} className="group bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {blog.featured && (
                      <div className="absolute top-3 left-3">
                        <span className="inline-flex items-center gap-1 bg-primary text-primary-foreground px-2.5 py-1 text-xs font-medium rounded-full">
                          <Star className="h-3 w-3 fill-current" /> Featured
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-medium text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      <Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{blog.excerpt}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-3.5 w-3.5" />
                        <span>{blog.author}</span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <div className="text-center mt-8 md:hidden">
              <Link
                to="/blogs"
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg border border-border text-sm font-medium hover:bg-accent transition-all"
              >
                View All Stories
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-16 text-muted-foreground border border-border rounded-xl">
            More stories coming soon!
          </div>
        )}
      </div>
    </section>
  );
}
