import BackButton from "@/components/common/BackButton";
import SEO from "@/components/common/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Phone, XCircle } from "lucide-react";
import { getReservationsByPhone, cancelReservation } from "@/db/api";
import { Reservation, ReservationItem } from "@/types/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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
        return <Badge variant="secondary" className="text-sm py-1.5 px-4 bg-amber-100 text-amber-800 border-none">Not Received</Badge>;
      case 'received':
        return <Badge variant="secondary" className="text-sm py-1.5 px-4 bg-green-100 text-green-800 border-none">Received</Badge>;
      default:
        return <Badge variant="secondary" className="text-sm py-1.5 px-4 bg-gray-100 text-gray-800 border-none">{status || 'Unknown'}</Badge>;
    }
  };

  const fetchReservations = async (phoneToUse?: string) => {
    const phone = phoneToUse || phoneNumber;
    if (!phone) {
      setError("Please enter a phone number");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await getReservationsByPhone(phone);
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
      <div className="flex flex-col w-full min-h-screen py-16 bg-background">
        <div className="container px-4 md:px-8 max-w-4xl mx-auto space-y-12">
          <BackButton />
          
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-6xl font-extrabold text-primary tracking-tight uppercase">Check Reservation Status</h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Enter your phone number to view your reservations and order details
            </p>
          </div>

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
                <Input
                  type="tel"
                  placeholder="+92 3XX XXXXXXX"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="h-14 text-lg rounded-2xl border-primary/20 focus:border-primary"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      fetchReservations();
                    }
                  }}
                />
                <Button
                  size="lg"
                  className="h-14 text-xl font-bold px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => fetchReservations()}
                  disabled={loading}
                >
                  {loading ? 'Loading...' : 'Check Status'}
                </Button>
              </div>

              {error && (
                <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-2xl p-6">
                  <p className="text-red-800 dark:text-red-200 text-lg">{error}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {loading && (
            <div className="space-y-6">
              <Skeleton className="h-64 w-full rounded-3xl" />
              <Skeleton className="h-64 w-full rounded-3xl" />
            </div>
          )}

          {!loading && reservations.length > 0 && (
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-primary">Your Reservations</h2>
              
              {reservations.map((reservation, idx) => {
                console.log('Reservation:', reservation, 'status:', reservation.status);
                return (
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
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-8 pt-0 space-y-6">
                    <div className="p-4 border border-red-200 bg-red-50 rounded-xl">
                      <p className="text-red-800 font-bold text-lg mb-3">TEST: CANCEL RESERVATION BUTTON</p>
                      <Button
                        variant="destructive"
                        size="lg"
                        onClick={() => handleCancelClick(reservation.id)}
                        className="w-full gap-2"
                      >
                        <XCircle className="h-5 w-5" />
                        CANCEL RESERVATION NOW
                      </Button>
                      <p className="text-sm text-red-600 mt-2">
                        Status value: "{reservation.status}" (type: {typeof reservation.status})
                      </p>
                    </div>
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
                );
              })}
            </div>
          )}

          {!loading && reservations.length === 0 && phoneNumber && (
            <Card className="border-none shadow-xl bg-card rounded-3xl">
              <CardContent className="p-16 text-center">
                <h3 className="text-2xl font-bold text-primary mb-2">No Reservations Found</h3>
                <p className="text-muted-foreground text-lg">
                  No reservations found for this phone number. Please check the number and try again.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
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
