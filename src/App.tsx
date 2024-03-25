import { CartProvider } from './components/context';
import { CourseMenu, CocktailMenu, SidesMenu, NavBarComponent, ShoppingCart } from "./components/index";
import React, {useRef} from 'react'
import styled from "styled-components";
import "./App.css";

const MainComponent = styled.div`
  padding-top: 20px;
`;

const App: React.FC = () => {

  return (
    <>
      <CartProvider>
        <NavBarComponent />
          <MainComponent>
            <div id="CourseMenu">
             <CourseMenu  />
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
          </MainComponent>
      </CartProvider>
    </>
  );
}

export default App;
