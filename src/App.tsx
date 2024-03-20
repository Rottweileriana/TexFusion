import { Meal, Cocktail } from "./components/index";
import "./App.css";

function App() {
  return (
    <>
    <MenuComponent/>
      <h3>Recipe from API:</h3>
      <div>
        <Meal></Meal>
      </div>
      <h3>Cocktail from API:</h3>
      <div>
        <Cocktail></Cocktail>
      </div>
    </>
  );
}

export default App;
