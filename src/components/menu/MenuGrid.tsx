import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { MenuItem, MenuItemVariant } from "@/data/menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

interface MenuGridProps {
  items: MenuItem[];
  onAddToCart: (item: MenuItem, variant?: MenuItemVariant) => void;
}

const MenuGrid = ({ items, onAddToCart }: MenuGridProps) => {
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});

  return (
    <section className="container mx-auto px-4">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((item) => {
          const hasVariants = item.variants && item.variants.length > 0;
          const defaultId = hasVariants ? item.variants![0].id : undefined;
          const selectedId = selectedVariants[item.id] ?? defaultId;
          const selectedVariant: MenuItemVariant | undefined = hasVariants
            ? item.variants!.find((v) => v.id === selectedId)
            : undefined;

          const priceToShow = selectedVariant?.price ?? item.price;

          return (
          <Card key={item.id} className="group overflow-hidden transition-transform motion-smooth hover:-translate-y-0.5">
            <img
              src={item.image}
              alt={`${item.name} — ${item.description}`}
              className="h-44 w-full object-cover"
              loading="lazy"
            />
            <CardHeader>
              <CardTitle className="text-xl">{item.name}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              {hasVariants && (
                <div className="mb-3">
                  <Select value={selectedId} onValueChange={(v) => setSelectedVariants((prev) => ({ ...prev, [item.id]: v }))}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose size" />
                    </SelectTrigger>
                    <SelectContent>
                      {item.variants!.map((v) => (
                        <SelectItem key={v.id} value={v.id}>{v.label} — Rs. {v.price}/-</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              <p className="text-lg font-semibold">Rs. {priceToShow.toFixed(0)}/-</p>
            </CardContent>
            <CardFooter>
              <Button
                variant="hero"
                className="w-full"
                onClick={() => onAddToCart(item, selectedVariant)}
              >
                Add to cart
              </Button>
            </CardFooter>
          </Card>
        );})}
      </div>
    </section>
  );
};

export default MenuGrid;
