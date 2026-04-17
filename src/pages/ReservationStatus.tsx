import BackButton from "@/components/common/BackButton";
import SEO from "@/components/common/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Phone, XCircle, Search, Loader2 } from "lucide-react";
import { getReservationsByPhone, cancelReservation } from "@/db/api";
import { Reservation, ReservationItem } from "@/types/types";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { toast } from "sonner";

export default function ReservationStatus() {
  const [searchParams] = useSearchParams();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [reservations, setReservations] = useState<Reservation[]>([]);
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

  useEffect(() => {
    const phone = searchParams.get('phone');
    if (phone) {
      setPhoneNumber(phone);
      fetchReservations(phone);
    }
  }, [searchParams]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="text-xs py-1.5 px-3 bg-amber-100 text-amber-800 border-none">Pending</Badge>;
      case 'confirmed':
        return <Badge variant="outline" className="text-xs py-1.5 px-3 bg-green-100 text-green-800 border-none">Confirmed</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="text-xs py-1.5 px-3 bg-red-100 text-red-800 border-none">Cancelled</Badge>;
      case 'completed':
        return <Badge variant="outline" className="text-xs py-1.5 px-3 bg-blue-100 text-blue-800 border-none">Completed</Badge>;
      default:
        return <Badge variant="outline" className="text-xs py-1.5 px-3 bg-gray-100 text-gray-800 border-none">{status}</Badge>;
    }
  };
  
  const getAdvanceStatusBadge = (status?: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="text-xs py-1.5 px-3 bg-amber-100 text-amber-800 border-none">Not Received</Badge>;
      case 'received':
        return <Badge variant="outline" className="text-xs py-1.5 px-3 bg-green-100 text-green-800 border-none">Received</Badge>;
      default:
        return <Badge variant="outline" className="text-xs py-1.5 px-3 bg-gray-100 text-gray-800 border-none">{status || 'Unknown'}</Badge>;
    }
  };

  const fetchReservations = async (phoneToUse?: string) => {
    const rawPhone = phoneToUse || phoneNumber;
    if (!rawPhone) {
      setError("Please enter a phone number");
      return;
    }

    const phoneWithPrefix = `+92${rawPhone}`;

    setLoading(true);
    setError(null);

    try {
      const data = await getReservationsByPhone(phoneWithPrefix);
      setReservations(data);
    } catch (err) {
      console.error('Error fetching reservations:', err);
      setError('Failed to fetch reservations');
    } finally {
      setLoading(false);
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
      await fetchReservations();
      setConfirmDialogOpen(false);
    } catch (error: any) {
      toast.error(error.message || 'Failed to cancel reservation');
    } finally {
      setIsCancelling(false);
    }
  };

  return (
    <>
      <SEO
        title="Check Reservation Status - Leopard Cave Restaurant"
        description="Check your reservation status and order details at Leopard Cave Restaurant, Hunza Valley"
        keywords="check reservation, reservation status, track order Hunza, Leopard Cave reservation"
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
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-primary mb-3">
                Check Reservation Status
              </h1>
              <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
                Enter your phone number to view your reservations and order details
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 md:px-8 lg:px-16">
            {/* Phone Input */}
            <div className="mb-10">
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
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        fetchReservations();
                      }
                    }}
                  />
                </div>
                <Button
                  onClick={() => fetchReservations()}
                  disabled={loading}
                  className="px-6 py-2.5 rounded-lg text-sm font-medium"
                >
                  {loading ? 'Loading...' : 'Check Status'}
                </Button>
              </div>

              {error && (
                <div className="mt-4 p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="text-red-800 dark:text-red-200 text-sm">{error}</p>
                </div>
              )}
            </div>

            {/* Loading State */}
            {loading && (
              <div className="space-y-4">
                <Skeleton className="h-48 w-full rounded-xl" />
                <Skeleton className="h-48 w-full rounded-xl" />
              </div>
            )}

            {/* Reservations List */}
            {!loading && reservations.length > 0 && (
              <div className="space-y-6">
                <h2 className="text-xl md:text-2xl font-semibold text-foreground">Your Reservations</h2>
                
                {reservations.map((reservation) => (
                  <div key={reservation.id} className="overflow-hidden rounded-xl bg-card shadow-sm border border-border">
                    <div className="p-5">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                        <div>
                          <h3 className="text-lg font-medium text-card-foreground">
                            Reservation for {reservation.full_name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
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
                      
                      <Separator className="my-4" />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* Order Summary */}
                        <div>
                          <h4 className="text-sm font-medium text-primary mb-3">Order Summary</h4>
                          <div className="space-y-2">
                            {(reservation as any).reservation_items?.map((item: ReservationItem) => (
                              <div key={item.id} className="flex justify-between text-sm">
                                <span className="text-muted-foreground">{item.menu_item_name} × {item.quantity}</span>
                                <span className="font-medium">PKR {item.price * item.quantity}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {/* Payment Details */}
                        <div>
                          <h4 className="text-sm font-medium text-primary mb-3">Payment Details</h4>
                          <div className="space-y-2 bg-muted/30 rounded-lg p-4">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Total Amount:</span>
                              <span className="font-medium">PKR {reservation.total_amount}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Advance Paid:</span>
                              <span className="font-medium">PKR {reservation.advance_payment}</span>
                            </div>
                            <Separator className="my-2" />
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Payment Method:</span>
                              <span className="font-medium capitalize">
                                {reservation.payment_method === 'jazzcash' ? 'JazzCash' : 
                                 reservation.payment_method === 'easypaisa' ? 'Easypaisa' : 'Crypto'}
                              </span>
                            </div>
                          </div>
                          
                          {reservation.special_requests && (
                            <div className="mt-3">
                              <h5 className="text-xs font-medium text-muted-foreground mb-2">Special Requests</h5>
                              <p className="text-sm text-muted-foreground">{reservation.special_requests}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Empty State */}
            {!loading && reservations.length === 0 && phoneNumber && (
              <div className="text-center py-12 border border-border rounded-xl bg-card">
                <h3 className="text-lg font-medium text-card-foreground mb-2">No Reservations Found</h3>
                <p className="text-sm text-muted-foreground">
                  No reservations found for this phone number. Please check the number and try again.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>

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
    </>
  );
}
