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
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarIcon, Clock, Users, Phone, User, Mail, MessageCircle, Utensils, X, Tent, Building2, CheckCircle } from 'lucide-react';
import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { supabase } from '@/utils/supabase';
import { Reservation as ReservationType, ReservationItem } from '@/types/types';
import { createReservation, cancelReservation } from '@/db/api';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { XCircle } from 'lucide-react';

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

function parsePrice(priceStr: string): number {
  const cleaned = priceStr
    .replace(/PKR/gi, '')
    .replace(/,/g, '')
    .replace(/\(.*\)/g, '')
    .trim();
  const match = cleaned.match(/^\d+/);
  return match ? parseInt(match[0], 10) : 0;
}

interface SelectedItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

type PaymentMethod = 'jazzcash' | 'easypaisa' | 'crypto' | null;

export default function Reservation() {
  const [searchParams] = useSearchParams();
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const [selectedMenuItem, setSelectedMenuItem] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [menuLoading, setMenuLoading] = useState(true);
  
  // Check Status State
  const [statusPhoneNumber, setStatusPhoneNumber] = useState('');
  const [statusReservations, setStatusReservations] = useState<ReservationType[]>([]);
  const [statusLoading, setStatusLoading] = useState(false);
  const [statusError, setStatusError] = useState<string | null>(null);
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="text-sm py-1.5 px-4 bg-amber-100 text-amber-800 border-none">Pending</Badge>;
      case 'confirmed':
        return <Badge variant="secondary" className="text-sm py-1.5 px-4 bg-green-100 text-green-800 border-none">Confirmed</Badge>;
      case 'cancelled':
        return <Badge variant="secondary" className="text-sm py-1.5 px-4 bg-red-100 text-red-800 border-none">Cancelled</Badge>;
      case 'completed':
        return <Badge variant="secondary" className="text-sm py-1.5 px-4 bg-blue-100 text-blue-800 border-none">Completed</Badge>;
      default:
        return <Badge variant="secondary" className="text-sm py-1.5 px-4 bg-gray-100 text-gray-800 border-none">{status}</Badge>;
    }
  };
  
  const getAdvanceStatusBadge = (status?: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="text-sm py-1.5 px-4 bg-amber-100 text-amber-800 border-none">Advance Pending</Badge>;
      case 'received':
        return <Badge variant="secondary" className="text-sm py-1.5 px-4 bg-green-100 text-green-800 border-none">Advance Received</Badge>;
      default:
        return <Badge variant="secondary" className="text-sm py-1.5 px-4 bg-gray-100 text-gray-800 border-none">{status || 'Unknown'}</Badge>;
    }
  };
  
  const fetchStatusReservations = async (phoneToUse?: string) => {
    const phone = phoneToUse || statusPhoneNumber;
    if (!phone) {
      setStatusError("Please enter a phone number");
      return;
    }

    setStatusLoading(true);
    setStatusError(null);

    try {
      const { data, error } = await supabase
        .from('reservations')
        .select('*, reservation_items(*)')
        .eq('phone_number', phone)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setStatusReservations(data || []);
    } catch (err) {
      console.error('Error fetching reservations:', err);
      setStatusError('Failed to fetch reservations');
    } finally {
      setStatusLoading(false);
    }
  };

  const handleCancelClick = (id: string | undefined) => {
    if (!id) return;
    setCancellingId(id);
    setConfirmDialogOpen(true);
  };

  const handleConfirmCancel = async () => {
    if (!cancellingId) return;

    try {
      setIsCancelling(true);
      await cancelReservation(cancellingId);
      toast.success('Reservation cancelled successfully');
      await fetchStatusReservations();
      setConfirmDialogOpen(false);
    } catch (error: any) {
      toast.error(error.message || 'Failed to cancel reservation');
    } finally {
      setIsCancelling(false);
    }
  };

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setMenuLoading(true);
        const { data, error } = await supabase
          .from('menu_items')
          .select(`id, name, category_id, price, description, categories (name)`)
          .order('created_at', { ascending: true });
        
        if (error) throw error;
        setMenuItems((data as  MenuItem[] | any) || []);
      } catch (err) {
        console.error('Error fetching menu items:', err);
        toast.error('Failed to load menu items');
      } finally {
        setMenuLoading(false);
      }
    };
    
    fetchMenuItems();
  }, []);

  useEffect(() => {
    const itemId = searchParams.get('item');
    const itemIds = searchParams.get('items');
    
    if (itemIds && selectedItems.length === 0 && menuItems.length > 0) {
      const ids = itemIds.split(',');
      const itemsToAdd: SelectedItem[] = [];
      
      ids.forEach(id => {
        const menuItem = menuItems.find(item => item.id === id);
        if (menuItem) {
          const existingItem = itemsToAdd.find(item => item.id === id);
          if (existingItem) {
            existingItem.quantity += 1;
          } else {
            const price = parsePrice(menuItem.price);
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
      const menuItem = menuItems.find(item => item.id === itemId);
      if (menuItem) {
        const price = parsePrice(menuItem.price);
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

  const totalPrice = useMemo(() => {
    return selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }, [selectedItems]);

  const addItem = (item: MenuItem) => {
    const existingItem = selectedItems.find(i => i.id === item.id);
    const price = parsePrice(item.price);
    
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

  const removeItem = (id: string) => {
    setSelectedItems(selectedItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(id);
      return;
    }
    setSelectedItems(selectedItems.map(item => 
      item.id === id ? { ...item, quantity } : item
    ));
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (selectedItems.length === 0) {
      toast.error('Food Selection Required', {
        description: 'Please select at least one food item to proceed.',
      });
      return;
    }

    if (selectedItems.length > 0 && !paymentMethod) {
      toast.error('Payment Method Required', {
        description: 'Please select a payment method to proceed.',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await saveReservation(values);
    } catch (err) {
      console.error('Error in onSubmit:', err);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function saveReservation(values: z.infer<typeof formSchema>) {
    if (!paymentMethod) return;

    try {
      const advancePayment = Math.ceil(totalPrice * 0.4);
      
      const reservationData = await createReservation({
        reservation: {
          full_name: values.full_name,
          phone_number: values.phone_number,
          reservation_date: values.reservation_date,
          reservation_time: values.reservation_time,
          guests_count: values.guests_count,
          special_requests: values.special_requests,
          total_amount: totalPrice,
          advance_payment: advancePayment,
          payment_method: paymentMethod,
          status: 'pending'
        },
        items: selectedItems.map(item => ({
          menu_item_id: item.id,
          menu_item_name: item.name,
          price: item.price,
          quantity: item.quantity
        }))
      });

      toast.success('Reservation Saved!', {
        description: 'Your reservation has been saved successfully!',
      });

      if (reservationData?.id) {
        localStorage.setItem('lastReservationId', reservationData.id);
      }
      
      setShowSuccessDialog(true);
      
      return reservationData?.id;
    } catch (err) {
      console.error('Error saving reservation:', err);
      toast.error('Failed to save reservation', {
        description: 'Please try again later.',
      });
      throw err;
    }
  }



  return (
    <>
      <SEO 
        title="Reserve Table - Best Restaurant in Hunza | Leopard Cave Restaurant"
        description="Book your table at Leopard Cave Restaurant, the best place to eat in Hunza Valley. Reserve now for authentic Hunza food with stunning Attabad Lake views."
        keywords="reserve table Hunza, book restaurant Hunza, best restaurant in Karimabad Hunza, restaurants at Attabad Lake, where to eat in Hunza, best places to eat in Hunza"
      />
      <div className="flex flex-col w-full min-h-screen py-16 bg-background">
        <div className="container px-4 md:px-8 max-w-6xl mx-auto space-y-12">
          <BackButton />
          <div className="text-center space-y-4 pt-8">
            <h1 className="text-4xl md:text-6xl font-extrabold text-primary tracking-tight uppercase">Reserve Your Experience</h1>
            <p className="text-lg md:text-2xl text-muted-foreground max-w-2xl mx-auto font-medium">
              Book your table or check your reservation status
            </p>
          </div>

          <Tabs defaultValue="restaurant" className="w-full">
            <TabsList className="grid w-full grid-cols-3 h-auto p-1 bg-muted/50 rounded-2xl border border-primary/20 shadow-md mb-8">
              <TabsTrigger value="restaurant" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-sm md:text-base font-semibold py-3 px-4 rounded-xl transition-all duration-300 hover:bg-muted/80">
                <Utensils className="h-4 w-4 mr-1.5" />
                Restaurant
              </TabsTrigger>
              <TabsTrigger value="resort" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-sm md:text-base font-semibold py-3 px-4 rounded-xl transition-all duration-300 hover:bg-muted/80">
                <Tent className="h-4 w-4 mr-1.5" />
                Resort
              </TabsTrigger>
              <TabsTrigger value="your-reservations" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-sm md:text-base font-semibold py-3 px-4 rounded-xl transition-all duration-300 hover:bg-muted/80">
                <Phone className="h-4 w-4 mr-1.5" />
                Your Reservations
              </TabsTrigger>
            </TabsList>

            <TabsContent value="restaurant" className="space-y-12">
              <div className="text-center space-y-4">
                <p className="text-lg text-muted-foreground">Book your table and enjoy a memorable lunch or dinner with a breathtaking view of Attabad Lake.</p>
              </div>

              <div className="bg-muted/50 rounded-3xl p-8 shadow-lg border border-primary/10">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="h-8 w-8 text-amber-600 dark:text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-amber-900 dark:text-amber-100 mb-3">Advance Payment Policy</h3>
                    <p className="text-lg text-amber-800 dark:text-amber-200 leading-relaxed">
                      If you reserve a table or place a food order in advance, you will be required to pay <strong>40% of the total bill</strong> as an advance payment.
                    </p>
                  </div>
                </div>
              </div>

              <Card className="border-none shadow-xl hover:shadow-2xl transition-all duration-300 bg-card overflow-hidden rounded-3xl">
                <CardHeader className="bg-primary/5 p-8 border-b border-primary/10">
                  <CardTitle className="text-2xl md:text-3xl font-bold flex items-center gap-4 text-primary">
                    <CalendarIcon className="h-8 w-8" />
                    Reservation Details
                  </CardTitle>
                  <CardDescription className="text-lg text-muted-foreground">
                    Please fill in the form below to book your table.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="space-y-8">
                          <FormField
                            control={form.control}
                            name="full_name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-lg font-semibold flex items-center gap-2">
                                  <User className="h-5 w-5" /> Full Name
                                </FormLabel>
                                <FormControl>
                                  <Input placeholder="John Doe" {...field} className="h-14 text-lg rounded-2xl border-primary/20 focus:border-primary" />
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
                                <FormLabel className="text-lg font-semibold flex items-center gap-2">
                                  <Phone className="h-5 w-5" /> Phone Number
                                </FormLabel>
                                <FormControl>
                                  <Input placeholder="+92 3XX XXXXXXX" {...field} className="h-14 text-lg rounded-2xl border-primary/20 focus:border-primary" />
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
                                <FormLabel className="text-lg font-semibold flex items-center gap-2">
                                  <CalendarIcon className="h-5 w-5" /> Date
                                </FormLabel>
                                <FormControl>
                                  <Input type="date" {...field} className="h-14 text-lg rounded-2xl border-primary/20 focus:border-primary" />
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
                                <FormLabel className="text-lg font-semibold flex items-center gap-2">
                                  <Clock className="h-5 w-5" /> Time
                                </FormLabel>
                                <FormControl>
                                  <Input type="time" {...field} className="h-14 text-lg rounded-2xl border-primary/20 focus:border-primary" />
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
                                <FormLabel className="text-lg font-semibold flex items-center gap-2">
                                  <Users className="h-5 w-5" /> Number of Guests
                                </FormLabel>
                                <FormControl>
                                  <Input type="number" min="1" {...field} className="h-14 text-lg rounded-2xl border-primary/20 focus:border-primary" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <label className="text-lg font-semibold flex items-center gap-2">
                              <Utensils className="h-5 w-5" /> Pre-Order Food Items <span className="text-destructive">*</span>
                            </label>
                            <p className="text-base text-muted-foreground">At least one food item must be selected to proceed.</p>
                            
                            {menuLoading ? (
                              <div className="space-y-4">
                                <Skeleton className="h-14 w-full rounded-2xl" />
                                <Skeleton className="h-14 w-full rounded-2xl" />
                                <Skeleton className="h-14 w-full rounded-2xl" />
                              </div>
                            ) : menuItems.length === 0 ? (
                              <div className="text-center py-12 text-muted-foreground border-2 border-dashed rounded-3xl">
                                No menu items available at the moment.
                              </div>
                            ) : (
                              <Select value={selectedMenuItem} onValueChange={(value) => {
                                setSelectedMenuItem(value);
                                const item = menuItems.find(i => i.id === value);
                                if (item) {
                                  addItem(item);
                                  setSelectedMenuItem('');
                                }
                              }}>
                                <SelectTrigger className="w-full h-14 text-lg rounded-2xl border-primary/20 hover:border-primary">
                                  <SelectValue placeholder="Select a menu item" />
                                </SelectTrigger>
                                <SelectContent>
                                  {menuItems.map((item) => (
                                    <SelectItem key={item.id} value={item.id}>
                                      {item.name} - {item.price}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            )}
                          </div>

                          {selectedItems.length > 0 && (
                            <div className="space-y-4 p-6 bg-muted/50 rounded-3xl border border-primary/20">
                              <h4 className="font-bold text-lg uppercase text-muted-foreground">Your Order</h4>
                              {selectedItems.map((item) => (
                                <Card key={item.id} className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-card hover:bg-muted/30">
                                  <CardHeader className="flex flex-row items-center justify-between p-5">
                                    <div className="space-y-1 pr-4 flex-1">
                                      <CardTitle className="text-lg font-bold">{item.name}</CardTitle>
                                      <p className="text-sm md:text-base text-muted-foreground">PKR {item.price} each</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                      <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        className="h-10 w-10 p-0 rounded-full"
                                      >
                                        -
                                      </Button>
                                      <span className="w-10 text-center font-bold text-xl">{item.quantity}</span>
                                      <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        className="h-10 w-10 p-0 rounded-full"
                                      >
                                        +
                                      </Button>
                                      <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removeItem(item.id)}
                                        className="h-10 w-10 p-0 rounded-full text-destructive hover:text-destructive"
                                      >
                                        <X className="h-5 w-5" />
                                      </Button>
                                    </div>
                                  </CardHeader>
                                </Card>
                              ))}
                              <div className="flex justify-between items-center pt-6 border-t border-border">
                                <span className="text-xl font-bold">Total Bill:</span>
                                <Badge variant="secondary" className="text-2xl font-extrabold px-6 py-3 bg-primary/10 text-primary border-none">
                                  PKR {totalPrice}
                                </Badge>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {selectedItems.length > 0 && totalPrice > 0 && (
                        <div className="space-y-6 p-8 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl border border-primary/20">
                          <div className="space-y-3">
                            <div className="flex items-center gap-4">
                              <h3 className="text-2xl font-bold text-primary whitespace-nowrap">Select Payment Method</h3>
                              <Separator className="bg-primary/20 flex-1" />
                            </div>
                            <p className="text-base text-muted-foreground">
                              Advance Payment Required: <strong className="text-primary">PKR {Math.ceil(totalPrice * 0.4)}</strong> (40% of total bill)
                            </p>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <button
                              type="button"
                              onClick={() => setPaymentMethod('jazzcash')}
                              className={`p-6 rounded-2xl border-2 transition-all hover:scale-[1.02] ${
                                paymentMethod === 'jazzcash'
                                  ? 'border-primary bg-primary/10 shadow-lg'
                                  : 'border-border hover:border-primary/50'
                              }`}
                            >
                              <div className="text-center space-y-3">
                                <div className="font-bold text-xl">JazzCash</div>
                                <div className="text-sm text-muted-foreground">Mobile Payment</div>
                              </div>
                            </button>

                            <button
                              type="button"
                              onClick={() => setPaymentMethod('easypaisa')}
                              className={`p-6 rounded-2xl border-2 transition-all hover:scale-[1.02] ${
                                paymentMethod === 'easypaisa'
                                  ? 'border-primary bg-primary/10 shadow-lg'
                                  : 'border-border hover:border-primary/50'
                              }`}
                            >
                              <div className="text-center space-y-3">
                                <div className="font-bold text-xl">Easypaisa</div>
                                <div className="text-sm text-muted-foreground">Mobile Payment</div>
                              </div>
                            </button>

                            <button
                              type="button"
                              onClick={() => setPaymentMethod('crypto')}
                              className={`p-6 rounded-2xl border-2 transition-all hover:scale-[1.02] ${
                                paymentMethod === 'crypto'
                                  ? 'border-primary bg-primary/10 shadow-lg'
                                  : 'border-border hover:border-primary/50'
                              }`}
                            >
                              <div className="text-center space-y-3">
                                <div className="font-bold text-xl">Crypto</div>
                                <div className="text-sm text-muted-foreground">USDT (TRC20)</div>
                              </div>
                            </button>
                          </div>

                          {paymentMethod === 'jazzcash' && (
                            <div className="space-y-5 p-6 bg-background rounded-2xl border border-primary/20">
                              <h4 className="font-bold text-xl text-primary">JazzCash Payment Details</h4>
                              <div className="space-y-4">
                                <div>
                                  <p className="text-base text-muted-foreground mb-2">Account Number:</p>
                                  <p className="text-2xl font-bold font-mono">03160605535</p>
                                </div>
                                <div className="flex justify-center">
                                  <img
                                    src="https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260401/file-ancjy90b0q9s.jpeg"
                                    alt="JazzCash QR Code"
                                    className="w-64 h-64 object-contain rounded-2xl border-2 border-primary/20"
                                  />
                                </div>
                                <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-5">
                                  <p className="text-base text-blue-800 dark:text-blue-200">
                                    <strong>Note:</strong> After completing the payment, please send a screenshot of the transaction to our WhatsApp number or email address for confirmation.
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}

                          {paymentMethod === 'easypaisa' && (
                            <div className="space-y-5 p-6 bg-background rounded-2xl border border-primary/20">
                              <h4 className="font-bold text-xl text-primary">Easypaisa Payment Details</h4>
                              <div className="space-y-4">
                                <div>
                                  <p className="text-base text-muted-foreground mb-2">Account Number:</p>
                                  <p className="text-2xl font-bold font-mono">03160605535</p>
                                </div>
                                <div className="flex justify-center">
                                  <img
                                    src="https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260401/file-anck7ghhyh34.jpeg"
                                    alt="Easypaisa QR Code"
                                    className="w-64 h-64 object-contain rounded-2xl border-2 border-primary/20"
                                  />
                                </div>
                                <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-5">
                                  <p className="text-base text-blue-800 dark:text-blue-200">
                                    <strong>Note:</strong> After completing the payment, please send a screenshot of the transaction to our WhatsApp number or email address for confirmation.
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}

                          {paymentMethod === 'crypto' && (
                            <div className="space-y-5 p-6 bg-background rounded-2xl border border-primary/20">
                              <h4 className="font-bold text-xl text-primary">Crypto Payment Details (USDT TRC20)</h4>
                              <div className="space-y-4">
                                <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-5">
                                  <p className="text-base font-bold text-amber-800 dark:text-amber-200">
                                    ⚠️ Important: Send only USDT via TRC20 network. Other networks or tokens will not be accepted.
                                  </p>
                                </div>
                                <div>
                                  <p className="text-base text-muted-foreground mb-2">USDT Wallet Address (TRC20):</p>
                                  <p className="text-lg font-bold font-mono break-all bg-muted p-4 rounded-2xl">
                                    TEbBbx5NQXJoUZrpPaaAM39919SpbYCb47
                                  </p>
                                </div>
                                <div className="flex justify-center">
                                  <img
                                    src="https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260401/file-anckgnyov5z4.jpeg"
                                    alt="USDT TRC20 QR Code"
                                    className="w-64 h-64 object-contain rounded-2xl border-2 border-primary/20"
                                  />
                                </div>
                                <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-5">
                                  <p className="text-base text-blue-800 dark:text-blue-200">
                                    <strong>Note:</strong> After completing the payment, please send a screenshot of the transaction to our WhatsApp number or email address for confirmation.
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      <FormField
                        control={form.control}
                        name="special_requests"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-lg font-semibold">Special Requests (Optional)</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Please let us know if you have any special requirements..."
                                className="min-h-[140px] text-lg rounded-2xl border-primary/20 focus:border-primary"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button type="submit" size="lg" className="w-full h-12 text-xl font-bold rounded-2xl tracking-widest uppercase transition-all hover:scale-[1.02] shadow-lg hover:shadow-xl" disabled={isSubmitting}>
                        {isSubmitting ? 'Saving Reservation...' : 'Continue to Confirm'}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="resort" className="space-y-12">
              <Card className="border-none shadow-xl hover:shadow-2xl transition-all duration-300 bg-card rounded-3xl">
                <CardHeader className="text-center pb-8">
                  <div className="flex justify-center mb-6">
                    <div className="p-6 bg-primary/10 rounded-full">
                      <Tent className="h-12 w-12 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="text-3xl md:text-5xl font-extrabold text-primary">Camping Reservation</CardTitle>
                  <CardDescription className="text-lg">
                    Book your camping experience at Leopard Cave Resort
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="bg-primary/10 rounded-3xl p-8 space-y-4 border border-primary/20">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-foreground text-xl">Price per Tent (per night):</span>
                      <Badge variant="secondary" className="text-3xl font-extrabold px-6 py-3 bg-primary/10 text-primary border-none">
                        PKR 3,000
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-lg">
                      <span className="text-muted-foreground">Maximum Capacity:</span>
                      <span className="font-bold text-foreground">3 People per Tent</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-bold text-foreground text-2xl">Included Features:</h4>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-start gap-3 text-lg">
                        <span className="text-primary font-bold text-2xl">✓</span>
                        <span>Premium camping tents with comfortable bedding</span>
                      </li>
                      <li className="flex items-start gap-3 text-lg">
                        <span className="text-primary font-bold text-2xl">✓</span>
                        <span>Bonfire and BBQ facilities</span>
                      </li>
                      <li className="flex items-start gap-3 text-lg">
                        <span className="text-primary font-bold text-2xl">✓</span>
                        <span>Guided hiking tours to Baskochi Meadows</span>
                      </li>
                      <li className="flex items-start gap-3 text-lg">
                        <span className="text-primary font-bold text-2xl">✓</span>
                        <span>Stunning views of Attabad Lake</span>
                      </li>
                      <li className="flex items-start gap-3 text-lg">
                        <span className="text-primary font-bold text-2xl">✓</span>
                        <span>Restaurant dining access</span>
                      </li>
                    </ul>
                  </div>

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
                    className="w-full rounded-full font-bold text-xl py-8 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Tent className="h-6 w-6 mr-2" />
                    Book Camping Now
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-none shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl">
                <CardContent className="p-16 text-center space-y-6">
                  <div className="flex justify-center">
                    <div className="p-8 bg-primary/20 rounded-full">
                      <Building2 className="h-20 w-20 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-4xl md:text-6xl font-extrabold text-primary">Leopard Cave Resort</h3>
                  <p className="text-2xl md:text-3xl font-bold text-secondary">Coming Soon</p>
                  <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed text-lg">
                    We're working on bringing you an exceptional resort experience with premium accommodations and world-class amenities. Stay tuned for updates!
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="your-reservations" className="space-y-12">
              <Card className="border-none shadow-xl hover:shadow-2xl transition-all duration-300 bg-card rounded-3xl">
                <CardHeader className="p-8">
                  <CardTitle className="text-2xl font-bold flex items-center gap-3 text-primary">
                    <Phone className="h-6 w-6" />
                    Enter Phone Number
                  </CardTitle>
                  <CardDescription className="text-lg text-muted-foreground">
                    We'll use your phone number to find your reservations
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8 pt-0 space-y-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <Input
                        type="tel"
                        placeholder="+92 3XX XXXXXXX"
                        value={statusPhoneNumber}
                        onChange={(e) => {
                          setStatusPhoneNumber(e.target.value);
                          setStatusError(null);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            fetchStatusReservations();
                          }
                        }}
                        className="h-14 text-lg rounded-2xl border-primary/20 focus:border-primary"
                      />
                    </div>
                    <Button
                      size="lg"
                      className="h-14 text-xl font-bold px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                      onClick={() => fetchStatusReservations()}
                      disabled={statusLoading}
                    >
                      {statusLoading ? 'Loading...' : 'Check Status'}
                    </Button>
                  </div>
                  
                  {statusError && (
                    <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-2xl p-6">
                      <p className="text-red-800 dark:text-red-200 text-lg">{statusError}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {statusLoading && (
                <div className="space-y-6">
                  <Skeleton className="h-64 w-full rounded-3xl" />
                  <Skeleton className="h-64 w-full rounded-3xl" />
                </div>
              )}

              {!statusLoading && statusReservations.length > 0 && (
                <div className="space-y-8">
                  <h2 className="text-3xl font-bold text-primary">Your Reservations</h2>
                  
                  {statusReservations.map((reservation, _idx) => (
                    <Card key={reservation.id} className="border-none shadow-xl hover:shadow-2xl transition-all duration-300 bg-card rounded-3xl">
                      <CardHeader className="p-8 pb-4">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                          <div>
                            <CardTitle className="text-2xl font-bold">
                              Reservation for {reservation.full_name}
                            </CardTitle>
                            <CardDescription className="text-lg text-muted-foreground mt-1">
                              {reservation.reservation_date} at {reservation.reservation_time} • {reservation.guests_count} Guests
                            </CardDescription>
                          </div>
                          <div className="flex flex-col gap-2 items-end">
                            {getStatusBadge(reservation.status || 'pending')}
                            {getAdvanceStatusBadge(reservation.advance_payment_status)}
                            {(reservation.status === 'pending' || !reservation.status) && (
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleCancelClick(reservation.id)}
                                className="mt-2 gap-2"
                              >
                                <XCircle className="h-4 w-4" />
                                Cancel Reservation
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-8 pt-0 space-y-6">
                        <Separator className="bg-primary/10" />
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <h4 className="text-lg font-bold text-primary">Order Summary</h4>
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead className="text-base font-semibold">Item</TableHead>
                                  <TableHead className="text-base font-semibold text-center">Qty</TableHead>
                                  <TableHead className="text-base font-semibold text-right">Price</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {(reservation as any).reservation_items?.map((item: ReservationItem) => (
                                  <TableRow key={item.id}>
                                    <TableCell className="font-medium">{item.menu_item_name}</TableCell>
                                    <TableCell className="text-center">{item.quantity}</TableCell>
                                    <TableCell className="text-right font-bold">PKR {item.price * item.quantity}</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                          
                          <div className="space-y-4">
                            <h4 className="text-lg font-bold text-primary">Payment Details</h4>
                            <div className="space-y-3 bg-muted/50 rounded-2xl p-6">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Total Amount:</span>
                                <span className="font-bold text-xl">PKR {reservation.total_amount}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Advance Paid:</span>
                                <span className="font-bold text-xl">PKR {reservation.advance_payment}</span>
                              </div>
                              <Separator className="bg-primary/10" />
                              <div className="flex justify-between">
                                <span className="font-bold text-lg">Payment Method:</span>
                                <span className="font-bold text-xl capitalize">
                                  {reservation.payment_method === 'jazzcash' ? 'JazzCash' : 
                                   reservation.payment_method === 'easypaisa' ? 'Easypaisa' : 'Crypto'}
                                </span>
                              </div>
                            </div>
                            
                            {reservation.special_requests && (
                              <div className="space-y-2">
                                <h5 className="font-bold text-lg">Special Requests</h5>
                                <div className="bg-muted/50 rounded-2xl p-4">
                                  <p className="text-muted-foreground">{reservation.special_requests}</p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {!statusLoading && statusReservations.length === 0 && statusPhoneNumber && (
                <Card className="border-none shadow-xl bg-card rounded-3xl">
                  <CardContent className="p-16 text-center">
                    <h3 className="text-2xl font-bold text-primary mb-2">No Reservations Found</h3>
                    <p className="text-muted-foreground text-lg">
                      No reservations found for this phone number. Please check the number and try again.
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>

        <Dialog open={showSuccessDialog} onOpenChange={(open) => {
          setShowSuccessDialog(open);
          if (!open) {
            form.reset();
            setSelectedItems([]);
            setPaymentMethod(null);
          }
        }}>
          <DialogContent className="sm:max-w-3xl p-8">
            <DialogHeader>
              <DialogTitle className="text-3xl font-bold text-primary flex items-center gap-3">
                <CheckCircle className="h-8 w-8 text-green-600" />
                Reservation Successful!
              </DialogTitle>
              <DialogDescription className="text-lg text-muted-foreground mt-4">
                Thank you for your reservation at Leopard Cave Restaurant! Here are the next steps to complete your booking.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="bg-amber-50 dark:bg-amber-950/20 border-2 border-amber-200 dark:border-amber-800 rounded-2xl p-6">
                <h4 className="text-xl font-bold text-amber-800 dark:text-amber-200 flex items-center gap-2 mb-3">
                  <Clock className="h-5 w-5" />
                  Next Step: Send Payment Screenshot
                </h4>
                <p className="text-amber-700 dark:text-amber-300 text-lg mb-4">
                  To confirm your reservation, please send a screenshot of your advance payment to our WhatsApp and email.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-amber-950/30 border border-amber-300 dark:border-amber-700 rounded-xl p-4">
                    <h5 className="font-bold text-lg text-amber-800 dark:text-amber-200 mb-2">
                      <MessageCircle className="h-5 w-5 inline mr-2" />
                      WhatsApp
                    </h5>
                    <p className="text-xl font-semibold text-primary">+92 316 060 5535</p>
                  </div>
                  <div className="bg-white dark:bg-amber-950/30 border border-amber-300 dark:border-amber-700 rounded-xl p-4">
                    <h5 className="font-bold text-lg text-amber-800 dark:text-amber-200 mb-2">
                      <Mail className="h-5 w-5 inline mr-2" />
                      Email
                    </h5>
                    <p className="text-lg font-semibold text-primary">reservations@leopardcave.com</p>
                  </div>
                </div>
              </div>
              <Separator className="bg-primary/10" />
              <div className="bg-muted/50 rounded-2xl p-6">
                <h4 className="text-lg font-bold text-primary mb-2">What happens next?</h4>
                <ul className="text-muted-foreground text-base space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">1.</span>
                    You send your advance payment screenshot to both WhatsApp and email
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">2.</span>
                    Our team verifies your payment within 24 hours
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">3.</span>
                    You receive a confirmation message on both WhatsApp and email!
                  </li>
                </ul>
              </div>
            </div>
            <DialogFooter>
              <Button 
                size="lg"
                onClick={() => {
                  setShowSuccessDialog(false);
                  form.reset();
                  setSelectedItems([]);
                  setPaymentMethod(null);
                }}
                className="w-full h-14 text-lg font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all"
              >
                Got it, I'll send the screenshot!
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Cancellation Confirmation Dialog */}
        <AlertDialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Cancel this reservation?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. Your reservation will be cancelled and marked as "Cancelled".
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isCancelling}>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleConfirmCancel}
                disabled={isCancelling}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                {isCancelling ? 'Cancelling...' : 'Cancel Reservation'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
}
