import { useContext, faTrashCan } from "./index";
import { CartContext } from "./context";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type CartItem = {
  _id: string;
  imageUrl: string;
  title: string;
  price: number;
  quantity: number;
};

//#region Styles

const CartList = styled.div`
  display: flex;
  width: 500px;
  flex-direction: column;
  border-radius: 0px;
  background-color: #e0e0e0;
  color: #333333;
`;

const CartRow = styled.div`
  display: flex;
  flex-direction: column;
  &:nth-child(odd) {
    background-color: #f0f0f0;
  }
`;

const CartItemElement = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 122px;
`;

const ItemCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
`;

const ItemColBtn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.h4`
  margin: 0;
  margin-right: 15px;
  padding-left: 15px;
  text-align: left;
  font-family: "Opens Sans";
  Font-weight: 300;
  color: #333333;
`;

const Price = styled.div`
  margin-right: 15px;
  margin-bottom: 5px;
  text-align: right;
  padding-right: 10px;
`;

const ItemImage = styled.img`
  width: 102px;
  height: 102px;
  margin-left: 10px;
  border: 1px solid #333333;
  border-radius: 3px;
`;

const CounterContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 8px;
  margin-top: 5px;
  border: 0px solid #808080;
  border-radius: 5px;
  background-color: #eca884;
  font-weight: 300;
`;

const CounterButton = styled.button`
  margin: 0;
  padding: 0;
  padding-bottom: 4px;
  width: 30px;
  height: 25px;
  background-color: transparent;
  border: 0;
  border-radius: 5px;
  font-size: 20px;
  color: #333333;
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
  color: #333333;
  background-color: transparent;
  border: none;
  font-size: 15px;
  outline: none;
  &:hover {
    cursor: default;
  }
`;

const DeleteButton = styled.div`
  margin-right: 8px;
  margin-bottom: 5px;
  height: 25px;
  border-radius: 5px;
  color: white;
  background-color: #c08484;
  cursor: pointer;
`;

const CartTotals = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  padding-bottom: 5px;
  height: 60px;
  color: #333333;
  background-color: #c0d6c0;
`;

const TotalPrice = styled.div`
  font-weight: bold;
  margin-left: 15px;
`;

const TotalQuantity = styled.div`
  font-weight: bold;
  margin-right: 14px;
`;

const ShoppingCartContainer = styled.div`
  margin-top: 210px;
`;

const StyledTitle = styled.h2`
  font-family: "Open Sans";
  font-size: 25px;
  font-weight: 300;
  color: white;
`;

const StyledFontAwesomeIcon: (typeof FontAwesomeIcon) = styled(FontAwesomeIcon)`
 color: 145775;
 font-size: 15px;
 margin-top: 5px;
`;

const EmtptyCartText = styled.div`
  margin-left: 165px;
  font-family: "Open Sans";
  font-size: 15px;
  font-weight: 300;
  color: #333333;
`;
//#endregion

export const ShoppingCart: React.FC = () => {
  const { cart, addToCart, removeFromCart } = useContext(CartContext)!;
  const MAX_LENGTH = 15;

  let totProdPrice = 0;
  let totCartPrice = 0;
  let totCartQuant = 0;

 

  try {
    totProdPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    totCartPrice = totProdPrice;
    totCartQuant = cart.reduce((total, item) => total + item.quantity, 0);
  } catch (error) {
    console.error('Error calculating totals:', error);
  }

  const handleIncrement = (product: CartItem) => {
    try {
      addToCart(product);
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  const handleDecrement = (id: string) => {
    try {
      removeFromCart(id);
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const deleteProdFromCart = (id: string, deleteProdFromCart: boolean) => {
    try {
      removeFromCart(id, deleteProdFromCart);
    } catch (error) {
      console.error('Error deleting item from cart:', error);
    }
  };

  return (
    <ShoppingCartContainer>
      <StyledTitle>VARUKORG</StyledTitle>
      <CartList>
        {cart.map((cartItem, index) => (
          <CartRow key={index}>
            <CartItemElement>
              <ItemImage src={cartItem.imageUrl} alt={cartItem.title} />
              <ItemCol>
                <Title>
                  {cartItem.title.length > MAX_LENGTH
                    ? cartItem.title.substring(0, MAX_LENGTH) + "..."
                    : cartItem.title}
                </Title>
                <Price>{cartItem.price * cartItem.quantity} kr</Price>
              </ItemCol>
              <ItemColBtn>
              {cartItem.quantity > 1 ? (
            <CounterContainer>
              <CounterButton onClick={() => handleDecrement(cartItem._id)}>-</CounterButton>
                <ResultField type="text" value={cartItem.quantity} readOnly />
              <CounterButton onClick={() => handleIncrement(cartItem)}>+</CounterButton>
            </CounterContainer>) : (
            <CounterContainer>
              <CounterButton onClick={() => handleDecrement(cartItem._id)}><StyledFontAwesomeIcon icon={faTrashCan} /></CounterButton>
                <ResultField type="text" value={cartItem.quantity} readOnly />
              <CounterButton onClick={() => handleIncrement(cartItem)}>+</CounterButton>
            </CounterContainer>)}
                <DeleteButton
                  onClick={() => deleteProdFromCart(cartItem._id, true)}>Ta Bort</DeleteButton>
              </ItemColBtn>
            </CartItemElement>
          </CartRow>
        ))}
        <CartTotals>
          {totCartQuant < 1 ? (
            <EmtptyCartText>Din varukorg är tom.</EmtptyCartText>
            ) : (
            <>
              <p>Summa:</p>
              <TotalPrice>{totCartPrice} kr</TotalPrice>
              <TotalQuantity>{totCartQuant} st</TotalQuantity>
            </>
          )}
        </CartTotals>
      </CartList>
    </ShoppingCartContainer>
    
  );
};
