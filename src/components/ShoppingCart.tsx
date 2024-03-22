import { useState, useEffect } from "react";
import { useContext } from 'react';
import styled from "styled-components";

type CartItem = {
    imageUrl: string;
    title: string;
    totItemPrice: number;
    quantity: number;
  };

type Cart = {
    cartItems: CartItem[];
}

const CartList = styled.div`
    display: flex;
    flex-direction: column;
`;

const CartItem = styled.div`
    display: flex;
    flex-wrap: nowrap;
`;

const ItemProp = styled.div`
    margin-right: 15px;
`;

const CounterContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-top: 5px;
  border: 0px solid #808080;
  border-radius: 5px;
  background-color: #D3D3D3;
`;

const CounterButton = styled.button`
    margin: 0;
    padding: 0;
    padding-bottom: 5px;
    width: 30px;
    height: 30px;
    background-color: transparent;
    border: none;
    color: black;
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
    color: black;
    font-size: 15px;
    outline: none;
`;

    export function ShoppingCart() {
    const [shoppingCart, setShoppingCart] = useState<CartItem[]>([
        {
          imageUrl: "url-till-bild-1.jpg",
          title: "Produkt 1",
          totItemPrice: 19.99,
          quantity: 2
        },
        {
          imageUrl: "url-till-bild-2.jpg",
          title: "Produkt 2",
          totItemPrice: 24.99,
          quantity: 1
        }
      ]);
    const [count, setCount] = useState<number>(0);

    //setShoppingCart = useContext(ShoppingCart);
  
    //Metoder ska ändra cartItem (identifierad med id som skickas med via anrop)
    //cartItem som ligger shoppiongCartlistan i Context.
    const handleIncrement = () => {
      if (count < 99) {
        setCount((prevCount) => prevCount + 1);
        //Updatera CartItemQuantity
      }
    };
  
    const handleDecrement = () => {
      if (count > 0) {
        setCount((prevCount) => prevCount - 1);
        //Updatera CartItemQuantity
      }
    };
  
    return (
      <div>
        <h2>VARUKORG</h2>
        <CartList>
            {shoppingCart.map(cartItem => (
            <CartItem>
                {/* <img src={cartItem.imageUrl} alt={cartItem.title} /> */}
                <ItemProp>{cartItem.title}</ItemProp>
                <ItemProp>{cartItem.totItemPrice} kr</ItemProp>
                <CounterContainer>
                    <CounterButton onClick={handleDecrement}>-</CounterButton>
                    <ResultField type="text" value={count} readOnly />
                    <CounterButton onClick={handleIncrement}>+</CounterButton>
                </CounterContainer>
            </CartItem>))}
        </CartList>
      </div>
    );
  }
  

