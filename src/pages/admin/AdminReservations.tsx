import  { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Badge } from '@/components/ui/badge';
import { LayoutGrid, List as ListIcon, MoreVertical, Calendar, Users, Phone, LoaderCircle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AdminLayout from '@/components/layout/AdminLayout';
import { supabase } from '@/utils/supabase';
import { toast } from 'sonner';
import type { Reservation, ReservationItem } from '@/types/types';

const ITEMS_PER_PAGE = 10;

type ReservationWithItems = Reservation & {
  reservation_items?: ReservationItem[];
};

export default function AdminReservations() {
  const [reservations, setReservations] = useState<ReservationWithItems[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewingReservation, setViewingReservation] = useState<ReservationWithItems | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'card'>('list');
  
  // For confirmation alert dialog
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean;
    reservationId: string;
    newStatus: Reservation['status'];
  }>({ open: false, reservationId: '', newStatus: 'pending' });
  const [confirmUpdating, setConfirmUpdating] = useState(false);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    fetchReservations(currentPage);
  }, []);

  const fetchReservations = async (page = 1) => {
    try {
      setLoading(true);
      const from = (page - 1) * ITEMS_PER_PAGE;
      const to = from + ITEMS_PER_PAGE - 1;

      const { data, error, count } = await supabase
        .from('reservations')
        .select('*, reservation_items(*)', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(from, to);

      if (error) throw error;
      if (data) {
        setReservations(data);
        if (count !== null) {
          setTotalCount(count);
          setTotalPages(Math.max(1, Math.ceil(count / ITEMS_PER_PAGE)));
        }
      }
      setCurrentPage(page);
    } catch (error: any) {
      toast.error(error.message || 'Failed to load reservations');
    } finally {
      setLoading(false);
    }
  };

  const updateReservationStatus = async (id: string, status: Reservation['status']) => {
    try {
      setConfirmUpdating(true);
      const updateData: any = { status };
      // Update advance payment status based on reservation status
      if (status === 'confirmed') {
        updateData.advance_payment_status = 'received';
      } else {
        updateData.advance_payment_status = 'pending';
      }

      const { error } = await supabase
        .from('reservations')
        .update(updateData)
        .eq('id', id);

      if (error) throw error;

      setReservations(reservations.map(res => 
        res.id === id ? { ...res, ...updateData } : res
      ));
      
      if (viewingReservation && viewingReservation.id === id) {
        setViewingReservation({ ...viewingReservation, ...updateData });
      }

      toast.success('Reservation status updated');
      setConfirmDialog({ open: false, reservationId: '', newStatus: 'pending' });
    } catch (error: any) {
      toast.error(error.message || 'Failed to update status');
    } finally {
      setConfirmUpdating(false);
    }
  };

  const confirmUpdateStatus = (reservationId: string, newStatus: Reservation['status']) => {
    setConfirmDialog({ open: true, reservationId, newStatus });
  };

  const handleConfirmUpdate = () => {
    updateReservationStatus(confirmDialog.reservationId, confirmDialog.newStatus);
  };

  const getStatusBadge = (status?: Reservation['status']) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-amber-100 text-amber-800 border-none">Pending</Badge>;
      case 'confirmed':
        return <Badge className="bg-green-100 text-green-800 border-none">Confirmed</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800 border-none">Cancelled</Badge>;
      case 'completed':
        return <Badge className="bg-blue-100 text-blue-800 border-none">Completed</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 border-none">{status || 'Unknown'}</Badge>;
    }
  };
  
  const getAdvanceStatusBadge = (status?: Reservation['advance_payment_status']) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-amber-100 text-amber-800 border-none">Not Received</Badge>;
      case 'received':
        return <Badge className="bg-green-100 text-green-800 border-none">Received</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 border-none">{status || 'Unknown'}</Badge>;
    }
  };

  const getPaymentMethodLabel = (method?: string) => {
    switch (method) {
      case 'jazzcash':
        return 'JazzCash';
      case 'easypaisa':
        return 'Easypaisa';
      case 'crypto':
        return 'Crypto USDT (TRC20)';
      default:
        return method || 'N/A';
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Reservations</h1>
            <p className="text-muted-foreground mt-1">
              Manage and update customer reservations. ({totalCount} total)
            </p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="border rounded-md hidden md:flex">
              <Button
                variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                size="sm"
                className="rounded-none border-r rounded-l-md px-3"
                onClick={() => setViewMode('list')}
              >
                <ListIcon className="w-4 h-4 mr-2" /> List
              </Button>
              <Button
                variant={viewMode === 'card' ? 'secondary' : 'ghost'}
                size="sm"
                className="rounded-none rounded-r-md px-3"
                onClick={() => setViewMode('card')}
              >
                <LayoutGrid className="w-4 h-4 mr-2" /> Grid
              </Button>
            </div>
          </div>
        </div>

        <Card className="w-full">
          {loading ? (
            <div className="flex justify-center items-center py-20 text-muted-foreground">
              Loading reservations...
            </div>
          ) : viewMode === 'list' ? (
            <div className="rounded-md border-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50 hover:bg-muted/50">
                    <TableHead>Name</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Guests</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Advance Payment</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reservations.map((reservation) => (
                    <TableRow 
                      key={reservation.id} 
                      className="hover:bg-muted/30 cursor-pointer"
                      onClick={() => setViewingReservation(reservation)}
                    >
                      <TableCell className="font-semibold text-primary">
                        {reservation.full_name}
                      </TableCell>
                      <TableCell className="text-muted-foreground">{reservation.phone_number}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{reservation.reservation_date}</div>
                          <div className="text-muted-foreground text-xs">{reservation.reservation_time}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{reservation.guests_count}</TableCell>
                      <TableCell className="font-semibold">
                        PKR {reservation.total_amount?.toLocaleString() || '0'}
                      </TableCell>
                      <TableCell>{getStatusBadge(reservation.status)}</TableCell>
                      <TableCell>{getAdvanceStatusBadge(reservation.advance_payment_status)}</TableCell>
                      <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => confirmUpdateStatus(reservation.id as string, 'pending')}>
                              Mark as Pending
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => confirmUpdateStatus(reservation.id as string, 'confirmed')}>
                              Mark as Confirmed
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => confirmUpdateStatus(reservation.id as string, 'cancelled')}>
                              Mark as Cancelled
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => confirmUpdateStatus(reservation.id as string, 'completed')}>
                              Mark as Completed
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                  {reservations.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-10 text-muted-foreground bg-muted/20">
                        No reservations found yet.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="p-6 bg-muted/10 rounded-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {reservations.map((reservation) => (
                  <Card 
                    key={reservation.id} 
                    className="flex flex-col overflow-hidden border border-border/50 hover:border-primary/30 transition-all hover:shadow-md cursor-pointer"
                    onClick={() => setViewingReservation(reservation)}
                  >
                    <CardHeader className="p-5 pb-3 bg-muted/20">
                      <div className="flex justify-between items-start gap-2">
                        <div className="min-w-0">
                          <CardTitle className="leading-tight mb-1 line-clamp-1">{reservation.full_name}</CardTitle>
                          <div className="flex items-center gap-2 text-[11px] font-bold tracking-wider uppercase text-muted-foreground">
                            <Phone className="w-3.5 h-3.5" />
                            {reservation.phone_number}
                          </div>
                        </div>
                        <div className="flex flex-col gap-1">
                          {getStatusBadge(reservation.status)}
                          {getAdvanceStatusBadge(reservation.advance_payment_status)}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-5 pt-4 flex-1 space-y-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        {reservation.reservation_date} at {reservation.reservation_time}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="w-4 h-4" />
                        {reservation.guests_count} Guests
                      </div>
                      <div className="font-bold text-primary text-lg">
                        PKR {reservation.total_amount?.toLocaleString() || '0'}
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 gap-2 border-t border-border/40 mt-auto flex justify-end bg-background" onClick={(e) => e.stopPropagation()}>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => confirmUpdateStatus(reservation.id as string, 'pending')}>
                            Mark as Pending
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => confirmUpdateStatus(reservation.id as string, 'confirmed')}>
                            Mark as Confirmed
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => confirmUpdateStatus(reservation.id as string, 'cancelled')}>
                            Mark as Cancelled
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => confirmUpdateStatus(reservation.id as string, 'completed')}>
                            Mark as Completed
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </CardFooter>
                  </Card>
                ))}
                {reservations.length === 0 && (
                  <div className="col-span-full py-12 text-center text-muted-foreground border-2 border-dashed rounded-xl">
                    No reservations found yet.
                  </div>
                )}
              </div>
            </div>
          )}

          {totalPages > 1 && (
            <div className="border-t p-4 flex items-center justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => currentPage > 1 && fetchReservations(currentPage - 1)}
                      className={currentPage <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                  <PaginationItem>
                    <div className="flex items-center px-4 font-medium text-sm text-muted-foreground">
                      Page {currentPage} of {totalPages}
                    </div>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => currentPage < totalPages && fetchReservations(currentPage + 1)}
                      className={currentPage >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </Card>

        {/* View Reservation Dialog */}
        <Dialog open={!!viewingReservation} onOpenChange={(open) => !open && setViewingReservation(null)}>
          <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold flex items-center gap-3">
                Reservation Details
                {viewingReservation && getStatusBadge(viewingReservation.status)}
              </DialogTitle>
              <DialogDescription>
                View and manage this reservation
              </DialogDescription>
            </DialogHeader>
            
            {viewingReservation && (
              <div className="space-y-6 pt-4">
                {/* Reservation Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-muted-foreground">Guest Information</h4>
                    <div className="bg-muted/30 rounded-lg p-4 space-y-2">
                      <p><span className="font-medium">Name:</span> {viewingReservation.full_name}</p>
                      <p><span className="font-medium">Phone:</span> {viewingReservation.phone_number}</p>
                      <p><span className="font-medium">Guests:</span> {viewingReservation.guests_count}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-muted-foreground">Reservation Time</h4>
                    <div className="bg-muted/30 rounded-lg p-4 space-y-2">
                      <p><span className="font-medium">Date:</span> {viewingReservation.reservation_date}</p>
                      <p><span className="font-medium">Time:</span> {viewingReservation.reservation_time}</p>
                    </div>
                  </div>
                </div>

                {/* Payment Info */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-muted-foreground">Payment Details</h4>
                  <div className="bg-muted/30 rounded-lg p-4 space-y-2">
                    <p><span className="font-medium">Payment Method:</span> {getPaymentMethodLabel(viewingReservation.payment_method)}</p>
                    <p><span className="font-medium">Total Amount:</span> PKR {viewingReservation.total_amount?.toLocaleString() || '0'}</p>
                    <p><span className="font-medium">Advance Payment:</span> PKR {viewingReservation.advance_payment?.toLocaleString() || '0'}</p>
                    <p className="flex items-center gap-2">
                      <span className="font-medium">Advance Status:</span> {getAdvanceStatusBadge(viewingReservation.advance_payment_status)}
                    </p>
                  </div>
                </div>

                {/* Special Requests */}
                {viewingReservation.special_requests && (
                  <div className="space-y-2">
                    <h4 className="font-semibold text-muted-foreground">Special Requests</h4>
                    <div className="bg-muted/30 rounded-lg p-4">
                      <p>{viewingReservation.special_requests}</p>
                    </div>
                  </div>
                )}

                {/* Order Summary */}
                {viewingReservation.reservation_items && viewingReservation.reservation_items.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-semibold text-muted-foreground">Order Summary</h4>
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted/50 hover:bg-muted/50">
                          <TableHead>Item</TableHead>
                          <TableHead className="text-center">Quantity</TableHead>
                          <TableHead className="text-right">Price</TableHead>
                          <TableHead className="text-right">Total</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {viewingReservation.reservation_items.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell className="font-medium">{item.menu_item_name}</TableCell>
                            <TableCell className="text-center">{item.quantity}</TableCell>
                            <TableCell className="text-right">PKR {item.price.toLocaleString()}</TableCell>
                            <TableCell className="text-right font-semibold">
                              PKR {(item.price * item.quantity).toLocaleString()}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Confirmation Alert Dialog */}
        <AlertDialog open={confirmDialog.open} onOpenChange={(open) => !open && !confirmUpdating && setConfirmDialog({ ...confirmDialog, open: false })}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Update Reservation Status</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to change the reservation status to "{confirmDialog.newStatus}"?
                {confirmDialog.newStatus === 'confirmed' && (
                  <span className="block mt-2 text-green-700 dark:text-green-300">
                    Note: This will also mark the advance payment as received.
                  </span>
                )}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={confirmUpdating}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleConfirmUpdate} disabled={confirmUpdating} className="relative">
                {confirmUpdating ? (
                  <>
                    <LoaderCircle className="h-4 w-4 mr-2 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Status"
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </AdminLayout>
  );
}
