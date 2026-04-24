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
import { Utensils, X, CheckCircle, Plus, Minus, Eye, XCircle, Check, ChevronsUpDown, Search } from 'lucide-react';
import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { supabase } from '@/utils/supabase';
import { createReservation } from '@/db/api';
import { useReservation } from '@/contexts/ReservationContext';
import { cn } from "@/lib/utils";

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
  const { 
    selectedItems: contextItems, 
    addItem: contextAddItem, 
    removeItem: contextRemoveItem, 
    updateQuantity: contextUpdateQuantity,
    clearReservation: contextClearReservation
  } = useReservation();
  
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [menuSearchQuery, setMenuSearchQuery] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [menuLoading, setMenuLoading] = useState(true);
  const [open, setOpen] = useState(false);

  // Convert context items to local items format if needed, 
  // but let's see if we can just use context items directly.
  // The local SelectedItem has price as number, context MenuItem has price as string.
  
  const selectedItems = useMemo(() => {
    return contextItems.map(item => ({
      id: item.id,
      name: item.name,
      price: parsePrice(item.price || '0'),
      quantity: item.quantity
    }));
  }, [contextItems]);

  const addItem = (item: MenuItem) => {
      contextAddItem(item as any);
    };

  const removeItem = (id: string) => {
    contextRemoveItem(id);
  };

  const updateQuantity = (id: string, quantity: number) => {
     contextUpdateQuantity(id, quantity);
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
        setMenuItems((data as MenuItem[] | any) || []);
      } catch (err) {
        console.error('Error fetching menu items:', err);
        toast.error('Failed to load menu items');
      } finally {
        setMenuLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

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

  const filteredMenuItems = useMemo(() => {
    if (!menuSearchQuery) return menuItems;
    return menuItems.filter(item =>
      item.name.toLowerCase().includes(menuSearchQuery.toLowerCase())
    );
  }, [menuItems, menuSearchQuery]);

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

      await createReservation({
        reservation: {
          full_name: values.full_name,
          phone_number: values.phone_number ? `+92${values.phone_number}` : values.phone_number,
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

      setShowSuccessDialog(true);
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
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
            <div className="mb-6">
              <BackButton />
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
                <Utensils className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-primary mb-3">
                Reserve Your Experience
              </h1>
              <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
                Book your table and enjoy a memorable lunch or dinner with a breathtaking view of Attabad Lake.
              </p>
            </div>
          </div>
        </section>

        {/* Tabs */}
        <section className="py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 md:px-8 lg:px-16">
            <Tabs defaultValue="restaurant" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-muted/50 rounded-lg border border-border p-1 mb-8 h-auto">
                <TabsTrigger value="restaurant" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-sm font-medium py-2 rounded-md">
                  Restaurant
                </TabsTrigger>
                <TabsTrigger value="status" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-sm font-medium py-2 rounded-md">
                  Your Reservations
                </TabsTrigger>
              </TabsList>

              <TabsContent value="restaurant" className="space-y-8">
                {/* Advance Payment Policy */}
                <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
                  <h3 className="text-sm font-medium text-amber-800 dark:text-amber-200 mb-2">Advance Payment Policy</h3>
                  <p className="text-xs text-amber-800 dark:text-amber-200">
                    If you reserve a table or place a food order in advance, you will be required to pay <strong>40% of the total bill</strong> as an advance payment.
                  </p>
                </div>

                {/* Reservation Form */}
                <div className="bg-card rounded-xl border border-border shadow-sm p-5">
                  <h3 className="text-lg font-medium text-card-foreground mb-4">Reservation Details</h3>

                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                      {/* Stacked Layout for Form Fields */}
                      <div className="space-y-6 ">
                        {/* Personal Info - Full Width Stack */}
                        <div className="space-y-4 ">
                          <FormField
                            control={form.control}
                            name="full_name"
                            render={({ field }) => (
                              <FormItem className="w-full">
                                <FormLabel className="text-sm font-medium">Full Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="John Doe" {...field} className="py-2.5 text-sm rounded-lg border-border focus:border-primary w-full" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="phone_number"
                            render={({ field }) => {
                              const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                                let value = e.target.value;
                                value = value.replace(/^\+92/, '').replace(/^92/, '');
                                value = value.replace(/^0/, '');
                                value = value.replace(/\D/g, '');
                                value = value.slice(0, 10);
                                field.onChange(value);
                              };

                              return (
                                <FormItem className="w-full">
                                  <FormLabel className="text-sm font-medium">Phone Number</FormLabel>
                                  <FormControl>
                                    <div className="relative w-full">
                                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium text-muted-foreground pointer-events-none">
                                        +92
                                      </div>
                                      <Input
                                        placeholder="3XX XXXXXXX"
                                        value={field.value}
                                        onChange={handlePhoneChange}
                                        className="pl-12 py-2.5 text-sm rounded-lg border-border focus:border-primary w-full"
                                      />
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              );
                            }}
                          />

                          <FormField
                            control={form.control}
                            name="reservation_date"
                            render={({ field }) => (
                              <FormItem className="w-full">
                                <FormLabel className="text-sm font-medium">Date</FormLabel>
                                <FormControl>
                                  <Input type="date" {...field} className="py-2.5 text-sm rounded-lg border-border focus:border-primary w-full" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="reservation_time"
                            render={({ field }) => (
                              <FormItem className="w-full">
                                <FormLabel className="text-sm font-medium">Time</FormLabel>
                                <FormControl>
                                  <Input type="time" {...field} className="py-2.5 text-sm rounded-lg border-border focus:border-primary w-full" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="guests_count"
                            render={({ field }) => (
                              <FormItem className="w-full">
                                <FormLabel className="text-sm font-medium">Number of Guests</FormLabel>
                                <FormControl>
                                  <Input type="number" min="1" {...field} className="py-2.5 text-sm rounded-lg border-border focus:border-primary w-full" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* Order Section - Full Width Search */}
                        <div className="space-y-4 pt-4 border-t border-border">
                          <div className="space-y-3">
                            <label className="text-sm font-medium">Pre-Order Food Items <span className="text-destructive">*</span></label>
                            <p className="text-xs text-muted-foreground">At least one food item must be selected to proceed.</p>

                            {menuLoading ? (
                              <div className="space-y-2">
                                <Skeleton className="h-10 w-full rounded-lg" />
                                <Skeleton className="h-10 w-full rounded-lg" />
                              </div>
                            ) : menuItems.length === 0 ? (
                              <div className="text-center py-6 text-muted-foreground text-sm border border-border rounded-lg">
                                No menu items available at the moment.
                              </div>
                            ) : (
                              <div className="space-y-2">
                                <Popover open={open} onOpenChange={setOpen}>
                                  <PopoverTrigger asChild>
                                    <Button
                                      variant="outline"
                                      role="combobox"
                                      aria-expanded={open}
                                      className="w-full justify-between py-6 text-sm rounded-lg border-border hover:bg-muted transition-colors !bg-white"
                                    >
                                      <div className="flex items-center gap-2 text-muted-foreground">
                                        <Search className="h-4 w-4" />
                                        <span>Search menu items...</span>
                                      </div>
                                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 !bg-white" align="start">
                                    <Command>
                                      <CommandInput placeholder="Search menu items..." />
                                      <CommandList>
                                        <CommandEmpty>No menu items found.</CommandEmpty>
                                        <CommandGroup>
                                          {menuItems.map((item) => (
                                            <CommandItem
                                              key={item.id}
                                              value={item.name}
                                              onSelect={() => {
                                                addItem(item);
                                                setOpen(false);
                                              }}
                                              className={cn("flex justify-between items-center p-3 cursor-pointer data-[selected=true]:bg-muted/70 transition-colors")}
                                            >
                                              <div className="flex items-center gap-2">
                                                <div className="h-2 w-2 rounded-full bg-primary/40" />
                                                <span className="font-medium">{item.name}</span>
                                              </div>
                                              <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md">
                                                {item.price}
                                              </span>
                                            </CommandItem>
                                          ))}
                                        </CommandGroup>
                                      </CommandList>
                                    </Command>
                                  </PopoverContent>
                                </Popover>
                              </div>
                            )}
                          </div>

                          {selectedItems.length > 0 && (
                            <div className="space-y-6 p-6 bg-primary/[0.03] rounded-2xl border border-primary/10 shadow-sm">
                              <div className="flex items-center justify-between border-b border-primary/10 pb-4">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-primary">Your Selection</h4>
                                <Badge variant="secondary" className="text-xs px-3 h-6 rounded-full">
                                  {selectedItems.length} {selectedItems.length === 1 ? 'Item' : 'Items'}
                                </Badge>
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {selectedItems.map((item) => (
                                  <div key={item.id} className="flex items-center justify-between gap-4 p-4 bg-card rounded-xl border border-border shadow-sm group hover:border-primary/30 transition-all duration-300">
                                    <div className="flex-1 min-w-0">
                                      <p className="text-sm font-bold text-foreground truncate mb-0.5">{item.name}</p>
                                      <p className="text-xs text-primary font-semibold">PKR {item.price.toLocaleString()}</p>
                                    </div>
                                    
                                    <div className="flex items-center gap-2 bg-muted/30 rounded-lg p-1 border border-border/50">
                                      <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        className="h-8 w-8 p-0 hover:bg-background rounded-md transition-colors"
                                      >
                                        <Minus className="h-3 w-3" />
                                      </Button>
                                      <span className="text-xs font-bold min-w-[1.5rem] text-center">
                                        {item.quantity}
                                      </span>
                                      <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        className="h-8 w-8 p-0 hover:bg-background rounded-md transition-colors"
                                      >
                                        <Plus className="h-3 w-3" />
                                      </Button>
                                    </div>

                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => removeItem(item.id)}
                                      className="h-9 w-9 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-xl transition-all"
                                    >
                                      <X className="h-4 w-4" />
                                    </Button>
                                  </div>
                                ))}
                              </div>

                              <div className="flex justify-between items-center pt-5 border-t border-primary/10">
                                <div className="space-y-0.5">
                                  <span className="text-sm font-bold text-foreground">Total Bill</span>
                                  <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-tight">Inclusive of all applicable taxes</p>
                                </div>
                                <div className="text-right">
                                  <span className="text-2xl font-black text-primary tracking-tight">
                                    PKR {totalPrice.toLocaleString()}
                                  </span>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      {/* End of Grid Layout */}

                      {/* Payment Method - Full Width */}
                      {selectedItems.length > 0 && totalPrice > 0 && (
                        <div className="space-y-4 p-4 bg-muted/30 rounded-lg border border-border">
                          <div className="space-y-2">
                            <h3 className="text-sm font-medium">Select Payment Method</h3>
                            <p className="text-xs text-muted-foreground">
                              Advance Payment Required: <strong className="text-primary">PKR {Math.ceil(totalPrice * 0.4)}</strong> (40% of total bill)
                            </p>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <button
                              type="button"
                              onClick={() => setPaymentMethod('jazzcash')}
                              className={`p-3 rounded-lg border-2 transition-all ${paymentMethod === 'jazzcash'
                                  ? 'border-primary bg-primary/10'
                                  : 'border-border hover:border-primary/50'
                                }`}
                            >
                              <div className="text-center">
                                <div className="text-sm font-medium">JazzCash</div>
                                <div className="text-xs text-muted-foreground">Mobile Payment</div>
                              </div>
                            </button>

                            <button
                              type="button"
                              onClick={() => setPaymentMethod('easypaisa')}
                              className={`p-3 rounded-lg border-2 transition-all ${paymentMethod === 'easypaisa'
                                  ? 'border-primary bg-primary/10'
                                  : 'border-border hover:border-primary/50'
                                }`}
                            >
                              <div className="text-center">
                                <div className="text-sm font-medium">Easypaisa</div>
                                <div className="text-xs text-muted-foreground">Mobile Payment</div>
                              </div>
                            </button>

                            <button
                              type="button"
                              onClick={() => setPaymentMethod('crypto')}
                              className={`p-3 rounded-lg border-2 transition-all ${paymentMethod === 'crypto'
                                  ? 'border-primary bg-primary/10'
                                  : 'border-border hover:border-primary/50'
                                }`}
                            >
                              <div className="text-center">
                                <div className="text-sm font-medium">Crypto</div>
                                <div className="text-xs text-muted-foreground">USDT (TRC20)</div>
                              </div>
                            </button>
                          </div>

                          {paymentMethod === 'jazzcash' && (
                            <div className="flex flex-col md:flex-row gap-4 p-4 bg-background rounded-lg border border-border">
                              <div className="flex-1 space-y-3">
                                <h4 className="text-sm font-medium text-primary">JazzCash Payment Details</h4>
                                <div className="space-y-2">
                                  <div>
                                    <p className="text-xs text-muted-foreground mb-1">Account Name:</p>
                                    <p className="text-sm font-medium">Leopard Cave Restaurant</p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-muted-foreground mb-1">Account Number:</p>
                                    <p className="text-sm font-mono font-medium">03160605535</p>
                                  </div>
                                </div>
                              </div>
                              <div className="w-48 h-48 bg-muted rounded-lg flex items-center justify-center">
                                <div className="text-center text-xs text-muted-foreground">
                                  <p className="mb-2">JazzCash QR Code</p>
                                  <p>(Scan to Pay)</p>
                                </div>
                              </div>
                            </div>
                          )}

                          {paymentMethod === 'easypaisa' && (
                            <div className="flex flex-col md:flex-row gap-4 p-4 bg-background rounded-lg border border-border">
                              <div className="flex-1 space-y-3">
                                <h4 className="text-sm font-medium text-primary">Easypaisa Payment Details</h4>
                                <div className="space-y-2">
                                  <div>
                                    <p className="text-xs text-muted-foreground mb-1">Account Name:</p>
                                    <p className="text-sm font-medium">Leopard Cave Restaurant</p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-muted-foreground mb-1">Account Number:</p>
                                    <p className="text-sm font-mono font-medium">03160605535</p>
                                  </div>
                                </div>
                              </div>
                              <div className="w-48 h-48 bg-muted rounded-lg flex items-center justify-center">
                                <div className="text-center text-xs text-muted-foreground">
                                  <p className="mb-2">Easypaisa QR Code</p>
                                  <p>(Scan to Pay)</p>
                                </div>
                              </div>
                            </div>
                          )}

                          {paymentMethod === 'crypto' && (
                            <div className="space-y-3 p-4 bg-background rounded-lg border border-border">
                              <h4 className="text-sm font-medium text-primary">Crypto Payment Details (USDT TRC20)</h4>
                              <div className="space-y-2">
                                <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-md p-3">
                                  <p className="text-xs font-medium text-amber-800 dark:text-amber-200">
                                    ⚠️ Important: Send only USDT via TRC20 network.
                                  </p>
                                </div>
                                <div>
                                  <p className="text-xs text-muted-foreground mb-1">USDT Wallet Address:</p>
                                  <p className="text-xs font-mono bg-muted p-2 rounded-md break-all">
                                    TEbBbx5NQXJoUZrpPaaAM39919SpbYCb47
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
                            <FormLabel className="text-sm font-medium">Special Requests (Optional)</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Please let us know if you have any special requirements..."
                                className="min-h-[100px] text-sm rounded-lg border-border focus:border-primary"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button type="submit" className="w-full px-6 py-2.5 rounded-lg text-sm font-medium" disabled={isSubmitting}>
                        {isSubmitting ? 'Saving Reservation...' : 'Continue to Confirm'}
                      </Button>
                    </form>
                  </Form>
                </div>
              </TabsContent>

              <TabsContent value="status" className="space-y-6">
                <ReservationStatusContent />
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Success Dialog */}
        <Dialog open={showSuccessDialog} onOpenChange={(open) => {
          setShowSuccessDialog(open);
          if (!open) {
            form.reset();
            contextClearReservation();
            setPaymentMethod(null);
          }
        }}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-lg font-medium flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Reservation Successful!
              </DialogTitle>
              <DialogDescription className="text-sm mt-2 space-y-2">
                <p>Thank you for your reservation!</p>
                <p>
                  <strong>Important:</strong> Please send a screenshot of your advance payment to
                  confirm your booking. Until we receive your payment screenshot, your
                  reservation will remain in <strong>Pending</strong> state.
                </p>
                <p className="text-xs text-muted-foreground">
                  You can send the screenshot via WhatsApp or contact us at +92 316 060 5535.
                </p>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={() => setShowSuccessDialog(false)} className="w-full">
                Done
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}

// Reservation Status Content Component
function ReservationStatusContent() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [reservations, setReservations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value = value.replace(/^\+92/, '').replace(/^92/, '');
    value = value.replace(/^0/, '');
    value = value.replace(/\D/g, '');
    value = value.slice(0, 10);
    setPhoneNumber(value);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="text-xs py-1 px-2 bg-amber-100 text-amber-800 border-none">Pending</Badge>;
      case 'confirmed':
        return <Badge variant="outline" className="text-xs py-1 px-2 bg-green-100 text-green-800 border-none">Confirmed</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="text-xs py-1 px-2 bg-red-100 text-red-800 border-none">Cancelled</Badge>;
      default:
        return <Badge variant="outline" className="text-xs py-1 px-2 bg-gray-100 text-gray-800 border-none">{status}</Badge>;
    }
  };

  const getAdvanceStatusBadge = (status?: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="text-xs py-1 px-2 bg-amber-100 text-amber-800 border-none">Not Received</Badge>;
      case 'received':
        return <Badge variant="outline" className="text-xs py-1 px-2 bg-green-100 text-green-800 border-none">Received</Badge>;
      default:
        return <Badge variant="outline" className="text-xs py-1 px-2 bg-gray-100 text-gray-800 border-none">{status || 'Unknown'}</Badge>;
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
      const { error } = await supabase
        .from('reservations')
        .update({ status: 'cancelled' })
        .eq('id', cancellingId);
      if (error) throw error;
      toast.success('Reservation cancelled successfully');
      await fetchReservations();
      setConfirmDialogOpen(false);
    } catch (error: any) {
      toast.error(error.message || 'Failed to cancel reservation');
    } finally {
      setIsCancelling(false);
    }
  };

  const fetchReservations = async () => {
    if (!phoneNumber) {
      setError("Please enter a phone number");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('reservations')
        .select('*, reservation_items(*)')
        .eq('phone_number', `+92${phoneNumber}`)
        .order('created_at', { ascending: false });
      if (error) throw error;
      setReservations(data || []);
    } catch (err) {
      console.error('Error fetching reservations:', err);
      setError('Failed to fetch reservations');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium text-muted-foreground pointer-events-none">
            +92
          </div>
          <Input
            type="tel"
            placeholder="3XX XXXXXXX"
            value={phoneNumber}
            onChange={handlePhoneChange}
            className="pl-12 py-2.5 text-sm rounded-lg border-border focus:border-primary"
            onKeyDown={(e) => e.key === 'Enter' && fetchReservations()}
          />
        </div>
        <Button onClick={fetchReservations} disabled={loading} className="px-6 py-2.5 rounded-lg text-sm font-medium">
          {loading ? 'Loading...' : 'Check Status'}
        </Button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-red-800 dark:text-red-200 text-sm">{error}</p>
        </div>
      )}

      {loading && (
        <div className="space-y-4">
          <Skeleton className="h-40 w-full rounded-lg" />
          <Skeleton className="h-40 w-full rounded-lg" />
        </div>
      )}

      {!loading && reservations.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">Your Reservations</h3>
          {reservations.map((reservation) => (
            <div key={reservation.id} className="p-4 bg-card rounded-lg border border-border">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mb-3">
                <div>
                  <h4 className="text-sm font-medium text-card-foreground">
                    {reservation.full_name}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {reservation.reservation_date} at {reservation.reservation_time} • {reservation.guests_count} Guests
                  </p>
                </div>
                <div className="flex flex-col gap-2 items-start md:items-end">
                  <div className="flex gap-2">
                    {getStatusBadge(reservation.status || 'pending')}
                    {getAdvanceStatusBadge(reservation.advance_payment_status)}
                  </div>
                  {reservation.status?.toLowerCase() === 'pending' && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleCancelClick(reservation.id)}
                      className="mt-2 text-xs px-3 py-1.5"
                    >
                      <XCircle className="h-3 w-3 mr-1" />
                      Cancel
                    </Button>
                  )}
                </div>
              </div>
              <Separator className="my-3" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-xs font-medium text-muted-foreground mb-2">Total</h5>
                  <p className="text-sm font-medium">PKR {reservation.total_amount}</p>
                </div>
                <div>
                  <h5 className="text-xs font-medium text-muted-foreground mb-2">Advance Paid</h5>
                  <p className="text-sm font-medium">PKR {reservation.advance_payment}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

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

      {!loading && reservations.length === 0 && phoneNumber && (
        <div className="text-center py-8 border border-border rounded-lg bg-card">
          <p className="text-sm text-muted-foreground">No reservations found.</p>
        </div>
      )}
    </div>
  );
}
