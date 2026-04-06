import { Activity } from 'lucide-react';
import AdminLayout from '@/components/layout/AdminLayout';

export default function AdminSettings() {
  return (
    <AdminLayout>
      <div className="space-y-8 animate-in fade-in duration-500 flex flex-col items-center justify-center min-h-[50vh] text-center">
        <div className="p-4 bg-muted rounded-full">
          <Activity className="h-10 w-10 text-muted-foreground opacity-50" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Portal Settings</h1>
          <p className="text-muted-foreground mt-2 max-w-md mx-auto">
            Manage your restaurant profile, admin users, and platform configuration details here.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}
