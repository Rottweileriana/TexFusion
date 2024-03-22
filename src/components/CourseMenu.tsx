import { useState, useEffect } from "react";
import CourseComponent from "./CourseComponent";
import { Dish } from "../types/index";

//Lägg in villkor för att bara hämta/visa recept för main courses (ej sides)

//https://iths-2024-recept-grupp6-bc215j.reky.se/categories/main/recipes
export function CourseMenu() {
  const [recipes, setRecipes] = useState<Dish[]>([]);
  const API_URL =
    "https://iths-2024-recept-grupp6-bc215j.reky.se/categories/main/recipes";

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    fetchRecipes();

    return () => {
      setRecipes([]);
    };
  }, []);

  return (
    <>
      <h2>HUVUDRÄTT</h2>
      {recipes &&
        recipes.map(
          (recipe) =>
            recipe.title &&
            recipe.title.trim() !== "" && (
              <CourseComponent
                key={recipe._id}
                imageUrl={recipe.imageUrl}
                title={recipe.title}
                ingredients={recipe.ingredients}
                price={recipe.timeInMins}
              />
            )
        )}
    </>
  );
}
