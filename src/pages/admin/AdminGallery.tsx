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
import { Plus, Trash2, Edit, Image as ImageIcon, Video, LayoutGrid, List as ListIcon, UploadCloud, X, FileImage, FileVideo, Link, Star } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import AdminLayout from '@/components/layout/AdminLayout';
import { supabase } from '@/utils/supabase';
import { toast } from 'sonner';

interface GalleryItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  title: string;
  alt_text: string | null;
  storage_path: string | null;
  featured: boolean;
  created_at: string;
}

const ITEMS_PER_PAGE = 8;
const BUCKET = 'gallery';

export default function AdminGallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
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
  const [formAlt, setFormAlt] = useState('');
  const [formExternalUrl, setFormExternalUrl] = useState('');
  const [formFeatured, setFormFeatured] = useState(false);

  useEffect(() => {
    fetchItems(1);
  }, []);

  const fetchItems = async (page = 1) => {
    try {
      setLoading(true);
      const from = (page - 1) * ITEMS_PER_PAGE;
      const to = from + ITEMS_PER_PAGE - 1;
      const { data, error, count } = await supabase
        .from('gallery')
        .select('*', { count: 'exact' })
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
      toast.error(error.message || 'Failed to load gallery items');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormTitle('');
    setFormAlt('');
    setFormExternalUrl('');
    setSelectedFile(null);
    setFilePreview(null);
    setUploadProgress(0);
    setFormFeatured(false);
    setEditingId(null);
  };

  const handleOpenAdd = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const handleOpenChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) resetForm();
  };

  const openEdit = (item: GalleryItem) => {
    setEditingId(item.id);
    setFormTitle(item.title);
    setFormAlt(item.alt_text || '');
    setSelectedFile(null);
    setFilePreview(item.url);
    setUploadProgress(0);
    // If item has no storage_path it came from an external URL
    setFormExternalUrl(item.storage_path ? '' : item.url);
    setFormFeatured(item.featured || false);
    setIsDialogOpen(true);
  };

  // ── File selection helpers ──────────────────────────────────────────────────
  const processFile = (file: File) => {
    const isVideo = file.type.startsWith('video/');
    const isImage = file.type.startsWith('image/');
    if (!isImage && !isVideo) {
      toast.error('Only image or video files are supported.');
      return;
    }
    setSelectedFile(file);
    setFormExternalUrl(''); // Clear URL when file is selected
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

  // ── Upload to Supabase Storage ──────────────────────────────────────────────
  const uploadToStorage = async (file: File): Promise<{ publicUrl: string; storagePath: string }> => {
    const ext = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    // Animate progress while uploading
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

  // ── Helpers ─────────────────────────────────────────────────────────────────
  // Detect if a URL is a video source (YouTube, Vimeo, .mp4, etc.)
  const isVideoUrl = (url: string): boolean => {
    const lower = url.toLowerCase();
    return (
      lower.includes('youtube.com') ||
      lower.includes('youtu.be') ||
      lower.includes('vimeo.com') ||
      lower.includes('dailymotion.com') ||
      /\.(mp4|webm|ogg|mov|avi|mkv)([?#]|$)/.test(lower)
    );
  };

  // ── Submit ──────────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle) { toast.error('Title is required'); return; }
    const hasFile = !!selectedFile;
    const hasUrl = !!formExternalUrl.trim();
    if (!editingId && !hasFile && !hasUrl) {
      toast.error('Please upload a file or enter a media URL');
      return;
    }

    try {
      setIsSubmitting(true);

      if (editingId) {
        // Edit: optionally replace media via file upload or URL change
        let extraFields: { url?: string; storage_path?: string; type?: string } = {};
        if (selectedFile) {
          const { publicUrl, storagePath } = await uploadToStorage(selectedFile);
          const isVid = selectedFile.type.startsWith('video/');
          extraFields = { url: publicUrl, storage_path: storagePath, type: isVid ? 'video' : 'image' };
        } else if (hasUrl) {
          extraFields = { url: formExternalUrl.trim(), storage_path: undefined, type: isVideoUrl(formExternalUrl) ? 'video' : 'image' };
        }

        const { data, error } = await supabase
          .from('gallery')
          .update({ title: formTitle, alt_text: formAlt || null, featured: formFeatured, ...extraFields })
          .eq('id', editingId)
          .select()
          .single();
        if (error) throw error;
        if (data) setItems(items.map(i => i.id === editingId ? data : i));
        toast.success('Gallery item updated');
      } else if (hasFile) {
        // New: file upload path
        const { publicUrl, storagePath } = await uploadToStorage(selectedFile!);
        const isVid = selectedFile!.type.startsWith('video/');
        const { error } = await supabase.from('gallery').insert([{
          type: isVid ? 'video' : 'image',
          url: publicUrl,
          storage_path: storagePath,
          title: formTitle,
          alt_text: formAlt || null,
          featured: formFeatured,
        }]);
        if (error) throw error;
        await fetchItems(1);
        toast.success('Media uploaded successfully');
      } else {
        // New: external URL path
        const trimmed = formExternalUrl.trim();
        const { error } = await supabase.from('gallery').insert([{
          type: isVideoUrl(trimmed) ? 'video' : 'image',
          url: trimmed,
          storage_path: undefined,
          title: formTitle,
          alt_text: formAlt || null,
          featured: formFeatured,
        }]);
        if (error) throw error;
        await fetchItems(1);
        toast.success('External media added to gallery');
      }

      resetForm();
      setIsDialogOpen(false);
    } catch (error: any) {
      toast.error(error.message || 'Failed to save gallery item');
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  };

  // ── Delete ──────────────────────────────────────────────────────────────────
  const confirmDelete = async (id: string, storagePath: string | null) => {
    try {
      // Remove from DB
      const { error: dbErr } = await supabase.from('gallery').delete().eq('id', id);
      if (dbErr) throw dbErr;

      // Remove from storage if we have a path
      if (storagePath) {
        await supabase.storage.from(BUCKET).remove([storagePath]);
      }

      if (items.length === 1 && currentPage > 1) {
        await fetchItems(currentPage - 1);
      } else {
        await fetchItems(currentPage);
      }
      toast.success('Item deleted');
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete item');
    } finally {
      setDeleteId(null);
      setDeleteStoragePath(null);
    }
  };

  // ── Helpers ──────────────────────────────────────────────────────────────────
  const TypeBadge = ({ type }: { type: 'image' | 'video' }) => (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
      type === 'image' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
    }`}>
      {type === 'image' ? <ImageIcon className="w-3 h-3" /> : <Video className="w-3 h-3" />}
      {type === 'image' ? 'Image' : 'Video'}
    </span>
  );

  const detectedType = selectedFile
    ? (selectedFile.type.startsWith('video/') ? 'video' : 'image')
    : null;

  return (
    <AdminLayout>
      <div className="space-y-6 animate-in fade-in duration-500">

        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Gallery</h1>
            <p className="text-muted-foreground mt-1">
              Upload images &amp; videos directly to storage. ({totalCount} total)
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* View toggle */}
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

            <Button onClick={handleOpenAdd}>
              <Plus className="w-5 h-5 mr-1" /> Upload Media
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="rounded-xl border bg-card overflow-hidden">
          {loading ? (
            <div className="flex justify-center items-center py-20 text-muted-foreground">
              Loading gallery...
            </div>
          ) : viewMode === 'list' ? (
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50 hover:bg-muted/50">
                  <TableHead className="w-[40px]">Preview</TableHead>
                  <TableHead className="w-[35%]">Title</TableHead>
                  <TableHead className="w-[12%]">Type</TableHead>
                  <TableHead className="w-[10%]">Featured</TableHead>
                  <TableHead className="w-[20%]">Alt Text</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id} className="hover:bg-muted/30">
                    <TableCell>
                      {item.type === 'image' ? (
                        <img
                          src={item.url}
                          alt={item.alt_text || item.title}
                          className="w-9 h-9 rounded object-cover border"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        />
                      ) : (
                        <div className="w-9 h-9 flex items-center justify-center bg-muted rounded border">
                          <Video className="w-4 h-4 text-muted-foreground" />
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="font-semibold text-primary">{item.title}</TableCell>
                    <TableCell><TypeBadge type={item.type} /></TableCell>
                    <TableCell>
                      {item.featured && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary">
                          <Star className="h-3 w-3 fill-current" /> Featured
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground truncate max-w-[180px]">
                      {item.alt_text || '—'}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon" onClick={() => openEdit(item)} className="h-8 w-8 text-muted-foreground hover:text-primary">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => { setDeleteId(item.id); setDeleteStoragePath(item.storage_path); }}
                          className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {items.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-10 text-muted-foreground bg-muted/20">
                      No gallery items yet. Click 'Upload Media' to get started.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          ) : (
            <div className="p-6 bg-muted/10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {items.map((item) => (
                  <Card key={item.id} className="flex flex-col overflow-hidden border border-border/50 hover:border-primary/30 transition-all hover:shadow-md">
                    <div className="bg-muted aspect-video flex items-center justify-center overflow-hidden">
                      {item.type === 'image' ? (
                        <img
                          src={item.url}
                          alt={item.alt_text || item.title}
                          className="w-full h-full object-cover"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        />
                      ) : (
                        <video
                          src={item.url}
                          className="w-full h-full object-cover"
                          muted
                          playsInline
                          onMouseEnter={(e) => (e.target as HTMLVideoElement).play()}
                          onMouseLeave={(e) => { const v = e.target as HTMLVideoElement; v.pause(); v.currentTime = 0; }}
                        />
                      )}
                      {item.featured && (
                        <div className="absolute top-2 right-2">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary text-primary-foreground">
                            <Star className="h-2.5 w-2.5 fill-current" /> Featured
                          </span>
                        </div>
                      )}
                    </div>
                    <CardHeader className="p-4 pb-2">
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-base leading-tight">{item.title}</CardTitle>
                        <TypeBadge type={item.type} />
                      </div>
                      {item.alt_text && (
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{item.alt_text}</p>
                      )}
                    </CardHeader>
                    <CardFooter className="p-4 pt-2 gap-2 border-t border-border/40 mt-auto">
                      <div className="flex gap-2 w-full">
                        <Button onClick={() => openEdit(item)} variant="outline" size="sm" className="w-full font-semibold">
                          <Edit className="w-4 h-4 mr-2" /> Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full text-destructive hover:text-destructive hover:bg-destructive/10 font-semibold"
                          onClick={() => { setDeleteId(item.id); setDeleteStoragePath(item.storage_path); }}
                        >
                          <Trash2 className="w-4 h-4 mr-2" /> Delete
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
                {items.length === 0 && (
                  <div className="col-span-full py-16 text-center text-muted-foreground border-2 border-dashed rounded-xl">
                    No gallery items yet. Click 'Upload Media' to populate the gallery.
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
                      onClick={() => currentPage > 1 && fetchItems(currentPage - 1)}
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
                      onClick={() => currentPage < totalPages && fetchItems(currentPage + 1)}
                      className={currentPage >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </div>

      {/* ── Upload / Edit Dialog ─────────────────────────────────────────────── */}
      <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-[520px] p-0 overflow-hidden">
          <div className="max-h-[85vh] overflow-y-auto overscroll-contain p-6 pt-8">
            <DialogHeader className="mb-6">
              <DialogTitle>{editingId ? 'Edit Gallery Item' : 'Upload Media'}</DialogTitle>
              <DialogDescription>
                {editingId
                  ? 'Update the title / alt text, or replace the file by dropping a new one.'
                  : 'Drag & drop or click to select an image or video to upload directly to storage.'}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 pt-2 pb-1">
              {/* Mutual Exclusivity Warning */}
              {(selectedFile || formExternalUrl.trim()) && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-2 flex items-start gap-2 animate-in fade-in slide-in-from-top-1 duration-300">
                  <div className="bg-amber-500 text-white rounded-full p-0.5 mt-0.5">
                    <X className="w-3 h-3" />
                  </div>
                  <p className="text-[10px] text-amber-800 leading-tight">
                    <strong>Note:</strong> You can only use one media source. Clear the current selection to switch between file upload and URL.
                  </p>
                </div>
              )}

              {/* Drop Zone */}
              <div
                onDrop={formExternalUrl.trim() ? undefined : handleDrop}
                onDragOver={formExternalUrl.trim() ? undefined : handleDragOver}
                onDragLeave={formExternalUrl.trim() ? undefined : handleDragLeave}
                onClick={() => !formExternalUrl.trim() && fileInputRef.current?.click()}
                className={`relative rounded-xl border-2 border-dashed transition-all ${
                  formExternalUrl.trim()
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
                  accept="image/*,video/*"
                  className="hidden"
                  onChange={handleFileInput}
                  disabled={!!formExternalUrl.trim()}
                />

                {filePreview ? (
                  <div className="relative group">
                    {detectedType === 'video' || (editingId && !selectedFile && items.find(i => i.id === editingId)?.type === 'video') ? (
                      <video
                        src={filePreview}
                        className="w-full rounded-lg aspect-video object-cover"
                        muted
                        playsInline
                      />
                    ) : (
                      <img
                        src={filePreview}
                        alt="preview"
                        className="w-full rounded-lg aspect-video object-cover"
                      />
                    )}
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
                      <p className="font-medium text-sm text-foreground">Drop a file or click to browse</p>
                      <p className="text-[10px] mt-0.5">JPG, PNG, WebP, MP4, etc.</p>
                    </div>
                    <div className="flex gap-2 mt-0.5">
                      <span className="flex items-center gap-1 text-[10px] border rounded-full px-2 py-0.5">
                        <FileImage className="w-3 h-3 text-blue-500" /> Images
                      </span>
                      <span className="flex items-center gap-1 text-[10px] border rounded-full px-2 py-0.5">
                        <FileVideo className="w-3 h-3 text-purple-500" /> Videos
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Selected file info */}
              {selectedFile && (
                <div className="flex items-center gap-2 text-[10px] text-muted-foreground bg-muted/30 rounded-lg px-2 py-1.5 animate-in fade-in duration-300">
                  {detectedType === 'video' ? <FileVideo className="w-3 h-3 text-purple-500 shrink-0" /> : <FileImage className="w-3 h-3 text-blue-500 shrink-0" />}
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
              <div className={`space-y-1.5 transition-opacity duration-300 ${!!selectedFile ? 'opacity-40' : ''}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Link className="w-3.5 h-3.5 text-muted-foreground" />
                    <Label htmlFor="gal-url" className="text-xs">Media URL</Label>
                  </div>
                  {formExternalUrl && (
                    <button
                      type="button"
                      onClick={() => setFormExternalUrl('')}
                      className="text-[10px] text-muted-foreground hover:text-destructive underline"
                    >
                      Clear URL
                    </button>
                  )}
                </div>
                <Input
                  id="gal-url"
                  className="h-8 text-xs"
                  placeholder="YouTube, Vimeo, or direct link..."
                  value={formExternalUrl}
                  onChange={(e) => setFormExternalUrl(e.target.value)}
                  disabled={!!selectedFile}
                />
                <p className="text-[10px] text-muted-foreground">Used if no file is uploaded.</p>
              </div>

              {/* Title */}
              <div className="space-y-1.5">
                <Label htmlFor="gal-title" className="text-xs">Title</Label>
                <Input
                  required
                  id="gal-title"
                  className="h-8 text-xs"
                  placeholder="e.g. Stunning mountain view"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="gal-alt" className="text-xs">Alt Text <span className="text-muted-foreground font-normal">(optional)</span></Label>
                <Input
                  id="gal-alt"
                  className="h-8 text-xs"
                  placeholder="Short description for SEO/Accessibility"
                  value={formAlt}
                  onChange={(e) => setFormAlt(e.target.value)}
                />
              </div>

              {/* Featured toggle */}
              <div className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-muted/20">
                <div className="space-y-0.5">
                  <Label htmlFor="gal-featured" className="text-sm font-medium">Featured Item</Label>
                  <p className="text-xs text-muted-foreground">Highlight this media on the front page</p>
                </div>
                <Switch
                  id="gal-featured"
                  checked={formFeatured}
                  onCheckedChange={setFormFeatured}
                />
              </div>

              {/* Upload progress */}
              {isSubmitting && (
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
                    : (editingId ? 'Save Changes' : 'Upload to Gallery')}
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
            <AlertDialogTitle>Delete this item?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove the media from the gallery and delete the file from storage. This action cannot be undone.
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
