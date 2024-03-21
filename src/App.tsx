import { CourseMenu, CocktailMenu, SidesMenu, Cocktail } from "./components/index";
import "./App.css";

function App() {
  return (
    <>
      <CourseMenu />
      <SidesMenu />
      <CocktailMenu />
      {/* <h3>Cocktail from API:</h3>
      <div>
        <Cocktail></Cocktail>
      </div> */}
    </>
  );
}

export default App;
