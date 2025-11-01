import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import DashboardLayout from '@/components/admin/DashboardLayout';
import { supabase } from '@/integrations/supabase/client';
import SEO from '@/components/common/SEO';

interface PopularItem {
  name: string;
  count: number;
  revenue: number;
}

const Analytics = () => {
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [avgOrderValue, setAvgOrderValue] = useState(0);
  const [popularItems, setPopularItems] = useState<PopularItem[]>([]);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    // Fetch orders
    const { data: orders } = await supabase
      .from('orders')
      .select('total_amount, status, created_at')
      .neq('status', 'cancelled');

    if (orders) {
      setTotalOrders(orders.length);
      const revenue = orders.reduce((sum, order) => sum + Number(order.total_amount), 0);
      setTotalRevenue(revenue);
      setAvgOrderValue(orders.length > 0 ? revenue / orders.length : 0);
    }

    // Fetch popular items
    const { data: orderItems } = await supabase
      .from('order_items')
      .select('item_name, quantity, unit_price');

    if (orderItems) {
      const itemStats: Record<string, { count: number; revenue: number }> = {};
      
      orderItems.forEach((item) => {
        if (!itemStats[item.item_name]) {
          itemStats[item.item_name] = { count: 0, revenue: 0 };
        }
        itemStats[item.item_name].count += item.quantity;
        itemStats[item.item_name].revenue += item.quantity * Number(item.unit_price);
      });

      const popular = Object.entries(itemStats)
        .map(([name, stats]) => ({ name, ...stats }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

      setPopularItems(popular);
    }
  };

  return (
    <>
      <SEO 
        title="Analytics - Admin Panel"
        description="View sales reports and performance metrics"
      />
      <DashboardLayout>
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Analytics</h2>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Total Orders</CardTitle>
                <CardDescription>All time orders (excluding cancelled)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{totalOrders}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Total Revenue</CardTitle>
                <CardDescription>All time revenue</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">${totalRevenue.toFixed(2)}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Avg Order Value</CardTitle>
                <CardDescription>Average order amount</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">${avgOrderValue.toFixed(2)}</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Popular Items</CardTitle>
              <CardDescription>Top 5 best-selling items</CardDescription>
            </CardHeader>
            <CardContent>
              {popularItems.length === 0 ? (
                <p className="text-muted-foreground">No data available</p>
              ) : (
                <div className="space-y-4">
                  {popularItems.map((item, index) => (
                    <div key={item.name} className="flex items-center justify-between border-b pb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-bold text-muted-foreground">#{index + 1}</span>
                        <div>
                          <p className="font-semibold">{item.name}</p>
                          <p className="text-sm text-muted-foreground">{item.count} orders</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">${item.revenue.toFixed(2)}</p>
                        <p className="text-sm text-muted-foreground">revenue</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </>
  );
};

export default Analytics;
