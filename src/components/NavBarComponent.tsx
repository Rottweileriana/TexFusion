import styled from "styled-components";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faShoppingCart} from '@fortawesome/free-solid-svg-icons'

export function NavBarComponent({ scrollToRef }){
    return(
        <NavBarList>
            <NavBarListElements>
                <ListATags onClick={() => scrollToRef("CourseMenu")}>
                    Huvudrätt
                </ListATags>
            </NavBarListElements>
            <NavBarListElements>
                <ListATags onClick={() => scrollToRef("SidesMenu")}>
                    Tillbehör
                </ListATags>
            </NavBarListElements>
            <NavBarListElements>
                <ListATags onClick={() => scrollToRef("CocktailMenu")}>
                    Cocktail
                </ListATags>
            </NavBarListElements>
            <NavBarListElements>
                <ListATags onClick={() => scrollToRef("ShoppingCart")}>
                    <FontAwesomeIcon icon={faShoppingCart}/>
                </ListATags>
            </NavBarListElements>
        </NavBarList>
    )
}

const NavBarList = styled.ul`
    position: fixed;
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #333;
    border-radius: 10px;
`;

const NavBarListElements = styled.li`
    float: left;
`;

const ListATags = styled.a`
display: block;
color: white;
text-align: center;
padding: 10px 16px;
text-decoration: none;
&:hover{
    background-color: #444;
    cursor: default;
};
`;

/*
const ListATags = styled(Link)`
    display: block,
    color: white,
    text-align: center,
    padding: 14px 16px,
    text-decoration: none,
    &:hover{
        background-color: #444;
    };
`;
   */ 



