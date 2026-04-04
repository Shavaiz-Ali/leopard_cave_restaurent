import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Camera, Image as ImageIcon, Video } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '@/components/common/SEO';
import BackButton from '@/components/common/BackButton';

const images = [
  { id: '1', src: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260330/file-alrz5b3t962o.png', alt: 'Stunning mountain view from restaurant' },
  { id: '2', src: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260330/file-alrz5b3t9ce8.png', alt: 'Scenic landscape and dining area' },
  { id: '3', src: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260330/file-alrz4vbkcq9s.png', alt: 'Beautiful restaurant ambiance' },
  { id: '4', src: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260329/file-akxqj3o5lnnk.png', alt: 'Rustic cave dining with stunning views' },
  { id: '5', src: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260329/file-akxqj3o5mj9c.png', alt: 'Rustic hillside restaurant at sunset' },
  { id: '6', src: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260329/file-akxcbezm1x4w.jpeg', alt: 'Restaurant exterior view' },
  { id: '7', src: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260329/file-akxcbezm29s0.jpeg', alt: 'Scenic mountain backdrop' },
  { id: '8', src: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260329/file-akxcbezm1e68.jpeg', alt: 'Restaurant entrance and surroundings' },
  { id: '9', src: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260330/file-als6qwq3iwhs.jpeg', alt: 'Restaurant interior dining area' },
  { id: '10', src: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260330/file-als6qgxumtc0.jpeg', alt: 'Cozy seating arrangement' },
  { id: '11', src: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260330/file-als6qwq3idj4.jpeg', alt: 'Panoramic lake view from restaurant' },
  { id: '12', src: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260330/file-als6qwq3j2te.jpeg', alt: 'Outdoor seating with mountain views' },
  { id: '13', src: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260330/file-alskgm8i562o.jpeg', alt: 'Restaurant dining space' },
  { id: '14', src: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260330/file-alskgm8i4n40.jpeg', alt: 'Beautiful interior setup' },
  { id: '15', src: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260330/file-alskgm8i5ips.jpeg', alt: 'Cozy dining atmosphere' },
  { id: '16', src: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260330/file-alskgm8i4agw.jpeg', alt: 'Restaurant seating area' },
  { id: '17', src: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260330/file-alskgm8i5ce8.jpeg', alt: 'Welcoming restaurant interior' },
  { id: '18', src: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260330/file-alsqut6b73eo.jpeg', alt: 'Restaurant dining experience' },
  { id: '19', src: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260330/file-alsqude2b6kg.jpeg', alt: 'Elegant restaurant setting' },
  { id: '20', src: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260330/file-alsqude2anls.jpeg', alt: 'Comfortable dining area' },
  { id: '21', src: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260330/file-alsqut6b7mdc.jpeg', alt: 'Inviting restaurant atmosphere' },
  { id: '22', src: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260330/file-alsqude2bcw0.jpeg', alt: 'Charming restaurant interior' },
  { id: '23', src: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260330/file-alsxg0o2o7wg.jpeg', alt: 'Restaurant ambiance and decor' },
  { id: '24', src: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260330/file-alsxg0o2pg5c.jpeg', alt: 'Dining area with natural light' },
  { id: '25', src: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260330/file-alsxg0o2okjk.jpeg', alt: 'Cozy restaurant corner' },
  { id: '26', src: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260330/file-alsxg0o2p9ts.jpeg', alt: 'Spacious dining hall' },
  { id: '27', src: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260330/file-alsxf53kvcao.jpeg', alt: 'Warm restaurant interior' },
  { id: '28', src: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260330/file-alt9l5yl2qkg.jpeg', alt: 'Restaurant dining setup' },
  { id: '29', src: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260330/file-alt9l5yl1uyo.jpeg', alt: 'Elegant table arrangement' },
  { id: '30', src: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260330/file-alt9l5yl27ls.jpeg', alt: 'Cozy dining corner' },
  { id: '31', src: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260330/file-alt9l5yl2ww0.jpeg', alt: 'Beautiful restaurant interior' },
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'images' | 'videos'>('images');
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const handleVideoPlay = (index: number) => {
    videoRefs.current.forEach((video, i) => {
      if (video && i !== index && !video.paused) {
        video.pause();
      }
    });
  };

  // Intersection Observer for video auto-pause on scroll (mobile + desktop)
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    videoRefs.current.forEach((video) => {
      if (!video) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Video is in view - do nothing (let user control play)
            } else {
              // Video is out of view - auto pause
              if (!video.paused) {
                video.pause();
              }
            }
          });
        },
        { 
          threshold: 0.25, // Trigger when 25% of video is visible
          rootMargin: '0px' // No margin
        }
      );

      observer.observe(video);
      observers.push(observer);
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, [activeTab]); // Re-run when tab changes

  const videos = [
    { id: '1', src: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260331/file-ami9gyitjabk.mp4', title: 'Welcome to Leopard Cave Restaurant' },
    { id: '2', src: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260331/file-ami98mm4ey2o.mp4', title: 'Restaurant Ambiance' },
    { id: '3', src: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260331/file-ami9atjcwyrk.mp4', title: 'Dining Experience' },
    { id: '4', src: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260401/file-ao0pk0xvdbsw.mp4', title: 'Restaurant Views' },
    { id: '5', src: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260331/file-ami9b9bltekg.mp4', title: 'Lake Views' },
    { id: '6', src: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260331/file-ami9c4w3ma68.mp4', title: 'Restaurant Tour' },
    { id: '7', src: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260401/file-ao0qt6rc78qo.mp4', title: 'Scenic Beauty' },
    { id: '8', src: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260401/file-ao0qtmjl416o.mp4', title: 'Mountain Views' },
  ];

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {images.map((image, index) => (
              <Card 
                key={image.id} 
                className="overflow-hidden border-none shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:-translate-y-3 bg-card group cursor-pointer"
                onClick={() => setSelectedImage(image.src)}
              >
                <CardContent className="p-0 relative">
                  <AspectRatio ratio={4/3}>
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-contain bg-muted transition-transform duration-700 group-hover:scale-105"
                    />
                  </AspectRatio>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                    <p className="text-white text-sm md:text-base font-semibold leading-tight drop-shadow-lg">
                      {image.alt}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Videos Tab Content */}
      {activeTab === 'videos' && (
        <div className="container px-4 md:px-8 max-w-7xl mx-auto pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video, index) => (
              <Card key={video.id} className="overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-card group">
                <CardContent className="p-0 relative">
                  <div className="relative" style={{ maxHeight: '400px', overflow: 'hidden' }}>
                    <video 
                      ref={(el) => { videoRefs.current[index] = el; }}
                      controls 
                      controlsList="nodownload"
                      disablePictureInPicture
                      onPlay={() => handleVideoPlay(index)}
                      onContextMenu={(e) => e.preventDefault()}
                      className="w-full h-auto"
                      style={{ maxHeight: '400px' }}
                    >
                      <source src={video.src} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  {/* Watermark Overlay */}
                  <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm px-3 py-2 rounded-lg pointer-events-none z-10">
                    <p className="text-white text-xs font-semibold">www.leopardcaverestaurant.com</p>
                  </div>
                  {/* Video Title */}
                  <div className="p-4 bg-card">
                    <h3 className="text-lg font-bold text-primary">{video.title}</h3>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
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
