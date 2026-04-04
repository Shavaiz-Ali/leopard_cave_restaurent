import BackButton from "@/components/common/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Facebook, Instagram, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SocialMedia() {
  const socialAccounts = [
    {
      id: '1',
      name: 'Facebook',
      handle: '@LeopardCaveRestaurant',
      url: 'https://www.facebook.com/profile.php?id=61582236326778',
      icon: <Facebook className="h-16 w-16 text-primary" />,
      description: 'Follow us on Facebook for daily updates, special offers, and beautiful photos of our restaurant and Attabad Lake.',
      color: 'from-blue-500/20 to-blue-600/20'
    },
    {
      id: '2',
      name: 'Instagram',
      handle: '@leopard.cave.restaurant',
      url: 'https://www.instagram.com/leopard.cave.restaurant?igsh=MXZ0eWtsN3NoMW1zaQ==',
      icon: <Instagram className="h-16 w-16 text-primary" />,
      description: 'Explore stunning photos and reels of our restaurant, food, and the breathtaking views of Hunza Valley on Instagram.',
      color: 'from-pink-500/20 to-purple-600/20'
    },
    {
      id: '3',
      name: 'TikTok',
      handle: '@leopard.cave.restaurant',
      url: 'https://www.tiktok.com/@leopard.cave.restaurant?_r=1&_t=ZS-954evnj7xI8',
      icon: (
        <svg className="h-16 w-16 text-primary" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
        </svg>
      ),
      description: 'Watch entertaining videos and behind-the-scenes content from Leopard Cave Restaurant on TikTok.',
      color: 'from-cyan-500/20 to-pink-500/20'
    }
  ];

  return (
    <div className="flex flex-col w-full min-h-screen py-16 bg-background">
      <div className="container px-4 md:px-8 max-w-7xl mx-auto space-y-12 mt-8">
        <BackButton />
        <div className="text-center space-y-4 pt-8">
          <h1 className="text-4xl md:text-7xl font-extrabold text-primary tracking-tight uppercase">Social Media</h1>
          <p className="text-lg md:text-2xl text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed">
            Connect with us on social media to stay updated with our latest news, offers, and beautiful moments
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {socialAccounts.map((account) => (
            <Card key={account.id} className="border-none shadow-2xl bg-card overflow-hidden group hover:-translate-y-2 transition-all duration-300 rounded-3xl">
              <div className={`bg-gradient-to-br ${account.color} p-8 flex justify-center`}>
                {account.icon}
              </div>
              <CardHeader className="p-6 pb-4">
                <CardTitle className="text-2xl font-bold text-primary text-center">
                  {account.name}
                </CardTitle>
                <p className="text-center text-muted-foreground font-semibold">{account.handle}</p>
              </CardHeader>
              <CardContent className="px-6 pb-6 space-y-4">
                <p className="text-muted-foreground leading-relaxed text-center">
                  {account.description}
                </p>
                <Button asChild className="w-full rounded-full font-bold">
                  <a href={account.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                    Visit {account.name}
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center space-y-6 pt-12">
          <h2 className="text-3xl md:text-5xl font-bold text-primary">Stay Connected</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Follow us on all platforms to get the latest updates about our restaurant, special events, seasonal menus, and exclusive offers. Share your dining experience with us using #LeopardCaveRestaurant
          </p>
        </div>
      </div>
    </div>
  );
}
