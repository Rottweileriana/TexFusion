import { useEffect, useState } from "react";

type Cocktail = {
  idDrink: string;
  strDrink: string;
  strAlcoholic: string;
  strDrinkThumb: string;
};

type Result = {
  cocktails: Cocktail[];
};

//call recipe-API to get the toast-recipe
export const Cocktail = () => {
  const [cocktails, setCocktails] = useState<Result>();
  //const [cocktail, setCocktail] = useState<Cocktail>();

  useEffect(() => {
    fetch("www.thecocktaildb.com/api/json/v1/1/random.php")
      .then((res) => res.json())
      .then((data) => setCocktails(data));
  }, []);
  //const cocktail = cocktails?.cocktails[0];
  return (
    <>
      <p>Id: {cocktail && cocktail.idDrink}</p>
      <p>Drink: {cocktail && cocktail.strDrink}</p>
      <p>Type: {cocktail && cocktail.strAlcoholic}</p>
      <img src={cocktail && cocktail.strDrinkThumb}></img>
    </>
  );
};
