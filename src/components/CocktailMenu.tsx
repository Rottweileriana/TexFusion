import { useState, useEffect } from "./index";
import CocktailComponent from "./CocktailComponent";
import styled from "styled-components";

type CocktailToFetch = {
  id: number;
  price: number;
};

type Cocktail = {
  idDrink: string;
  strDrink: string;
  strAlcoholic: string;
  strDrinkThumb: string;
  cocktailPrice: number;
};

const CocktailMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 160px;
`;

const CocktailContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

const MenuTitle = styled.h2`
  margin-bottom: 20px;
  font-family: "Open Sans";
  font-weight: 300;
  font-size: 25px;
  text-decoration: none;
  color: lightgrey;
`;

export function CocktailMenu() {
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);

  useEffect(() => {
    const cocktailsToFetch: CocktailToFetch[] = [
      { id: 11007, price: 175 },
      { id: 178365, price: 159 },
      { id: 13621, price: 165 },
      { id: 11003, price: 170 },
      { id: 11001, price: 150 },
      { id: 12370, price: 149 },
    ];

    const fetchCocktails = async () => {
      try {
        const fetchPromises: Promise<Response>[] = cocktailsToFetch.map(
          (cocktail) =>
            fetch(
              `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktail.id}`
            )
        );

        const responses = await Promise.all(fetchPromises);
        const fetchedCocktails: Cocktail[] = [];

        for (const response of responses) {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          if (data && data.drinks && data.drinks.length > 0) {
            fetchedCocktails.push(data.drinks[0]);
          }
        }

        // Loopar igenom varje cocktail och tilldela cocktailPrice från cocktailsToFetch
        const cocktailsWithPrices = fetchedCocktails.map(
          (cocktail: Cocktail, index: number) => ({
            ...cocktail,
            cocktailPrice: cocktailsToFetch[index].price,
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
    };
  }, []);

  return (
    <>
      <CocktailMenuContainer>
        <MenuTitle>COCKTAILS</MenuTitle>
        <CocktailContainer>
          {cocktails.map((cocktail) => (
            <CocktailComponent
              key={cocktail.idDrink}
              idDrink={cocktail.idDrink}
              strDrinkThumb={cocktail.strDrinkThumb}
              strDrink={cocktail.strDrink}
              cocktailPrice={cocktail.cocktailPrice}
            />
          ))}
        </CocktailContainer>
      </CocktailMenuContainer>
    </>
  );
}
