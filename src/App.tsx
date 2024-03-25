import { CartProvider } from './components/context';
import { CourseMenu, CocktailMenu, SidesMenu, NavBarComponent, ShoppingCart } from "./components/index";
import React, {useRef} from 'react'
import "./App.css";


const App: React.FC = () => {


  return (
    <>
      <CartProvider>
        <NavBarComponent />
          <div>
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
          </div>
      </CartProvider>
    </>
  );
}

export default App;
