import { MENU_ITEMS } from '@/lib/constants';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function Menu() {
  const categories = Array.from(new Set(MENU_ITEMS.map((item) => item.category)));

  return (
    <div className="flex flex-col w-full min-h-screen py-16 bg-background">
      <div className="container px-4 md:px-8 max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-7xl font-extrabold text-primary tracking-tight uppercase">Our Menu</h1>
          <p className="text-lg md:text-2xl text-muted-foreground max-w-2xl mx-auto font-medium">
            Explore our delicious food and beverage offerings, inspired by the flavors of the Hunza valley.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
          {categories.map((category) => (
            <div key={category} className="space-y-6">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl md:text-4xl font-bold text-primary uppercase whitespace-nowrap">{category}</h2>
                <Separator className="bg-primary/20 flex-1" />
              </div>
              <div className="space-y-4">
                {MENU_ITEMS.filter((item) => item.category === category).map((item) => (
                  <Card key={item.id} className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-card hover:bg-muted/30">
                    <CardHeader className="flex flex-row items-center justify-between p-6">
                      <div className="space-y-1 pr-4">
                        <CardTitle className="text-lg md:text-xl font-bold">{item.name}</CardTitle>
                        <p className="text-sm md:text-base text-muted-foreground">{item.description}</p>
                      </div>
                      {item.price && (
                        <Badge variant="secondary" className="text-lg font-bold px-4 py-2 bg-primary/10 text-primary border-none">
                          Rs. {item.price}
                        </Badge>
                      )}
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-20 p-12 bg-muted/50 rounded-3xl space-y-4 border border-primary/10">
          <h3 className="text-2xl font-bold">Special Dietary Requirements?</h3>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Please inform our staff about any allergies or dietary restrictions. We are happy to customize our dishes for you.
          </p>
        </div>
      </div>
    </div>
  );
}
