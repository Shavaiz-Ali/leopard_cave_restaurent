import AdminLogin from '@/pages/AdminLogin';
import AdminOverview from '@/pages/admin/AdminOverview';
import AdminMenuItems from '@/pages/admin/AdminMenuItems';
import AdminCategories from '@/pages/admin/AdminCategories';
import AdminVideos from '@/pages/admin/AdminVideos';
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
  { name: 'Admin Videos', path: '/videos', element: <ProtectedRoute><AdminVideos /></ProtectedRoute> },
  { name: 'Admin Settings', path: '/settings', element: <ProtectedRoute><AdminSettings /></ProtectedRoute> },
  { name: 'Admin Login', path: '/login', element: <AdminLogin /> },
  { name: 'Root Redirect', path: '/', element: <ProtectedRoute><AdminOverview /></ProtectedRoute> },
];

export default adminRoutes;
