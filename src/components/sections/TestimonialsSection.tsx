import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

interface Review {
  id: string;
  name: string;
  platform: string;
  rating: number;
  text: string;
  date: string;
}

interface TestimonialsSectionProps {
  reviews: Review[];
}

export default function TestimonialsSection({ reviews }: TestimonialsSectionProps) {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary">
            What Our Guests Say
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Real reviews from our valued customers across Google Maps, Facebook, and social media
          </p>
        </div>

        <div className="md:hidden overflow-x-auto pb-4 -mx-4 px-4 scroll-smooth">
          <div className="flex gap-4 min-w-max">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="w-80 flex-shrink-0 bg-card rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-bold">{review.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {review.platform} • {review.date}
                      </p>
                    </div>
                    <div className="flex gap-0.5 flex-shrink-0">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-primary text-primary"
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {review.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden md:grid md:grid-cols-2 gap-6 md:gap-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-card rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 md:p-8"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg md:text-xl font-bold">{review.name}</h3>
                    <p className="text-sm md:text-base text-muted-foreground">
                      {review.platform} • {review.date}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 md:h-5 md:w-5 fill-primary text-primary"
                      />
                    ))}
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  {review.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10 md:mt-12">
          <Link
            to="/reservation"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 md:px-10 py-4 md:py-6 text-lg md:text-xl font-bold text-white rounded-full bg-primary hover:bg-secondary shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Book Your Experience
          </Link>
        </div>
      </div>
    </section>
  );
}
