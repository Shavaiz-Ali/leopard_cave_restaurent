import { Card, CardContent } from '@/components/ui/card';
import { Camera } from 'lucide-react';
import { useRef, useEffect } from 'react';
import BackButton from '@/components/common/BackButton';

export default function Videos() {
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
  }, []);

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
    <div className="flex flex-col w-full min-h-screen py-16 bg-background">
      <BackButton />
      <div className="container px-4 md:px-8 max-w-7xl mx-auto space-y-12 mt-8">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 via-primary/10 to-background p-12 md:p-16 text-center shadow-2xl border border-primary/20">
          <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(white,transparent_85%)]" />
          <div className="relative space-y-6">
            <div className="flex justify-center">
              <div className="p-4 bg-primary/10 rounded-full">
                <Camera className="h-12 w-12 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-7xl font-extrabold text-primary tracking-tight uppercase">
              Videos & Reels
            </h1>
            <p className="text-lg md:text-2xl text-muted-foreground max-w-3xl mx-auto font-medium leading-relaxed">
              Watch our collection of videos showcasing the beauty, ambiance, and unique dining experience at Leopard Cave Restaurant
            </p>
          </div>
        </div>

        {/* Videos Grid */}
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
    </div>
  );
}
