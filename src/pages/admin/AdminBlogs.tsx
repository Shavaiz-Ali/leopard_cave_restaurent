import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Progress } from "@/components/ui/progress";
import { Plus, Trash2, Edit, LayoutGrid, List as ListIcon, Star, ExternalLink, UploadCloud, X, FileImage, Link as LinkIcon } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import AdminLayout from '@/components/layout/AdminLayout';
import { supabase } from '@/utils/supabase';
import { toast } from 'sonner';
import type { Blog } from '@/types/types';

const ITEMS_PER_PAGE = 8;
const BUCKET = 'blog-images';

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'list' | 'card'>('list');
  const [isAddBlogOpen, setIsAddBlogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Form state
  const [formTitle, setFormTitle] = useState('');
  const [formSlug, setFormSlug] = useState('');
  const [formExcerpt, setFormExcerpt] = useState('');
  const [formContent, setFormContent] = useState('');
  const [formImageUrl, setFormImageUrl] = useState('');
  const [formAuthor, setFormAuthor] = useState('Leopard Cave Team');
  const [formFeatured, setFormFeatured] = useState(false);
  const [formStatus, setFormStatus] = useState('Draft');

  // File upload state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    fetchBlogs(currentPage);
  }, []);

  const fetchBlogs = async (page = 1) => {
    try {
      setLoading(true);
      const from = (page - 1) * ITEMS_PER_PAGE;
      const to = from + ITEMS_PER_PAGE - 1;

      const { data, error, count } = await supabase
        .from('blogs')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(from, to);

      if (error) throw error;
      if (data) {
        setBlogs(data);
        if (count !== null) {
          setTotalCount(count);
          setTotalPages(Math.max(1, Math.ceil(count / ITEMS_PER_PAGE)));
        }
      }
      setCurrentPage(page);
    } catch (error: any) {
      toast.error(error.message || 'Failed to load blogs');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormTitle('');
    setFormSlug('');
    setFormExcerpt('');
    setFormContent('');
    setFormImageUrl('');
    setFormAuthor('Leopard Cave Team');
    setFormFeatured(false);
    setFormStatus('Draft');
    setSelectedFile(null);
    setFilePreview(null);
    setUploadProgress(0);
    setEditingId(null);
  };

  const handleOpenChange = (open: boolean) => {
    setIsAddBlogOpen(open);
    if (!open) resetForm();
  };

  const openEditBlog = (blog: Blog) => {
    setEditingId(blog.id);
    setFormTitle(blog.title);
    setFormSlug(blog.slug);
    setFormExcerpt(blog.excerpt || '');
    setFormContent(blog.content || '');
    setFormAuthor(blog.author);
    setFormFeatured(blog.featured);
    setFormStatus(blog.status);
    // Determine whether existing image is from storage or external URL
    setSelectedFile(null);
    if (blog.image_storage_path) {
      // Image came from storage upload — show preview, keep URL field empty
      setFilePreview(blog.image || null);
      setFormImageUrl('');
    } else {
      // Image is an external URL
      setFilePreview(null);
      setFormImageUrl(blog.image || '');
    }
    setUploadProgress(0);
    setIsAddBlogOpen(true);
  };

  const handleTitleChange = (value: string) => {
    setFormTitle(value);
    if (!editingId) {
      setFormSlug(generateSlug(value));
    }
  };

  // ── File handling ────────────────────────────────────────────────────────────
  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Only image files are supported for blog covers.');
      return;
    }
    setSelectedFile(file);
    setFormImageUrl(''); // Clear URL when file is selected
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

  const clearFile = () => {
    setSelectedFile(null);
    if (editingId) {
      const blog = blogs.find(b => b.id === editingId);
      if (blog?.image_storage_path) {
        setFilePreview(blog.image || null);
      } else {
        setFilePreview(null);
      }
    } else {
      setFilePreview(null);
    }
  };

  // ── Upload to Supabase Storage ───────────────────────────────────────────────
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
    if (!formTitle || !formSlug) return;

    try {
      setIsSubmitting(true);

      // Resolve the final image URL and storage path
      let imageUrl = '';
      let imageStoragePath: string | null = null;

      if (selectedFile) {
        // User uploaded a new file
        const { publicUrl, storagePath } = await uploadToStorage(selectedFile);
        imageUrl = publicUrl;
        imageStoragePath = storagePath;
      } else if (formImageUrl.trim()) {
        // User entered an external URL
        imageUrl = formImageUrl.trim();
        imageStoragePath = null;
      } else if (editingId) {
        // No change — keep existing image
        const existing = blogs.find(b => b.id === editingId);
        imageUrl = existing?.image || '';
        imageStoragePath = existing?.image_storage_path || null;
      }

      const blogData = {
        title: formTitle,
        slug: formSlug,
        excerpt: formExcerpt,
        content: formContent,
        image: imageUrl,
        image_storage_path: imageStoragePath,
        author: formAuthor,
        featured: formFeatured,
        status: formStatus,
      };

      if (editingId) {
        const { data, error } = await supabase
          .from('blogs')
          .update(blogData)
          .eq('id', editingId)
          .select()
          .single();

        if (error) throw error;
        if (data) setBlogs(blogs.map(b => b.id === editingId ? data : b));
        toast.success('Blog post updated successfully');
      } else {
        const { error } = await supabase
          .from('blogs')
          .insert([blogData])
          .select()
          .single();

        if (error) throw error;
        await fetchBlogs(1);
        toast.success('Blog post created successfully');
      }

      resetForm();
      setIsAddBlogOpen(false);
    } catch (error: any) {
      toast.error(error.message || `Failed to ${editingId ? 'update' : 'create'} blog post`);
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  };

  // ── Delete ───────────────────────────────────────────────────────────────────
  const confirmDeleteBlog = async (id: string) => {
    try {
      // Find the blog to check for storage path
      const blog = blogs.find(b => b.id === id);

      const { error } = await supabase
        .from('blogs')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // Clean up storage file if it exists
      if (blog?.image_storage_path) {
        await supabase.storage.from(BUCKET).remove([blog.image_storage_path]);
      }

      if (blogs.length === 1 && currentPage > 1) {
        await fetchBlogs(currentPage - 1);
      } else {
        await fetchBlogs(currentPage);
      }

      toast.success('Blog post deleted');
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete blog post');
    } finally {
      setDeleteId(null);
    }
  };

  // Whether user has a file or URL set
  const hasFile = !!selectedFile;
  const hasUrl = !!formImageUrl.trim();

  return (
    <AdminLayout>
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Blog Posts</h1>
            <p className="text-muted-foreground mt-1">
              Create and manage blog articles for your website. ({totalCount} total)
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

            {/* Add Blog Dialog */}
            <Dialog open={isAddBlogOpen} onOpenChange={handleOpenChange}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-5 h-5 mr-1" /> Add Blog Post
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{editingId ? 'Edit Blog Post' : 'Create New Blog Post'}</DialogTitle>
                  <DialogDescription>
                    {editingId
                      ? 'Modify the properties of your blog post.'
                      : 'Write a new blog article to publish on your website.'}
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-5 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="blog-title">Title</Label>
                    <Input
                      required
                      id="blog-title"
                      placeholder="e.g. Top Things to Do in Hunza Valley"
                      value={formTitle}
                      onChange={(e) => handleTitleChange(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="blog-slug">URL Slug</Label>
                    <Input
                      required
                      id="blog-slug"
                      placeholder="e.g. top-things-hunza-valley"
                      value={formSlug}
                      onChange={(e) => setFormSlug(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Will appear as: /blog/{formSlug || 'your-slug-here'}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="blog-excerpt">Excerpt</Label>
                    <Textarea
                      id="blog-excerpt"
                      placeholder="A short summary that appears on the blog listing page..."
                      rows={2}
                      value={formExcerpt}
                      onChange={(e) => setFormExcerpt(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="blog-content">Content</Label>
                    <Textarea
                      id="blog-content"
                      placeholder="Write the full blog article content here..."
                      rows={8}
                      value={formContent}
                      onChange={(e) => setFormContent(e.target.value)}
                    />
                  </div>

                  {/* ── Cover Image: File Upload OR URL ─────────────────────────── */}
                  <div className="space-y-3">
                    <Label>Cover Image</Label>

                    {/* Mutual exclusivity note */}
                    {(hasFile || hasUrl) && (
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-2 flex items-start gap-2 animate-in fade-in slide-in-from-top-1 duration-300">
                        <div className="bg-amber-500 text-white rounded-full p-0.5 mt-0.5">
                          <X className="w-3 h-3" />
                        </div>
                        <p className="text-[10px] text-amber-800 leading-tight">
                          <strong>Note:</strong> You can only use one image source. Clear the current selection to switch between file upload and URL.
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
                          <img
                            src={filePreview}
                            alt="preview"
                            className="w-full rounded-lg aspect-video object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center text-white text-sm font-medium">
                            <UploadCloud className="w-5 h-5 mr-2" /> Click to replace
                          </div>
                          {selectedFile && (
                            <button
                              type="button"
                              onClick={(e) => { e.stopPropagation(); clearFile(); }}
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
                            <p className="font-medium text-sm text-foreground">Drop an image or click to browse</p>
                            <p className="text-[10px] mt-0.5">JPG, PNG, WebP, AVIF</p>
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
                          onClick={clearFile}
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
                          <Label htmlFor="blog-image-url" className="text-xs">Image URL</Label>
                        </div>
                        {formImageUrl && (
                          <button
                            type="button"
                            onClick={() => setFormImageUrl('')}
                            className="text-[10px] text-muted-foreground hover:text-destructive underline"
                          >
                            Clear URL
                          </button>
                        )}
                      </div>
                      <Input
                        id="blog-image-url"
                        className="h-8 text-xs"
                        placeholder="https://example.com/cover-image.jpg"
                        value={formImageUrl}
                        onChange={(e) => setFormImageUrl(e.target.value)}
                        disabled={hasFile}
                      />
                      {formImageUrl && !hasFile && (
                        <div className="mt-2 rounded-lg overflow-hidden border border-border/50 h-32">
                          <img src={formImageUrl} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                      )}
                      <p className="text-[10px] text-muted-foreground">Used if no file is uploaded.</p>
                    </div>
                  </div>

                  {/* Upload progress */}
                  {isSubmitting && uploadProgress > 0 && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] text-muted-foreground">
                        <span>{uploadProgress < 100 ? 'Uploading image...' : 'Saving...'}</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <Progress value={uploadProgress} className="h-1" />
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="blog-author">Author</Label>
                      <Input
                        required
                        id="blog-author"
                        placeholder="Leopard Cave Team"
                        value={formAuthor}
                        onChange={(e) => setFormAuthor(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="blog-status">Status</Label>
                      <Select value={formStatus} onValueChange={setFormStatus} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Active">Active (Published)</SelectItem>
                          <SelectItem value="Draft">Draft</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-muted/20">
                    <div className="space-y-0.5">
                      <Label htmlFor="blog-featured" className="text-sm font-medium">Featured Post</Label>
                      <p className="text-xs text-muted-foreground">Show a featured badge on this post</p>
                    </div>
                    <Switch
                      id="blog-featured"
                      checked={formFeatured}
                      onCheckedChange={setFormFeatured}
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting
                      ? (editingId ? 'Saving...' : 'Publishing...')
                      : (editingId ? 'Update Blog Post' : 'Publish Blog Post')}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Card className="w-full">
          {loading ? (
            <div className="flex justify-center items-center py-20 text-muted-foreground">
              Loading blog posts...
            </div>
          ) : viewMode === 'list' ? (
            <div className="rounded-md border-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50 hover:bg-muted/50">
                    <TableHead className="w-[35%]">Title</TableHead>
                    <TableHead className="w-[15%]">Author</TableHead>
                    <TableHead className="w-[12%]">Status</TableHead>
                    <TableHead className="w-[12%]">Featured</TableHead>
                    <TableHead className="w-[14%]">Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {blogs.map((blog) => (
                    <TableRow key={blog.id} className="hover:bg-muted/30">
                      <TableCell className="font-semibold text-primary">
                        <div className="flex items-center gap-3">
                          {blog.image && (
                            <div className="w-10 h-10 rounded-md overflow-hidden flex-shrink-0 border border-border/30">
                              <img src={blog.image} alt="" className="w-full h-full object-cover" />
                            </div>
                          )}
                          <span className="line-clamp-1">{blog.title}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{blog.author}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          blog.status === 'Active'
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-amber-100 text-amber-700'
                        }`}>
                          {blog.status === 'Active' ? 'Published' : 'Draft'}
                        </span>
                      </TableCell>
                      <TableCell>
                        {blog.featured && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary">
                            <Star className="h-3 w-3 fill-current" /> Featured
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(blog.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="icon" asChild className="h-8 w-8 text-muted-foreground hover:text-primary">
                            <a href={`/blog/${blog.slug}`} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => openEditBlog(blog)} className="h-8 w-8 text-muted-foreground hover:text-primary">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => setDeleteId(blog.id)} className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {blogs.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-10 text-muted-foreground bg-muted/20">
                        No blog posts found. Click 'Add Blog Post' to create your first article!
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="p-6 bg-muted/10 rounded-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {blogs.map((blog) => (
                  <Card key={blog.id} className="flex flex-col overflow-hidden border border-border/50 hover:border-primary/30 transition-all hover:shadow-md">
                    {blog.image && (
                      <div className="relative h-40 overflow-hidden">
                        <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                        {blog.featured && (
                          <div className="absolute top-2 right-2">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary text-primary-foreground">
                              <Star className="h-2.5 w-2.5 fill-current" /> Featured
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                    <CardHeader className="p-5 pb-3 bg-muted/20">
                      <div className="flex justify-between items-start gap-2">
                        <div className="min-w-0">
                          <CardTitle className="leading-tight mb-1 line-clamp-2">{blog.title}</CardTitle>
                          <span className="inline-block text-[11px] font-bold tracking-wider uppercase text-muted-foreground">
                            {blog.author}
                          </span>
                        </div>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold whitespace-nowrap ${
                          blog.status === 'Active'
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-amber-100 text-amber-700'
                        }`}>
                          {blog.status === 'Active' ? 'Published' : 'Draft'}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="p-5 pt-4 flex-1">
                      <p className="text-sm text-muted-foreground line-clamp-3">{blog.excerpt}</p>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 gap-2 border-t border-border/40 mt-auto flex justify-between bg-background">
                      <div className="flex gap-2 w-full mt-4">
                        <Button onClick={() => openEditBlog(blog)} variant="outline" size="sm" className="w-full font-semibold">
                          <Edit className="w-4 h-4 mr-2" /> Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full text-destructive hover:text-destructive hover:bg-destructive/10 font-semibold"
                          onClick={() => setDeleteId(blog.id)}
                        >
                          <Trash2 className="w-4 h-4 mr-2" /> Delete
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
                {blogs.length === 0 && (
                  <div className="col-span-full py-12 text-center text-muted-foreground border-2 border-dashed rounded-xl">
                    No blog posts found. Start writing your first article now.
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
                      onClick={() => currentPage > 1 && fetchBlogs(currentPage - 1)}
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
                      onClick={() => currentPage < totalPages && fetchBlogs(currentPage + 1)}
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
              This action cannot be undone. This will permanently delete this blog post and remove it from your website.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => { if (deleteId) confirmDeleteBlog(deleteId); }}
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
