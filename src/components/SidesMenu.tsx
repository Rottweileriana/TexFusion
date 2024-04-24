import { useState, useEffect } from "./index";
import SidesComponent from "./SidesComponent";
import { Dish } from "../types/index";
import styled from "styled-components";

//#region Styles
const SidesMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const SidesContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

const MenuTitle = styled.h2`
  margin-bottom: 20px;
  font-family: "Open Sans";
  font-weight: 300;
  font-size: 30px;
  text-decoration: none;
  color: #ffffff;
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
      <SidesMenuContainer>
        <MenuTitle>TILLBEHÖR</MenuTitle>
        <SidesContainer>
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
        </SidesContainer>
      </SidesMenuContainer>
    </>
  );
}
