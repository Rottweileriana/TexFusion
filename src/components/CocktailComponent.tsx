import { useState, useContext, useEffect } from "./index";
import { CartContext } from "./context";
import styled from "styled-components";

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

const Image = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 5px;
  border: 1px solid #222222;
  margin-right: 20px;
`;

const Title = styled.h4`
  margin: 0;
`;

const Recommended = styled.p`
  margin: 5px;
  padding: 2px;
  padding-left: 19px;
  border-radius: 5px;
  color: #7d532c;
  background-color: #eac898;
`;

const BlancRow = styled.p`
  margin: 5px;
  padding: 2px;
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

const Cocktail: React.FC<Cocktail> = ({
  idDrink,
  strDrinkThumb,
  strDrink,
  recommended,
  cocktailPrice
}) => {
  const { cart, addToCart, removeFromCart } = useContext(CartContext)!;
  const [ error, setError ] = useState<string | null>(null);
  const [ quantity, setQuantity ] = useState<number>(0);
  
  const MAX_LENGTH = 19;
  let formattedCocktailName = strDrink;

  let handleIncrement: () => void = () => {};
  let handleDecrement: () => void = () => {};

  try 
  {
    useEffect(() => {
      const productInCart = cart.find(product => product._id === idDrink);
      const quantityInCart = productInCart ? productInCart.quantity : 0;
      setQuantity(prevQuantity => {
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
  }
  catch (error) {
    console.error("Error in creating cocktail component", error)
    setError("An error occurred while rendering cocktail component.");
  }

  return (
    <StyledCocktail>
      <Image src={strDrinkThumb} alt={strDrink} />
      <div>
        <Title>{formattedCocktailName}</Title>
        {recommended ? (
          <Recommended>{recommended}</Recommended>
        ) : (
          <BlancRow>{"\u00A0"}</BlancRow>
        )}
        <PriceAndAddContainer>
          <Price>{cocktailPrice} kr</Price>
          <CounterContainer>
            <CounterButton onClick={handleDecrement}>-</CounterButton>
            <ResultField type="text" value={quantity} readOnly />
            <CounterButton onClick={handleIncrement}>+</CounterButton>
          </CounterContainer>
        </PriceAndAddContainer>
      </div>
    </StyledCocktail>
  );
};

export default Cocktail;
