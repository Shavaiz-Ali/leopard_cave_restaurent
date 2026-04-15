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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarIcon, Clock, Users, Phone, User, Mail, MessageCircle, Utensils, X, Search, Tent, Building2, Loader2 } from 'lucide-react';
import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { supabase } from '@/utils/supabase';

interface MenuItem {
  id: string;
  name: string;
  category_id: string;
  price: string;
  description: string;
  categories: { name: string } | null;
}

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
  const [selectedMenuItem, setSelectedMenuItem] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [menuLoading, setMenuLoading] = useState(true);

  // Fetch menu items from database
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setMenuLoading(true);
        const { data, error } = await supabase
          .from('menu_items')
          .select(`id, name, category_id, price, description, categories (name)`)
          .order('created_at', { ascending: true });
        
        if (error) throw error;
        setMenuItems((data as MenuItem[]) || []);
      } catch (err) {
        console.error('Error fetching menu items:', err);
        toast.error('Failed to load menu items');
      } finally {
        setMenuLoading(false);
      }
    };
    
    fetchMenuItems();
  }, []);

  // Auto-select item(s) from URL parameter
  useEffect(() => {
    const itemId = searchParams.get('item');
    const itemIds = searchParams.get('items');
    
    if (itemIds && selectedItems.length === 0 && menuItems.length > 0) {
      // Handle multiple items
      const ids = itemIds.split(',');
      const itemsToAdd: SelectedItem[] = [];
      
      ids.forEach(id => {
        const menuItem = menuItems.find(item => item.id === id);
        if (menuItem) {
          const existingItem = itemsToAdd.find(item => item.id === id);
          if (existingItem) {
            existingItem.quantity += 1;
          } else {
            const price = parseInt(menuItem.price) || 0;
            itemsToAdd.push({
              id: menuItem.id,
              name: menuItem.name,
              price: price,
              quantity: 1
            });
          }
        }
      });
      
      if (itemsToAdd.length > 0) {
        setSelectedItems(itemsToAdd);
        toast.success('Menu Items Added', {
          description: `${itemsToAdd.length} item(s) have been added to your pre-order.`,
        });
      }
    } else if (itemId && selectedItems.length === 0 && menuItems.length > 0) {
      // Handle single item (backward compatibility)
      const menuItem = menuItems.find(item => item.id === itemId);
      if (menuItem) {
        const price = parseInt(menuItem.price) || 0;
        setSelectedItems([{
          id: menuItem.id,
          name: menuItem.name,
          price: price,
          quantity: 1
        }]);
        toast.success('Menu Item Added', {
          description: `${menuItem.name} has been added to your pre-order.`,
        });
      }
    }
  }, [searchParams, menuItems]);

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
  const addItem = (item: MenuItem) => {
    const existingItem = selectedItems.find(i => i.id === item.id);
    const price = parseInt(item.price) || 0;
    
    if (existingItem) {
      setSelectedItems(selectedItems.map(i => 
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      ));
    } else {
      setSelectedItems([...selectedItems, { 
        id: item.id, 
        name: item.name, 
        price: price, 
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
            <h1 className="text-3xl md:text-5xl font-bold text-primary tracking-tight">Reserve Your Experience</h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Book your table at our restaurant or reserve camping at our resort
            </p>
          </div>

          {/* Tabs for Restaurant and Resort */}
          <Tabs defaultValue="restaurant" className="w-full">
            <TabsList className="grid w-full grid-cols-2 h-auto p-1 bg-muted/50 rounded-2xl border-2 border-primary/20 shadow-lg mb-8">
              <TabsTrigger value="restaurant" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-base md:text-lg font-bold py-4 px-6 rounded-xl transition-all duration-300 hover:bg-muted/80">
                <Utensils className="h-5 w-5 mr-2" />
                Restaurant
              </TabsTrigger>
              <TabsTrigger value="resort" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-base md:text-lg font-bold py-4 px-6 rounded-xl transition-all duration-300 hover:bg-muted/80">
                <Tent className="h-5 w-5 mr-2" />
                Resort
              </TabsTrigger>
            </TabsList>

            {/* Restaurant Tab Content */}
            <TabsContent value="restaurant" className="space-y-8">
              <div className="text-center">
                <p className="text-muted-foreground">Book your table and enjoy a memorable lunch or dinner with a breathtaking view of Attabad Lake.</p>
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
                    
                    {/* Loading State */}
                    {menuLoading ? (
                      <div className="space-y-3">
                        <Skeleton className="h-12 w-full rounded-xl" />
                        <Skeleton className="h-12 w-full rounded-xl" />
                        <Skeleton className="h-12 w-full rounded-xl" />
                      </div>
                    ) : menuItems.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-xl">
                        No menu items available at the moment.
                      </div>
                    ) : (
                      <>
                        {/* Select Menu Item */}
                        <Select value={selectedMenuItem} onValueChange={(value) => {
                          setSelectedMenuItem(value);
                          const item = menuItems.find(i => i.id === value);
                          if (item) {
                            addItem(item);
                            setSelectedMenuItem('');
                          }
                        }}>
                          <SelectTrigger className="w-full h-12 text-lg rounded-xl border-primary/20 hover:border-primary">
                            <SelectValue placeholder="Select a menu item" />
                          </SelectTrigger>
                          <SelectContent>
                            {menuItems.map((item) => (
                              <SelectItem key={item.id} value={item.id}>
                                {item.name} - PKR {item.price}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </>
                    )}

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
            </TabsContent>

            {/* Resort Tab Content */}
            <TabsContent value="resort" className="space-y-8">
              {/* Camping Booking Section */}
              <Card className="border-none shadow-2xl bg-card rounded-3xl">
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-primary/10 rounded-full">
                      <Tent className="h-10 w-10 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="text-2xl md:text-3xl font-bold text-primary">Camping Reservation</CardTitle>
                  <CardDescription className="text-base">
                    Book your camping experience at Leopard Cave Resort
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Pricing Information */}
                  <div className="bg-primary/10 rounded-xl p-6 space-y-3 border-2 border-primary/20">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-foreground text-lg">Price per Tent (per night):</span>
                      <span className="text-3xl font-extrabold text-primary">PKR 3,000</span>
                    </div>
                    <div className="flex items-center justify-between text-base">
                      <span className="text-muted-foreground">Maximum Capacity:</span>
                      <span className="font-bold text-foreground">3 People per Tent</span>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3">
                    <h4 className="font-bold text-foreground text-lg">Included Features:</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold">✓</span>
                        <span>Premium camping tents with comfortable bedding</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold">✓</span>
                        <span>Bonfire and BBQ facilities</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold">✓</span>
                        <span>Guided hiking tours to Baskochi Meadows</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold">✓</span>
                        <span>Stunning views of Attabad Lake</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold">✓</span>
                        <span>Restaurant dining access</span>
                      </li>
                    </ul>
                  </div>

                  {/* Booking Button */}
                  <Button
                    onClick={() => {
                      toast.info('Camping Services Temporarily Unavailable', {
                        description: 'Currently, camping services are not available due to maintenance. Please contact us on WhatsApp for more information.',
                        duration: 6000,
                        action: {
                          label: 'Contact on WhatsApp',
                          onClick: () => window.open('https://wa.me/923160605535', '_blank')
                        },
                      });
                    }}
                    className="w-full rounded-full font-bold text-lg py-6"
                  >
                    <Tent className="h-5 w-5 mr-2" />
                    Book Camping Now
                  </Button>
                </CardContent>
              </Card>

              {/* Coming Soon Section */}
              <Card className="border-none shadow-2xl bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl">
                <CardContent className="p-12 text-center space-y-4">
                  <div className="flex justify-center">
                    <div className="p-6 bg-primary/20 rounded-full">
                      <Building2 className="h-16 w-16 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-extrabold text-primary">Leopard Cave Resort</h3>
                  <p className="text-xl md:text-2xl font-bold text-secondary">Coming Soon</p>
                  <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
                    We're working on bringing you an exceptional resort experience with premium accommodations and world-class amenities. Stay tuned for updates!
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
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
