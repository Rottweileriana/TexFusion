import React, { createContext, useState, ReactNode } from 'react';

type CartItem = {
  imageUrl: string;
  title: string;
  price: number;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: CartItem) => void;
  removeFromCart: (index: number) => void;
};

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: CartItem) => {
    const existingProductIndex = cart.findIndex(item => item.title === product.title);

    if (existingProductIndex !== -1) {
      // Om produkten redan finns, öka dess kvantitet med 1
      const updatedCart = cart.map((item, index) => {
        if (index === existingProductIndex) {
          return {
            ...item,
            quantity: item.quantity + 1
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

  const removeFromCart = (index: number) => {
    const newCart = [...cart];
    const itemToRemove = newCart[index];

    if (itemToRemove.quantity > 1) {
      // Om kvantiteten är större än ett, minska kvantiteten med ett
      itemToRemove.quantity -= 1;
    } else {
      // Om kvantiteten är ett, ta bort produkten från kundvagnen
      newCart.splice(index, 1);
    }

    setCart(newCart);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
