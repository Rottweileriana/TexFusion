import { useState, useEffect } from "react";
import CourseComponent from "./CourseComponent";
import { Dish } from "../types/index";
import styled from "styled-components";

const CourseMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const CourseContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

const MenuTitle = styled.h2`
  margin-bottom: 20px;
  font-family: "Open Sans";
  font-weight: 500;
  font-size: 30px;
  text-decoration: none;
  color: #ffffff;
`;

export function CourseMenu() {
  const [mains, setMains] = useState<Dish[]>([]);
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
      }
    };

    fetchMains();

    return () => {
      setMains([]);
    };
  }, []);

  return (
    <>
      <CourseMenuContainer>
        <MenuTitle>HUVUDRÄTTER</MenuTitle>
        <CourseContainer>
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
        </CourseContainer>
      </CourseMenuContainer>
    </>
  );
}
