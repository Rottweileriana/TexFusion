import { useEffect, useState } from "react";

//type FoodRecepies = { recepiename: string };

//call recipe-API to get the toast-recipe
export const Meal = () => {
  const [recepies, setRecepies] = useState<any>();

  useEffect(() => {
    fetch(
      "https://iths-2024-recept-grupp6-bc215j.reky.se/recipes/65f466c7a6ed7582004245cf"
    )
      .then((res) => res.json())
      .then((data) => setRecepies(data));
  }, []);
  return <p>{recepies && recepies.title}</p>;
};
