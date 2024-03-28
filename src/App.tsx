import { CartProvider } from "./components/context";
import {
  CourseMenu,
  CocktailMenu,
  SidesMenu,
  NavBarComponent,
  ShoppingCart,
  CheckoutForm,
  ConfirmationPage,
  ErrorPage,
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
    <CartProvider>
      <Routes>
        <Route path="/" element={
          <>
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
          </>
        }></Route>
        <Route path="/ConfirmationPage" element={<ConfirmationPage />}></Route>
        <Route path="*" element={<ErrorPage/>}></Route>
      </Routes>
      </CartProvider>
    </BrowserRouter>
      
    </>
  );
};

export default App;
