import { useEffect, useState } from "react";

type Meal = {
  title: string;
  description: string;
  imageUrl: string;
  categories: string[];
  avgRating: number;
};

//call recipe-API to get the toast-recipe
export const Meal = () => {
  const [recepies, setRecepies] = useState<Meal>();

  useEffect(() => {
    fetch(
      "https://iths-2024-recept-grupp6-bc215j.reky.se/recipes/65f466c7a6ed7582004245cf"
    )
      .then((res) => res.json())
      .then((data) => setRecepies(data));
  }, []);
  return (
    <>
      <p>Title: {recepies && recepies.title}</p>
      <p>Description: {recepies && recepies.description}</p>
      <p>Rating: {recepies && recepies.avgRating}</p>
      <img src={recepies && recepies.imageUrl}></img>
    </>
  );
};
