

export interface AnalyticsData {
  sessions: { date: string; value: number }[];
  users: { date: string; value: number }[];
  deviceBreakdown: { name: string; value: number; color: string }[];
  realtimeUsers: number;
  avgEngagementTime: string;
  totalUsers: string;
  totalSessions: string;
  totalEvents: string;
  recentTraffic: { city: string; page: string; time: string }[];
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export const fetchAnalytics = async (): Promise<AnalyticsData | null> => {
  try {
    const res = await fetch('/api/analytics');
    console.log("main response", res)
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();

    console.log("actualjson", data)

    if (data.error) throw new Error(data.error);

    // Transform GA4 response to high-level dashboard data
    const history = data.history?.rows || [];
    const devices = data.devices?.rows || [];
    const realtimeRows = data.realtime?.rows || [];

    // Calculate total realtime users
    const realtimeUsers = realtimeRows.reduce((acc: number, row: any) => acc + parseInt(row.metricValues[0].value), 0);

    // 1. Sessions & Users Trends
    const sessionTrend = history.map((row: any) => ({
      date: formatDate(row.dimensionValues[0].value),
      value: parseInt(row.metricValues[0].value),
    }));

    const userTrend = history.map((row: any) => ({
      date: formatDate(row.dimensionValues[0].value),
      value: parseInt(row.metricValues[1].value),
    }));

    // 2. Totals
    const totalSessions = history.reduce((acc: number, row: any) => acc + parseInt(row.metricValues[0].value), 0);
    const totalUsers = history.reduce((acc: number, row: any) => acc + parseInt(row.metricValues[1].value), 0);
    const totalEvents = history.reduce((acc: number, row: any) => acc + parseInt(row.metricValues[4].value), 0);

    // 3. AVG Duration (GA4 returns seconds)
    const avgDurationSeconds = history.length > 0 ? (history.reduce((acc: number, row: any) => acc + parseFloat(row.metricValues[2].value), 0) / history.length) : 0;
    const minutes = Math.floor(avgDurationSeconds / 60);
    const seconds = Math.floor(avgDurationSeconds % 60);
    const avgEngagementTime = `${minutes}m ${seconds}s`;

    // 4. Device Breakdown
    const deviceBreakdown = devices.map((row: any, idx: number) => ({
      name: row.dimensionValues[0].value,
      value: parseInt(row.metricValues[0].value),
      color: COLORS[idx % COLORS.length] || '#ccc',
    }));

    // 5. Recent Traffic
    const recentTraffic = realtimeRows.slice(0, 5).map((row: any) => ({
      city: row.dimensionValues[0].value === '(not set)' ? 'Unknown City' : row.dimensionValues[0].value,
      page: row.dimensionValues[1].value,
      time: 'Just now',
    }));

    return {
      sessions: sessionTrend,
      users: userTrend,
      deviceBreakdown,
      realtimeUsers,
      avgEngagementTime,
      totalUsers: formatK(totalUsers),
      totalSessions: formatK(totalSessions),
      totalEvents: formatK(totalEvents),
      recentTraffic,
    };

  } catch (error) {
    console.error('Error fetching analytics:', error);
    return null;
  }
};

// Helper to format GA4 date (YYYYMMDD) to readable format (Mon, Tue, etc.)
const formatDate = (gaDate: string) => {
  const y = gaDate.slice(0, 4);
  const m = gaDate.slice(4, 6);
  const d = gaDate.slice(6, 8);
  const date = new Date(`${y}-${m}-${d}`);
  return date.toLocaleDateString('en-US', { weekday: 'short' });
};

// Helper for large numbers
const formatK = (num: number) => {
  if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
  return num.toString();
};
