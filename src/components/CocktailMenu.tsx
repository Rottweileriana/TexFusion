import { useState, useEffect } from "./index";
import CocktailComponent from "./CocktailComponent";

type Cocktail = {
  idDrink: string;
  strDrink: string;
  strAlcoholic: string;
  strDrinkThumb: string;
  cocktailPrice: number;
};

export function CocktailMenu() {
  const [recCocktail, setRecCocktail] = useState<Cocktail | undefined | any>(undefined);
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);
  const [cocktailPrices, setCocktailPrices] = useState<number[]>([
    180, 170, 175, 180, 150, 165, 155, 170, 160, 180
  ]);

  const API_URL = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
  const API_URL_2 = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic";

  useEffect(() => {
    const fetchRecCocktail = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setRecCocktail(data.drinks[0]);
      } catch (error) {
        console.error("Error fetching cocktail:", error);
      }
    };

    const fetchCocktails = async () => {
      try {
        const response = await fetch(API_URL_2);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const firstTenCocktails = data.drinks ? data.drinks.slice(0, 10) : [];
        // Loopar igenom varje cocktail och tilldela cocktailPrice från cocktailPrices
        const cocktailsWithPrices = firstTenCocktails.map((cocktail: Cocktail, index: number) => ({
          ...cocktail,
          cocktailPrice: cocktailPrices[index]
        }));
        setCocktails(cocktailsWithPrices);
      } catch (error) {
        console.error("Error fetching cocktails:", error);
      }
    };

    fetchRecCocktail();
    fetchCocktails();

    return () => {
      setRecCocktail(undefined);
      setCocktails([]);
      setCocktailPrices([]);
    };
  }, []);

  return (
    <>
      <h2>COCKTAIL</h2>
      {recCocktail !== undefined && (
        <CocktailComponent
          idDrink={recCocktail.idDrink}
          strDrinkThumb={recCocktail.strDrinkThumb}
          strDrink={recCocktail.strDrink}
          recommended="Rekommenderad"
          cocktailPrice={160}
        />
      )}
      {cocktails.map((cocktail) => (
        <CocktailComponent
          key={cocktail.idDrink}
          idDrink={cocktail.idDrink}
          strDrinkThumb={cocktail.strDrinkThumb}
          strDrink={cocktail.strDrink}
          cocktailPrice={cocktail.cocktailPrice}
        />
      ))}
    </>
  );
}
