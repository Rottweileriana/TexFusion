import { CourseMenu, CocktailMenu, SidesMenu, ShoppingCart } from "./components/index";
import { useState, useContext, createContext} from 'react';
import React from 'react';
import { CartProvider } from './components/context';
import "./App.css";


// function App() {

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
