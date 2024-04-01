import { useState, useContext, useEffect } from "./index.ts";
import { CartContext } from "./context";
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
  color: #333333;
  margin-bottom: 10px;
  text-align: left;
  &:hover {
    cursor: default;
  }
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
//#endregion

const SidesComponent: React.FC<DishProps> = ({
  _id,
  imageUrl,
  title,
  ingredients,
  price,
}) => {
  const { cart, addToCart, removeFromCart } = useContext(CartContext)!;
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(0);

  let formattedIngredientText = "";
  let handleIncrement: () => void = () => {};
  let handleDecrement: () => void = () => {};

  try
  {
    useEffect(() => {
      const productInCart = cart.find(product => product._id === _id);
      const quantityInCart = productInCart ? productInCart.quantity : 0;
      setQuantity(prevQuantity => {
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
  }
  catch (error) {
    console.error("Error in creating sides component", error)
    setError("An error occurred while rendering sides component.");
  }

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
            <ResultField type="text" value={quantity} readOnly />
            <CounterButton onClick={handleIncrement}>+</CounterButton>
          </CounterContainer>
        </PriceAndAddContainer>
      </div>
    </StyledSide>
  );
};

export default SidesComponent;
