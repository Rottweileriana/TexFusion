import { CourseMenu, CocktailMenu, SidesMenu, NavBarComponent } from "./components/index";
import React, {useRef} from 'react'
import "./App.css";

function App() {

  const CourseMenuRef = useRef(null);
  const SidesMenuRef = useRef(null);
  const CocktailMenuRef = useRef(null);

  const scrollToRef = (ref) => {
    switch (ref) {
      case 'CourseMenu':
        CourseMenuRef.current.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'SidesMenu':
        SidesMenuRef.current.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'CocktailMenu':
        CocktailMenuRef.current.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'ShoppingCart':
        contactRef.current.scrollIntoView({ behavior: 'smooth' });
        break;
      default:
        break;
    }
  };

  return (
    <>
    <div>
    <NavBarComponent scrollToRef={scrollToRef}/>
      <div ref={CourseMenuRef}>
        <CourseMenu  />
      </div>
      <div ref={SidesMenuRef}>
        <SidesMenu />
      </div>
      <div ref={CocktailMenuRef}>
        <CocktailMenu />
      </div>
    </div>
    </>
  );
}

export default App;
