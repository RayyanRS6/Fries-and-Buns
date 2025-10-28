import Hero from "@/components/common/Hero";
import SEO from "@/components/common/SEO";
import { menuItems } from "@/data/menu";
import MenuGrid from "@/components/menu/MenuGrid";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { addItem } = useCart();
  const { toast } = useToast();
  const featured = menuItems.slice(0, 4);

  return (
    <main>
      <SEO title="Fries & Buns — Online Food Delivery" description="Order hot pizzas, juicy burgers, crispy chicken and sides. Fast delivery, fresh taste." />
      <Hero />
      <section className="container mx-auto space-y-4 px-4 py-10">
        <h2 className="text-2xl font-bold">Popular Picks</h2>
        <p className="text-muted-foreground">Fan favorites you can’t miss.</p>
        <MenuGrid
          items={featured}
          onAddToCart={(item, variant) => {
            addItem(item, 1, variant);
            toast({ title: "Added to cart", description: `${item.name}${variant ? ` (${variant.label})` : ""} added to cart.` });
          }}
        />
      </section>
    </main>
  );
};

export default Index;
