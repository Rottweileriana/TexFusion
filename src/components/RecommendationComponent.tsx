import React, { useState, useContext, useEffect } from "react";
import { CartContext } from "./context";
import styled from "styled-components";
import { Cocktail } from "../types/index";

type RecCocktail = {
  title: string;
};

//#region Styles
const StyledCocktail = styled.div`
  display: flex;
  width: 300px;
  height: 100px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px;
  background-color: #e0e0e0;
  color: #333333;
  margin-bottom: 10px;
  text-align: left;
  &:hover {
    cursor: default;
  }
`;

const Title = styled.h4`
  margin: 0;
`;

const PriceAndAddContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 175px;
`;

const Price = styled.p`
  margin: 0;
  margin-bottom: 5px;
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
//#endregion

export const RecommendationComponent: React.FC<RecCocktail> = ({
  title,
}) => {
  const { cart, addToCart, removeFromCart } = useContext(CartContext)!;
  const [cocktail, setCocktail] = useState<Cocktail | null>(null);
  const [quantity, setQuantity] = useState<number>(0);

  useEffect(() => {
    let id = "";
    switch (title) {
      case "Tacos":
        id = "11007";
        break;
      case "Nachos":
        id = "178365";
        break;
      case "Bowl":
        id = "13621";
        break;
      case "Burrito":
        id = "11003";
        break;
      case "Enchiladas":
        id = "11001";
        break;
      default:
        id = "11007";
        break;
    }

    const API_URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;

    const fetchCocktail = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (data && data.length > 0) {
          setCocktail(data[0]);
        }
      } catch (error) {
        console.error("Error fetching cocktails:", error);
      }
    };

    if (title) {
      fetchCocktail();
    }

    return () => {
      setCocktail(null);
    };
  }, [title]);

  useEffect(() => {
    if (cocktail) {
      const productInCart = cart.find(
        (product) => product._id === cocktail.idDrink
      );
      const quantityInCart = productInCart ? productInCart.quantity : 0;
      setQuantity(quantityInCart);
    }
  }, [cart, cocktail]);

  const handleIncrement = () => {
    if (cocktail) {
      const product = {
        _id: cocktail.idDrink,
        imageUrl: "", // Set your image URL here
        title: cocktail.strDrink,
        price: 10, // Set your price here
        quantity: 1,
      };
      addToCart(product);
      setQuantity((prevQuantity) => prevQuantity + 1);
    }
  };

  const handleDecrement = () => {
    if (cocktail) {
      removeFromCart(cocktail.idDrink);
      setQuantity((prevQuantity) => Math.max(0, prevQuantity - 1));
    }
  };

  return (
    <StyledCocktail>
      {cocktail ? (
        <>
          <Title>{cocktail.strDrink}</Title>
          <PriceAndAddContainer>
            <Price>{cocktail.cocktailPrice} kr</Price>
            <CounterContainer>
              <CounterButton onClick={handleDecrement}>-</CounterButton>
              <ResultField type="text" value={quantity} readOnly />
              <CounterButton onClick={handleIncrement}>+</CounterButton>
            </CounterContainer>
          </PriceAndAddContainer>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </StyledCocktail>
  );
};
