import BackButton from "@/components/common/BackButton";
import { Button } from '@/components/ui/button';
import { Utensils } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MenuLanding() {
  return (
    <div className="flex flex-col w-full min-h-screen py-16 bg-background">
      <div className="container px-4 md:px-8 max-w-7xl mx-auto space-y-8 mt-8">
        <BackButton />
        
        {/* Prominent Title */}
        <div className="text-center pt-8 space-y-4">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/10 rounded-full">
              <Utensils className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-primary tracking-tight uppercase drop-shadow-2xl">
            Our Menu
          </h1>
          <p className="text-lg md:text-2xl text-muted-foreground max-w-3xl mx-auto font-medium leading-relaxed">
            Explore our delicious food and beverage offerings, inspired by the flavors of the Hunza valley
          </p>
        </div>

        {/* Cover Photo - Full Display Without Cropping */}
        <div className="relative overflow-hidden rounded-3xl shadow-2xl w-full border-8 border-white/5">
          <img
            src="https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260331/file-an0w7ir91af4.png"
            alt="Menu Cover - Leopard Cave Restaurant"
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Two Buttons Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto w-full">
          <Button 
            asChild
            size="lg" 
            className="w-full rounded-full text-lg px-8 py-7 font-bold shadow-xl hover:scale-105 transition-all duration-300"
          >
            <Link to="/menu-cards">
              <Utensils className="h-5 w-5 mr-2" />
              View Menu Cards
            </Link>
          </Button>
          <Button 
            asChild
            size="lg" 
            variant="outline"
            className="w-full rounded-full text-lg px-8 py-7 font-bold shadow-xl hover:scale-105 transition-all duration-300 border-2"
          >
            <Link to="/menu-images">
              <Utensils className="h-5 w-5 mr-2" />
              View Menu Images
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
