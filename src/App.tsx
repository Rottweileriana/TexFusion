import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './components/context';
import { CourseMenu, CocktailMenu, SidesMenu, NavBarComponent, ShoppingCart } from "./components/index";
import React, {useRef} from 'react'
import styled, { createGlobalStyle } from "styled-components";
import "./App.css";

const ResetStyles = createGlobalStyle`
  html, body, #root {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
  }
`;

const MainComponent = styled.div`
display: flex;
flex-direction: column;
align-items: center; /* Centrerar innehållet horisontellt */
padding-top: 50px;
`;

const App: React.FC = () => {

  return (
    <>
    <ResetStyles />
        <CartProvider>
          <Router>
            <NavBarComponent />
            <MainComponent>
              <Routes>
                <Route path="/Huvudrätt" element={<CourseMenu />} />
                <Route path="/SidesMenu" element={<SidesMenu />} />
                <Route path="/CocktailMenu" element={<CocktailMenu />} />
                <Route path="/ShoppingCart" element={<ShoppingCart />} />
              </Routes>
            </MainComponent>
          </Router>
        </CartProvider>
    </>
  );
}

export default App;
