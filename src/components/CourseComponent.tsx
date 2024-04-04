import React, { useState, useContext, useEffect } from "react";
import { CartContext } from "./context";
import styled from "styled-components";
import { DishProps } from "../types/index";

type Product = {
  imageUrl: string;
  title: string;
  price: number;
  quantity: number;
};

interface StyledCourseProps {
  quantity: number;
}

//#region Styles
const StyledCourse = styled.div<StyledCourseProps>`
  display: flex;
  width: 300px;
  height: ${({ quantity }: { quantity: number }) =>
    quantity > 0 ? "150px" : "100px"};
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px;
  background-color: #e0e0e0;
  color: #333333;
  margin-bottom: 10px;
  text-align: left;
  position: relative; /* Lägg till position: relative */
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 5px;
  border: 1px solid #222222;
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
  padding-bottom: 4px;
  width: 30px;
  height: 30px;
  background-color: transparent;
  border: none;
  color: #333333;
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
  color: #333333;
  font-size: 15px;
  outline: none;
  &:hover {
    cursor: default;
  }
`;

const Recommendation = styled.div`
  position: absolute;
  bottom: 3px;
  left: 0;
  right: 0;
`;

const RecAndAddContainer = styled.div`
  display: flex;
  align-items: center;
`;

const CocktailRec = styled.p`
  font-size: 13px;
  color: #333333;
  margin-left: 8px;
  flex: 1;
`;

const CocktailCounterContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
  border: 1px solid #d3d3d3;
  border-radius: 5px;
  background-color: #transparent;
  margin-right: 8px;
`;

const CocktailCounterButton = styled.button`
  margin: 0;
  padding: 0;
  padding-bottom: 4px;
  width: 30px;
  height: 30px;
  background-color: transparent;
  border: none;
  color: #333333;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 1;
`;

//#endregion

const CourseComponent: React.FC<DishProps> = ({
  _id,
  imageUrl,
  title,
  ingredients,
  price,
  cocktailRec
}) => {
  const { cart, addToCart, removeFromCart } = useContext(CartContext)!;
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(0);
  const [cocktailQuantity, setCocktailQuantity] = useState<number>(0);

  let formattedIngredientText = "";
  let handleIncrement: () => void = () => {};
  let handleDecrement: () => void = () => {};

  try {
    //course
    useEffect(() => {
      const productInCart = cart.find((product) => product._id === _id);
      const quantityInCart = productInCart ? productInCart.quantity : 0;
      setQuantity((prevQuantity) => {
        // Only update if the quantity changed to avoid infinite loop
        return prevQuantity !== quantityInCart ? quantityInCart : prevQuantity;
      });
    }, [cart, _id]);

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
    formattedIngredientText = formattedIngredients;

    if (formattedIngredientText.length > MAX_LENGTH) {
      formattedIngredientText =
        formattedIngredientText.substring(0, MAX_LENGTH) + "...";
    } else {
      formattedIngredientText = `${formattedIngredients}.`;
    }

    //cocktail
    useEffect(() => {
      const productInCart = cart.find((product) => product._id === cocktailRec.idDrink);
      const quantityInCart = productInCart ? productInCart.quantity : 0;
      setCocktailQuantity((prevQuantity) => {
        // Only update if the quantity changed to avoid infinite loop
        return prevQuantity !== quantityInCart ? quantityInCart : prevQuantity;
      });
    }, [cart, _id]);

    handleIncrement = () => {
      // Skapa ett nytt objekt för den aktuella produkten
      const product = {
        _id,
        imageUrl,
        title,
        price,
        quantity: 1,
      };
      // Anropa addToCart-metoden med det nya produktobjektet
      addToCart(product);
    };

    handleDecrement = () => {
      // Anropa removeFromCart-metoden för att ta bort produkten
      removeFromCart(_id);
    };
  } catch (error) {
    console.error("Error in creating course component", error);
    setError("An error occurred while rendering course component.");
  }

  return (
    <StyledCourse quantity={quantity}>
      <Image src={imageUrl} alt={title} />
      <div>
        <Title>{title}</Title>
        <Text>{formattedIngredientText}</Text>
        <PriceAndAddContainer>
          <Price>{price} kr</Price>
          <CounterContainer>
            <CounterButton onClick={handleDecrement}>-</CounterButton>
            <ResultField type="text" value={quantity} readOnly />
            <CounterButton onClick={handleIncrement}>+</CounterButton>
          </CounterContainer>
        </PriceAndAddContainer>
      </div>
      <Recommendation>
        {quantity > 0 && (
          <RecAndAddContainer>
          <CocktailRec>Rekommenderas: {cocktailRec.strDrink}</CocktailRec>
          <CocktailCounterContainer>
            <CocktailCounterButton onClick={handleDecrement}>-</CocktailCounterButton>
            <ResultField type="text" value={cocktailQuantity} readOnly />
            <CocktailCounterButton onClick={handleIncrement}>+</CocktailCounterButton>
          </CocktailCounterContainer>
          </RecAndAddContainer>
        )}
      </Recommendation>
    </StyledCourse>
  );
};

export default CourseComponent;
