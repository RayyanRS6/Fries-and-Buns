import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingBag, DollarSign, Users, TrendingUp } from 'lucide-react';
import DashboardLayout from '@/components/admin/DashboardLayout';
import { supabase } from '@/integrations/supabase/client';
import SEO from '@/components/common/SEO';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalCustomers: 0,
    pendingOrders: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const { data: orders } = await supabase
      .from('orders')
      .select('total_amount, status, customer_id');

    if (orders) {
      const revenue = orders.reduce((sum, order) => sum + Number(order.total_amount), 0);
      const pending = orders.filter(o => o.status === 'pending').length;
      const uniqueCustomers = new Set(orders.map(o => o.customer_id).filter(Boolean)).size;

      setStats({
        totalOrders: orders.length,
        totalRevenue: revenue,
        totalCustomers: uniqueCustomers,
        pendingOrders: pending,
      });
    }
  };

  const statCards = [
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: ShoppingBag,
      color: 'text-blue-600',
    },
    {
      title: 'Total Revenue',
      value: `$${stats.totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      color: 'text-green-600',
    },
    {
      title: 'Total Customers',
      value: stats.totalCustomers,
      icon: Users,
      color: 'text-purple-600',
    },
    {
      title: 'Pending Orders',
      value: stats.pendingOrders,
      icon: TrendingUp,
      color: 'text-orange-600',
    },
  ];

  return (
    <>
      <SEO 
        title="Dashboard - Admin Panel"
        description="Admin dashboard for managing orders, menu, and analytics"
      />
      <DashboardLayout>
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Dashboard Overview</h2>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {statCards.map((stat) => (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-3">
              <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                <h3 className="font-semibold mb-2">View Orders</h3>
                <p className="text-sm text-muted-foreground">Manage and update order statuses</p>
              </Card>
              <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                <h3 className="font-semibold mb-2">Manage Menu</h3>
                <p className="text-sm text-muted-foreground">Add, edit, or remove menu items</p>
              </Card>
              <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                <h3 className="font-semibold mb-2">View Analytics</h3>
                <p className="text-sm text-muted-foreground">Check sales and performance metrics</p>
              </Card>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </>
  );
};

export default Dashboard;
