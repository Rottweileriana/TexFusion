import React from "react";
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
  background-color: #f2f2f2;
  color: black;
  margin-bottom: 10px;
  text-align: left;
`;

const Image = styled.img`npm
  width: height;
  height: 100px;
  border-radius: 1px;
  margin-right: 20px;
`;

const Title = styled.h3`
  margin: 0;
`;

const Text = styled.p`
  margin: 5px;
  padding-right: 5px;
`;

const SidesComponent: React.FC<SideProps> = ({
  imageUrl,
  title,
  price = 15,

}) => {

  return (
    <StyledSide>
      <Image src={imageUrl} alt={title} />
      <div>
        <Title>{title}</Title>
        <Text>{price} kr</Text>
      </div>
    </StyledSide>
  );
};

export default SidesComponent;
