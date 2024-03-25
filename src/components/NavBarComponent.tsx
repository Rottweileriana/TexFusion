import styled from "styled-components";
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faShoppingCart} from '@fortawesome/free-solid-svg-icons'
import React, { useState, useContext } from "react";
import { CartContext } from "./context";
import { Link, animateScroll as scroll } from 'react-scroll';


export const NavBarComponent: React.FC = () => {
    const { cart } = useContext(CartContext)!;

    // Variabel för logic till navbar-varukorg
    const totCartQuant = cart.reduce((total, item) => total + item.quantity, 0);

    return(
        
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
                duration={500}>
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
                duration={500}>
                    Cocktail
                </LinkStyle>
            </NavBarListElements>
            <NavBarListElements>
            {totCartQuant > 10 ? (
                <LinkStyle
                activeClass="active"
                to="ShoppingCart"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}>
                10+
                <FontAwesomeIcon icon={faShoppingCart}/>
                </LinkStyle>
            ) : totCartQuant > 0 ? (
                <LinkStyle
                activeClass="active"
                to="ShoppingCart"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}>
                    {totCartQuant}
                    <FontAwesomeIcon icon={faShoppingCart}/>
                </LinkStyle>
            ) : (
                <LinkStyle
                activeClass="active"
                to="ShoppingCart"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}>
                    <FontAwesomeIcon icon={faShoppingCart}/>
                </LinkStyle>
            )}
                
            </NavBarListElements>
        </NavBarList>
    )
}
//#region CSS
const NavBarList = styled.ul`
    position: fixed;
    list-style-type: none;
    margin: 0px;
    padding: 0;
    overflow: hidden;
    background-color: #333;
    border-radius: 10px;
`;

const NavBarListElements = styled.li`
    float: left;
`;

// remember* CSS för flera sidor med LINK - Används ej vid singlepage-application


const LinkStyle = styled(Link)`
    display: block;
    color: white;
    text-align: center;
    padding: 14px 30px;
    text-decoration: none
    &:hover{
        background-color: #444;
`;



//#endregion CSS

