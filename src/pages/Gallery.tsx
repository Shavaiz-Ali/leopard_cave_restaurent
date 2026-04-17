import { useState, useRef, useEffect } from 'react';
import { Camera, Image as ImageIcon, Video, X } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
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
  const [activeTab, setActiveTab] = useState<'images' | 'videos'>('images');
  const [dbImages, setDbImages] = useState<{ id: string; src: string; alt: string; title?: string; description?: string; }[]>([]);
  const [dbVideos, setDbVideos] = useState<{ id: string; src: string; title: string; description?: string; }[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<{ id: string; src: string; alt: string; title?: string; description?: string; } | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<{ id: string; src: string; title: string; description?: string; } | null>(null);
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

  const handleVideoMouseEnter = (index: number) => {
    const video = videoRefs.current[index];
    if (video) {
      video.play().catch(() => {});
    }
  };

  const handleVideoMouseLeave = (index: number) => {
    const video = videoRefs.current[index];
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  const selectedVideoEmbedUrl = selectedVideo ? getYouTubeEmbedUrl(selectedVideo.src) : null;

  return (
    <>
      <SEO
        title="Gallery - Best Restaurant in Hunza Photos & Videos | Leopard Cave"
        description="View stunning photos and videos of the best restaurant in Hunza Valley. See Attabad Lake views, authentic Hunza food, and our unique dining experience in Gilgit Baltistan."
        keywords="best restaurants in Hunza, restaurants at Attabad Lake, Hunza restaurant photos, best places in Hunza, Hunza Valley gallery, best food in Hunza, where to eat in Hunza"
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
                <Camera className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-primary mb-3">
                Gallery
              </h1>
              <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
                Explore our stunning collection of images and videos showcasing the beauty and ambiance of Leopard Cave Restaurant
              </p>
            </div>

            {/* Tab Navigation */}
            <div className="flex justify-center gap-4">
              <Button
                variant={activeTab === 'images' ? 'default' : 'outline'}
                onClick={() => setActiveTab('images')}
                className="px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300"
              >
                <ImageIcon className="h-4 w-4 mr-2" />
                Images
              </Button>
              <Button
                variant={activeTab === 'videos' ? 'default' : 'outline'}
                onClick={() => setActiveTab('videos')}
                className="px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300"
              >
                <Video className="h-4 w-4 mr-2" />
                Videos
              </Button>
            </div>
          </div>
        </section>

        {/* Images Tab Content */}
        {activeTab === 'images' && (
          <section className="py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
              <div className="text-center mb-10">
                <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-2">Photos</h2>
                <p className="text-sm md:text-base text-muted-foreground">Capture the essence of our beautiful space</p>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="aspect-[4/5] rounded-xl bg-muted animate-pulse" />
                  ))}
                </div>
              ) : dbImages.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {dbImages.map((image) => (
                    <div
                      key={image.id}
                      className="group relative aspect-[4/5] rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-all duration-300"
                      onClick={() => setSelectedImage(image)}
                    >
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                      <div className="relative h-full flex flex-col justify-end p-5 md:p-6">
                        <h3 className="text-lg md:text-xl font-medium text-white mb-2">{image.title}</h3>
                        {image.description && (
                          <p className="text-white/85 text-sm leading-relaxed line-clamp-2">{image.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 text-muted-foreground border border-border rounded-xl">
                  Images coming soon!
                </div>
              )}
            </div>
          </section>
        )}

        {/* Videos Tab Content */}
        {activeTab === 'videos' && (
          <section className="py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
              <div className="text-center mb-10">
                <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-2">Videos</h2>
                <p className="text-sm md:text-base text-muted-foreground">Watch our experience in motion</p>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="aspect-[4/5] rounded-xl bg-muted animate-pulse" />
                  ))}
                </div>
              ) : dbVideos.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {dbVideos.map((video, index) => {
                    const embedUrl = getYouTubeEmbedUrl(video.src);
                    return (
                      <div
                        key={video.id}
                        className="group relative aspect-[4/5] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
                        onMouseEnter={() => !embedUrl && handleVideoMouseEnter(index)}
                        onMouseLeave={() => !embedUrl && handleVideoMouseLeave(index)}
                        onClick={() => setSelectedVideo(video)}
                      >
                        {embedUrl ? (
                          <iframe
                            src={`${embedUrl}?rel=0&modestbranding=1&mute=1&controls=0&showinfo=0`}
                            title={video.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            loading="lazy"
                            className="absolute inset-0 w-full h-full"
                            style={{ border: 0 }}
                          />
                        ) : (
                          <video
                            ref={(el) => { videoRefs.current[index] = el; }}
                            muted
                            loop
                            playsInline
                            disablePictureInPicture
                            onContextMenu={(e) => e.preventDefault()}
                            className="absolute inset-0 w-full h-full object-cover"
                          >
                            <source src={video.src} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                        <div className="relative h-full flex flex-col justify-end p-5 md:p-6">
                          <h3 className="text-lg md:text-xl font-medium text-white mb-2">{video.title}</h3>
                          {video.description && (
                            <p className="text-white/85 text-sm leading-relaxed line-clamp-2">{video.description}</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-16 text-muted-foreground border border-border rounded-xl">
                  Videos coming soon!
                </div>
              )}
            </div>
          </section>
        )}
      </div>

      {/* Image Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent className="sm:max-w-4xl p-0 overflow-hidden">
          <DialogTitle className="sr-only">
            {selectedImage?.title || 'Image'}
          </DialogTitle>
          {selectedImage && (
            <div>
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-full h-auto max-h-[80vh] object-contain"
              />
              <div className="p-6">
                <h3 className="text-lg font-medium">{selectedImage.title}</h3>
                {selectedImage.description && (
                  <p className="mt-1 text-sm text-muted-foreground">{selectedImage.description}</p>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Video Dialog */}
      <Dialog open={!!selectedVideo} onOpenChange={(open) => !open && setSelectedVideo(null)}>
        <DialogContent className="sm:max-w-4xl p-0 overflow-hidden">
          <DialogTitle className="sr-only">
            {selectedVideo?.title || 'Video'}
          </DialogTitle>
          <div className="p-1">
            {selectedVideo && (
              <div className="relative">
                {selectedVideoEmbedUrl ? (
                  <div className="aspect-video">
                    <iframe
                      src={`${selectedVideoEmbedUrl}?rel=0&modestbranding=1&autoplay=1`}
                      title={selectedVideo.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="w-full h-full rounded-lg"
                      style={{ border: 0 }}
                    />
                  </div>
                ) : (
                  <div className="aspect-video">
                    <video
                      autoPlay
                      controls
                      controlsList="nodownload"
                      disablePictureInPicture
                      onContextMenu={(e) => e.preventDefault()}
                      className="w-full h-full rounded-lg"
                      playsInline
                    >
                      <source src={selectedVideo.src} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
