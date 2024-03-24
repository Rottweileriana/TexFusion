import React from 'react';
import { CartProvider } from './components/context';
import "./App.css";
import { CourseMenu, CocktailMenu, SidesMenu, ShoppingCart } from "./components/index";


const App: React.FC = () => {
  return (
    <>
      <CartProvider>
        <CourseMenu />
        <SidesMenu />
        <CocktailMenu />
        <ShoppingCart />
      </CartProvider>
    </>
  );
}

export default App;
