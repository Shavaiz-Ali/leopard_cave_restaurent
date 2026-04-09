import { formatDate, formatDuration, formatK } from "@/helpers";
import { AnalyticsData } from "@/types";

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export const fetchAnalytics = async (): Promise<AnalyticsData | null> => {
  try {
    const res = await fetch('/api/analytics');

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();

    if (data.error) throw new Error(data.error);

    const historyRows = data.history?.rows || [];
    const historyHeaders = data.history?.metricHeaders || [];
    const deviceRows = data.devices?.rows || [];
    const realtimeRows = data.realtime?.rows || [];

    // 🔹 Helper: safe metric extraction
    const getMetric = (row: any, headers: any[], name: string) => {
      const index = headers.findIndex((h) => h.name === name);
      return index !== -1 ? Number(row.metricValues[index].value) : 0;
    };

    // 🔹 Realtime users
    const realtimeUsers = realtimeRows.reduce(
      (acc: number, row: any) =>
        acc + Number(row.metricValues?.[0]?.value || 0),
      0
    );

    // 🔹 Trends
    const sessionTrend = historyRows.map((row: any) => ({
      date: formatDate(row.dimensionValues[0].value),
      value: getMetric(row, historyHeaders, "sessions"),
    }));

    const userTrend = historyRows.map((row: any) => ({
      date: formatDate(row.dimensionValues[0].value),
      value: getMetric(row, historyHeaders, "activeUsers"),
    }));

    // 🔹 Totals
    const totalSessions = historyRows.reduce(
      (acc: number, row: any) =>
        acc + getMetric(row, historyHeaders, "sessions"),
      0
    );

    const totalUsers = historyRows.reduce(
      (acc: number, row: any) =>
        acc + getMetric(row, historyHeaders, "activeUsers"),
      0
    );

    const totalEvents = historyRows.reduce(
      (acc: number, row: any) =>
        acc + getMetric(row, historyHeaders, "eventCount"),
      0
    );

    // 🔹 Weighted avg duration
    const totalDuration = historyRows.reduce(
      (acc: number, row: any) =>
        acc +
        getMetric(row, historyHeaders, "averageSessionDuration") *
        getMetric(row, historyHeaders, "activeUsers"),
      0
    );

    const avgDurationSeconds =
      totalUsers > 0 ? totalDuration / totalUsers : 0;

    const avgEngagementTime = formatDuration(avgDurationSeconds);

    // 🔹 Devices
    const deviceBreakdown = deviceRows.map((row: any, idx: number) => ({
      name: row.dimensionValues[0].value,
      value: Number(row.metricValues[0].value),
      color: COLORS[idx % COLORS.length],
    }));

    // 🔹 Recent traffic
    const recentTraffic = realtimeRows.slice(0, 5).map((row: any) => ({
      city: row.dimensionValues[0].value || "Unknown",
      page: row.dimensionValues[1].value,
      time: "Just now",
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