import React, { useState, useContext, useEffect } from "react";
import { faTrashCan } from "./index";
import { CartContext } from "./context";
import styled from "styled-components";
import { Cocktail } from "../types/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type RecCocktail = {
  title: string;
};

interface StyledCourseProps {
  quantity: number;
}

//#region Styles
const StyledCocktail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 0px solid #ccc;
  border-radius: 0px;
  padding: 5px;
  background-color: lightgrey;
  &:hover {
    cursor: default;
  }
`;

const Image = styled.img`
  width: 75px;
  height: 75px;
  border-radius: 5px;
  border: 1px solid #222222;
  margin-right: 10px;
`;

const PriceAndTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  width: 125px;
`;

const Title = styled.p`
  font-family: "Open Sans";
  font-weight: 400;
  text-decoration: none;
  color: #333333;
  margin: 0;
  margin-right: 10px;
`;

const CocktailAndAddContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0 2px 0 2px;
`;

const Price = styled.p`
  font-family: "Open Sans";
  margin: 1px 10px 0 0;
  margin-right: 10px;
  //font-size: 0.9em;
  font-weight: 400;
  color: #333333;
`;

const CounterContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  border: 0px solid #808080;
  border-radius: 5px;
  background-color: #7B0E34;
  float: right;
`;

const StyledFontAwesomeIcon: typeof FontAwesomeIcon = styled(FontAwesomeIcon)`
  color: white;
  font-size: 15px;
  margin-top: 5px;
`;

const CounterButton = styled.button`
  margin: 0;
  padding: 0;
  padding-bottom: 4px;
  width: 25px;
  height: 25px;
  background-color: transparent;
  border: none;
  color: white;
  font-size: 18px;
  font-weight: 300;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  &:focus {
    outline: none;
  }
`;

const ResultField = styled.input`
  width: 18px;
  text-align: center;
  background-color: transparent;
  border: none;
  color: white;
  font-family: "Open Sans";
  font-size: 15px;
  font-weight: 300;
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
  const cocktailPrices = [175, 159, 165, 170, 150, 149];

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
      case "Vego bowl":
        id = "12370";
        setCocktailPrice(cocktailPrices[5]);
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
            <PriceAndTitleContainer>
              <Title>{cocktail.strDrink}</Title>
              <Price>{cocktailPrice} kr</Price>
            </PriceAndTitleContainer>
            {quantity === 0 ? (
              <CounterContainer>
                <CounterButton onClick={handleIncrement}>+</CounterButton>
              </CounterContainer>
            ) : quantity > 1 ? (
              <CounterContainer>
                <CounterButton onClick={handleDecrement}>-</CounterButton>
                <ResultField type="text" value={quantity} readOnly />
                <CounterButton onClick={handleIncrement}>+</CounterButton>
              </CounterContainer>
            ) : (
              <CounterContainer>
                <CounterButton onClick={handleDecrement}>
                  <StyledFontAwesomeIcon icon={faTrashCan} />
                </CounterButton>
                <ResultField type="text" value={quantity} readOnly />
                <CounterButton onClick={handleIncrement}>+</CounterButton>
              </CounterContainer>
            )}
          </CocktailAndAddContainer>
        </div>
      ) : (
        <div>No Product</div>
      )}
    </StyledCocktail>
  );
};
