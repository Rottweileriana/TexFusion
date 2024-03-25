import { CartProvider } from "./components/context";
import {
  CourseMenu,
  CocktailMenu,
  SidesMenu,
  NavBarComponent,
  ShoppingCart,
  CheckoutForm,
} from "./components/index";
import React, { useRef } from "react";
import "./App.css";

const App: React.FC = () => {
  const CourseMenuRef = useRef(null);
  const SidesMenuRef = useRef(null);
  const CocktailMenuRef = useRef(null);

  const scrollToRef = (ref) => {
    switch (ref) {
      case "CourseMenu":
        CourseMenuRef.current.scrollIntoView({ behavior: "smooth" });
        break;
      case "SidesMenu":
        SidesMenuRef.current.scrollIntoView({ behavior: "smooth" });
        break;
      case "CocktailMenu":
        CocktailMenuRef.current.scrollIntoView({ behavior: "smooth" });
        break;
      case "ShoppingCart":
        contactRef.current.scrollIntoView({ behavior: "smooth" });
        break;
      default:
        break;
    }
  };

  return (
    <>
      <CartProvider>
        <div>
          <NavBarComponent scrollToRef={scrollToRef} />
          <div ref={CourseMenuRef}>
            <CourseMenu />
          </div>
          <div ref={SidesMenuRef}>
            <SidesMenu />
          </div>
          <div ref={CocktailMenuRef}>
            <CocktailMenu />
          </div>
          <div>
            <ShoppingCart />
          </div>
          <div>
            <CheckoutForm />
          </div>
        </div>
      </CartProvider>
    </>
  );
};

export default App;
