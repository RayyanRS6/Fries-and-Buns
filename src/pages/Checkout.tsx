import * as React from "react";
import { useToast } from "@/hooks/use-toast";
import SEO from "@/components/common/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const CheckoutPage = () => {
  const { toast } = useToast();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Order placed!", description: "This is a demo checkout. No payment processed." });
  };

  return (
    <main className="container mx-auto space-y-6 px-4 py-8">
      <SEO title="Checkout | Fries & Buns" description="Complete your Fries & Buns order with secure, fast checkout." />
      <h1 className="text-3xl font-bold">Checkout</h1>
      <form onSubmit={onSubmit} className="grid gap-6 lg:grid-cols-2">
        <section className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Full name</label>
            <Input required placeholder="Jane Doe" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Phone</label>
            <Input required placeholder="(555) 555-5555" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Delivery address</label>
            <Textarea required placeholder="Street, City, Zip" />
          </div>
        </section>
        <aside className="rounded-lg border p-4">
          <p className="text-sm text-muted-foreground">Promo codes and payment are mocked for demo.</p>
          <div className="mt-4">
            <Button type="submit" variant="hero" className="w-full">Place Order</Button>
          </div>
        </aside>
      </form>
    </main>
  );
};

export default CheckoutPage;
