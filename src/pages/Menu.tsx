import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { categories, menuItems, type MenuItem, type Category, type MenuItemVariant } from "@/data/menu";
import MenuGrid from "@/components/menu/MenuGrid";
import CategoryFilter from "@/components/menu/CategoryFilter";
import { useCart } from "@/context/CartContext";
import SEO from "@/components/common/SEO";

const MenuPage = () => {
  const [active, setActive] = useState<Category | "All">("All");
  const [query, setQuery] = useState("");
  const { addItem } = useCart();
  const { toast } = useToast();

  const filtered = useMemo(() => {
    return menuItems.filter((i) => {
      const matchCat = active === "All" || i.category === active;
      const matchQ = i.name.toLowerCase().includes(query.toLowerCase());
      return matchCat && matchQ;
    });
  }, [active, query]);

  const onAdd = (item: MenuItem, variant?: MenuItemVariant) => {
    addItem(item, 1, variant);
    toast({ title: "Added to cart", description: `${item.name}${variant ? ` (${variant.label})` : ""} added to cart.` });
  };

  return (
    <main className="space-y-6 py-8 pt-24">
      <SEO
        title="Menu | Fries & Buns — Pizzas, Burgers, Chicken, Sides"
        description="Explore Fries & Buns' full menu of pizzas, burgers, crispy chicken, and sides. Order online with fast checkout."
      />
      <section className="container mx-auto px-4">
        <h1 className="mb-2 text-3xl font-bold">Our Menu</h1>
        <p className="text-muted-foreground">Fresh, fast, and made to order.</p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Input
            placeholder="Search for pizza, burger, chicken..."
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

export default MenuPage;
