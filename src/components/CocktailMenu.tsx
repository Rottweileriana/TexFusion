import { useState, useEffect } from "./index";
import CocktailComponent from "./CocktailComponent";
import styled from "styled-components";

type Cocktail = {
  idDrink: string;
  strDrink: string;
  strAlcoholic: string;
  strDrinkThumb: string;
  cocktailPrice: number;
};

const MenuTitle = styled.h2`
  margin-top: 40px;
  margin-bottom: 15px;
`;
export function CocktailMenu() {
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);
  const [cocktailPrices, setCocktailPrices] = useState<number[]>([
    180, 170, 175, 180, 150, 165, 155, 170, 160, 180,
  ]);

  const API_URL =
    "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic";

  useEffect(() => {
    const fetchCocktails = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const firstTenCocktails = data.drinks ? data.drinks.slice(0, 10) : [];
        // Loopar igenom varje cocktail och tilldela cocktailPrice från cocktailPrices
        const cocktailsWithPrices = firstTenCocktails.map(
          (cocktail: Cocktail, index: number) => ({
            ...cocktail,
            cocktailPrice: cocktailPrices[index],
          })
        );
        setCocktails(cocktailsWithPrices);
      } catch (error) {
        console.error("Error fetching cocktails:", error);
      }
    };

    fetchCocktails();

    return () => {
      setCocktails([]);
      setCocktailPrices([]);
    };
  }, []);

  return (
    <>
      <MenuTitle>Cocktail</MenuTitle>
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
