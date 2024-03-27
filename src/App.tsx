import { CartProvider } from "./components/context";
import {
  CourseMenu,
  CocktailMenu,
  SidesMenu,
  NavBarComponent,
  ShoppingCart,
  CheckoutForm,
  ConfirmationPage,
} from "./components/index";
import React from "react";
import styled from "styled-components";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import "./App.css";

const MainComponent = styled.div`
  padding-top: 20px;
`;

const App: React.FC = () => {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CartProvider>
          <NavBarComponent />
          <MainComponent>
            <div id="CourseMenu">
              <CourseMenu />
            </div>
            <div id="SidesMenu">
              <SidesMenu />
            </div>
            <div id="CocktailMenu">
              <CocktailMenu />
            </div>
            <div id="ShoppingCart">
              <ShoppingCart />
            </div>
            <div>
              <CheckoutForm />
            </div>
          </MainComponent>
        </CartProvider>}></Route>
        <Route path="/ConfirmationPage" element={<ConfirmationPage />}></Route>
      </Routes>
    </BrowserRouter>
      
    </>
  );
};

export default App;
