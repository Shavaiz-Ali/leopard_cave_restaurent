import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Skeleton } from '@/components/ui/skeleton';
import { Camera, Image as ImageIcon, Video } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import SEO from '@/components/common/SEO';
import BackButton from '@/components/common/BackButton';
import { supabase } from '@/utils/supabase';

interface GalleryItem {
  id: string;
  url: string;
  type: 'image' | 'video';
  title: string;
  alt_text?: string;
  description?: string;
  created_at?: string;
}

const getYouTubeEmbedUrl = (url: string): string | null => {
  if (!url) return null;
  const patterns = [
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?(?:.*&)?v=([a-zA-Z0-9_-]{11})/,
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/v\/([a-zA-Z0-9_-]{11})/,
    /(?:https?:\/\/)?youtu\.be\/([a-zA-Z0-9_-]{11})/,
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
  }
  return null;
};

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'images' | 'videos'>('images');
  const [dbImages, setDbImages] = useState<{ id: string; src: string; alt: string; title?: string; description?: string; }[]>([]);
  const [dbVideos, setDbVideos] = useState<{ id: string; src: string; title: string; description?: string; }[]>([]);
  const [loading, setLoading] = useState(true);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const { data, error } = await supabase
          .from('gallery')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        if (data) {
          const fetchedImages = data
            .filter((item: GalleryItem) => item.type === 'image')
            .map((item: GalleryItem) => ({
              id: item.id,
              src: item.url,
              alt: item.alt_text || item.title,
              title: item.title,
              description: item.description
            }));

          const fetchedVideos = data
            .filter((item: GalleryItem) => item.type === 'video')
            .map((item: GalleryItem) => ({
              id: item.id,
              src: item.url,
              title: item.title,
              description: item.description
            }));

          setDbImages(fetchedImages);
          setDbVideos(fetchedVideos);
        }
      } catch (err) {
        console.error('Error fetching gallery:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const handleVideoPlay = (index: number) => {
    videoRefs.current.forEach((video, i) => {
      if (video && i !== index && !video.paused) {
        video.pause();
      }
    });
  };

  // Intersection Observer for video auto-pause on scroll
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    videoRefs.current.forEach((video) => {
      if (!video) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting && !video.paused) {
              video.pause();
            }
          });
        },
        { threshold: 0.25 }
      );

      observer.observe(video);
      observers.push(observer);
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, [activeTab]);

  return (
    <>
      <SEO
        title="Gallery - Best Restaurant in Hunza Photos & Videos | Leopard Cave"
        description="View stunning photos and videos of the best restaurant in Hunza Valley. See Attabad Lake views, authentic Hunza food, and our unique dining experience in Gilgit Baltistan."
        keywords="best restaurants in Hunza, restaurants at Attabad Lake, Hunza restaurant photos, best places in Hunza, Hunza Valley gallery, best food in Hunza, where to eat in Hunza"
      />
      <div className="flex flex-col w-full min-h-screen bg-gradient-to-b from-background via-muted/20 to-background">
        {/* Hero Section */}
        <div className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-primary/5" />
          <div className="container px-4 md:px-8 max-w-7xl mx-auto relative z-10">
            <BackButton />
            <div className="text-center space-y-4 max-w-4xl mx-auto">
              <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-3">
                <Camera className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-primary tracking-tight">
                Gallery
              </h1>
              <p className="text-base md:text-lg text-muted-foreground font-light leading-relaxed max-w-3xl mx-auto">
                Explore our stunning collection of images and videos showcasing the beauty and ambiance of Leopard Cave Restaurant
              </p>
              <div className="h-1 w-20 bg-primary mx-auto rounded-full" />

              {/* Tab Navigation */}
              <div className="flex justify-center gap-4 mt-8">
                <Button
                  size="lg"
                  variant={activeTab === 'images' ? 'default' : 'outline'}
                  onClick={() => setActiveTab('images')}
                  className="rounded-full text-lg px-8 py-6 font-bold shadow-xl hover:scale-105 transition-all duration-300"
                >
                  <ImageIcon className="h-5 w-5 mr-2" />
                  Images
                </Button>
                <Button
                  size="lg"
                  variant={activeTab === 'videos' ? 'default' : 'outline'}
                  onClick={() => setActiveTab('videos')}
                  className="rounded-full text-lg px-8 py-6 font-bold shadow-xl hover:scale-105 transition-all duration-300"
                >
                  <Video className="h-5 w-5 mr-2" />
                  Videos
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Images Tab Content */}
        {activeTab === 'images' && (
          <div className="container px-4 md:px-8 max-w-7xl mx-auto pb-20">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="overflow-hidden border-none bg-card">
                    <CardContent className="p-0">
                      <AspectRatio ratio={4 / 3}>
                        <Skeleton className="w-full h-full" />
                      </AspectRatio>
                      <div className="p-4 space-y-2">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-3 w-1/2" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : dbImages.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {dbImages.map((image) => (
                  <Card
                    key={image.id}
                    className="overflow-hidden border-none shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:-translate-y-3 bg-card group cursor-pointer"
                    onClick={() => setSelectedImage(image.src)}
                  >
                    <CardContent className="p-0 relative">
                      <AspectRatio ratio={4 / 3}>
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="w-full h-full object-cover bg-muted transition-transform duration-700 group-hover:scale-105"
                        />
                      </AspectRatio>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                        {image.title && (
                          <h3 className="text-white text-base md:text-lg font-bold leading-tight drop-shadow-lg mb-2">
                            {image.title}
                          </h3>
                        )}
                        <p className="text-white text-sm md:text-base font-medium leading-tight drop-shadow-lg">
                          {image.alt}
                        </p>
                        {image.description && (
                          <p className="text-white/80 text-xs md:text-sm mt-2 line-clamp-2">
                            {image.description}
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 text-muted-foreground border-2 border-dashed rounded-3xl bg-card">
                Images coming soon!
              </div>
            )}
          </div>
        )}

        {/* Videos Tab Content */}
        {activeTab === 'videos' && (
          <div className="container px-4 md:px-8 max-w-7xl mx-auto pb-20">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="overflow-hidden border-none bg-card">
                    <CardContent className="p-0">
                      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                        <Skeleton className="absolute inset-0 w-full h-full" />
                      </div>
                      <div className="p-4 space-y-2">
                        <Skeleton className="h-5 w-3/4" />
                        <Skeleton className="h-3 w-1/2" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : dbVideos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {dbVideos.map((video, index) => {
                  const embedUrl = getYouTubeEmbedUrl(video.src);
                  return (
                    <Card key={video.id} className="overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-card group">
                      <CardContent className="p-0 relative">
                        <div className="relative w-full" style={{ paddingBottom: '56.25%' /* 16:9 */ }}>
                          {embedUrl ? (
                            <iframe
                              src={`${embedUrl}?rel=0&modestbranding=1&enablejsapi=1`}
                              title={video.title}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              allowFullScreen
                              loading="lazy"
                              className="absolute inset-0 w-full h-full rounded-none"
                              style={{ border: 0 }}
                            />
                          ) : (
                            <video
                              ref={(el) => { videoRefs.current[index] = el; }}
                              controls
                              controlsList="nodownload"
                              disablePictureInPicture
                              onPlay={() => handleVideoPlay(index)}
                              onContextMenu={(e) => e.preventDefault()}
                              className="absolute inset-0 w-full h-full object-cover"
                              playsInline
                            >
                              <source src={video.src} type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                          )}
                        </div>
                        {/* Watermark Overlay — only for non-YouTube videos */}
                        {!embedUrl && (
                          <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm px-3 py-2 rounded-lg pointer-events-none z-10">
                            <p className="text-white text-xs font-semibold">www.leopardcaverestaurant.com</p>
                          </div>
                        )}
                        {/* Video Title */}
                        <div className="p-4 bg-card">
                          <h3 className="text-lg font-bold text-primary mb-2">{video.title}</h3>
                          {video.description && (
                            <p className="text-sm text-muted-foreground line-clamp-2">{video.description}</p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-20 text-muted-foreground border-2 border-dashed rounded-3xl bg-card">
                Videos coming soon!
              </div>
            )}
          </div>
        )}

        {/* Lightbox Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 animate-fade-in"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-4 right-4 text-white text-4xl hover:text-primary transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              ×
            </button>
            <img
              src={selectedImage}
              alt="Full size view"
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            />
          </div>
        )}
      </div>
    </>
  );
}