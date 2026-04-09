import AdminLogin from '@/pages/AdminLogin';
import AdminOverview from '@/pages/admin/AdminOverview';
import AdminMenuItems from '@/pages/admin/AdminMenuItems';
import AdminCategories from '@/pages/admin/AdminCategories';
import AdminGallery from '@/pages/admin/AdminGallery';
import AdminBlogs from '@/pages/admin/AdminBlogs';
import AdminSettings from '@/pages/admin/AdminSettings';
import { ProtectedRoute } from '@/components/common/ProtectedRoute';
import type { ReactNode } from 'react';

interface RouteConfig {
  name: string;
  path: string;
  element: ReactNode;
}

const adminRoutes: RouteConfig[] = [
  { name: 'Admin Dashboard', path: '/dashboard', element: <ProtectedRoute><AdminOverview /></ProtectedRoute> },
  { name: 'Admin Menu Items', path: '/menu', element: <ProtectedRoute><AdminMenuItems /></ProtectedRoute> },
  { name: 'Admin Categories', path: '/categories', element: <ProtectedRoute><AdminCategories /></ProtectedRoute> },
  { name: 'Admin Gallery', path: '/gallery', element: <ProtectedRoute><AdminGallery /></ProtectedRoute> },
  { name: 'Admin Blogs', path: '/blogs', element: <ProtectedRoute><AdminBlogs /></ProtectedRoute> },
  { name: 'Admin Settings', path: '/settings', element: <ProtectedRoute><AdminSettings /></ProtectedRoute> },
  { name: 'Admin Login', path: '/login', element: <AdminLogin /> },
  { name: 'Root Redirect', path: '/', element: <ProtectedRoute><AdminOverview /></ProtectedRoute> },
];

export default adminRoutes;

