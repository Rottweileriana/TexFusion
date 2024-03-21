import React from "react";
import styled from "styled-components";

//Används inte!

type DishProps = {
  imageUrl: string;
  title: string;
  ingredients: Ingredient[];
  price: number;
};

type Ingredient = {
  name: string;
};

const StyledDish = styled.div`
  display: flex;
  width: 300px;
  height: 100px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px;
  background-color: #f2f2f2;
  color: black;
  margin-bottom: 10px;
  text-align: left;
`;

const Image = styled.img`npm
  width: height;
  height: 100px;
  border-radius: 1px;
  margin-right: 20px;
`;

const Title = styled.h3`
  margin: 0;
`;

const Text = styled.p`
  margin: 5px;
  padding-right: 5px;
`;

const Dish: React.FC<DishProps> = ({
  imageUrl,
  title,
  ingredients,
  price = 100,
}) => {
  const formattedIngredients = ingredients
    .map((ingredient) => ingredient.name)
    .reduce((acc, curr, index, array) => {
      if (index === 0) {
        return curr;
      } else if (index === array.length - 1) {
        return `${acc} och ${curr}`;
      } else {
        return `${acc}, ${curr}`;
      }
    }, "");

  const MAX_LENGTH = 19;
  let formattedIngredientText = formattedIngredients;

  if (formattedIngredientText.length > MAX_LENGTH) {
    formattedIngredientText =
      formattedIngredientText.substring(0, MAX_LENGTH) + "...";
  } else {
    formattedIngredientText = `${formattedIngredients}.`;
  }

  return (
    <StyledDish>
      <Image src={imageUrl} alt={title} />
      <div>
        <Title>{title}</Title>
        <Text>{formattedIngredientText}</Text>
        <Text>{price} kr</Text>
      </div>
    </StyledDish>
  );
};

export default Dish;
