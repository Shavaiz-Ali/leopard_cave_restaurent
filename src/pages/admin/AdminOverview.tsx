import { useMemo, useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Users, MousePointer2, Clock, BarChart3, Laptop, Smartphone, Tablet, Zap, Activity, Loader2 } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import AdminLayout from '@/components/layout/AdminLayout';
import { fetchAnalytics } from '@/services/analytics';
import { AnalyticsData } from '@/types';

export default function AdminOverview() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAnalytics = async () => {
      setLoading(true);
      const res = await fetchAnalytics();
      if (res) setData(res);
      setLoading(false);
    };

    loadAnalytics();
  }, []);

  // FIXED trend merging
  const trendData = useMemo(() => {
    if (!data?.sessions || !data?.users) return [];

    const map = new Map();

    data.sessions.forEach((s) => {
      map.set(s.date, { date: s.date, sessions: s.value, users: 0 });
    });

    data.users.forEach((u) => {
      if (map.has(u.date)) {
        map.get(u.date).users = u.value;
      } else {
        map.set(u.date, { date: u.date, sessions: 0, users: u.value });
      }
    });

    return Array.from(map.values());
  }, [data]);

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-muted-foreground animate-pulse">
            Fetching live analytics data...
          </p>
        </div>
      </AdminLayout>
    );
  }

  // if (!loading && !data) {
  //   return (
  //     <AdminLayout>
  //       <div className="flex flex-col items-center justify-center min-h-[400px] gap-3">
  //         <Activity className="w-8 h-8 text-muted-foreground" />
  //         <p className="text-muted-foreground">
  //           No analytics data available yet.
  //         </p>
  //       </div>
  //     </AdminLayout>
  //   );
  // }

  return (
    <AdminLayout>
      <div className="space-y-8">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Analytics Overview</h1>
            <p className="text-muted-foreground">
              Google Analytics dashboard
            </p>
          </div>

          <div className="flex items-center gap-1 bg-primary/5 px-4 !py-0 w-fit h-[40px] rounded-full border border-primary/10">
            <Zap className="w-5 h-5 text-emerald-500" />
            <div className='flex items-center gap-2'>
              <p className="text-xs uppercase text-muted-foreground">Realtime</p>
              <p className="font-bold text-lg">{data?.realtimeUsers ?? 0}</p>
            </div>
          </div>
        </div>

        {/* METRICS */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                <CardTitle>Total Users</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{data?.totalUsers ?? 0}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <MousePointer2 className="w-4 h-4 text-blue-500" />
                <CardTitle>Sessions</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{data?.totalSessions ?? 0}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-fuchsia-500" />
                <CardTitle>Engagement</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{data?.avgEngagementTime ?? '0'}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-emerald-500" />
                <CardTitle>Events</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{data?.totalEvents ?? 0}</p>
            </CardContent>
          </Card>

        </div>

        {/* CHARTS */}
        <div className="grid gap-6 lg:grid-cols-7">

          {/* LINE CHART */}
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Sessions Trend</CardTitle>
              <CardDescription>Last 7 days</CardDescription>
            </CardHeader>
            <CardContent className="h-[350px]">

              {trendData.length ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="sessions" />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  No data available
                </div>
              )}

            </CardContent>
          </Card>

          {/* PIE CHART */}
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Device Breakdown</CardTitle>
            </CardHeader>

            <CardContent className="h-[300px]">

              {data?.deviceBreakdown?.length ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data.deviceBreakdown}
                      dataKey="value"
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                    >
                      {data.deviceBreakdown.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  No device data
                </div>
              )}

            </CardContent>
          </Card>

        </div>

        {/* TRAFFIC */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Traffic</CardTitle>
          </CardHeader>

          <CardContent>

            {data?.recentTraffic?.length ? (
              data.recentTraffic.map((t, i) => (
                <div key={i} className="flex justify-between border-b py-2">
                  <div>
                    <p className="font-medium text-primary">{t.city || 'Unknown'}</p>
                    <p className="text-xs text-muted-foreground">{t.page}</p>
                  </div>
                  <span className="text-xs">{t.time}</span>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-center">
                No active traffic
              </p>
            )}

          </CardContent>
        </Card>

      </div>
    </AdminLayout>
  );
}