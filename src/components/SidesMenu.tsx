import { useState, useEffect } from "react";
import SidesComponent from "./SidesComponent";

//Lägg in villkor för att bara hämta/visa recept för sides (ej main courses)

type Side = {
  _id: string;
  imageUrl: string;
  title: string;
  timeInMins: number;
};

export function SidesMenu() {
  const [sides, setSides] = useState<Side[]>([]);
  const API_URL = "https://iths-2024-recept-grupp6-bc215j.reky.se/categories/side/recipes";

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
        console.error("Error fetching recipe:", error);
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
                price={side.timeInMins}
              />
            )
        )}
    </>
  );
}
