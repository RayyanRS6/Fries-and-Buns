import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import DashboardLayout from '@/components/admin/DashboardLayout';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import SEO from '@/components/common/SEO';

interface MenuItem {
  id: string;
  name: string;
  description: string | null;
  category: string;
  price: number;
  image_url: string;
  available: boolean;
}

const MenuManagement = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'burgers',
    price: '',
    image_url: '',
    available: true,
  });

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    const { data, error } = await supabase
      .from('menu_items')
      .select('*')
      .order('category', { ascending: true });

    if (!error && data) {
      setMenuItems(data);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const itemData = {
      name: formData.name,
      description: formData.description || null,
      category: formData.category,
      price: parseFloat(formData.price),
      image_url: formData.image_url,
      available: formData.available,
    };

    if (editingItem) {
      const { error } = await supabase
        .from('menu_items')
        .update(itemData)
        .eq('id', editingItem.id);

      if (error) {
        toast({ title: 'Error', description: error.message, variant: 'destructive' });
      } else {
        toast({ title: 'Success', description: 'Menu item updated' });
      }
    } else {
      const { error } = await supabase
        .from('menu_items')
        .insert(itemData);

      if (error) {
        toast({ title: 'Error', description: error.message, variant: 'destructive' });
      } else {
        toast({ title: 'Success', description: 'Menu item created' });
      }
    }

    setIsDialogOpen(false);
    resetForm();
    fetchMenuItems();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    const { error } = await supabase
      .from('menu_items')
      .delete()
      .eq('id', id);

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Success', description: 'Menu item deleted' });
      fetchMenuItems();
    }
  };

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description || '',
      category: item.category,
      price: item.price.toString(),
      image_url: item.image_url,
      available: item.available,
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setEditingItem(null);
    setFormData({
      name: '',
      description: '',
      category: 'burgers',
      price: '',
      image_url: '',
      available: true,
    });
  };

  return (
    <>
      <SEO 
        title="Menu Management - Admin Panel"
        description="Manage menu items, categories, and availability"
      />
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold">Menu Management</h2>
            <Dialog open={isDialogOpen} onOpenChange={(open) => {
              setIsDialogOpen(open);
              if (!open) resetForm();
            }}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Item
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>{editingItem ? 'Edit' : 'Add'} Menu Item</DialogTitle>
                  <DialogDescription>
                    {editingItem ? 'Update' : 'Create a new'} menu item
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="burgers">Burgers</SelectItem>
                        <SelectItem value="pizza">Pizza</SelectItem>
                        <SelectItem value="chicken">Chicken</SelectItem>
                        <SelectItem value="sides">Sides</SelectItem>
                        <SelectItem value="drinks">Drinks</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Price *</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="image_url">Image URL *</Label>
                    <Input
                      id="image_url"
                      value={formData.image_url}
                      onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                      required
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="available"
                      checked={formData.available}
                      onCheckedChange={(checked) => setFormData({ ...formData, available: checked })}
                    />
                    <Label htmlFor="available">Available</Label>
                  </div>
                  <Button type="submit" className="w-full">
                    {editingItem ? 'Update' : 'Create'} Item
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {menuItems.map((item) => (
              <Card key={item.id}>
                <CardHeader>
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-full h-40 object-cover rounded-md mb-2"
                  />
                  <CardTitle>{item.name}</CardTitle>
                  <CardDescription>{item.category}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold">${Number(item.price).toFixed(2)}</span>
                    <div className="flex gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => handleEdit(item)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="destructive"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default MenuManagement;
