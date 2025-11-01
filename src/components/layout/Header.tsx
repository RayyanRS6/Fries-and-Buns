import { Link, NavLink } from "react-router-dom";
import { ShoppingCart, LogIn, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/hooks/useAuth";

const Header = () => {
  const { totalQty } = useCart();
  const { user, isAdmin } = useAuth();

  return (
    <header className="fixed top-4 left-0 right-0 z-50 w-full bg-transparent pointer-events-none">
      <div className="container mx-auto px-4">
        <div
          className="flex h-14 items-center justify-between gap-4 rounded-full bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 pointer-events-auto"
          style={{ boxShadow: "inset 0 1px 2px #ffffff70, 0 4px 6px #00000030, 0 6px 10px #00000015" }}
        >
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight">Fries & Buns</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <NavLink to="/menu" className={({isActive}) => isActive ? "text-primary" : "text-muted-foreground hover:text-foreground motion-smooth"}>Menu</NavLink>
          <a href="#deals" className="text-muted-foreground hover:text-foreground motion-smooth">Deals</a>
          <a href="#contact" className="text-muted-foreground hover:text-foreground motion-smooth">Contact</a>
        </nav>
        <div className="flex items-center gap-3">
          {isAdmin && (
            <Link to="/admin/dashboard">
              <Button variant="outline" size="icon">
                <LayoutDashboard />
              </Button>
            </Link>
          )}
          <Link to="/cart">
            <Button variant="outline" className="relative">
              <ShoppingCart />
              Cart
              {totalQty > 0 && (
                <span className="absolute -right-2 -top-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-xs font-semibold text-primary-foreground">
                  {totalQty}
                </span>
              )}
            </Button>
          </Link>
          {user ? (
            <Link to="/menu">
              <Button variant="hero">Order Now</Button>
            </Link>
          ) : (
            <Link to="/auth">
              <Button variant="outline">
                <LogIn />
                Login
              </Button>
            </Link>
          )}
        </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
