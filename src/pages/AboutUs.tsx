import BackButton from "@/components/common/BackButton";
import SEO from "@/components/common/SEO";
import { Heart, Globe, Users, Target } from 'lucide-react';

export default function AboutUs() {
  const values = [
    { 
      icon: <Heart className="h-6 w-6 text-white" />, 
      title: 'Unforgettable Moments', 
      description: 'Our goal is to create memorable experiences for every guest.',
      backgroundImage: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260330/file-als6qwq3iwhs.jpeg'
    },
    { 
      icon: <Target className="h-6 w-6 text-white" />, 
      title: 'Natural Beauty', 
      description: 'Combining nature, comfort, and exceptional service in every detail.',
      backgroundImage: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260330/file-alrz5b3t9ce8.png'
    },
    { 
      icon: <Globe className="h-6 w-6 text-white" />, 
      title: 'Cultural Heritage', 
      description: 'Inspired by the beauty and traditions of the Hunza region.',
      backgroundImage: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260330/file-alrz4vbkcq9s.png'
    },
    { 
      icon: <Users className="h-6 w-6 text-white" />, 
      title: 'Exceptional Service', 
      description: 'Warm hospitality that makes you feel at home.',
      backgroundImage: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260330/file-alskgm8i562o.jpeg'
    },
  ];

  return (
    <>
      <SEO 
        title="About Us - Best Restaurant in Hunza Valley | Leopard Cave Restaurant"
        description="Learn about Leopard Cave Restaurant, the best restaurant in Hunza offering authentic local food and international cuisine at Attabad Lake in Gilgit Baltistan."
        keywords="best restaurants in Hunza, best restaurant in Karimabad Hunza, restaurants at Attabad Lake, best places in Hunza, restaurants in Gilgit Baltistan"
      />
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
            <div className="mb-6">
              <BackButton />
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-primary mb-3">
                Our Story
              </h1>
              <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
                Discover the story behind Leopard Cave Restaurant
              </p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 md:px-8 lg:px-16 space-y-8">
            {/* Story Image */}
            <div className="aspect-video rounded-xl overflow-hidden border border-border shadow-sm">
              <img
                src="https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260401/file-ao01ejzkjksg.jpeg"
                alt="Ayeenabad Village Before 2008"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Story Content */}
            <div className="space-y-4">
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                Before 2008, prior to the Attabad disaster, the village of Ayeenabad was a beautiful and lush green valley. More than 70–80 families lived there peacefully as one united community.
              </p>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                However, in 2008, the Attabad disaster changed everything. The entire village was submerged under what is now known as Attabad Lake. While it was a tragic event, it also gave rise to one of the most breathtaking natural lakes in the region.
              </p>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                Today, the local community has rebuilt their lives around this lake, earning their livelihood through tourism, boating, and hospitality.
              </p>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                <strong className="text-primary">Leopard Cave Restaurant</strong> is one such local initiative, located right above Attabad Lake. Our goal is to provide a unique dining experience where guests can enjoy local, Pakistani, and international cuisine while taking in the stunning views of the lake.
              </p>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                We aim to create a natural, peaceful, and beautiful environment, while also promoting the local culture and traditional food of the region.
              </p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
            <div className="text-center mb-8">
              <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-2">Our Values</h2>
              <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {values.map((value, index) => (
                <div key={index} className="group relative aspect-[4/5] rounded-xl overflow-hidden shadow-sm border border-border">
                  <img
                    src={value.backgroundImage}
                    alt={value.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <div className="relative h-full flex flex-col justify-end p-5">
                    <div className="flex mb-3">
                      <div className="p-3 bg-white/20 rounded-full">
                        {value.icon}
                      </div>
                    </div>
                    <h3 className="text-lg font-medium text-white mb-2">{value.title}</h3>
                    <p className="text-sm text-white/80">
                      {value.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Join Us Section */}
        <section className="py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 md:px-8 lg:px-16 space-y-8">
            <div className="text-center">
              <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-2">Join Us at The Cave</h2>
              <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                Whether you're a tourist exploring the beauty of Hunza, a family looking for a peaceful dining spot, or a couple seeking a romantic view, Leopard Cave Restaurant welcomes you with open arms.
              </p>
            </div>

            {/* Join Us Image */}
            <div className="aspect-video rounded-xl overflow-hidden border border-border shadow-sm">
              <img
                src="https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260401/file-ao01ejzkivi8.jpeg"
                alt="Leopard Cave Restaurant Today"
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-sm text-muted-foreground text-center max-w-2xl mx-auto">
              Come experience the perfect blend of nature, culture, and cuisine—right above the stunning Attabad Lake.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
