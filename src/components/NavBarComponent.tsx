import styled from "styled-components";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import React, { useContext } from "react";
import { CartContext } from "./context";
import { Link, animateScroll as scroll } from 'react-scroll';

export const NavBarComponent: React.FC = () => {
  const { cart } = useContext(CartContext)!;

  let totCartQuant = 0;

  try {
    totCartQuant = cart.reduce((total, item) => total + item.quantity, 0);
  } catch (error) {
    console.error('Error calculating total quantity in cart:', error);
  }

  return (
    <MainDiv>
    <NavBarList>
      <NavBarListElements>
        <LinkStyle
          activeClass="active"
          to="CourseMenu"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
        >
          Huvudrätt
        </LinkStyle>
      </NavBarListElements>
      <NavBarListElements>
        <LinkStyle
          activeClass="active"
          to="SidesMenu"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
        >
          Tillbehör
        </LinkStyle>
      </NavBarListElements>
      <NavBarListElements>
        <LinkStyle
          activeClass="active"
          to="CocktailMenu"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
        >
          Cocktail
        </LinkStyle>
      </NavBarListElements>
      <NavBarListElements>
        <LinkStyle
          activeClass="active"
          to="ShoppingCart"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
        >
          <Badge>
            {totCartQuant > 0 && (totCartQuant > 10 ? '10+' : totCartQuant)}
          </Badge>
          <FontAwesomeIcon icon={faShoppingCart}/>
        </LinkStyle>
      </NavBarListElements>
    </NavBarList>
    </MainDiv>
  );
}

//#region CSS

const MainDiv = styled.div`
    display: flex;
    justify-content: center;
`;

const NavBarList = styled.ul`
  position: fixed;
  top: 0;
  list-style-type: none;
  margin: 0px;
  padding: 0;
  overflow: hidden;
  background-color: #333;
  border-radius: 10px;
  cursor: pointer;
`;

const NavBarListElements = styled.li`
  float: left;
`;

const LinkStyle = styled(Link)`
  display: block;
  color: white;
  text-align: center;
  padding: 14px 30px;
  text-decoration: none;
  position: relative;
  &:hover{
    background-color: #444;
  }
`;

const Badge = styled.span`
  position: absolute;
  top: 6px;
  right: 14px;
  background-color: #EAC898;
  color: black;
  border-radius: 50%;
  padding: 0 2px;
  font-size: 12px;
  min-width: 20px;
  text-align: center;
`;

//#endregion CSS
