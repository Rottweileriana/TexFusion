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
  flex-direction: column;
  justify-content: space-between;
  border: 0px solid #ccc;
  border-radius: 5px;
  padding: 5px;
  background-color: #156082;
  color: white;
  &:hover {
    cursor: default;
  }
`;

const Image = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 5px;
  border: 1px solid #222222;
  margin-right: 10px;
`;

const Title = styled.h4`
  margin: 0;
  margin-right: 10px;
`;

const CocktailAndAddContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Price = styled.p`
  margin: 0;
  margin-right: 10px;
  font-size: 0.9em;
`;

const CounterContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  border: 0px solid #808080;
  border-radius: 5px;
  background-color: #d3d3d3;
  float: right;
`;

const CounterButton = styled.button`
  margin: 0;
  padding: 0;
  padding-bottom: 4px;
  width: 25px;
  height: 25px;
  background-color: transparent;
  border: none;
  color: #333333;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  &:focus{
    outline:none;
  }
`;

const ResultField = styled.input`
  width: 18px;
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
  const [cocktailPrice, setCocktailPrice] = useState<number>(0);
  const cocktailPrices = [175, 159, 165, 170, 150];

  useEffect(() => {
    let id = "";

    switch (title) {
      case "Tacos":
        id = "11007";
        setCocktailPrice(cocktailPrices[0]);
        break;
      case "Nachos":
        id = "178365";
        setCocktailPrice(cocktailPrices[1]);
        break;
      case "Bowl":
        id = "13621";
        setCocktailPrice(cocktailPrices[2]);
        break;
      case "Burrito":
        id = "11003";
        setCocktailPrice(cocktailPrices[3]);
        break;
      case "Enchiladas":
        id = "11001";
        setCocktailPrice(cocktailPrices[4]);
        break;
      default:
        id = "11007";
        setCocktailPrice(cocktailPrices[0]);
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
          <CocktailAndAddContainer>
            <Image src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
            <Title>{cocktail.strDrink}</Title>
            <Price>{cocktailPrice} kr</Price>
            <CounterContainer>
              <CounterButton onClick={handleDecrement}>-</CounterButton>
              <ResultField type="text" value={quantity} readOnly />
              <CounterButton onClick={handleIncrement}>+</CounterButton>
            </CounterContainer>
          </CocktailAndAddContainer>
        </div>
      ) : (
        <div>No Product</div>
      )}
    </StyledCocktail>
  );
};
