import { useState, useEffect } from "react";
import SidesComponent from "./SidesComponent";
import { Dish } from "../types/index";

export function SidesMenu() {
  const [sides, setSides] = useState<Dish[]>([]);
  const API_URL =
    "https://iths-2024-recept-grupp6-bc215j.reky.se/categories/side/recipes";

  useEffect(() => {
    const fetchSides = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setSides(data);
      } catch (error) {
        console.error("Error fetching dishes:", error);
      }
    };

    fetchSides();

    return () => {
      setSides([]);
    };
  }, []);

  return (
    <>
      <h2>TILLBEHÖR</h2>
      {sides &&
        sides.map(
          (side) =>
            side.title &&
            side.title.trim() !== "" && (
              <SidesComponent
                key={side._id}
                _id={side._id}
                imageUrl={side.imageUrl}
                title={side.title}
                ingredients={side.ingredients}
                price={side.timeInMins}
              />
            )
        )}
    </>
  );
}
