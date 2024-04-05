import { useState, useEffect } from "./index";
import SidesComponent from "./SidesComponent";
import { Dish } from "../types/index";
import styled from "styled-components";

//#region Styles
const MenuTitle = styled.h2`
  margin-top: 40px;
  margin-bottom: 15px;
`;
//#endregion

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
      <MenuTitle>Tillbehör</MenuTitle>
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
