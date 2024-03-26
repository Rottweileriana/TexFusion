import React, { createContext, useState, ReactNode, useEffect } from "react";
import { CartItem } from "../types/index";

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: CartItem) => void;
  removeFromCart: (_id: string, deleteProdFromCart?: boolean) => void;
};

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: CartItem) => {
    const existingProductIndex = cart.findIndex(
      (item) => item._id === product._id
    );

    if (existingProductIndex !== -1) {
      const updatedCart = cart.map((item, index) => {
        if (index === existingProductIndex) {
          // Kontrollera om kvantiteten överstiger 99, om ja, sätt till 99
          const newQuantity = Math.min(item.quantity + 1, 99);
          return {
            ...item,
            quantity: newQuantity,
          };
        }
        return item;
      });
      setCart(updatedCart);
    } else {
      // Om produkten inte finns, lägg till den som ett nytt objekt
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (_id: string, deleteProdFromCart: boolean = false) => {
    // Hitta produkten med det angivna _id
    const productToRemove = cart.find((item) => item._id === _id);
    if (productToRemove) {
      // Minska kvantiteten med ett om den är större än 1
      if (productToRemove.quantity > 1 && !deleteProdFromCart) {
        const updatedCart = cart.map((item) =>
          item._id === _id ? { ...item, quantity: item.quantity - 1 } : item
        );
        setCart(updatedCart);
      } else {
        // Ta bort produkten från kundvagnen om kvantiteten är 1 eller deleteProdFromCart är sant
        const updatedCart = cart.filter((item) => item._id !== _id);
        setCart(updatedCart);
      }
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
