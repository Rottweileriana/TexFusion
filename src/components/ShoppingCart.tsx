import { useContext } from "./index";
import { CartContext } from "./context";
import styled from "styled-components";

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
  flex-direction: column;
  border-radius: 3px;
  background-color: #e0e0e0;
  color: #333333;
  padding: 1px;
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
  height: 60px;
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
`;

const Price = styled.div`
  margin-right: 15px;
  margin-bottom: 5px;
  text-align: right;
  padding-right: 10px;
`;

const ItemImage = styled.img`
  width: 50px;
  height: 50px;
  margin-top: 4px;
  margin-left: 8px;
  border: 1px;
  border-radius: 3px;
`;

const CounterContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 8px;
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
    <div>
      <h2>Varukorg</h2>
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
                <CounterContainer>
                  <CounterButton onClick={() => handleDecrement(cartItem._id)}>
                    -
                  </CounterButton>
                  <ResultField type="text" value={cartItem.quantity} readOnly />
                  <CounterButton onClick={() => handleIncrement(cartItem)}>
                    +
                  </CounterButton>
                </CounterContainer>
                <DeleteButton
                  onClick={() => deleteProdFromCart(cartItem._id, true)}
                >
                  Ta Bort
                </DeleteButton>
              </ItemColBtn>
            </CartItemElement>
          </CartRow>
        ))}
        <CartTotals>
          <p>Summa:</p>
          <TotalPrice>{totCartPrice} kr</TotalPrice>
          <TotalQuantity>{totCartQuant} st</TotalQuantity>
        </CartTotals>
      </CartList>
    </div>
  );
};
