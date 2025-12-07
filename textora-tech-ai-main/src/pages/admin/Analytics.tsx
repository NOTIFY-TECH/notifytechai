import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

interface AnalyticsData {
  id: string;
  message_count: number;
  lead_captured: boolean;
  user_queries: string[] | null;
  created_at: string;
}

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const { data, error } = await supabase
        .from('chatbot_analytics')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) throw error;
      setAnalytics(data || []);
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  // Process data for charts
  const conversionsData = [
    {
      name: 'Converted',
      value: analytics.filter((a) => a.lead_captured).length,
    },
    {
      name: 'Not Converted',
      value: analytics.filter((a) => !a.lead_captured).length,
    },
  ];

  const messageDistribution = analytics
    .reduce((acc: any[], curr) => {
      const range = Math.floor(curr.message_count / 5) * 5;
      const existing = acc.find((item) => item.range === `${range}-${range + 4}`);
      if (existing) {
        existing.count += 1;
      } else {
        acc.push({ range: `${range}-${range + 4}`, count: 1 });
      }
      return acc;
    }, [])
    .sort((a, b) => parseInt(a.range) - parseInt(b.range));

  const dailyConversations = analytics
    .reduce((acc: any[], curr) => {
      const date = new Date(curr.created_at).toLocaleDateString();
      const existing = acc.find((item) => item.date === date);
      if (existing) {
        existing.conversations += 1;
        if (curr.lead_captured) existing.conversions += 1;
      } else {
        acc.push({
          date,
          conversations: 1,
          conversions: curr.lead_captured ? 1 : 0,
        });
      }
      return acc;
    }, [])
    .slice(0, 7)
    .reverse();

  const topQueries = analytics
    .flatMap((a) => a.user_queries || [])
    .reduce((acc: Record<string, number>, query) => {
      acc[query] = (acc[query] || 0) + 1;
      return acc;
    }, {});

  const topQueriesData = Object.entries(topQueries)
    .sort(([, a], [, b]) => (b as number) - (a as number))
    .slice(0, 10)
    .map(([query, count]) => ({ query, count }));

  const conversionRate =
    analytics.length > 0
      ? ((analytics.filter((a) => a.lead_captured).length / analytics.length) * 100).toFixed(1)
      : 0;

  const avgMessagesPerConvo =
    analytics.length > 0
      ? (analytics.reduce((sum, a) => sum + a.message_count, 0) / analytics.length).toFixed(1)
      : 0;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
          <p className="text-muted-foreground">Chatbot performance and user engagement metrics</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Conversion Rate</CardTitle>
              <CardDescription>Leads captured from conversations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-primary">{conversionRate}%</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Avg. Messages</CardTitle>
              <CardDescription>Per conversation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-primary">{avgMessagesPerConvo}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Total Conversations</CardTitle>
              <CardDescription>Last 100 sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-primary">{analytics.length}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Daily Conversations</CardTitle>
              <CardDescription>Last 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dailyConversations}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="conversations" stroke="hsl(var(--primary))" />
                  <Line type="monotone" dataKey="conversions" stroke="hsl(var(--chart-2))" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Lead Conversion</CardTitle>
              <CardDescription>Conversion vs non-conversion</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={conversionsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Message Distribution</CardTitle>
              <CardDescription>Messages per conversation</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={messageDistribution}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="range" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="hsl(var(--chart-3))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top User Queries</CardTitle>
              <CardDescription>Most common questions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {topQueriesData.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No query data yet</p>
                ) : (
                  topQueriesData.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-sm">
                      <span className="truncate flex-1">{item.query}</span>
                      <span className="ml-2 font-semibold text-primary">{item.count}</span>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
