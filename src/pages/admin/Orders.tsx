import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import DashboardLayout from '@/components/admin/DashboardLayout';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import SEO from '@/components/common/SEO';
import { Bell } from 'lucide-react';

interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  delivery_address: string;
  status: string;
  total_amount: number;
  notes: string | null;
  created_at: string;
}

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-500',
  confirmed: 'bg-blue-500',
  preparing: 'bg-purple-500',
  ready: 'bg-green-500',
  'out-for-delivery': 'bg-orange-500',
  delivered: 'bg-gray-500',
  cancelled: 'bg-red-500',
};

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
    
    // Subscribe to real-time updates
    const channel = supabase
      .channel('orders-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'orders'
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            toast({
              title: '🔔 New Order!',
              description: `Order ${(payload.new as Order).order_number} received`,
            });
            fetchOrders();
          } else {
            fetchOrders();
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch orders',
        variant: 'destructive',
      });
    } else {
      setOrders(data || []);
    }
    setLoading(false);
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', orderId);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to update order status',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: 'Order status updated',
      });
      fetchOrders();
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div>Loading orders...</div>
      </DashboardLayout>
    );
  }

  return (
    <>
      <SEO 
        title="Orders - Admin Panel"
        description="Manage and track all customer orders"
      />
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold">Orders</h2>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary animate-pulse" />
              <span className="text-sm text-muted-foreground">Real-time updates enabled</span>
            </div>
          </div>

          {orders.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">No orders yet</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {orders.map((order) => (
                <Card key={order.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>{order.order_number}</CardTitle>
                        <CardDescription>
                          {new Date(order.created_at).toLocaleString()}
                        </CardDescription>
                      </div>
                      <Badge className={statusColors[order.status]}>
                        {order.status.replace('-', ' ')}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2">Customer Info</h4>
                        <p className="text-sm"><span className="font-medium">Name:</span> {order.customer_name}</p>
                        <p className="text-sm"><span className="font-medium">Email:</span> {order.customer_email}</p>
                        <p className="text-sm"><span className="font-medium">Phone:</span> {order.customer_phone}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Delivery Info</h4>
                        <p className="text-sm">{order.delivery_address}</p>
                        {order.notes && (
                          <p className="text-sm mt-2"><span className="font-medium">Notes:</span> {order.notes}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="text-lg font-bold">
                        Total: ${Number(order.total_amount).toFixed(2)}
                      </div>
                      <Select
                        value={order.status}
                        onValueChange={(value) => updateOrderStatus(order.id, value)}
                      >
                        <SelectTrigger className="w-[200px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="confirmed">Confirmed</SelectItem>
                          <SelectItem value="preparing">Preparing</SelectItem>
                          <SelectItem value="ready">Ready</SelectItem>
                          <SelectItem value="out-for-delivery">Out for Delivery</SelectItem>
                          <SelectItem value="delivered">Delivered</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </DashboardLayout>
    </>
  );
};

export default Orders;
