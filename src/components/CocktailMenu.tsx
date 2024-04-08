import { useState, useEffect } from "./index";
import CocktailComponent from "./CocktailComponent";
import styled from "styled-components";

type CocktailToFetch = {
  id: number;
  price: number;
}

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
  const [cocktailPrice, setCocktailPrice] = useState<number>(0);
  const cocktailsToFetch: CocktailToFetch[] = [
    {id: 11007, price: 175},
    {id: 178365, price: 159},
    {id: 13621, price: 165},
    {id: 11003, price: 170},
    {id: 11001, price: 150},
 ];

 // const API_URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktail.id}`;

  useEffect(() => {

      const fetchCocktails = async () => {
        try {

          cocktailsToFetch.forEach(async cocktail => {

            const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktail.id}`);
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            const data = await response.json();
            if (data && data.drinks && data.drinks.length > 0) {
              setCocktails(data.drinks[0]);
            }
          });
        } 
        catch (error) {
          console.error("Error fetching cocktails:", error);
        }
      
    };

      fetchCocktails();

    return () => {
      setCocktails([]);
    };
  }, []);


  

  // const API_URL_1 =
  //   "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic";

  // useEffect(() => {
  //   const fetchCocktails = async () => {
  //     try {
  //       const response = await fetch(API_URL);
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       const data = await response.json();
  //       const firstTenCocktails = data.drinks ? data.drinks.slice(0, 10) : [];
  //       // Loopar igenom varje cocktail och tilldela cocktailPrice från cocktailPrices
  //       const cocktailsWithPrices = firstTenCocktails.map(
  //         (cocktail: Cocktail, index: number) => ({
  //           ...cocktail,
  //           cocktailPrice: cocktailPrices[index],
  //         })
  //       );
  //       setCocktails(cocktailsWithPrices);
  //     } catch (error) {
  //       console.error("Error fetching cocktails:", error);
  //     }
  //   };

  //   fetchCocktails();

  //   return () => {
  //     setCocktails([]);
  //     setCocktailPrices([]);
  //   };
  // }, []);

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
