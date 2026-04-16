import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Plus, Trash2, Edit, LayoutGrid, List as ListIcon } from 'lucide-react';
import AdminLayout from '@/components/layout/AdminLayout';
import { supabase } from '@/utils/supabase';
import { toast } from 'sonner';

interface MenuItem {
  id: string;
  name: string;
  category_id: string;
  price: string;
  description: string;
  categories({ name }: any): { name: string };
}

interface Category {
  id: string;
  name: string;
  status: string;
}

const ITEMS_PER_PAGE = 25;

export default function AdminMenuItems() {
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'list' | 'card'>('list');
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [newItemName, setNewItemName] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');
  const [newItemDesc, setNewItemDesc] = useState('');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    fetchData(currentPage);
  }, []);

  const fetchData = async (page = 1) => {
    try {
      setLoading(true);
      
      // Fetch Active Categories (unpaginated, for the dropdown)
      const { data: catData, error: catError } = await supabase
        .from('categories')
        .select('*')
        .eq('status', 'Active');
      if (catError) throw catError;
      if (catData) setCategories(catData);

      // Fetch Menu Items (paginated)
      const from = (page - 1) * ITEMS_PER_PAGE;
      const to = from + ITEMS_PER_PAGE - 1;

      const { data: itemData, error: itemError, count } = await supabase
        .from('menu_items')
        .select(`*, categories (name)`, { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(from, to);
      
      if (itemError) throw itemError;
      if (itemData) {
        setMenuItems(itemData);
        if (count !== null) {
          setTotalCount(count);
          setTotalPages(Math.max(1, Math.ceil(count / ITEMS_PER_PAGE)));
        }
      }
      setCurrentPage(page);
    } catch (error: any) {
      toast.error(error.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsAddMenuOpen(open);
    if (!open) {
      setNewItemName('');
      setNewItemCategory('');
      setNewItemPrice('');
      setNewItemDesc('');
      setEditingId(null);
    }
  };

  const openEditMenu = (item: any) => {``
    setEditingId(item.id);
    setNewItemName(item.name);
    setNewItemCategory(item.category_id);
    setNewItemPrice(item.price);
    setNewItemDesc(item.description);
    setIsAddMenuOpen(true);
  };

  const handleAddMenuItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName || !newItemCategory) return;

    try {
      setIsSubmitting(true);
      
      if (editingId) {
        const { data, error } = await supabase
          .from('menu_items')
          .update({
            name: newItemName,
            category_id: newItemCategory,
            price: newItemPrice,
            description: newItemDesc
          })
          .eq('id', editingId)
          .select(`*, categories(name)`)
          .single();
        
        if (error) throw error;
        if (data) setMenuItems(menuItems.map(m => m.id === editingId ? data : m));
        toast.success('Menu item updated successfully');
      } else {
        const { error } = await supabase
          .from('menu_items')
          .insert([{
            name: newItemName,
            category_id: newItemCategory,
            price: newItemPrice,
            description: newItemDesc
          }])
          .select(`*, categories(name)`)
          .single();
        
        if (error) throw error;
        // Refresh page 1 to see the newest item and correct pagination flow
        await fetchData(1);
        toast.success('Menu item added successfully');
      }
      
      setNewItemName('');
      setNewItemCategory('');
      setNewItemPrice('');
      setNewItemDesc('');
      setEditingId(null);
      setIsAddMenuOpen(false);
    } catch (error: any) {
      toast.error(error.message || `Failed to ${editingId ? 'update' : 'create'} menu item`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmDeleteMenuItem = async (id: string) => {
    try {
      const { error } = await supabase
        .from('menu_items')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      // Smart refresh logic to prevent empty pages after deleting
      if (menuItems.length === 1 && currentPage > 1) {
        await fetchData(currentPage - 1);
      } else {
        await fetchData(currentPage);
      }
      
      toast.success('Menu item deleted');
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete menu item');
    } finally {
      setDeleteId(null);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Menu Items</h1>
            <p className="text-muted-foreground mt-1">
              Build and manage your restaurant menu listings. ({totalCount} total)
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

            <Dialog open={isAddMenuOpen} onOpenChange={handleOpenChange}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-5 h-5 mr-1"/> Add Menu Item
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>{editingId ? 'Edit Menu Item' : 'Add New Menu Item'}</DialogTitle>
                  <DialogDescription>
                    {editingId ? 'Modify the properties of your menu item.' : 'Enter the details of the new dish to show on your public menu. (Requires active category)'}
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleAddMenuItem} className="space-y-5 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Item Name</Label>
                    <Input required id="name" placeholder="e.g. Chap Shuroo" value={newItemName} onChange={(e) => setNewItemName(e.target.value)}/>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={newItemCategory} onValueChange={setNewItemCategory} required>
                      <SelectTrigger>
                        <SelectValue placeholder={categories.length > 0 ? "Select a category" : "No active categories"} />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(cat => (
                          <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price">Price</Label>
                    <Input required id="price" placeholder="e.g. PKR 1,000" value={newItemPrice} onChange={(e) => setNewItemPrice(e.target.value)}/>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                      required 
                      id="description" 
                      placeholder="Describe the dish, ingredients, and flavor profile..." 
                      rows={4}
                      value={newItemDesc}
                      onChange={(e) => setNewItemDesc(e.target.value)}
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting || categories.length === 0}>
                    {isSubmitting 
                     ? (editingId ? 'Updating...' : 'Publishing...') 
                     : (editingId ? 'Update Item' : 'Publish Item')}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Card className="w-full">
          {loading ? (
             <div className="flex justify-center items-center py-20 text-muted-foreground">
               Loading menu items...
             </div>
          ) : viewMode === 'list' ? (
            <div className="rounded-md border-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50 hover:bg-muted/50">
                    <TableHead className="w-[30%]">Name</TableHead>
                    <TableHead className="w-[25%]">Category</TableHead>
                    <TableHead className="w-[20%]">Price</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {menuItems.map((item) => (
                     <TableRow key={item.id} className="hover:bg-muted/30">
                      <TableCell className="font-semibold text-primary">{item.name}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                          {item.categories?.name || 'Unknown'}
                        </span>
                      </TableCell>
                      <TableCell className="font-medium text-foreground">{item.price}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="icon" onClick={() => openEditMenu(item)} className="h-8 w-8 text-muted-foreground hover:text-primary">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => setDeleteId(item.id)} className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {menuItems.length === 0 && (
                     <TableRow>
                        <TableCell colSpan={4} className="text-center py-10 text-muted-foreground bg-muted/20">
                          {categories.length === 0 
                            ? "Please create an active category first before adding menu items." 
                            : "No menu items found. Click 'Add Menu Item' to create your first!"}
                        </TableCell>
                     </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="p-6 bg-muted/10 rounded-xl">
               <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                 {menuItems.map((item) => (
                   <Card key={item.id} className="flex flex-col overflow-hidden border border-border/50 hover:border-primary/30 transition-all hover:shadow-md">
                     <CardHeader className="p-5 pb-3 bg-muted/20">
                       <div className="flex justify-between items-start gap-2">
                         <div>
                           <CardTitle className="leading-tight mb-1 group-hover:text-primary transition-colors">{item.name}</CardTitle>
                           <span className="inline-block text-[11px] font-bold tracking-wider uppercase text-muted-foreground">
                             {item.categories?.name || 'Unknown'}
                           </span>
                         </div>
                         <span className="font-bold text-foreground bg-background px-2 py-1 rounded shadow-sm text-sm whitespace-nowrap">
                           {item.price}
                         </span>
                       </div>
                     </CardHeader>
                     <CardContent className="p-5 pt-4 flex-1">
                       <p className="text-sm text-muted-foreground line-clamp-3">{item.description}</p>
                     </CardContent>
                     <CardFooter className="p-4 pt-0 gap-2 border-t border-border/40 mt-auto flex justify-between bg-background">
                       <div className="flex gap-2 w-full mt-4">
                         <Button onClick={() => openEditMenu(item)} variant="outline" size="sm" className="w-full font-semibold">
                           <Edit className="w-4 h-4 mr-2" /> Edit
                         </Button>
                         <Button 
                           variant="ghost" 
                           size="sm" 
                           className="w-full text-destructive hover:text-destructive hover:bg-destructive/10 font-semibold"
                           onClick={() => setDeleteId(item.id)}
                         >
                           <Trash2 className="w-4 h-4 mr-2" /> Delete
                         </Button>
                       </div>
                     </CardFooter>
                   </Card>
                 ))}
                 {menuItems.length === 0 && (
                    <div className="col-span-full py-12 text-center text-muted-foreground border-2 border-dashed rounded-xl">
                      {categories.length === 0 
                        ? "Please create an active category first." 
                        : "No menu items found. Build your digital menu now."}
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
                      onClick={() => currentPage > 1 && fetchData(currentPage - 1)} 
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
                      onClick={() => currentPage < totalPages && fetchData(currentPage + 1)}
                      className={currentPage >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </Card>
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this menu item and remove its data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => { if (deleteId) confirmDeleteMenuItem(deleteId); }} 
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Confirm Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
}
