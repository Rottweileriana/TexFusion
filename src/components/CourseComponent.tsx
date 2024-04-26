import React, { useState, useContext, useEffect } from "react";
import { CartContext } from "./context";
import styled from "styled-components";
import { DishProps } from "../types/index";
import { RecommendationComponent, faTrashCan } from "./index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface StyledCourseProps {
  quantity: number;
}

//#region Styles

const StyledCourse = styled.div<StyledCourseProps>`
  display: flex;
  flex-direction: column;
  width: 300px;
  // Temp workaround... fix at 400px so card does not change size
  height: ${({ quantity }: { quantity: number }) =>
    quantity > 0 ? "400px" : "400px"};
  border: 1px solid grey;
  border-radius: 0px;
  padding: 5px;
  background-color: #f5f5f5;
  color: #333333;
  margin: 0 10px 25px 10px;
  text-align: left;
  position: relative;
  transition: background-color 1s, box-shadow 0.8s, height 0.5s ease-in-out;
  &:hover {
    background-color: #f5f5f5;
    box-shadow: 0px 0px 5px 2px;
  }
`;

const Image = styled.img<StyledCourseProps>`
  width: 299px;
  height: ${({ quantity }: { quantity: number }) =>
    quantity > 0 ? "170px" : "299px"};
  object-fit: cover;
  object-position: 0% 100%;
  border-radius: 0px;
  border: 1px solid #222222;
  transition: height 0.5s ease-in-out;
`;

const TotalDescription = styled.div`
  width: 299px;
  padding: 5px 0 5px 5px;
  font-weight: 300;
`;

const TitleAndAddContainer = styled.div`
  display: flex;
  width: 290px;
`;

const Title = styled.h3`
  font-family: "Open Sans";
  font-weight: 300;
  font-size: 30px;
  text-decoration: none;
  margin: 0;
  color: #333333;
`;

const CounterContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 6px 0 0 auto;
  height: 30px;
  border: 0px solid #808080;
  border-radius: 30px;
  background-color: #eca884;
  font-weight: 300;
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
  width: 20px;
  text-align: center;
  background-color: transparent;
  border: none;
  color: #333333;
  font-family: "Open Sans";
  font-size: 15px;
  font-weight: 300;
  outline: none;
  &:hover {
    cursor: default;
  }
`;

const StyledFontAwesomeIcon: typeof FontAwesomeIcon = styled(FontAwesomeIcon)`
  color: 145775;
  font-size: 15px;
  margin-top: 5px;
`;

const Text = styled.p`
  margin: 5px 0 0 0;
  font-size: 15px;
  font-weight: 400;
`;

const PriceAndAddContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 293px;
`;

const Price = styled.p`
  margin: 0 0 5px 0;
  font-weight: 400;
`;

const Recommendation = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 97%;
  margin: 5px;
`;

const HeadRecCocktail = styled.text`
font-family: "Open Sans";
font-weight: 500;
  margin: 15px 0 5px 7px;
  color: #333333;
`;

const Wrapper = styled.div<StyledCourseProps>`
  height: 100%;
  opacity: ${({ quantity }: { quantity: number }) => (quantity > 0 ? 1 : 0)};
  transition-delay: 0.5s;
  transition-duration: 0.8s;
  transition-property: opacity;
`;

//#endregion

const CourseComponent: React.FC<DishProps> = ({
  _id,
  imageUrl,
  title,
  ingredients,
  price,
}) => {
  const { cart, addToCart, removeFromCart } = useContext(CartContext)!;
  const [quantity, setQuantity] = useState<number>(0);

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

    const MAX_LENGTH = 30;
    formattedIngredientText = formattedIngredients;

    if (formattedIngredientText.length > MAX_LENGTH) {
      formattedIngredientText =
        formattedIngredientText.substring(0, MAX_LENGTH) + "...";
    } else {
      formattedIngredientText = `${formattedIngredients}.`;
    }

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
  }

  return (
    <StyledCourse quantity={quantity}>
      <Image src={imageUrl} alt={title} quantity={quantity} />
      <TotalDescription>
        <TitleAndAddContainer>
          <Title>{title}</Title>
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
        </TitleAndAddContainer>
        <Text>{formattedIngredientText}</Text>
        <PriceAndAddContainer>
          <Price>{price} kr</Price>
        </PriceAndAddContainer>
      </TotalDescription>
      <Wrapper quantity={quantity}>
        {quantity > 0 && (
          <Recommendation>
            <HeadRecCocktail>Rekommenderad Dryck:</HeadRecCocktail>
            <RecommendationComponent title={title}></RecommendationComponent>
          </Recommendation>
        )}
      </Wrapper>
    </StyledCourse>
  );
};

export default CourseComponent;
