import { Button } from "@/components/ui/button";
import type { Category } from "@/data/menu";

interface Props {
  categories: Category[];
  active: Category | "All";
  onChange: (cat: Category | "All") => void;
}

const CategoryFilter = ({ categories, active, onChange }: Props) => {
  const all: (Category | "All")[] = ["All", ...categories];
  return (
    <div className="container mx-auto px-4">
      <div className="flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide">
        {all.map((cat) => (
          <Button
            key={cat}
            variant={active === cat ? "secondary" : "outline"}
            onClick={() => onChange(cat)}
          >
            {cat}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
