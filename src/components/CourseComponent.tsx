import React, { useState } from "react";
import styled from "styled-components";

type CourseProps = {
  imageUrl: string;
  title: string;
  ingredients: Ingredient[];
  price: number;
};

type Ingredient = {
  name: string;
};

const StyledCourse = styled.div`
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

const Image = styled.img`
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

const Price = styled.p`
  margin: 0;
`;

const PriceAndAddContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CounterContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
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

const CourseComponent: React.FC<CourseProps> = ({
  imageUrl,
  title,
  ingredients,
  price = 100,
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
    setCount((prevCount) => prevCount + 1);
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount((prevCount) => prevCount - 1);
    }
  };

  return (
    <StyledCourse>
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
    </StyledCourse>
  );
};

export default CourseComponent;
