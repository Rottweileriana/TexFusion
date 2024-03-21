import React from "react";
import styled from "styled-components";

type CocktailProps = {
  // idDrink: string;
  strDrink: string;
  // strAlcoholic: string;
  strDrinkThumb: string;
  // price: number;
  recommended?: string;
};

const StyledCocktail = styled.div`
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
  width: 100px;
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

const Cocktail: React.FC<CocktailProps> = ({
  strDrinkThumb,
  strDrink,
  // strAlcoholic,
  // price,
  recommended,

}) => {

  return (
    <StyledCocktail>
      <Image src={strDrinkThumb} alt={strDrink} />
      <div>
        <Title>{strDrink}</Title>
        {/* <Text>{strAlcoholic}</Text> */}
        <Text>50 kr {recommended}</Text>
      </div>
    </StyledCocktail>
  );
};

export default Cocktail;
