import BackButton from "@/components/common/BackButton";
import SEO from "@/components/common/SEO";
import { Heart, Globe, Users, Target } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';

export default function AboutUs() {
  const values = [
    { 
      icon: <Heart className="h-10 w-10 text-white" />, 
      title: 'Unforgettable Moments', 
      description: 'Our goal is to create memorable experiences for every guest.',
      backgroundImage: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260330/file-als6qwq3iwhs.jpeg' // Dining interior
    },
    { 
      icon: <Target className="h-10 w-10 text-white" />, 
      title: 'Natural Beauty', 
      description: 'Combining nature, comfort, and exceptional service in every detail.',
      backgroundImage: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260330/file-alrz5b3t9ce8.png' // Scenic landscape
    },
    { 
      icon: <Globe className="h-10 w-10 text-white" />, 
      title: 'Cultural Heritage', 
      description: 'Inspired by the beauty and traditions of the Hunza region.',
      backgroundImage: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260330/file-alrz4vbkcq9s.png' // Restaurant ambiance
    },
    { 
      icon: <Users className="h-10 w-10 text-white" />, 
      title: 'Exceptional Service', 
      description: 'Warm hospitality that makes you feel at home in our cave.',
      backgroundImage: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260330/file-alskgm8i562o.jpeg' // Restaurant dining space
    },
  ];

  return (
    <>
      <SEO 
        title="About Us - Best Restaurant in Hunza Valley | Leopard Cave Restaurant"
        description="Learn about Leopard Cave Restaurant, the best restaurant in Hunza offering authentic local food and international cuisine at Attabad Lake in Gilgit Baltistan."
        keywords="best restaurants in Hunza, best restaurant in Karimabad Hunza, restaurants at Attabad Lake, best places in Hunza, restaurants in Gilgit Baltistan"
      />
      <div className="flex flex-col w-full min-h-screen py-16 bg-background">
        <div className="container px-4 md:px-8 max-w-7xl mx-auto space-y-20 mt-8">
          <BackButton />
          
          {/* Our Story Section with Image */}
          <div className="space-y-12 pt-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-7xl font-extrabold text-primary tracking-tight uppercase">Our Story</h1>
            </div>

          {/* Story Image */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-white/5 bg-muted max-w-5xl mx-auto">
            <AspectRatio ratio={16/9}>
              <img
                src="https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260401/file-ao01ejzkjksg.jpeg"
                alt="Ayeenabad Village Before 2008"
                className="w-full h-full object-contain"
              />
            </AspectRatio>
          </div>

          {/* Story Content */}
          <div className="max-w-4xl mx-auto space-y-6">
            <p className="text-lg md:text-2xl text-muted-foreground leading-relaxed font-medium">
              Before 2008, prior to the Attabad disaster, the village of Ayeenabad was a beautiful and lush green valley. More than 70–80 families lived there peacefully as one united community.
            </p>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              However, in 2008, the Attabad disaster changed everything. The entire village was submerged under what is now known as Attabad Lake. While it was a tragic event, it also gave rise to one of the most breathtaking natural lakes in the region.
            </p>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Today, the local community has rebuilt their lives around this lake, earning their livelihood through tourism, boating, and hospitality.
            </p>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              <strong className="text-primary">Leopard Cave Restaurant</strong> is one such local initiative, located right above Attabad Lake. Our goal is to provide a unique dining experience where guests can enjoy local, Pakistani, and international cuisine while taking in the stunning views of the lake.
            </p>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              We aim to create a natural, peaceful, and beautiful environment, while also promoting the local culture and traditional food of the region.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <Card key={index} className="border-none shadow-xl hover:-translate-y-2 transition-all duration-300 rounded-3xl group overflow-hidden relative h-80">
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${value.backgroundImage})` }}
              />
              {/* Dark Overlay for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/50 group-hover:from-black/95 group-hover:via-black/80 transition-all duration-300" />
              
              {/* Content */}
              <CardContent className="relative z-10 p-8 text-center space-y-4 h-full flex flex-col justify-end">
                <div className="flex justify-center">
                  <div className="p-5 bg-primary/30 backdrop-blur-sm rounded-3xl group-hover:bg-primary/40 transition-colors duration-300 border border-white/20">
                    {value.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white drop-shadow-lg">{value.title}</h3>
                <p className="text-white/90 leading-relaxed drop-shadow-md">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Join Us at The Cave Section */}
        <div className="space-y-12">
          <div className="max-w-4xl mx-auto space-y-6 text-center">
            <h2 className="text-3xl md:text-5xl font-extrabold text-primary tracking-tight uppercase">Join Us at The Cave</h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Whether you're a tourist exploring the beauty of Hunza, a family looking for a peaceful dining spot, or a couple seeking a romantic view, Leopard Cave Restaurant welcomes you with open arms.
            </p>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Come experience the perfect blend of nature, culture, and cuisine—right above the stunning Attabad Lake.
            </p>
          </div>

          {/* Join Us Image */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-white/5 bg-muted max-w-5xl mx-auto">
            <AspectRatio ratio={16/9}>
              <img
                src="https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260401/file-ao01ejzkivi8.jpeg"
                alt="Leopard Cave Restaurant Today"
                className="w-full h-full object-contain"
              />
            </AspectRatio>
          </div>
        </div>

      </div>
    </div>
    </>
  );
}
