import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import DashboardLayout from '@/components/admin/DashboardLayout';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import SEO from '@/components/common/SEO';

interface CafeSettings {
  id: string;
  cafe_name: string;
  address: string | null;
  phone: string | null;
  email: string | null;
  logo_url: string | null;
}

const Settings = () => {
  const [settings, setSettings] = useState<CafeSettings | null>(null);
  const [formData, setFormData] = useState({
    cafe_name: '',
    address: '',
    phone: '',
    email: '',
    logo_url: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const { data, error } = await supabase
      .from('cafe_settings')
      .select('*')
      .limit(1)
      .single();

    if (!error && data) {
      setSettings(data);
      setFormData({
        cafe_name: data.cafe_name,
        address: data.address || '',
        phone: data.phone || '',
        email: data.email || '',
        logo_url: data.logo_url || '',
      });
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!settings) return;

    const { error } = await supabase
      .from('cafe_settings')
      .update({
        cafe_name: formData.cafe_name,
        address: formData.address || null,
        phone: formData.phone || null,
        email: formData.email || null,
        logo_url: formData.logo_url || null,
      })
      .eq('id', settings.id);

    if (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: 'Settings updated successfully',
      });
      fetchSettings();
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div>Loading settings...</div>
      </DashboardLayout>
    );
  }

  return (
    <>
      <SEO 
        title="Settings - Admin Panel"
        description="Manage cafe profile and settings"
      />
      <DashboardLayout>
        <div className="space-y-6 max-w-2xl">
          <h2 className="text-3xl font-bold">Café Settings</h2>

          <Card>
            <CardHeader>
              <CardTitle>Café Profile</CardTitle>
              <CardDescription>Update your café information</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cafe_name">Café Name *</Label>
                  <Input
                    id="cafe_name"
                    value={formData.cafe_name}
                    onChange={(e) => setFormData({ ...formData, cafe_name: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="logo_url">Logo URL</Label>
                  <Input
                    id="logo_url"
                    type="url"
                    value={formData.logo_url}
                    onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
                  />
                </div>

                <Button type="submit" className="w-full">
                  Save Changes
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </>
  );
};

export default Settings;
