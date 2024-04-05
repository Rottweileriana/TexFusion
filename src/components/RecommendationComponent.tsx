import { useState, useContext, useEffect } from "./index";
import { CartContext } from "./context";
import styled from "styled-components";
import { Cocktail } from "../types/index";

type RecCocktail = {
  title: string
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

const RecCocktail: React.FC<RecCocktail> = ({
  title
}) => {
  const { cart, addToCart, removeFromCart } = useContext(CartContext)!;
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);
  const [cocktailPrices, setCocktailPrices] = useState<number[]>([
    180, 170, 175, 180, 150, 165, 155, 170, 160, 180
  ]);
  const [cocktail, setCocktail] = useState<Cocktail | null>(null); //ok med null??????????????
  const [ error, setError ] = useState<string | null>(null);
  const [ quantity, setQuantity ] = useState<number>(0);
  
  const MAX_LENGTH = 19;
  let formattedCocktailName = cocktail.strDrink; //hantera ifall null
  let id: string = "11007";

  let handleIncrement: () => void = () => {};
  let handleDecrement: () => void = () => {};

  try
  {
    //Matcha rätt med cocktail
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

    const API_URL = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i="+id;


    // Lägg till pris för den rekommenderade cocktailen
    useEffect(() => {
        const fetchCocktails = async () => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
            throw new Error("Network response was not ok");
            }
            const data = await response.json();

            setCocktail(data[0]);

        } catch (error) {
            console.error("Error fetching cocktails:", error);
        }
        };

        fetchCocktails();

        return () => {
        setCocktail(null);
        setCocktailPrices([]);
        };
    }, []);

    useEffect(() => {
      const productInCart = cart.find(product => product._id === cocktail.idDrink);
      const quantityInCart = productInCart ? productInCart.quantity : 0;
      setQuantity(prevQuantity => {
        // Only update if the quantity changed to avoid infinite loop
        return prevQuantity !== quantityInCart ? quantityInCart : prevQuantity;
      });
    }, [cart, cocktail.idDrink]);

    if (formattedCocktailName.length > MAX_LENGTH) {
      formattedCocktailName =
        formattedCocktailName.substring(0, MAX_LENGTH) + "...";
    }

    handleIncrement = () => {
      // Skapa ett nytt objekt för den aktuella produkten
      const product = {
        _id: cocktail.idDrink,
        imageUrl: cocktail.strDrinkThumb,
        title: cocktail.strDrink,
        price: cocktail.cocktailPrice,
        quantity: 1,
      };
      // Anropa addToCart-metoden med det nya produktobjektet
      addToCart(product);
    };

    handleDecrement = () => {
      // Anropa removeFromCart-metoden för att ta bort produkten
      removeFromCart(cocktail.idDrink);
    };
  }
  catch (error) {
    console.error("Error in creating cocktail component", error)
    setError("An error occurred while rendering cocktail component.");
  }

  return (
    <StyledCocktail>
      <div>
        <Title>{formattedCocktailName}</Title>
        <PriceAndAddContainer>
          <Price>{cocktail.cocktailPrice} kr</Price>
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

export default RecCocktail;
