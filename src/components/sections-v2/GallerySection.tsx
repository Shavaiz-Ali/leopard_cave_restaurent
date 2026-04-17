import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Volume2, VolumeX, ArrowRight, X } from 'lucide-react';
import * as AspectRatio from '@radix-ui/react-aspect-ratio';
import { Dialog, DialogContent, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface GalleryItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  title: string;
  alt_text: string | null;
  description: string | null;
  storage_path: string | null;
  featured: boolean;
  created_at: string;
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

interface GallerySectionProps {
  dbGalleryItems: GalleryItem[];
  galleryLoading: boolean;
}

export default function GallerySection({ dbGalleryItems, galleryLoading }: GallerySectionProps) {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const featuredVideoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<GalleryItem | null>(null);
  const [selectedImage, setSelectedImage] = useState<{ id: string; src: string; alt: string; title: string; description?: string } | null>(null);
  const selectedEmbedUrl = selectedVideo ? getYouTubeEmbedUrl(selectedVideo.url) : null;

  const toggleMute = () => {
    const featuredVideo = featuredVideoRef.current;
    if (featuredVideo) {
      featuredVideo.muted = !featuredVideo.muted;
      setIsMuted(featuredVideo.muted);
    }
  };

  const mergedGalleryImages = dbGalleryItems
    .filter((i) => i.type === 'image')
    .map((i) => ({
      id: i.id,
      src: i.url,
      alt: i.alt_text || i.title,
      title: i.title,
      description: i.description,
    }));

  const mergedGalleryVideos = dbGalleryItems.filter((i) => i.type === 'video');
  const customFeaturedVideo = mergedGalleryVideos.find((i) => i.featured) || mergedGalleryVideos[0] || null;
  const displayReels = mergedGalleryVideos.filter((v) => v.url !== customFeaturedVideo?.url);
  const featuredEmbedUrl = customFeaturedVideo ? getYouTubeEmbedUrl(customFeaturedVideo.url) : null;

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

  return (
    <>
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-2">Our Space</h2>
            <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
              Discover the stunning views, cozy interiors, and delicious cuisine that make us unforgettable
            </p>
          </div>

          {/* Featured Video */}
          {customFeaturedVideo && (
            <div className="mb-16 md:mb-20">
              <div className="bg-card rounded-xl shadow-sm overflow-hidden max-w-4xl mx-auto">
                <div className="p-5 md:p-7">
                  <div className="text-center mb-6">
                    <h3 className="text-xl md:text-2xl font-medium text-primary mb-1">Welcome to Leopard Cave</h3>
                    <p className="text-sm text-muted-foreground">A perfect place to relax and enjoy</p>
                  </div>
                  <div className="relative rounded-lg overflow-hidden">
                    {featuredEmbedUrl ? (
                      <AspectRatio.Root ratio={16 / 9}>
                        <iframe
                          src={`${featuredEmbedUrl}?rel=0&modestbranding=1`}
                          title={customFeaturedVideo.title || 'Featured Video'}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          loading="lazy"
                          className="w-full h-full"
                          style={{ border: 0 }}
                        />
                      </AspectRatio.Root>
                    ) : (
                      <div className="relative">
                        <AspectRatio.Root ratio={16 / 9}>
                          <video
                            ref={(el) => {
                              featuredVideoRef.current = el;
                            }}
                            controls
                            controlsList="nodownload"
                            disablePictureInPicture
                            onContextMenu={(e) => e.preventDefault()}
                            className="w-full h-full"
                            muted
                            playsInline
                          >
                            <source src={customFeaturedVideo.url} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        </AspectRatio.Root>
                        <button
                          onClick={toggleMute}
                          className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm p-2 rounded-full hover:bg-black/80 transition-all z-20"
                          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                        >
                          {isMuted ? <VolumeX className="h-4 w-4 text-white" /> : <Volume2 className="h-4 w-4 text-white" />}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Gallery Images */}
          {mergedGalleryImages.length > 0 && (
            <div className="mb-16">
              <div className="flex items-end justify-between mb-6">
                <h3 className="text-lg md:text-xl font-medium text-foreground">Gallery</h3>
                <Link
                  to="/gallery"
                  className="hidden md:inline-flex items-center text-sm font-medium text-primary hover:opacity-80 transition-opacity"
                >
                  View All
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {galleryLoading ? (
                  [...Array(6)].map((_, i) => (
                    <div key={i} className="aspect-[4/5] rounded-xl bg-muted animate-pulse" />
                  ))
                ) : (
                  mergedGalleryImages.slice(0, 6).map((image) => (
                    <div
                      key={image.id}
                      className="group relative aspect-[4/5] rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-all duration-300"
                      onClick={() => setSelectedImage(image as any)}
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
                  ))
                )}
              </div>
              <div className="text-center mt-6 md:hidden">
                <Link
                  to="/gallery"
                  className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg border border-border text-sm font-medium hover:bg-accent transition-all"
                >
                  View All Photos
                </Link>
              </div>
            </div>
          )}

          {/* Video Reels - Play on hover */}
          {displayReels.length > 0 && (
            <div>
              <div className="flex items-end justify-between mb-6">
                <h3 className="text-lg md:text-xl font-medium text-foreground">Videos</h3>
                <Link
                  to="/videos"
                  className="hidden md:inline-flex items-center text-sm font-medium text-primary hover:opacity-80 transition-opacity"
                >
                  View All
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {displayReels.map((reel, index) => {
                  const embedUrl = getYouTubeEmbedUrl(reel.url);
                  return (
                    <div
                      key={reel.id || index}
                      className="group relative aspect-[4/5] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
                      onMouseEnter={() => handleVideoMouseEnter(index)}
                      onMouseLeave={() => handleVideoMouseLeave(index)}
                      onClick={() => setSelectedVideo(reel)}
                    >
                      {embedUrl ? (
                        <iframe
                          src={`${embedUrl}?rel=0&modestbranding=1&mute=1&controls=0&showinfo=0`}
                          title={reel.title || `Video ${index + 1}`}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          loading="lazy"
                          className="absolute inset-0 w-full h-full"
                          style={{ border: 0 }}
                        />
                      ) : (
                        <video
                          ref={(el) => {
                            videoRefs.current[index] = el;
                          }}
                          muted
                          loop
                          playsInline
                          disablePictureInPicture
                          onContextMenu={(e) => e.preventDefault()}
                          className="absolute inset-0 w-full h-full object-cover"
                        >
                          <source src={reel.url} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                      <div className="relative h-full flex flex-col justify-end p-5 md:p-6">
                        <h3 className="text-lg md:text-xl font-medium text-white mb-2">{reel.title}</h3>
                        {reel.description && (
                          <p className="text-white/85 text-sm leading-relaxed line-clamp-2">{reel.description}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

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
                {selectedEmbedUrl ? (
                  <AspectRatio.Root ratio={16 / 9}>
                    <iframe
                      src={`${selectedEmbedUrl}?rel=0&modestbranding=1&autoplay=1`}
                      title={selectedVideo.title || 'Video'}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="w-full h-full rounded-lg"
                      style={{ border: 0 }}
                    />
                  </AspectRatio.Root>
                ) : (
                  <AspectRatio.Root ratio={16 / 9}>
                    <video
                      autoPlay
                      controls
                      controlsList="nodownload"
                      disablePictureInPicture
                      onContextMenu={(e) => e.preventDefault()}
                      className="w-full h-full rounded-lg"
                      playsInline
                    >
                      <source src={selectedVideo.url} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </AspectRatio.Root>
                )}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
