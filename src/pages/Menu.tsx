  import { useMemo, useState } from "react";
  import { Input } from "@/components/ui/input";
  import { useToast } from "@/hooks/use-toast";
  import { categories, type Category } from "@/data/menu";
  import MenuGrid from "@/components/menu/MenuGrid";
  import CategoryFilter from "@/components/menu/CategoryFilter";
  import { useCart } from "@/context/CartContext";
  import SEO from "@/components/common/SEO";
  import { useQuery } from "@tanstack/react-query";

  const fetchDeals = async () => {
    const res = await fetch("http://localhost:5000/api/deals");
    if (!res.ok) throw new Error("Failed to fetch deals");
    return res.json();
  };

  const Menu = () => {
    const [active, setActive] = useState<Category | "All">("All");
    const [query, setQuery] = useState("");
    const { addItem } = useCart();
    const { toast } = useToast();

    const { data: deals = [], isLoading, error } = useQuery({
      queryKey: ["deals"],
      queryFn: fetchDeals,
    });

    const filtered = useMemo(() => {
      return deals.filter((item: any) => {
        const matchCat = active === "All" || item.category === active;
        const matchQ = item.name.toLowerCase().includes(query.toLowerCase());
        return matchCat && matchQ;
      });
    }, [active, query, deals]);

    const onAdd = (item: any) => {
      addItem(item, 1);
      toast({
        title: "Added to cart",
        description: `${item.name} added to cart.`,
      });
    };

    if (isLoading) return <p className="p-6">Loading menu...</p>;
    if (error) return <p className="p-6 text-red-500">Failed to load menu.</p>;

    return (
      <main className="space-y-6 py-8 pt-24">
        <SEO title="Menu | Fries & Buns" description="Browse our delicious menu deals." />
        <section className="container mx-auto px-4">
          <h1 className="mb-2 text-3xl font-bold">Our Menu</h1>
          <p className="text-muted-foreground">Fresh, fast, and made to order.</p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Input
              placeholder="Search menu..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="max-w-md"
            />
          </div>
        </section>

        <CategoryFilter categories={categories} active={active} onChange={setActive} />
        <MenuGrid items={filtered} onAddToCart={onAdd} />
      </main>
    );
  };

  export default Menu;
    