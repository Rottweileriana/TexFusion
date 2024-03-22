import React, { createContext, useContext, useState, ReactNode } from "react";

// Define your context
type CartContextType = {
  addToCart: () => void;
  removeFromCart: () => void;
};

export const CartContext = createContext<CartContextType | undefined>(undefined);

// Define your provider
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<number>(0);

  const addToCart = () => {
    setCartItems((prevCount) => prevCount + 1);
  };

  const removeFromCart = () => {
    setCartItems((prevCount) => prevCount - 1);
  };

  return (
    <CartContext.Provider value={{ addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Define a custom hook to consume the context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};