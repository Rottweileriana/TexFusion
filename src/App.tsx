import { MenuComponent, Cocktail } from "./components/index";
import "./App.css";

function App() {
  return (
    <>
      <MenuComponent />
      <h3>Cocktail from API:</h3>
      <div>
        <Cocktail></Cocktail>
      </div>
    </>
  );
}

export default App;
