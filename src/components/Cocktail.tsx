import { useEffect, useState } from "react";

// Används inte!.

type Cocktail = {
  idDrink: string;
  strDrink: string;
  strAlcoholic: string;
  strDrinkThumb: string;
};

type Result = {
  drinks: Cocktail[];
};

//call recipe-API to get a cocktail by id
export const Cocktail = () => {
  const [cocktails, setCocktails] = useState<Result>();

  useEffect(() => {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11001")
      .then((res) => res.json())
      .then((data) => setCocktails(data));
  }, []);
  const cocktail = cocktails?.drinks[0];
  return (
    <>
      <p>Id: {cocktail && cocktail.idDrink}</p>
      <p>Drink: {cocktail && cocktail.strDrink}</p>
      <p>Type: {cocktail && cocktail.strAlcoholic}</p>
      <img src={cocktail && cocktail.strDrinkThumb}></img>
    </>
  );
};
