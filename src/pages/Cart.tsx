import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/CartContext";
import SEO from "@/components/common/SEO";
import { Link } from "react-router-dom";
const CartPage = () => {
  const { items, setQuantity, removeItem, subtotal } = useCart();

  return (
    <main className="container mx-auto space-y-6 px-4 py-8">
      <SEO title="Your Cart | Fries & Buns" description="Review your Fries & Buns order and proceed to fast checkout." />
      <h1 className="text-3xl font-bold">Your Cart</h1>
      {items.length === 0 ? (
        <p className="text-muted-foreground">Your cart is empty.</p>
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            {items.map((i) => (
              <div key={i.id} className="flex items-center gap-4 rounded-lg border p-4">
                <img src={i.image} alt={i.name} className="h-16 w-16 rounded object-cover" />
                <div className="flex-1">
                  <p className="font-medium">{i.name}{i.selectedVariant ? ` — ${i.selectedVariant.label}` : ""}</p>
                  <p className="text-sm text-muted-foreground">Rs. {i.price.toFixed(0)}/-</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" onClick={() => setQuantity(i.id, Math.max(0, i.quantity - 1))}>-</Button>
                  <Input
                    type="number"
                    min={0}
                    value={i.quantity}
                    onChange={(e) => setQuantity(i.id, Math.max(0, Number(e.target.value)))}
                    className="w-16 text-center"
                  />
                  <Button variant="outline" onClick={() => setQuantity(i.id, i.quantity + 1)}>+</Button>
                </div>
                <Button variant="ghost" onClick={() => removeItem(i.id)}>Remove</Button>
              </div>
            ))}
          </div>
          <aside className="rounded-lg border p-4">
            <h2 className="mb-2 text-xl font-semibold">Order Summary</h2>
            <div className="flex items-center justify-between py-2">
              <span>Subtotal</span>
              <span className="font-semibold">Rs. {subtotal.toFixed(0)}/-</span>
            </div>
            <p className="text-sm text-muted-foreground">Delivery calculated at checkout.</p>
            <div className="mt-4">
              <Link to="/checkout">
                <Button variant="hero" className="w-full">Proceed to Checkout</Button>
              </Link>
            </div>
          </aside>
        </div>
      )}
    </main>
  );
};

export default CartPage;
