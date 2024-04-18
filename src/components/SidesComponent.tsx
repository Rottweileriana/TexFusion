import { useState, useContext, useEffect, faTrashCan } from "./index.ts";
import { CartContext } from "./context";
import styled from "styled-components";
import { DishProps } from "../types/index.ts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


interface StyledCourseProps{
  quantity: number;
};

//#region Styles
const StyledSide = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 400px;
  border: 1px solid grey;
  border-radius: 0px;
  padding: 5px;
  background-color: #f5f5f5;
  color: #333333;
  margin: 0 10px 25px 10px;
  text-align: left;
  transition: background-color 1s, box-shadow 0.7s;
  &:hover {
    cursor: default;
    background-color:#f5f5f5;
    box-shadow: 0px 0px 5px 2px;
  }
`;

const Image = styled.img`
  width: 299px;
  height: 299px;
  border-radius: 0px;
  border: 1px solid #222222;
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
  font-size: 35px;
  text-decoration: none;
  margin: 0;
  padding: 0;
  color: #333333;
`;

const CounterContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 7px 0 0 auto;
  height: 30px;
  border: 0px solid #808080;
  border-radius: 30px;
  background-color: #eca884;
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
  &:focus{
    outline:none;
  }
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

const Text = styled.p`
  margin: 5px 0 0 0;
  font-size:15px;
  color: 333333;
`;

const PriceAndAddContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 175px;
`;

const Price = styled.p`
  margin: 0 0 5px 0;
  color: #333333;
`;

const StyledFontAwesomeIcon :(typeof FontAwesomeIcon ) = styled(FontAwesomeIcon)`
 color:145775;
 font-size: 15px;
 margin-top: 5px;
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

  try {
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
    console.error("Error in creating sides component", error);
    setError("An error occurred while rendering sides component.");
  }

  return (
    <StyledSide>
      <Image src={imageUrl} alt={title} />
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
              <CounterButton onClick={handleDecrement}><StyledFontAwesomeIcon icon={faTrashCan} /></CounterButton>
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
    </StyledSide>
  );
};

export default SidesComponent;
