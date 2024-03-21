import React, { useState, useEffect } from "react";
import CocktailComponent from "./CocktailComponent";

type Cocktail = {
  idDrink: string;
  strDrink: string;
  strAlcoholic: string;
  strDrinkThumb: string;
};

export function CocktailMenu() {
  const [recCocktail, setRecCocktail] = useState<Cocktail | undefined | any>(undefined);
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);

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
        setCocktails(firstTenCocktails);
      } catch (error) {
        console.error("Error fetching cocktails:", error);
      }
    };

    fetchRecCocktail();
    fetchCocktails();

    return () => {
      setRecCocktail(undefined);
      setCocktails([]);
    };
  }, []);

  return (
    <>
      <h2>Cocktail</h2>
      {recCocktail !== undefined && (
        <CocktailComponent
          strDrinkThumb={recCocktail.strDrinkThumb}
          strDrink={recCocktail.strDrink}
          recommended="Rekommenderad"
        /> //Rekommendation används bara när visa tillval av dryck efter vald huvudrätt(?)
      )}
      {cocktails.map(cocktail => (
        <CocktailComponent
          key={cocktail.idDrink}
          strDrinkThumb={cocktail.strDrinkThumb}
          strDrink={cocktail.strDrink}
        />
      ))}
    </>
  );
}
