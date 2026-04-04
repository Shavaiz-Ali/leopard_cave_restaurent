import BackButton from "@/components/common/BackButton";
import SEO from "@/components/common/SEO";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CalendarIcon, Clock, Users, Phone, User, Mail, MessageCircle, Utensils, X, Search } from 'lucide-react';
import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';

// Menu items with availability
const menuItems = [
  { id: '1', name: 'Burush Shapick', category: 'Local Delights', price: 650, available: true },
  { id: '2', name: 'Chap Shuroo', category: 'Local Delights', price: 1000, available: true },
  { id: '3', name: 'Chicken Deroo', category: 'Local Delights', price: 500, available: true },
  { id: '4', name: 'Dawdo Soup', category: 'Valley Soups', price: 450, available: true },
  { id: '5', name: 'Hari Soup', category: 'Valley Soups', price: 750, available: true },
  { id: '6', name: 'Shirijoon Soup', category: 'Valley Soups', price: 2000, available: true },
  { id: '7', name: 'Hot & Sour', category: 'From the Mountain Pod', price: 500, available: true },
  { id: '11', name: 'Chicken Corn Soup', category: 'From the Mountain Pod', price: 450, available: true },
  { id: '8', name: 'Hari Ka Biranze Salad', category: 'Mountain Greens', price: 600, available: true },
  { id: '9', name: 'Fresh Garden Salad', category: 'Mountain Greens', price: 400, available: true },
  { id: '10', name: 'Mountain Yak Karahi (1kg)', category: 'Bite Before the Peak', price: 3000, available: true },
  { id: '10b', name: 'Pasture Mutton Karahi (1kg)', category: 'Bite Before the Peak', price: 3500, available: true },
  { id: '10c', name: 'Free Range Chicken Karahi (1kg)', category: 'Bite Before the Peak', price: 2700, available: true },
  { id: '12', name: 'Balling Kham', category: 'Others', price: 3200, available: true },
  { id: '13', name: 'Chap Za Laksha', category: 'Others', price: 0, available: false },
  { id: '14', name: 'Chamuse', category: 'Glacier Flow Beverages', price: 500, available: true },
  { id: '15', name: 'Peak Fruit Fizz', category: 'Glacier Flow Beverages', price: 500, available: true },
  { id: '16', name: 'Season\'s Essence', category: 'Glacier Flow Beverages', price: 600, available: true },
  { id: '17', name: 'Lemon Peak Spark', category: 'Glacier Flow Beverages', price: 300, available: true },
  { id: '18', name: 'Soft Drinks', category: 'Glacier Flow Beverages', price: 150, available: true },
  { id: '19', name: 'Small Water', category: 'Glacier Flow Beverages', price: 100, available: true },
  { id: '20', name: 'Large Water', category: 'Glacier Flow Beverages', price: 100, available: true },
  { id: '21', name: 'Cappuccino', category: 'Peak Warmth', price: 400, available: true },
  { id: '22', name: 'Americano', category: 'Peak Warmth', price: 300, available: true },
  { id: '23', name: 'Espresso', category: 'Peak Warmth', price: 300, available: true },
  { id: '24', name: 'Latte', category: 'Peak Warmth', price: 400, available: true },
  { id: '25', name: 'Rose Petal Tea', category: 'Peak Warmth', price: 200, available: true },
  { id: '26', name: 'Mountain Tea', category: 'Peak Warmth', price: 150, available: true },
  { id: '27', name: 'Honey Tea', category: 'Peak Warmth', price: 250, available: true },
  { id: '28', name: 'Matka Chai', category: 'Peak Warmth', price: 250, available: true },
  { id: '29', name: 'Dhood Patti Chai', category: 'Peak Warmth', price: 250, available: true },
  { id: '30', name: 'Highland Yak Burger', category: 'Highlanders Snacks', price: 1300, available: true },
  { id: '31', name: 'Zinger Crunch Burger', category: 'Highlanders Snacks', price: 1150, available: true },
  { id: '32', name: 'Crispy Cluck', category: 'Highlanders Snacks', price: 1450, available: true },
  { id: '33', name: 'Walnut Dip', category: 'Highlanders Snacks', price: 0, available: false },
  { id: '34', name: 'Homeland Potato Fries', category: 'Highlanders Snacks', price: 550, available: true },
  { id: '35', name: 'Homeland Potato Chili Fries', category: 'Highlanders Snacks', price: 750, available: true },
  { id: '36', name: 'Mountain Yak Chili Dry', category: 'From the Mountain Wok', price: 1300, available: true },
  { id: '37', name: 'Sweet & Sour Chicken', category: 'From the Mountain Wok', price: 1500, available: true },
  { id: '38', name: 'Grilled Beef Steak', category: 'Mountain Feast', price: 3000, available: true },
];

const formSchema = z.object({
  full_name: z.string().min(2, { message: 'Full name must be at least 2 characters.' }),
  phone_number: z.string().min(10, { message: 'Phone number must be at least 10 characters.' }),
  reservation_date: z.string().refine((date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(date) >= today;
  }, { message: 'Please select a future date.' }),
  reservation_time: z.string().min(1, { message: 'Please select a time.' }),
  guests_count: z.coerce.number().min(1, { message: 'Please enter a valid number of guests.' }),
  special_requests: z.string().optional(),
});

interface SelectedItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

type PaymentMethod = 'jazzcash' | 'easypaisa' | 'crypto' | null;

export default function Reservation() {
  const [searchParams] = useSearchParams();
  const [showDialog, setShowDialog] = useState(false);
  const [formData, setFormData] = useState<z.infer<typeof formSchema> | null>(null);
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null);

  // Auto-select item from URL parameter
  useEffect(() => {
    const itemId = searchParams.get('item');
    if (itemId && selectedItems.length === 0) {
      const menuItem = menuItems.find(item => item.id === itemId);
      if (menuItem && menuItem.available) {
        setSelectedItems([{
          id: menuItem.id,
          name: menuItem.name,
          price: menuItem.price,
          quantity: 1
        }]);
        // Show success toast
        toast.success('Menu Item Added', {
          description: `${menuItem.name} has been added to your pre-order.`,
        });
      }
    }
  }, [searchParams]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: '',
      phone_number: '',
      reservation_date: '',
      reservation_time: '',
      guests_count: 1,
      special_requests: '',
    },
  });

  // Calculate total price
  const totalPrice = useMemo(() => {
    return selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }, [selectedItems]);

  // Add item to selection
  const addItem = (item: typeof menuItems[0]) => {
    if (!item.available) {
      toast.error(`${item.name} is currently unavailable`);
      return;
    }

    const existingItem = selectedItems.find(i => i.id === item.id);
    if (existingItem) {
      setSelectedItems(selectedItems.map(i => 
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      ));
    } else {
      setSelectedItems([...selectedItems, { 
        id: item.id, 
        name: item.name, 
        price: item.price, 
        quantity: 1 
      }]);
    }
    toast.success(`${item.name} added to order`);
  };

  // Remove item from selection
  const removeItem = (id: string) => {
    setSelectedItems(selectedItems.filter(item => item.id !== id));
  };

  // Update item quantity
  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(id);
      return;
    }
    setSelectedItems(selectedItems.map(item => 
      item.id === id ? { ...item, quantity } : item
    ));
  };

  // Filtered menu items based on search
  const filteredItems = useMemo(() => {
    return menuItems.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Validate food selection
    if (selectedItems.length === 0) {
      toast.error('Food Selection Required', {
        description: 'Please select at least one food item to proceed with your reservation.',
      });
      return;
    }

    // Validate payment method if food is selected
    if (selectedItems.length > 0 && !paymentMethod) {
      toast.error('Payment Method Required', {
        description: 'Please select a payment method to proceed.',
      });
      return;
    }

    setFormData(values);
    setShowDialog(true);
  }

  function sendViaWhatsApp() {
    if (!formData) return;
    
    let message = `*🍽️ RESERVATION DETAILS*\n\n`;
    message += `*Guest Information:*\n`;
    message += `👤 Name: ${formData.full_name}\n`;
    message += `📱 Phone: ${formData.phone_number}\n`;
    message += `📅 Date: ${formData.reservation_date}\n`;
    message += `🕐 Time: ${formData.reservation_time}\n`;
    message += `👥 Guests: ${formData.guests_count}\n\n`;
    
    message += `*━━━━━━━━━━━━━━━━━━━━*\n\n`;
    message += `*📋 ORDER SUMMARY*\n\n`;
    message += `Item Name | Qty | Price | Total\n`;
    message += `${'─'.repeat(35)}\n`;
    
    selectedItems.forEach(item => {
      const itemTotal = item.price * item.quantity;
      message += `${item.name}\n`;
      message += `  ${item.quantity} × PKR ${item.price} = PKR ${itemTotal}\n\n`;
    });
    
    message += `${'─'.repeat(35)}\n`;
    message += `*Subtotal:* PKR ${totalPrice}\n`;
    message += `*Advance Payment (40%):* PKR ${Math.ceil(totalPrice * 0.4)}\n`;
    message += `*Total Bill:* PKR ${totalPrice}\n\n`;
    
    if (paymentMethod) {
      message += `*💳 Payment Method:* `;
      if (paymentMethod === 'jazzcash') message += `JazzCash (03160605535)\n`;
      if (paymentMethod === 'easypaisa') message += `Easypaisa (03160605535)\n`;
      if (paymentMethod === 'crypto') message += `Crypto USDT (TRC20)\n`;
      message += `\n`;
    }
    
    if (formData.special_requests) {
      message += `*📝 Special Requests:*\n${formData.special_requests}\n\n`;
    }
    
    message += `*━━━━━━━━━━━━━━━━━━━━*\n`;
    message += `_Please send payment screenshot for confirmation_`;
    
    const whatsappUrl = `https://wa.me/923160605535?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    toast.success('Redirecting to WhatsApp...', {
      description: 'Please send the message to complete your reservation.',
    });
    
    setShowDialog(false);
    form.reset();
    setSelectedItems([]);
    setPaymentMethod(null);
  }

  function sendViaGmail() {
    if (!formData) return;
    
    const subject = `Reservation Request - ${formData.full_name}`;
    let body = `RESERVATION DETAILS\n\n`;
    body += `Guest Information:\n`;
    body += `Name: ${formData.full_name}\n`;
    body += `Phone: ${formData.phone_number}\n`;
    body += `Date: ${formData.reservation_date}\n`;
    body += `Time: ${formData.reservation_time}\n`;
    body += `Number of Guests: ${formData.guests_count}\n\n`;
    
    body += `━━━━━━━━━━━━━━━━━━━━\n\n`;
    body += `ORDER SUMMARY\n\n`;
    body += `Item Name | Qty | Price | Total\n`;
    body += `${'─'.repeat(35)}\n`;
    
    selectedItems.forEach(item => {
      const itemTotal = item.price * item.quantity;
      body += `${item.name}\n`;
      body += `  ${item.quantity} × PKR ${item.price} = PKR ${itemTotal}\n\n`;
    });
    
    body += `${'─'.repeat(35)}\n`;
    body += `Subtotal: PKR ${totalPrice}\n`;
    body += `Advance Payment (40%): PKR ${Math.ceil(totalPrice * 0.4)}\n`;
    body += `Total Bill: PKR ${totalPrice}\n\n`;
    
    if (paymentMethod) {
      body += `Payment Method: `;
      if (paymentMethod === 'jazzcash') body += `JazzCash (03160605535)\n`;
      if (paymentMethod === 'easypaisa') body += `Easypaisa (03160605535)\n`;
      if (paymentMethod === 'crypto') body += `Crypto USDT (TRC20)\n`;
      body += `\n`;
    }
    
    if (formData.special_requests) {
      body += `Special Requests: ${formData.special_requests}\n\n`;
    }
    
    body += `━━━━━━━━━━━━━━━━━━━━\n`;
    body += `Please send payment screenshot for confirmation`;
    
    const gmailUrl = `mailto:Leopardcaverestaurantofficial@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = gmailUrl;
    
    toast.success('Opening Gmail...', {
      description: 'Please send the email to complete your reservation.',
    });
    
    setShowDialog(false);
    form.reset();
    setSelectedItems([]);
    setPaymentMethod(null);
  }

  return (
    <>
      <SEO 
        title="Reserve Table - Best Restaurant in Hunza | Leopard Cave Restaurant"
        description="Book your table at Leopard Cave Restaurant, the best place to eat in Hunza Valley. Reserve now for authentic Hunza food with stunning Attabad Lake views."
        keywords="reserve table Hunza, book restaurant Hunza, best restaurant in Karimabad Hunza, restaurants at Attabad Lake, where to eat in Hunza, best places to eat in Hunza"
      />
      <div className="flex flex-col w-full min-h-screen py-16 bg-muted/30">
        <div className="container px-4 md:px-8 max-w-4xl mx-auto space-y-12 mt-8">
          <BackButton />
          <div className="text-center space-y-3 pt-8">
            <h1 className="text-3xl md:text-5xl font-bold text-primary tracking-tight">Reserve Your Table</h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Book your table and enjoy a memorable lunch or dinner with a breathtaking view of Attabad Lake.
            </p>
          </div>

        {/* Advance Payment Policy Notice */}
        <div className="bg-amber-50 dark:bg-amber-950/20 border-2 border-amber-500/50 rounded-2xl p-6 shadow-lg">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 mt-1">
              <svg className="h-6 w-6 text-amber-600 dark:text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-amber-900 dark:text-amber-100 mb-2">Advance Payment Policy</h3>
              <p className="text-base text-amber-800 dark:text-amber-200 leading-relaxed">
                If you reserve a table or place a food order in advance, you will be required to pay <strong>40% of the total bill</strong> as an advance payment.
              </p>
            </div>
          </div>
        </div>

        <Card className="border-none shadow-2xl bg-card overflow-hidden rounded-3xl">
          <CardHeader className="bg-primary/5 p-8 border-b border-primary/10">
            <CardTitle className="text-xl md:text-2xl font-bold flex items-center gap-3 text-primary">
              <CalendarIcon className="h-6 w-6" />
              Reservation Details
            </CardTitle>
            <CardDescription className="text-base text-muted-foreground">
              Please fill in the form below to book your table.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <FormField
                    control={form.control}
                    name="full_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold flex items-center gap-2">
                          <User className="h-4 w-4" /> Full Name
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} className="h-12 text-lg rounded-xl border-primary/20 focus:border-primary" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone_number"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold flex items-center gap-2">
                          <Phone className="h-4 w-4" /> Phone Number
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="+92 3XX XXXXXXX" {...field} className="h-12 text-lg rounded-xl border-primary/20 focus:border-primary" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="reservation_date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold flex items-center gap-2">
                          <CalendarIcon className="h-4 w-4" /> Date
                        </FormLabel>
                        <FormControl>
                          <Input type="date" {...field} className="h-12 text-lg rounded-xl border-primary/20 focus:border-primary" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="reservation_time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold flex items-center gap-2">
                          <Clock className="h-4 w-4" /> Time
                        </FormLabel>
                        <FormControl>
                          <Input type="time" {...field} className="h-12 text-lg rounded-xl border-primary/20 focus:border-primary" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="guests_count"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold flex items-center gap-2">
                          <Users className="h-4 w-4" /> Number of Guests
                        </FormLabel>
                        <FormControl>
                          <Input type="number" min="1" {...field} className="h-12 text-lg rounded-xl border-primary/20 focus:border-primary" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Food Selection Section */}
                  <div className="space-y-4">
                    <label className="text-base font-semibold flex items-center gap-2">
                      <Utensils className="h-4 w-4" /> Pre-Order Food Items <span className="text-destructive">*</span>
                    </label>
                    <p className="text-sm text-muted-foreground">At least one food item must be selected to proceed with your reservation.</p>
                    
                    {/* Search and Add Items */}
                    <Popover open={searchOpen} onOpenChange={setSearchOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          type="button"
                          className="w-full justify-between h-12 text-lg rounded-xl border-primary/20 hover:border-primary"
                        >
                          <span className="flex items-center gap-2">
                            <Search className="h-4 w-4" />
                            Search menu items...
                          </span>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0" align="start">
                        <Command>
                          <CommandInput 
                            placeholder="Search menu items..." 
                            value={searchQuery}
                            onValueChange={setSearchQuery}
                          />
                          <CommandList>
                            <CommandEmpty>No menu items found.</CommandEmpty>
                            <CommandGroup>
                              {filteredItems.map((item) => (
                                <CommandItem
                                  key={item.id}
                                  value={item.name}
                                  onSelect={() => {
                                    addItem(item);
                                    setSearchOpen(false);
                                    setSearchQuery('');
                                  }}
                                  disabled={!item.available}
                                  className="flex items-center justify-between"
                                >
                                  <div className="flex flex-col">
                                    <span className="font-semibold">{item.name}</span>
                                    <span className="text-xs text-muted-foreground">{item.category}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    {item.price > 0 && (
                                      <span className="font-bold text-primary">PKR {item.price}</span>
                                    )}
                                    {!item.available && (
                                      <Badge variant="destructive" className="text-xs">Unavailable</Badge>
                                    )}
                                    {item.available && (
                                      <Badge variant="secondary" className="text-xs">Available</Badge>
                                    )}
                                  </div>
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>

                    {/* Selected Items */}
                    {selectedItems.length > 0 && (
                      <div className="space-y-3 p-4 bg-muted/50 rounded-xl border border-primary/20">
                        <h4 className="font-semibold text-sm text-muted-foreground uppercase">Your Order</h4>
                        {selectedItems.map((item) => (
                          <div key={item.id} className="flex items-center justify-between gap-4 p-3 bg-background rounded-lg border border-border">
                            <div className="flex-1">
                              <p className="font-semibold">{item.name}</p>
                              <p className="text-sm text-muted-foreground">PKR {item.price} each</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="h-8 w-8 p-0"
                              >
                                -
                              </Button>
                              <span className="w-8 text-center font-bold">{item.quantity}</span>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="h-8 w-8 p-0"
                              >
                                +
                              </Button>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeItem(item.id)}
                                className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-primary">PKR {item.price * item.quantity}</p>
                            </div>
                          </div>
                        ))}
                        <div className="flex justify-between items-center pt-3 border-t border-border">
                          <span className="text-lg font-bold">Total Bill:</span>
                          <span className="text-2xl font-extrabold text-primary">PKR {totalPrice}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Payment Method Section */}
                  {selectedItems.length > 0 && totalPrice > 0 && (
                    <div className="space-y-6 p-6 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl border-2 border-primary/20">
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold text-primary flex items-center gap-2">
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                          </svg>
                          Select Payment Method
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Advance Payment Required: <strong className="text-primary">PKR {Math.ceil(totalPrice * 0.4)}</strong> (40% of total bill)
                        </p>
                      </div>

                      {/* Payment Method Options */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <button
                          type="button"
                          onClick={() => setPaymentMethod('jazzcash')}
                          className={`p-4 rounded-xl border-2 transition-all hover:scale-105 ${
                            paymentMethod === 'jazzcash'
                              ? 'border-primary bg-primary/10 shadow-lg'
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          <div className="text-center space-y-2">
                            <div className="font-bold text-lg">JazzCash</div>
                            <div className="text-xs text-muted-foreground">Mobile Payment</div>
                          </div>
                        </button>

                        <button
                          type="button"
                          onClick={() => setPaymentMethod('easypaisa')}
                          className={`p-4 rounded-xl border-2 transition-all hover:scale-105 ${
                            paymentMethod === 'easypaisa'
                              ? 'border-primary bg-primary/10 shadow-lg'
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          <div className="text-center space-y-2">
                            <div className="font-bold text-lg">Easypaisa</div>
                            <div className="text-xs text-muted-foreground">Mobile Payment</div>
                          </div>
                        </button>

                        <button
                          type="button"
                          onClick={() => setPaymentMethod('crypto')}
                          className={`p-4 rounded-xl border-2 transition-all hover:scale-105 ${
                            paymentMethod === 'crypto'
                              ? 'border-primary bg-primary/10 shadow-lg'
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          <div className="text-center space-y-2">
                            <div className="font-bold text-lg">Crypto</div>
                            <div className="text-xs text-muted-foreground">USDT (TRC20)</div>
                          </div>
                        </button>
                      </div>

                      {/* Payment Details */}
                      {paymentMethod === 'jazzcash' && (
                        <div className="space-y-4 p-6 bg-background rounded-xl border border-primary/20">
                          <h4 className="font-bold text-lg text-primary">JazzCash Payment Details</h4>
                          <div className="space-y-3">
                            <div>
                              <p className="text-sm text-muted-foreground mb-1">Account Number:</p>
                              <p className="text-xl font-bold font-mono">03160605535</p>
                            </div>
                            <div className="flex justify-center">
                              <img
                                src="https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260401/file-ancjy90b0q9s.jpeg"
                                alt="JazzCash QR Code"
                                className="w-64 h-64 object-contain rounded-lg border-2 border-primary/20"
                              />
                            </div>
                            <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-500/50 rounded-lg p-4">
                              <p className="text-sm text-blue-800 dark:text-blue-200">
                                <strong>Note:</strong> After completing the payment, please send a screenshot of the transaction to our WhatsApp number or email address for confirmation.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {paymentMethod === 'easypaisa' && (
                        <div className="space-y-4 p-6 bg-background rounded-xl border border-primary/20">
                          <h4 className="font-bold text-lg text-primary">Easypaisa Payment Details</h4>
                          <div className="space-y-3">
                            <div>
                              <p className="text-sm text-muted-foreground mb-1">Account Number:</p>
                              <p className="text-xl font-bold font-mono">03160605535</p>
                            </div>
                            <div className="flex justify-center">
                              <img
                                src="https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260401/file-anck7ghhyh34.jpeg"
                                alt="Easypaisa QR Code"
                                className="w-64 h-64 object-contain rounded-lg border-2 border-primary/20"
                              />
                            </div>
                            <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-500/50 rounded-lg p-4">
                              <p className="text-sm text-blue-800 dark:text-blue-200">
                                <strong>Note:</strong> After completing the payment, please send a screenshot of the transaction to our WhatsApp number or email address for confirmation.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {paymentMethod === 'crypto' && (
                        <div className="space-y-4 p-6 bg-background rounded-xl border border-primary/20">
                          <h4 className="font-bold text-lg text-primary">Crypto Payment Details (USDT TRC20)</h4>
                          <div className="space-y-3">
                            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-500/50 rounded-lg p-4">
                              <p className="text-sm font-bold text-amber-800 dark:text-amber-200">
                                ⚠️ Important: Send only USDT via TRC20 network. Other networks or tokens will not be accepted.
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground mb-1">USDT Wallet Address (TRC20):</p>
                              <p className="text-lg font-bold font-mono break-all bg-muted p-3 rounded-lg">
                                TEbBbx5NQXJoUZrpPaaAM39919SpbYCb47
                              </p>
                            </div>
                            <div className="flex justify-center">
                              <img
                                src="https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260401/file-anckgnyov5z4.jpeg"
                                alt="USDT TRC20 QR Code"
                                className="w-64 h-64 object-contain rounded-lg border-2 border-primary/20"
                              />
                            </div>
                            <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-500/50 rounded-lg p-4">
                              <p className="text-sm text-blue-800 dark:text-blue-200">
                                <strong>Note:</strong> After completing the payment, please send a screenshot of the transaction to our WhatsApp number or email address for confirmation.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <FormField
                  control={form.control}
                  name="special_requests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold">Special Requests (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Please let us know if you have any special requirements..."
                          className="min-h-[120px] text-lg rounded-xl border-primary/20 focus:border-primary"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" size="lg" className="w-full h-14 text-xl font-bold rounded-2xl tracking-widest uppercase transition-all hover:scale-[1.02]">
                  Continue to Confirm
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      {/* Submission Method Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-primary">Choose Submission Method</DialogTitle>
            <DialogDescription className="text-base">
              How would you like to send your reservation details?
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <Button
              size="lg"
              onClick={sendViaWhatsApp}
              className="w-full h-14 text-lg font-bold rounded-xl flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 transition-all hover:scale-105"
            >
              <MessageCircle className="h-6 w-6" />
              Send via WhatsApp
            </Button>
            <Button
              size="lg"
              onClick={sendViaGmail}
              className="w-full h-14 text-lg font-bold rounded-xl flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 transition-all hover:scale-105"
            >
              <Mail className="h-6 w-6" />
              Send via Gmail
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
    </>
  );
}
