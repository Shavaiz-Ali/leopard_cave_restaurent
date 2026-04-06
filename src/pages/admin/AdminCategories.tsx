import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Plus, Trash2, Edit, LayoutGrid, List as ListIcon } from 'lucide-react';
import AdminLayout from '@/components/layout/AdminLayout';
import { supabase } from '@/utils/supabase';
import { toast } from 'sonner';

interface Category {
  id: string;
  name: string;
  status: string;
}

const ITEMS_PER_PAGE = 8;

export default function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'list' | 'card'>('list');
  const [isAddCatOpen, setIsAddCatOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [newCatName, setNewCatName] = useState('');
  const [newCatStatus, setNewCatStatus] = useState('Active');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    fetchCategories(currentPage);
  }, []);

  const fetchCategories = async (page = 1) => {
    try {
      setLoading(true);
      const from = (page - 1) * ITEMS_PER_PAGE;
      const to = from + ITEMS_PER_PAGE - 1;

      const { data, error, count } = await supabase
        .from('categories')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(from, to);
      
      if (error) throw error;
      if (data) {
        setCategories(data);
        if (count !== null) {
          setTotalCount(count);
          setTotalPages(Math.max(1, Math.ceil(count / ITEMS_PER_PAGE)));
        }
      }
      setCurrentPage(page);
    } catch (error: any) {
      toast.error(error.message || 'Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsAddCatOpen(open);
    if (!open) {
      setNewCatName('');
      setNewCatStatus('Active');
      setEditingId(null);
    }
  };

  const openEditCategory = (cat: Category) => {
    setEditingId(cat.id);
    setNewCatName(cat.name);
    setNewCatStatus(cat.status);
    setIsAddCatOpen(true);
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName) return;

    try {
      setIsSubmitting(true);
      
      if (editingId) {
        const { data, error } = await supabase
          .from('categories')
          .update({ name: newCatName, status: newCatStatus })
          .eq('id', editingId)
          .select()
          .single();

        if (error) throw error;
        if (data) setCategories(categories.map(c => c.id === editingId ? data : c));
        toast.success('Category updated successfully');
      } else {
        const { data, error } = await supabase
          .from('categories')
          .insert([{ name: newCatName, status: newCatStatus }])
          .select()
          .single();

        if (error) throw error;
        if (data) {
          // Refresh the current page to maintain correct pagination ordering
          await fetchCategories(1);
        }
        toast.success('Category created successfully');
      }

      setNewCatName('');
      setNewCatStatus('Active');
      setEditingId(null);
      setIsAddCatOpen(false);
    } catch (error: any) {
      toast.error(error.message || `Failed to ${editingId ? 'update' : 'create'} category`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmDeleteCategory = async (id: string) => {
    try {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      // Smart refresh logic to prevent empty pages after deleting
      if (categories.length === 1 && currentPage > 1) {
        await fetchCategories(currentPage - 1);
      } else {
        await fetchCategories(currentPage);
      }
      
      toast.success('Category deleted');
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete category');
    } finally {
      setDeleteId(null);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
            <p className="text-muted-foreground mt-1">
              Manage your menu item categories and sub-sections. ({totalCount} total)
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* View Toggle */}
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

            {/* Add Category Dialog */}
            <Dialog open={isAddCatOpen} onOpenChange={handleOpenChange}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-5 h-5 mr-1"/> Add Category
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{editingId ? "Edit Category" : "Add New Category"}</DialogTitle>
                  <DialogDescription>
                    {editingId ? "Modify the properties of your category." : "Create a new organizational category for your menu items."}
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleAddCategory} className="space-y-5 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Category Name</Label>
                    <Input required id="name" placeholder="e.g. Desserts" value={newCatName} onChange={(e) => setNewCatName(e.target.value)}/>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select value={newCatStatus} onValueChange={setNewCatStatus} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting 
                     ? (editingId ? 'Updating...' : 'Creating...') 
                     : (editingId ? 'Update Category' : 'Create Category')}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Card className="w-full">
          {loading ? (
             <div className="flex justify-center items-center py-20 text-muted-foreground">
               Loading categories...
             </div>
          ) : viewMode === 'list' ? (
            <div className="rounded-md border-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50 hover:bg-muted/50">
                    <TableHead className="w-[50%]">Name</TableHead>
                    <TableHead className="w-[25%]">Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categories.map((cat) => (
                    <TableRow key={cat.id} className="hover:bg-muted/30">
                      <TableCell className="font-semibold text-primary">{cat.name}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          cat.status === 'Active' 
                            ? 'bg-emerald-100 text-emerald-700' 
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          {cat.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="icon" onClick={() => openEditCategory(cat)} className="h-8 w-8 text-muted-foreground hover:text-primary">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => setDeleteId(cat.id)} className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {categories.length === 0 && (
                     <TableRow>
                        <TableCell colSpan={3} className="text-center py-10 text-muted-foreground bg-muted/20">
                          No categories found. Click 'Add Category' to create one!
                        </TableCell>
                     </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="p-6 bg-muted/10 rounded-xl">
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {categories.map((cat) => (
                   <Card key={cat.id} className="flex flex-col overflow-hidden border border-border/50 hover:border-primary/30 transition-all hover:shadow-md">
                     <CardHeader className="p-5 pb-4 bg-muted/20">
                       <div className="flex justify-between items-start gap-2">
                         <CardTitle className="leading-tight group-hover:text-primary transition-colors">{cat.name}</CardTitle>
                         <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap ${
                           cat.status === 'Active' 
                             ? 'bg-emerald-100 text-emerald-700' 
                             : 'bg-muted text-muted-foreground'
                         }`}>
                           {cat.status}
                         </span>
                       </div>
                     </CardHeader>
                     <CardFooter className="p-4 gap-2 border-t border-border/40 mt-auto flex justify-between bg-background">
                       <div className="flex gap-2 w-full">
                         <Button onClick={() => openEditCategory(cat)} variant="outline" size="sm" className="w-full font-semibold">
                           <Edit className="w-4 h-4 mr-2" /> Edit
                         </Button>
                         <Button 
                           variant="ghost" 
                           size="sm" 
                           className="w-full text-destructive hover:text-destructive hover:bg-destructive/10 font-semibold"
                           onClick={() => setDeleteId(cat.id)}
                         >
                           <Trash2 className="w-4 h-4 mr-2" /> Delete
                         </Button>
                       </div>
                     </CardFooter>
                   </Card>
                 ))}
                 {categories.length === 0 && (
                    <div className="col-span-full py-12 text-center text-muted-foreground border-2 border-dashed rounded-xl">
                      No categories found. Build your menu structure now.
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
                      onClick={() => currentPage > 1 && fetchCategories(currentPage - 1)} 
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
                      onClick={() => currentPage < totalPages && fetchCategories(currentPage + 1)}
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
              This action cannot be undone. This will permanently delete this category. Any underlying menu items may also be deleted depending on your database constraints!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => { if (deleteId) confirmDeleteCategory(deleteId); }} 
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
