import { useState, useEffect } from "react";
import CourseComponent from "./CourseComponent";
import { Dish, Cocktail } from "../types/index";

export function CourseMenu() {
  const [mains, setMains] = useState<Dish[]>([]);
  const [cocktail, setCocktail] = useState<Cocktail[]>([]);
  const [error, setError] = useState<string | null>(null);
  const API_URL =
    "https://iths-2024-recept-grupp6-bc215j.reky.se/categories/main/recipes";

  useEffect(() => {
    const fetchMains = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setMains(data);
      } catch (error) {
        console.error("Error fetching main courses:", error);
        setError("An error occurred while fetching data.");
      }
    };

    fetchMains();

    return () => {
      setMains([]);
    };
  }, []);

  // if (error) {
  //   return <div>Huvudrätter: Kunde inte hämta huvudrätter.</div>;
  // }

  return (
    <>
      <h2>HUVUDRÄTT</h2>
      {mains &&
        mains.map(
          (main) =>
            main.title &&
            main.title.trim() !== "" && (
              <CourseComponent
                key={main._id}
                _id={main._id}
                imageUrl={main.imageUrl}
                title={main.title}
                ingredients={main.ingredients}
                price={main.timeInMins}
              />
            )
        )}
    </>
  );
}
