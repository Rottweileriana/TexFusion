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
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px;
  background-color: blue;
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

export const RecommendationComponent: React.FC<RecCocktail> = ({ title }) => {
  const { cart, addToCart, removeFromCart } = useContext(CartContext)!;
  const [cocktail, setCocktail] = useState<Cocktail | null>(null);
  const [quantity, setQuantity] = useState<number>(0);
  const [cocktailPrices, setCocktailPrices] = useState<number[]>([
    175, 159, 165, 170, 150,
  ]);
  let cocktailPrice = cocktailPrices[0];

  useEffect(() => {
    let id = "";
    switch (title) {
      case "Tacos":
        id = "11007";
        cocktailPrice = cocktailPrices[0];
        break;
      case "Nachos":
        id = "178365";
        cocktailPrice = cocktailPrices[1];
        break;
      case "Bowl":
        id = "13621";
        cocktailPrice = cocktailPrices[2];
        break;
      case "Burrito":
        id = "11003";
        cocktailPrice = cocktailPrices[3];
        break;
      case "Enchiladas":
        id = "11001";
        cocktailPrice = cocktailPrices[4];
        break;
      default:
        id = "11007";
        cocktailPrice = cocktailPrices[0];
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
        if (data && data.drinks && data.drinks.length > 0) {
          console.log(data);
          setCocktail(data.drinks[0]);
        }
      } catch (error) {
        console.error("Error fetching cocktails:", error);
      }
    };

    if (title) {
      fetchCocktail();
      console.log(title);
      console.log(cocktail?.strDrink);
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
        imageUrl: cocktail.strDrinkThumb,
        title: cocktail.strDrink,
        price: cocktailPrice,
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
  //Sätt cocktailformatet
  return (
    <StyledCocktail>
      {cocktail ? (
        <div>
          <Title>{cocktail.strDrink}</Title>
          <PriceAndAddContainer>
            <Price>{cocktailPrice} kr</Price>
            <CounterContainer>
              <CounterButton onClick={handleDecrement}>-</CounterButton>
              <ResultField type="text" value={quantity} readOnly />
              <CounterButton onClick={handleIncrement}>+</CounterButton>
            </CounterContainer>
          </PriceAndAddContainer>
        </div>
      ) : (
        <div>No Product</div>
      )}
    </StyledCocktail>
  );
};
