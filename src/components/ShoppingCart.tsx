import React, { useState } from "react";
import styled from "styled-components";

type CartItem = {
  imageUrl: string;
  title: string;
  price: number;
  quantity: number;
};

const CartList = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
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
  margin-left: 8px;
  border-radius: 1px;
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
  border: none;
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
`;

const DeleteButton = styled.div`
  margin-right: 8px;
  margin-bottom: 5px;
  height: 25px;
  border-radius: 5px;
  color: white;
  background-color: #C08484;
`;

const CartTotals = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  padding-bottom: 5px;
  height: 60px;
  color: #333333;
  background-color: #C0D6C0;
`;

const TotalPrice = styled.div`
  font-weight: bold;
  margin-left: 2px;
`;

const TotalQuantity = styled.div`
  font-weight: bold;
  margin-right: 14px;
`;

export const ShoppingCart: React.FC = () => {
  const [shoppingCart, setShoppingCart] = useState<CartItem[]>([
    {
      imageUrl: "url-till-bild-1.jpg",
      title: "Produkt 1",
      price: 19.99,
      quantity: 2
    },
    {
      imageUrl: "url-till-bild-2.jpg",
      title: "Produkt 2",
      price: 24.99,
      quantity: 1
    }
  ]);
  const [count, setCount] = useState<number>(0);

  // Beräkna totProdPrice, totCartPrice och totCartQuant
  const totProdPrice = shoppingCart.reduce((total, item) => total + item.price * item.quantity, 0);
  const totCartPrice = totProdPrice; // Totala varukorgspriset kan vara samma som det totala produktpriset i detta enkla exempel
  const totCartQuant = shoppingCart.reduce((total, item) => total + item.quantity, 0);

  const handleIncrement = () => {
    if (count < 99) {
      setCount((prevCount) => prevCount + 1);
    }
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount((prevCount) => prevCount - 1);
    }
  };

  return (
    <div>
      <h2>VARUKORG</h2>
      <CartList>
        {shoppingCart.map((cartItem, index) => (
          <CartRow key={index}>
            <CartItemElement>
              <ItemImage src={cartItem.imageUrl} alt={cartItem.title} />
              <ItemCol>
                <Title>{cartItem.title}</Title>
                <Price>{cartItem.price * cartItem.quantity} kr</Price>
              </ItemCol>
              <ItemColBtn>
                <CounterContainer>
                  <CounterButton onClick={handleDecrement}>-</CounterButton>
                  <ResultField type="text" value={count} readOnly />
                  <CounterButton onClick={handleIncrement}>+</CounterButton>
                </CounterContainer>
                <DeleteButton>Ta Bort</DeleteButton>
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
