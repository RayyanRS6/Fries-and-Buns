import Hero from "@/components/common/Hero";
import SEO from "@/components/common/SEO";
import MenuGrid from "@/components/menu/MenuGrid";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";

const fetchDeals = async () => {
  const res = await fetch("http://localhost:5000");
  if (!res.ok) throw new Error("Failed to fetch deals");
  return res.json();
};

const Index = () => {
  const { addItem } = useCart();
  const { toast } = useToast();

  // Fetch deals
  const { data: deals = [], isLoading, error } = useQuery({
    queryKey: ["deals"],
    queryFn: fetchDeals,
  });

  // Take first 4 items as "featured"
  const featured = deals.slice(0, 4);

  const onAdd = (item: any, variant?: any) => {
    addItem(item, 1, variant);
    toast({
      title: "Added to cart",
      description: `${item.name}${variant ? ` (${variant.label})` : ""} added to cart.`,
    });
  };

  return (
    <main>
      <SEO
        title="Fries & Buns — Online Food Delivery"
        description="Order hot pizzas, juicy burgers, crispy chicken and sides. Fast delivery, fresh taste."
      />
      <Hero />

      <section className="container mx-auto space-y-4 px-4 py-10">
        <h2 className="text-2xl font-bold">Popular Picks</h2>
        <p className="text-muted-foreground">Fan favorites you can’t miss.</p>

        {isLoading ? (
          <p>Loading popular items...</p>
        ) : error ? (
          <p className="text-red-500">Failed to load popular items.</p>
        ) : (
          <MenuGrid items={featured} onAddToCart={onAdd} />
        )}
      </section>
    </main>
  );
};

export default Index;
