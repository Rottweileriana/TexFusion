import React, { useState } from "react";
import styled from "styled-components";

type SideProps = {
    imageUrl: string;
    title: string;
    price: number;
  };

  const StyledSide = styled.div`
  display: flex;
  width: 300px;
  height: 100px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px;
  background-color: #e0e0e0;
  color: black;
  margin-bottom: 10px;
  text-align: left;
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 5px;
  border: 1px solid #000;
  margin-right: 20px;
`;

const Title = styled.h3`
  margin: 0;
`;

const Price = styled.p`
  margin: 0;
  margin-top: 5px;
`;

const CounterBtnRight = styled.div`
  display: flex;
  justify-content: right;
  width: 175px;
`;

const CounterContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-top: 10px;
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

const SidesComponent: React.FC<SideProps> = ({
  imageUrl,
  title,
  price = 15,

}) => {
  const [count, setCount] = useState<number>(0);

  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount((prevCount) => prevCount - 1);
    }
  };

  return (
    <StyledSide>
      <Image src={imageUrl} alt={title} />
      <div>
        <Title>{title}</Title>
        <Price>{price} kr</Price>
        <CounterBtnRight>
          <CounterContainer>
            <CounterButton onClick={handleDecrement}>-</CounterButton>
            <ResultField type="text" value={count} readOnly />
            <CounterButton onClick={handleIncrement}>+</CounterButton>
          </CounterContainer>
        </CounterBtnRight>
      </div>
    </StyledSide>
  );
};

export default SidesComponent;
