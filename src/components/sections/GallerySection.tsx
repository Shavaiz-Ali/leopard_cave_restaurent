import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Volume2, VolumeX } from 'lucide-react';

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

  const handleVideoPlay = (index: number) => {
    videoRefs.current.forEach((video, i) => {
      if (video && i !== index && !video.paused) {
        video.pause();
      }
    });
  };

  const toggleMute = () => {
    const featuredVideo = featuredVideoRef.current;
    if (featuredVideo) {
      featuredVideo.muted = !featuredVideo.muted;
      setIsMuted(featuredVideo.muted);
    }
  };

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
      observers.forEach((observer) => observer.disconnect());
    };
  }, [dbGalleryItems]);

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
  const displayReels = mergedGalleryVideos.filter((v) => v.url !== customFeaturedVideo?.url).slice(0, 4);
  const featuredEmbedUrl = customFeaturedVideo ? getYouTubeEmbedUrl(customFeaturedVideo.url) : null;

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary">
            Explore Our Beautiful Space
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Discover the stunning views, cozy interiors, and delicious cuisine that make Leopard Cave Restaurant unforgettable
          </p>
        </div>

        {/* Featured Video */}
        <div className="mb-16 md:mb-20">
          <div className="bg-card rounded-2xl shadow-xl overflow-hidden max-w-5xl mx-auto">
            <div className="p-6 md:p-8 space-y-6">
              <div className="text-center space-y-3">
                <h3 className="text-2xl md:text-3xl font-bold text-primary">
                  Welcome to Leopard Cave Restaurant
                </h3>
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                  A perfect place for families, friends, and groups to relax and enjoy. Experience a peaceful and natural environment with breathtaking surroundings.
                </p>
              </div>

              {customFeaturedVideo ? (
                <div className="relative rounded-xl overflow-hidden shadow-lg">
                  {featuredEmbedUrl ? (
                    <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                      <iframe
                        src={`${featuredEmbedUrl}?rel=0&modestbranding=1&autoplay=1&mute=1`}
                        title={customFeaturedVideo.title || 'Featured Video'}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        loading="lazy"
                        className="absolute inset-0 w-full h-full"
                        style={{ border: 0 }}
                      />
                    </div>
                  ) : (
                    <div className="relative">
                      <video
                        ref={(el) => {
                          videoRefs.current[0] = el;
                          featuredVideoRef.current = el;
                        }}
                        controls
                        controlsList="nodownload"
                        disablePictureInPicture
                        onPlay={() => handleVideoPlay(0)}
                        onContextMenu={(e) => e.preventDefault()}
                        className="w-full aspect-video"
                        muted
                        playsInline
                      >
                        <source src={customFeaturedVideo.url} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>

                      <button
                        onClick={toggleMute}
                        className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm p-3 rounded-full hover:bg-black/90 transition-all z-20 hover:scale-110"
                        aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                      >
                        {isMuted ? <VolumeX className="h-5 w-5 md:h-6 md:w-6 text-white" /> : <Volume2 className="h-5 w-5 md:h-6 md:w-6 text-white" />}
                      </button>

                      <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-lg pointer-events-none z-10">
                        <p className="text-white text-xs md:text-sm font-semibold">www.leopardcaverestaurant.com</p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-16 text-muted-foreground border-2 border-dashed rounded-2xl">
                  Featured video coming soon!
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Video Reels - Horizontal Scroll on Mobile */}
        <div className="mb-16 md:mb-20">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-primary">More Videos & Reels</h3>
          </div>

          <div className="md:hidden overflow-x-auto pb-4 -mx-4 px-4 scroll-smooth">
            <div className="flex gap-4 min-w-max">
              {displayReels.length > 0 ? (
                displayReels.map((reel, index) => {
                  const reelEmbedUrl = getYouTubeEmbedUrl(reel.url);
                  return (
                    <div
                      key={reel.id || index}
                      className="w-64 flex-shrink-0 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                    >
                      <div className="relative" style={{ paddingBottom: '177.78%' }}>
                        {reelEmbedUrl ? (
                          <iframe
                            src={`${reelEmbedUrl}?rel=0&modestbranding=1`}
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
                              videoRefs.current[index + 1] = el;
                            }}
                            controls
                            controlsList="nodownload"
                            disablePictureInPicture
                            onPlay={() => handleVideoPlay(index + 1)}
                            onContextMenu={(e) => e.preventDefault()}
                            className="absolute inset-0 w-full h-full object-cover"
                            playsInline
                          >
                            <source src={reel.url} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="w-full text-center py-12 text-muted-foreground border-2 border-dashed rounded-2xl">
                  More videos coming soon!
                </div>
              )}
            </div>
          </div>

          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayReels.length > 0 ? (
              displayReels.map((reel, index) => {
                const reelEmbedUrl = getYouTubeEmbedUrl(reel.url);
                return (
                  <div
                    key={reel.id || index}
                    className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="relative" style={{ paddingBottom: '56.25%' }}>
                      {reelEmbedUrl ? (
                        <iframe
                          src={`${reelEmbedUrl}?rel=0&modestbranding=1`}
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
                            videoRefs.current[index + 1] = el;
                          }}
                          controls
                          controlsList="nodownload"
                          disablePictureInPicture
                          onPlay={() => handleVideoPlay(index + 1)}
                          onContextMenu={(e) => e.preventDefault()}
                          className="absolute inset-0 w-full h-full object-cover"
                          playsInline
                        >
                          <source src={reel.url} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      )}
                      {!reelEmbedUrl && (
                        <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded text-xs pointer-events-none z-10">
                          <p className="text-white font-semibold">www.leopardcaverestaurant.com</p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-full text-center py-12 text-muted-foreground border-2 border-dashed rounded-2xl">
                More videos coming soon!
              </div>
            )}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/videos"
              className="inline-flex items-center justify-center px-8 md:px-10 py-4 md:py-6 text-lg md:text-xl font-bold text-white rounded-full bg-primary hover:bg-secondary shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              View More Videos
            </Link>
          </div>
        </div>

        {/* Gallery Images */}
        <div>
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-primary">Our Gallery</h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
            {galleryLoading ? (
              [...Array(8)].map((_, i) => (
                <div key={i} className="rounded-xl overflow-hidden bg-muted">
                  <div className="aspect-square bg-muted animate-pulse" />
                </div>
              ))
            ) : mergedGalleryImages.length > 0 ? (
              mergedGalleryImages.slice(0, 8).map((image) => (
                <div
                  key={image.id}
                  className="group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    {image.title && (
                      <h4 className="text-white text-sm md:text-base font-bold leading-tight mb-1">
                        {image.title}
                      </h4>
                    )}
                    <p className="text-white/90 text-xs md:text-sm font-medium leading-tight">
                      {image.alt}
                    </p>
                    {image.description && (
                      <p className="text-white/70 text-xs mt-1 line-clamp-2">{image.description}</p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-muted-foreground border-2 border-dashed rounded-2xl">
                Gallery images coming soon!
              </div>
            )}
          </div>

          <div className="text-center mt-10 md:mt-12">
            <Link
              to="/gallery"
              className="inline-flex items-center justify-center px-8 md:px-10 py-4 md:py-6 text-lg md:text-xl font-bold text-white rounded-full bg-primary hover:bg-secondary shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              View More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
