import React, { createContext, useContext, useMemo, useReducer } from "react";
import type { MenuItem, MenuItemVariant } from "@/data/menu";

export type CartItem = MenuItem & {
  quantity: number;
  selectedVariant?: MenuItemVariant;
};

interface CartState {
  items: CartItem[];
}

type Action =
  | { type: "ADD"; item: MenuItem; quantity?: number; variant?: MenuItemVariant }
  | { type: "REMOVE"; id: string }
  | { type: "SET_QTY"; id: string; quantity: number }
  | { type: "CLEAR" };

const CartContext = createContext<{
  items: CartItem[];
  addItem: (item: MenuItem, quantity?: number, variant?: MenuItemVariant) => void;
  removeItem: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalQty: number;
  subtotal: number;
} | null>(null);

function reducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case "ADD": {
      const qty = action.quantity ?? 1;
      const keyId = action.variant ? `${action.item.id}__${action.variant.id}` : action.item.id;
      const existing = state.items.find((i) => i.id === keyId);
      let items: CartItem[];
      if (existing) {
        items = state.items.map((i) =>
          i.id === keyId ? { ...i, quantity: i.quantity + qty } : i
        );
      } else {
        const price = action.variant ? action.variant.price : action.item.price;
        items = [
          ...state.items,
          {
            ...action.item,
            id: keyId,
            price,
            quantity: qty,
            selectedVariant: action.variant,
          },
        ];
      }
      return { items };
    }
    case "REMOVE":
      return { items: state.items.filter((i) => i.id !== action.id) };
    case "SET_QTY":
      return {
        items: state.items
          .map((i) => (i.id === action.id ? { ...i, quantity: action.quantity } : i))
          .filter((i) => i.quantity > 0),
      };
    case "CLEAR":
      return { items: [] };
    default:
      return state;
  }
}

export const CartProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { items: [] });

  const value = useMemo(() => {
    const subtotal = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const totalQty = state.items.reduce((sum, i) => sum + i.quantity, 0);

    return {
      items: state.items,
      addItem: (item: MenuItem, quantity?: number, variant?: MenuItemVariant) =>
        dispatch({ type: "ADD", item, quantity, variant }),
      removeItem: (id: string) => dispatch({ type: "REMOVE", id }),
      setQuantity: (id: string, quantity: number) =>
        dispatch({ type: "SET_QTY", id, quantity }),
      clearCart: () => dispatch({ type: "CLEAR" }),
      subtotal,
      totalQty,
    };
  }, [state.items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
