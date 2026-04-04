import BackButton from "@/components/common/BackButton";
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Users, Tent, Mail, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const formSchema = z.object({
  full_name: z.string().min(2, 'Name must be at least 2 characters'),
  phone_number: z.string().min(10, 'Please enter a valid phone number'),
  email: z.string().email('Please enter a valid email address'),
  check_in_date: z.string().min(1, 'Check-in date is required'),
  check_out_date: z.string().min(1, 'Check-out date is required'),
  number_of_people: z.string().min(1, 'Number of people is required'),
  special_requests: z.string().optional(),
});

export default function CampaignReservation() {
  const [showDialog, setShowDialog] = useState(false);
  const [formData, setFormData] = useState<z.infer<typeof formSchema> | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: '',
      phone_number: '',
      email: '',
      check_in_date: '',
      check_out_date: '',
      number_of_people: '',
      special_requests: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setFormData(values);
    setShowDialog(true);
  }

  function sendViaWhatsApp() {
    if (!formData) return;
    
    let message = `*🏕️ CAMPING RESERVATION REQUEST*\n\n`;
    message += `*Guest Information:*\n`;
    message += `👤 Name: ${formData.full_name}\n`;
    message += `📱 Phone: ${formData.phone_number}\n`;
    message += `📧 Email: ${formData.email}\n\n`;
    
    message += `*Camping Details:*\n`;
    message += `📅 Check-in: ${formData.check_in_date}\n`;
    message += `📅 Check-out: ${formData.check_out_date}\n`;
    message += `👥 Number of People: ${formData.number_of_people}\n\n`;
    
    if (formData.special_requests) {
      message += `*📝 Special Requests:*\n${formData.special_requests}\n\n`;
    }
    
    message += `*━━━━━━━━━━━━━━━━━━━━*\n`;
    message += `_Please confirm availability and pricing_`;
    
    const whatsappUrl = `https://wa.me/923160605535?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    toast.success('Redirecting to WhatsApp...', {
      description: 'Please send the message to complete your camping reservation.',
    });
    
    setShowDialog(false);
    form.reset();
  }

  function sendViaGmail() {
    if (!formData) return;
    
    const subject = `Camping Reservation Request - ${formData.full_name}`;
    let body = `CAMPING RESERVATION REQUEST\n\n`;
    body += `Guest Information:\n`;
    body += `Name: ${formData.full_name}\n`;
    body += `Phone: ${formData.phone_number}\n`;
    body += `Email: ${formData.email}\n\n`;
    
    body += `Camping Details:\n`;
    body += `Check-in Date: ${formData.check_in_date}\n`;
    body += `Check-out Date: ${formData.check_out_date}\n`;
    body += `Number of People: ${formData.number_of_people}\n\n`;
    
    if (formData.special_requests) {
      body += `Special Requests: ${formData.special_requests}\n\n`;
    }
    
    body += `━━━━━━━━━━━━━━━━━━━━\n`;
    body += `Please confirm availability and pricing`;
    
    const gmailUrl = `mailto:Leopardcaverestaurantofficial@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = gmailUrl;
    
    toast.success('Opening Gmail...', {
      description: 'Please send the email to complete your camping reservation.',
    });
    
    setShowDialog(false);
    form.reset();
  }

  return (
    <div className="flex flex-col w-full min-h-screen py-16 bg-background">
      <div className="container px-4 md:px-8 max-w-4xl mx-auto space-y-12 mt-8">
        <BackButton />
        <div className="text-center space-y-4 pt-8">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/10 rounded-full">
              <Tent className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl md:text-7xl font-extrabold text-primary tracking-tight uppercase">Book Your Camping</h1>
          <p className="text-lg md:text-2xl text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed">
            Reserve your spot for an unforgettable camping experience at Leopard Cave
          </p>
        </div>

        <Card className="border-none shadow-2xl bg-card rounded-3xl">
          <CardHeader className="p-8 pb-6">
            <CardTitle className="text-3xl font-bold text-primary text-center">Camping Reservation Form</CardTitle>
          </CardHeader>
          <CardContent className="p-8 pt-0">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="full_name"
                  render={({ field }) => (
                    <FormItem>
                      <label className="text-base font-semibold flex items-center gap-2">
                        <Users className="h-4 w-4" /> Full Name <span className="text-destructive">*</span>
                      </label>
                      <FormControl>
                        <Input placeholder="Enter your full name" {...field} className="h-12 text-base" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="phone_number"
                    render={({ field }) => (
                      <FormItem>
                        <label className="text-base font-semibold">Phone Number <span className="text-destructive">*</span></label>
                        <FormControl>
                          <Input placeholder="03XX XXXXXXX" {...field} className="h-12 text-base" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <label className="text-base font-semibold">Email Address <span className="text-destructive">*</span></label>
                        <FormControl>
                          <Input type="email" placeholder="your@email.com" {...field} className="h-12 text-base" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="check_in_date"
                    render={({ field }) => (
                      <FormItem>
                        <label className="text-base font-semibold flex items-center gap-2">
                          <Calendar className="h-4 w-4" /> Check-in Date <span className="text-destructive">*</span>
                        </label>
                        <FormControl>
                          <Input type="date" {...field} className="h-12 text-base" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="check_out_date"
                    render={({ field }) => (
                      <FormItem>
                        <label className="text-base font-semibold flex items-center gap-2">
                          <Calendar className="h-4 w-4" /> Check-out Date <span className="text-destructive">*</span>
                        </label>
                        <FormControl>
                          <Input type="date" {...field} className="h-12 text-base" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="number_of_people"
                  render={({ field }) => (
                    <FormItem>
                      <label className="text-base font-semibold flex items-center gap-2">
                        <Users className="h-4 w-4" /> Number of People <span className="text-destructive">*</span>
                      </label>
                      <FormControl>
                        <Input type="number" min="1" placeholder="How many people?" {...field} className="h-12 text-base" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="special_requests"
                  render={({ field }) => (
                    <FormItem>
                      <label className="text-base font-semibold">Special Requests (Optional)</label>
                      <FormControl>
                        <Textarea 
                          placeholder="Any special requirements or requests?" 
                          {...field} 
                          className="min-h-32 text-base resize-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" size="lg" className="w-full h-14 text-xl font-bold rounded-2xl">
                  Submit Reservation Request
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-primary">Choose Contact Method</DialogTitle>
              <DialogDescription className="text-base">
                How would you like to send your camping reservation request?
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4 py-4">
              <Button onClick={sendViaWhatsApp} size="lg" className="h-14 text-lg font-bold rounded-xl">
                <MessageSquare className="h-5 w-5 mr-2" />
                Send via WhatsApp
              </Button>
              <Button onClick={sendViaGmail} variant="outline" size="lg" className="h-14 text-lg font-bold rounded-xl">
                <Mail className="h-5 w-5 mr-2" />
                Send via Gmail
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
