import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Progress } from "@/components/ui/progress";
import { Plus, Trash2, Edit, LayoutGrid, List as ListIcon, UploadCloud, X, FileImage, Link as LinkIcon, ArrowUp, ArrowDown } from 'lucide-react';
import AdminLayout from '@/components/layout/AdminLayout';
import { supabase } from '@/utils/supabase';
import { toast } from 'sonner';

interface MenuImage {
  id: string;
  title: string;
  url: string;
  storage_path: string | null;
  sort_order: number;
  created_at: string;
}

const ITEMS_PER_PAGE = 8;
const BUCKET = 'menu-images';

export default function AdminMenuImages() {
  const [items, setItems] = useState<MenuImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'list' | 'card'>('card');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteStoragePath, setDeleteStoragePath] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Upload state
  const [dragOver, setDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form state
  const [formTitle, setFormTitle] = useState('');
  const [formExternalUrl, setFormExternalUrl] = useState('');
  const [formSortOrder, setFormSortOrder] = useState(0);

  useEffect(() => {
    fetchItems(1);
  }, []);

  const fetchItems = async (page = 1) => {
    try {
      setLoading(true);
      const from = (page - 1) * ITEMS_PER_PAGE;
      const to = from + ITEMS_PER_PAGE - 1;
      const { data, error, count } = await supabase
        .from('menu_images')
        .select('*', { count: 'exact' })
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false })
        .range(from, to);
      if (error) throw error;
      if (data) {
        setItems(data);
        if (count !== null) {
          setTotalCount(count);
          setTotalPages(Math.max(1, Math.ceil(count / ITEMS_PER_PAGE)));
        }
      }
      setCurrentPage(page);
    } catch (error: any) {
      toast.error(error.message || 'Failed to load menu images');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormTitle('');
    setFormExternalUrl('');
    setFormSortOrder(totalCount);
    setSelectedFile(null);
    setFilePreview(null);
    setUploadProgress(0);
    setEditingId(null);
  };

  const handleOpenAdd = () => {
    resetForm();
    setFormSortOrder(totalCount); // Put new items at end by default
    setIsDialogOpen(true);
  };

  const handleOpenChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) resetForm();
  };

  const openEdit = (item: MenuImage) => {
    setEditingId(item.id);
    setFormTitle(item.title);
    setFormSortOrder(item.sort_order);
    setSelectedFile(null);
    setFilePreview(item.url);
    setFormExternalUrl(item.storage_path ? '' : item.url);
    setUploadProgress(0);
    setIsDialogOpen(true);
  };

  // ── File handling ────────────────────────────────────────────────────────────
  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Only image files are supported.');
      return;
    }
    setSelectedFile(file);
    setFormExternalUrl('');
    const url = URL.createObjectURL(file);
    setFilePreview(url);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => setDragOver(false);

  // ── Upload ───────────────────────────────────────────────────────────────────
  const uploadToStorage = async (file: File): Promise<{ publicUrl: string; storagePath: string }> => {
    const ext = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    let prog = 0;
    const ticker = setInterval(() => {
      prog = Math.min(prog + 10, 85);
      setUploadProgress(prog);
    }, 120);

    const { data, error } = await supabase.storage
      .from(BUCKET)
      .upload(fileName, file, { upsert: false });

    clearInterval(ticker);
    setUploadProgress(100);

    if (error) throw error;

    const { data: urlData } = supabase.storage
      .from(BUCKET)
      .getPublicUrl(data.path);

    return { publicUrl: urlData.publicUrl, storagePath: data.path };
  };

  // ── Submit ───────────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle) { toast.error('Title is required'); return; }
    const hasFile = !!selectedFile;
    const hasUrl = !!formExternalUrl.trim();
    if (!editingId && !hasFile && !hasUrl) {
      toast.error('Please upload an image or enter a URL');
      return;
    }

    try {
      setIsSubmitting(true);

      if (editingId) {
        let extraFields: { url?: string; storage_path?: string | null } = {};
        if (selectedFile) {
          const { publicUrl, storagePath } = await uploadToStorage(selectedFile);
          extraFields = { url: publicUrl, storage_path: storagePath };
        } else if (hasUrl) {
          extraFields = { url: formExternalUrl.trim(), storage_path: null };
        }

        const { data, error } = await supabase
          .from('menu_images')
          .update({ title: formTitle, sort_order: formSortOrder, ...extraFields })
          .eq('id', editingId)
          .select()
          .single();
        if (error) throw error;
        if (data) setItems(items.map(i => i.id === editingId ? data : i));
        toast.success('Menu image updated');
      } else if (hasFile) {
        const { publicUrl, storagePath } = await uploadToStorage(selectedFile!);
        const { error } = await supabase.from('menu_images').insert([{
          url: publicUrl,
          storage_path: storagePath,
          title: formTitle,
          sort_order: formSortOrder,
        }]);
        if (error) throw error;
        await fetchItems(1);
        toast.success('Menu image uploaded');
      } else {
        const { error } = await supabase.from('menu_images').insert([{
          url: formExternalUrl.trim(),
          storage_path: null,
          title: formTitle,
          sort_order: formSortOrder,
        }]);
        if (error) throw error;
        await fetchItems(1);
        toast.success('Menu image added');
      }

      resetForm();
      setIsDialogOpen(false);
    } catch (error: any) {
      toast.error(error.message || 'Failed to save menu image');
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  };

  // ── Delete ───────────────────────────────────────────────────────────────────
  const confirmDelete = async (id: string, storagePath: string | null) => {
    try {
      const { error: dbErr } = await supabase.from('menu_images').delete().eq('id', id);
      if (dbErr) throw dbErr;
      if (storagePath) {
        await supabase.storage.from(BUCKET).remove([storagePath]);
      }
      if (items.length === 1 && currentPage > 1) {
        await fetchItems(currentPage - 1);
      } else {
        await fetchItems(currentPage);
      }
      toast.success('Menu image deleted');
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete menu image');
    } finally {
      setDeleteId(null);
      setDeleteStoragePath(null);
    }
  };

  // ── Reorder ──────────────────────────────────────────────────────────────────
  const moveItem = async (id: string, direction: 'up' | 'down') => {
    const idx = items.findIndex(i => i.id === id);
    if (idx < 0) return;
    const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= items.length) return;

    const currentOrder = items[idx].sort_order;
    const swapOrder = items[swapIdx].sort_order;

    try {
      await supabase.from('menu_images').update({ sort_order: swapOrder }).eq('id', items[idx].id);
      await supabase.from('menu_images').update({ sort_order: currentOrder }).eq('id', items[swapIdx].id);
      await fetchItems(currentPage);
    } catch (error: any) {
      toast.error('Failed to reorder');
    }
  };

  const hasFile = !!selectedFile;
  const hasUrl = !!formExternalUrl.trim();

  return (
    <AdminLayout>
      <div className="space-y-6 animate-in fade-in duration-500">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Menu Images</h1>
            <p className="text-muted-foreground mt-1">
              Upload and manage scanned menu page images. ({totalCount} total)
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="border rounded-md hidden md:flex">
              <Button variant={viewMode === 'list' ? 'secondary' : 'ghost'} size="sm" className="rounded-none border-r rounded-l-md px-3" onClick={() => setViewMode('list')}>
                <ListIcon className="w-4 h-4 mr-2" /> List
              </Button>
              <Button variant={viewMode === 'card' ? 'secondary' : 'ghost'} size="sm" className="rounded-none rounded-r-md px-3" onClick={() => setViewMode('card')}>
                <LayoutGrid className="w-4 h-4 mr-2" /> Grid
              </Button>
            </div>
            <Button onClick={handleOpenAdd}>
              <Plus className="w-5 h-5 mr-1" /> Add Menu Image
            </Button>
          </div>
        </div>

        {/* Content */}
        <Card className="w-full">
          {loading ? (
            <div className="flex justify-center items-center py-20 text-muted-foreground">Loading menu images...</div>
          ) : viewMode === 'list' ? (
            <div className="rounded-md border-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50 hover:bg-muted/50">
                    <TableHead className="w-[60px]">Preview</TableHead>
                    <TableHead className="w-[40%]">Title</TableHead>
                    <TableHead className="w-[15%]">Order</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item, idx) => (
                    <TableRow key={item.id} className="hover:bg-muted/30">
                      <TableCell>
                        <img src={item.url} alt={item.title} className="w-12 h-12 rounded object-cover border" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                      </TableCell>
                      <TableCell className="font-semibold text-primary">{item.title}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <span className="text-sm text-muted-foreground font-mono">{item.sort_order}</span>
                          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => moveItem(item.id, 'up')} disabled={idx === 0}>
                            <ArrowUp className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => moveItem(item.id, 'down')} disabled={idx === items.length - 1}>
                            <ArrowDown className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="icon" onClick={() => openEdit(item)} className="h-8 w-8 text-muted-foreground hover:text-primary">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => { setDeleteId(item.id); setDeleteStoragePath(item.storage_path); }} className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {items.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-10 text-muted-foreground bg-muted/20">
                        No menu images yet. Click 'Add Menu Image' to upload your menu pages.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="p-6 bg-muted/10 rounded-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item) => (
                  <Card key={item.id} className="flex flex-col overflow-hidden border border-border/50 hover:border-primary/30 transition-all hover:shadow-md">
                    <div className="bg-muted aspect-[3/4] flex items-center justify-center overflow-hidden">
                      <img src={item.url} alt={item.title} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                    </div>
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-base leading-tight">{item.title}</CardTitle>
                    </CardHeader>
                    <CardFooter className="p-4 pt-2 gap-2 border-t border-border/40 mt-auto">
                      <div className="flex gap-2 w-full">
                        <Button onClick={() => openEdit(item)} variant="outline" size="sm" className="w-full font-semibold">
                          <Edit className="w-4 h-4 mr-2" /> Edit
                        </Button>
                        <Button variant="ghost" size="sm" className="w-full text-destructive hover:text-destructive hover:bg-destructive/10 font-semibold" onClick={() => { setDeleteId(item.id); setDeleteStoragePath(item.storage_path); }}>
                          <Trash2 className="w-4 h-4 mr-2" /> Delete
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
                {items.length === 0 && (
                  <div className="col-span-full py-16 text-center text-muted-foreground border-2 border-dashed rounded-xl">
                    No menu images yet. Upload your menu pages to get started.
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
                    <PaginationPrevious onClick={() => currentPage > 1 && fetchItems(currentPage - 1)} className={currentPage <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"} />
                  </PaginationItem>
                  <PaginationItem>
                    <div className="flex items-center px-4 font-medium text-sm text-muted-foreground">Page {currentPage} of {totalPages}</div>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext onClick={() => currentPage < totalPages && fetchItems(currentPage + 1)} className={currentPage >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"} />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </Card>
      </div>

      {/* Upload / Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-[520px] p-0 overflow-hidden">
          <div className="max-h-[85vh] overflow-y-auto overscroll-contain p-6 pt-8">
            <DialogHeader className="mb-6">
              <DialogTitle>{editingId ? 'Edit Menu Image' : 'Add Menu Image'}</DialogTitle>
              <DialogDescription>
                {editingId
                  ? 'Update the title or replace the image.'
                  : 'Upload a scanned menu page image or enter a URL.'}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 pt-2 pb-1">
              {/* Mutual exclusivity note */}
              {(hasFile || hasUrl) && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-2 flex items-start gap-2 animate-in fade-in slide-in-from-top-1 duration-300">
                  <div className="bg-amber-500 text-white rounded-full p-0.5 mt-0.5">
                    <X className="w-3 h-3" />
                  </div>
                  <p className="text-[10px] text-amber-800 leading-tight">
                    <strong>Note:</strong> You can only use one image source. Clear the current selection to switch.
                  </p>
                </div>
              )}

              {/* Drop Zone */}
              <div
                onDrop={hasUrl ? undefined : handleDrop}
                onDragOver={hasUrl ? undefined : handleDragOver}
                onDragLeave={hasUrl ? undefined : handleDragLeave}
                onClick={() => !hasUrl && fileInputRef.current?.click()}
                className={`relative rounded-xl border-2 border-dashed transition-all ${
                  hasUrl
                    ? 'opacity-40 grayscale-[0.5] cursor-not-allowed border-muted-foreground/20 bg-muted/10'
                    : `cursor-pointer ${
                        dragOver
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50 hover:bg-muted/40'
                      }`
                } ${filePreview ? 'p-1' : 'p-4'}`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileInput}
                  disabled={hasUrl}
                />

                {filePreview ? (
                  <div className="relative group">
                    <img src={filePreview} alt="preview" className="w-full rounded-lg aspect-[3/4] object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center text-white text-sm font-medium">
                      <UploadCloud className="w-5 h-5 mr-2" /> Click to replace
                    </div>
                    {selectedFile && (
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setSelectedFile(null); setFilePreview(editingId ? (items.find(i => i.id === editingId)?.url || null) : null); }}
                        className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1 hover:bg-black/80"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <div className="p-2 bg-muted rounded-full">
                      <UploadCloud className="w-6 h-6" />
                    </div>
                    <div className="text-center">
                      <p className="font-medium text-sm text-foreground">Drop a menu page image or click to browse</p>
                      <p className="text-[10px] mt-0.5">JPG, PNG, WebP</p>
                    </div>
                    <span className="flex items-center gap-1 text-[10px] border rounded-full px-2 py-0.5">
                      <FileImage className="w-3 h-3 text-blue-500" /> Upload Image
                    </span>
                  </div>
                )}
              </div>

              {/* Selected file info */}
              {selectedFile && (
                <div className="flex items-center gap-2 text-[10px] text-muted-foreground bg-muted/30 rounded-lg px-2 py-1.5 animate-in fade-in duration-300">
                  <FileImage className="w-3 h-3 text-blue-500 shrink-0" />
                  <span className="truncate font-medium text-foreground">{selectedFile.name}</span>
                  <button
                    type="button"
                    onClick={() => { setSelectedFile(null); setFilePreview(editingId ? (items.find(i => i.id === editingId)?.url || null) : null); }}
                    className="ml-auto text-muted-foreground hover:text-destructive underline font-medium"
                  >
                    Clear
                  </button>
                </div>
              )}

              {/* Divider */}
              <div className="relative py-1">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-[10px] uppercase">
                  <span className="bg-background px-2 text-muted-foreground font-medium tracking-wider">Or enter a URL</span>
                </div>
              </div>

              {/* External URL */}
              <div className={`space-y-1.5 transition-opacity duration-300 ${hasFile ? 'opacity-40' : ''}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <LinkIcon className="w-3.5 h-3.5 text-muted-foreground" />
                    <Label htmlFor="mi-url" className="text-xs">Image URL</Label>
                  </div>
                  {formExternalUrl && (
                    <button type="button" onClick={() => setFormExternalUrl('')} className="text-[10px] text-muted-foreground hover:text-destructive underline">
                      Clear URL
                    </button>
                  )}
                </div>
                <Input
                  id="mi-url"
                  className="h-8 text-xs"
                  placeholder="https://example.com/menu-page.jpg"
                  value={formExternalUrl}
                  onChange={(e) => setFormExternalUrl(e.target.value)}
                  disabled={hasFile}
                />
                <p className="text-[10px] text-muted-foreground">Used if no file is uploaded.</p>
              </div>

              {/* Title */}
              <div className="space-y-1.5">
                <Label htmlFor="mi-title" className="text-xs">Title</Label>
                <Input required id="mi-title" className="h-8 text-xs" placeholder="e.g. Menu Page 1" value={formTitle} onChange={(e) => setFormTitle(e.target.value)} />
              </div>

              {/* Sort Order */}
              <div className="space-y-1.5">
                <Label htmlFor="mi-order" className="text-xs">Display Order</Label>
                <Input id="mi-order" type="number" className="h-8 text-xs" value={formSortOrder} onChange={(e) => setFormSortOrder(Number(e.target.value))} />
                <p className="text-[10px] text-muted-foreground">Lower numbers appear first on the public menu page.</p>
              </div>

              {/* Upload progress */}
              {isSubmitting && uploadProgress > 0 && (
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] text-muted-foreground">
                    <span>{uploadProgress < 100 ? 'Uploading...' : 'Saving...'}</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} className="h-1" />
                </div>
              )}

              <div className="pt-2">
                <Button type="submit" className="w-full h-9" disabled={isSubmitting}>
                  {isSubmitting
                    ? (editingId ? 'Saving...' : 'Uploading...')
                    : (editingId ? 'Save Changes' : 'Add Menu Image')}
                </Button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={(open) => { if (!open) { setDeleteId(null); setDeleteStoragePath(null); } }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this menu image?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove this menu page image. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => { if (deleteId) confirmDelete(deleteId, deleteStoragePath); }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete Permanently
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
}
