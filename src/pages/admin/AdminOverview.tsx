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
import { fetchAnalytics, type AnalyticsData } from '@/services/analytics';

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

  console.log(data)
  // Merge sessions and users for the trend chart
  const trendData = useMemo(() => {
    if (!data) return [];
    return data.sessions.map((s, i) => ({
      date: s.date,
      sessions: s.value,
      users: data.users[i]?.value || 0,
    }));
  }, [data]);

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
          <p className="text-muted-foreground animate-pulse">Fetching live analytics data...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-8 animate-in fade-in duration-500">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Analytics Overview</h1>
            <p className="text-muted-foreground mt-1">
              Google Tag Manager & Analytics real-time report for Leopard Cave.
            </p>
          </div>

          {/* Real-time Indicator */}
          <div className="flex items-center gap-3 bg-primary/5 border border-primary/10 rounded-full px-4 py-2 self-start md:self-center">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-muted-foreground leading-none">Real-time Users</span>
              <span className="text-lg font-black text-primary leading-none mt-0.5">{data?.realtimeUsers || 0}</span>
            </div>
            <Zap className="w-5 h-5 text-emerald-500 ml-1" />
          </div>
        </div>

        {/* ── Metric Cards (Stat Cards) ───────────────────────────────────────── */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="hover:border-primary/40 transition-colors border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Total Users</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold tracking-tight">{data?.totalUsers || '0'}</div>
              <div className="flex items-center gap-1.5 mt-1.5">
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">Live</span>
                <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-tighter self-end mb-0.5">Last 7 days</span>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:border-primary/40 transition-colors border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Sessions</CardTitle>
              <MousePointer2 className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold tracking-tight">{data?.totalSessions || '0'}</div>
              <div className="flex items-center gap-1.5 mt-1.5">
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">Live</span>
                <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-tighter self-end mb-0.5">Last 7 days</span>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:border-primary/40 transition-colors border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Avg. Engagement</CardTitle>
              <Clock className="h-4 w-4 text-fuchsia-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold tracking-tight">{data?.avgEngagementTime || '0m 0s'}</div>
              <div className="flex items-center gap-1.5 mt-1.5">
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">Live</span>
                <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-tighter self-end mb-0.5">Last 7 days</span>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:border-primary/40 transition-colors border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Event Count</CardTitle>
              <BarChart3 className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold tracking-tight">{data?.totalEvents || '0'}</div>
              <div className="flex items-center gap-1.5 mt-1.5">
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">Live</span>
                <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-tighter self-end mb-0.5">Last 7 days</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ── Main Charts Section ─────────────────────────────────────────────── */}
        <div className="grid gap-6 lg:grid-cols-7 lg:grid-rows-1">
          {/* Sessions Over Time Chart (Major) */}
          <Card className="col-span-4 border-border/50 shadow-sm overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Sessions Trend</CardTitle>
              <CardDescription>Daily organic sessions over the last 7 days.</CardDescription>
            </CardHeader>
            <CardContent className="h-[350px] pt-4 pr-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorSessions" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#64748b' }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#64748b' }}
                  />
                  <Tooltip
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    itemStyle={{ fontWeight: 'bold' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="sessions"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorSessions)"
                    animationDuration={1500}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Device Distribution (Minor) */}
          <Card className="col-span-3 border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Device Breakdown</CardTitle>
              <CardDescription>Based on active user base.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="h-[220px] w-full mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data?.deviceBreakdown || []}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      animationDuration={1500}
                    >
                      {(data?.deviceBreakdown || []).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Legend Items */}
              <div className="grid grid-cols-1 w-full gap-3 mt-6">
                {(data?.deviceBreakdown || []).map((item) => (
                  <div key={item.name} className="flex items-center justify-between group">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">{item.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold">{item.value} visitors</span>
                      {item.name.toLowerCase() === 'mobile' && <Smartphone className="w-3.5 h-3.5 text-muted-foreground" />}
                      {item.name.toLowerCase() === 'desktop' && <Laptop className="w-3.5 h-3.5 text-muted-foreground" />}
                      {item.name.toLowerCase() === 'tablet' && <Tablet className="w-3.5 h-3.5 text-muted-foreground" />}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ── Real-time Traffic Section (Footer Info) ─────────────────────────── */}
        <div className="bg-muted/10 border border-border/50 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5 text-primary" strokeWidth={2.5} />
            <h2 className="text-lg font-bold tracking-tight leading-none">Recent Live Traffic</h2>
          </div>
          <div className="space-y-3">
            {(data?.recentTraffic || []).length > 0 ? (
              data?.recentTraffic.map((log, idx) => (
                <div key={idx} className="flex items-center justify-between py-2 border-b border-border/40 last:border-0 last:pb-0">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-primary">{log.city}</span>
                    <span className="text-xs text-muted-foreground font-mono">{log.page}</span>
                  </div>
                  <span className="text-[10px] font-bold uppercase text-muted-foreground">{log.time}</span>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground italic text-center py-4">No active sessions right now.</p>
            )}
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}
