import React, { useState } from "react";
import styled from "styled-components";
import { DishProps } from "../types/index.ts";

//#region Styles
const StyledSide = styled.div`
  display: flex;
  width: 300px;
  height: 100px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px;
  background-color: #e0e0e0;
  color: black;
  margin-bottom: 10px;
  text-align: left;
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 5px;
  border: 1px solid #000;
  margin-right: 20px;
`;

const Title = styled.h3`
  margin: 0;
`;

const Text = styled.p`
  margin: 5px;
  padding-right: 5px;
  color: #808080;
`;

const Price = styled.p`
  margin: 0;
  margin-bottom: 5px;
`;

const PriceAndAddContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 175px;
`;

const CounterContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-top: 5px;
  border: 0px solid #808080;
  border-radius: 5px;
  background-color: #d3d3d3;
`;

const CounterButton = styled.button`
  margin: 0;
  padding: 0;
  padding-bottom: 5px;
  width: 30px;
  height: 30px;
  background-color: transparent;
  border: none;
  color: black;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ResultField = styled.input`
  width: 20px;
  text-align: center;
  background-color: transparent;
  border: none;
  color: black;
  font-size: 15px;
  outline: none;
`;
//#endregion

const SidesComponent: React.FC<DishProps> = ({
  imageUrl,
  title,
  ingredients,
  price = 30,
}) => {
  const [count, setCount] = useState<number>(0);

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

  const handleIncrement = () => {
    if (count < 99) {
      setCount((prevCount) => prevCount + 1);
    }
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount((prevCount) => prevCount - 1);
    }
  };

  return (
    <StyledSide>
      <Image src={imageUrl} alt={title} />
      <div>
        <Title>{title}</Title>
        <Text>{formattedIngredientText}</Text>
        <PriceAndAddContainer>
          <Price>{price} kr</Price>
          <CounterContainer>
            <CounterButton onClick={handleDecrement}>-</CounterButton>
            <ResultField type="text" value={count} readOnly />
            <CounterButton onClick={handleIncrement}>+</CounterButton>
          </CounterContainer>
        </PriceAndAddContainer>
      </div>
    </StyledSide>
  );
};

export default SidesComponent;
