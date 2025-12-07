import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { Users, MessageSquare, TrendingUp, Star } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalLeads: 0,
    totalConversations: 0,
    totalTestimonials: 0,
    avgMessagesPerConvo: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [leadsRes, convosRes, testimonialsRes, analyticsRes] = await Promise.all([
        supabase.from('leads').select('id', { count: 'exact', head: true }),
        supabase.from('chat_conversations').select('id', { count: 'exact', head: true }),
        supabase.from('testimonials').select('id', { count: 'exact', head: true }),
        supabase.from('chatbot_analytics').select('message_count'),
      ]);

      const avgMessages = analyticsRes.data?.length
        ? analyticsRes.data.reduce((sum, a) => sum + (a.message_count || 0), 0) / analyticsRes.data.length
        : 0;

      setStats({
        totalLeads: leadsRes.count || 0,
        totalConversations: convosRes.count || 0,
        totalTestimonials: testimonialsRes.count || 0,
        avgMessagesPerConvo: Math.round(avgMessages * 10) / 10,
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const statCards = [
    {
      title: 'Total Leads',
      value: stats.totalLeads,
      description: 'Captured from chatbot',
      icon: Users,
    },
    {
      title: 'Conversations',
      value: stats.totalConversations,
      description: 'Total chat sessions',
      icon: MessageSquare,
    },
    {
      title: 'Avg. Messages',
      value: stats.avgMessagesPerConvo,
      description: 'Per conversation',
      icon: TrendingUp,
    },
    {
      title: 'Testimonials',
      value: stats.totalTestimonials,
      description: 'Customer reviews',
      icon: Star,
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Overview of your business metrics</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
