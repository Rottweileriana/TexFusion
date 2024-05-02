import { useState, useContext, useEffect, faTrashCan } from "./index";
import { CartContext } from "./context";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


type Cocktail = {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
  recommended?: string;
  cocktailPrice: number;
};

type Product = {
  imageUrl: string;
  title: string;
  price: number;
  quantity: number;
};

interface StyledCourseProps {
  quantity: number;
};
//#region Styles

const StyledFontAwesomeIcon: (typeof FontAwesomeIcon) = styled(FontAwesomeIcon)`
 color: 145775;
 font-size: 15px;
 margin-top: 5px;
`;

const StyledCocktail = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 370px;
  border: 1px solid grey;
  border-radius: 0px;
  padding: 5px;
  background-color: #f5f5f5;
  color: #333333;
  margin: 0 10px 25px 10px;
  text-align: left;
  transition: background-color 1s, box-shadow 0.8s ease-in-out;
  &:hover{
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
  padding: 10px 0 5px 5px;
  font-weight: 300;
`;

const TitleAndAddContainer = styled.div`
  display: flex;
  width: 290px;
`;

const Title = styled.h4`
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
  margin: 1px 0 0 auto;
  height: 30px;
  border: 0px solid #808080;
  border-radius: 30px;
  background-color: #7B0E34;
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
  color: white;
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
  color: white;
  font-family: "Open Sans";
  font-size: 15px;
  font-weight: 300;
  outline: none;
  &:hover {
    cursor: default;
  }
`;

const Price = styled.p`
  margin: 0;
  margin-bottom: 5px;
  color: #333333;
`;

const PriceAndAddContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 175px;
`;


//#endregion

const Cocktail: React.FC<Cocktail> = ({
  idDrink,
  strDrinkThumb,
  strDrink,
  recommended,
  cocktailPrice,
}) => {
  const { cart, addToCart, removeFromCart } = useContext(CartContext)!;
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(0);

  const MAX_LENGTH = 19;
  let formattedCocktailName = strDrink;

  let handleIncrement: () => void = () => { };
  let handleDecrement: () => void = () => { };

  try {
    useEffect(() => {
      const productInCart = cart.find((product) => product._id === idDrink);
      const quantityInCart = productInCart ? productInCart.quantity : 0;
      setQuantity((prevQuantity) => {
        // Only update if the quantity changed to avoid infinite loop
        return prevQuantity !== quantityInCart ? quantityInCart : prevQuantity;
      });
    }, [cart, idDrink]);

    if (formattedCocktailName.length > MAX_LENGTH) {
      formattedCocktailName =
        formattedCocktailName.substring(0, MAX_LENGTH) + "...";
    }

    handleIncrement = () => {
      // Skapa ett nytt objekt för den aktuella produkten
      const product = {
        _id: idDrink,
        imageUrl: strDrinkThumb,
        title: strDrink,
        price: cocktailPrice,
        quantity: 1,
      };
      // Anropa addToCart-metoden med det nya produktobjektet
      addToCart(product);
    };

    handleDecrement = () => {
      // Anropa removeFromCart-metoden för att ta bort produkten
      removeFromCart(idDrink);
    };
  } catch (error) {
    console.error("Error in creating cocktail component", error);
    setError("An error occurred while rendering cocktail component.");
  }

  return (
    <StyledCocktail>
      <Image src={strDrinkThumb} alt={strDrink} />
      <TotalDescription>
        <TitleAndAddContainer>
          <Title>{formattedCocktailName}</Title>
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
        <PriceAndAddContainer>
          <Price>{cocktailPrice} kr</Price>
        </PriceAndAddContainer>
      </TotalDescription>
    </StyledCocktail>
  );
};

export default Cocktail;
