export interface Option {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
  withCount?: boolean;
}


export interface TrendPoint {
  date: string;
  value: number;
}

export interface DeviceData {
  name: string;
  value: number;
  color: string;
}

export interface TrafficItem {
  city: string;
  page: string;
  time: string;
}

export interface AnalyticsData {
  sessions: TrendPoint[];
  users: TrendPoint[];
  deviceBreakdown: DeviceData[];
  realtimeUsers: number;
  avgEngagementTime: string;
  totalUsers: string;
  totalSessions: string;
  totalEvents: string;
  recentTraffic: TrafficItem[];
}