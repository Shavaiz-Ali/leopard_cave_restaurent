import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, CreditCard, Activity, CalendarDays } from 'lucide-react';
import AdminLayout from '@/components/layout/AdminLayout';

export default function AdminOverview() {
  return (
    <AdminLayout>
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
            <p className="text-muted-foreground mt-1">
              Welcome back to the admin portal. Here's what's happening today.
            </p>
          </div>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="hover:border-primary/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Reservations</CardTitle>
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">128</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-emerald-500 font-medium">+14%</span> from last month
              </p>
            </CardContent>
          </Card>
          
          <Card className="hover:border-primary/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Guests</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+2350</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-emerald-500 font-medium">+180</span> from last month
              </p>
            </CardContent>
          </Card>
          
          <Card className="hover:border-primary/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Rs. 122,340</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-emerald-500 font-medium">+19%</span> from last month
              </p>
            </CardContent>
          </Card>
          
          <Card className="hover:border-primary/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground mt-1">
                Currently running in background
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
