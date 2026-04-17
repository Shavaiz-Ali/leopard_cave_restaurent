import { useRef } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';

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
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-12">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-2">What Our Guests Say</h2>
            <p className="text-sm md:text-base text-muted-foreground">Real reviews from our valued customers</p>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <button
              onClick={scrollPrev}
              className="p-2 rounded-full border border-border hover:bg-accent transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={scrollNext}
              className="p-2 rounded-full border border-border hover:bg-accent transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {reviews.map((review) => (
              <div key={review.id} className="min-w-0 sm:min-w-[50%] lg:min-w-[33.333%] pl-0 sm:pl-4 lg:pl-6 first:pl-0">
                <div className="bg-card rounded-xl p-5 md:p-6 shadow-sm h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-medium text-foreground">{review.name}</h4>
                      <p className="text-xs text-muted-foreground">{review.platform} • {review.date}</p>
                    </div>
                    <div className="flex">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{review.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
