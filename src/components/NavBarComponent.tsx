import styled from "styled-components";
import { useContext, FontAwesomeIcon, faShoppingCart } from "./index";
import { CartContext } from "./context";
import { Link, animateScroll as scroll } from "react-scroll";

export const NavBarComponent: React.FC = () => {
  const { cart } = useContext(CartContext)!;

  let totCartQuant = 0;

  try {
    totCartQuant = cart.reduce((total, item) => total + item.quantity, 0);
  } catch (error) {
    console.error("Error calculating total quantity in cart:", error);
  }

  return (
    <>
      <MainDiv>
        <NavBarList>
          <NavBarLogo>TexFusion</NavBarLogo>
          <NavBarListElements>
            <LinkStyle
              activeClass="active"
              to="CourseMenu"
              spy={true}
              smooth={true}
              offset={-162}
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
              offset={-162}
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
              offset={-162}
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
              offset={-120}
              duration={500}
            >
              <Badge>
                {totCartQuant > 0 && (totCartQuant > 10 ? "10+" : totCartQuant)}
              </Badge>
              <FontAwesomeIcon icon={faShoppingCart} />
            </LinkStyle>
          </NavBarListElements>
        </NavBarList>
      </MainDiv>
    </>
  );
};

//#region CSS

const MainDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;

const NavBarLogo = styled.h1`
  font-family: "Parisienne";
  font-size: 50px;
  font-weight: bold;
  color: #eca884;
  margin: 0;
  padding: 0;
`;

const NavBarList = styled.ul`
  position: fixed;
  top: 0;
  list-style-type: none;
  margin: 0px;
  padding: 0px;
  overflow: hidden;
  background-color: #145775;
  border-radius: 10px;
  cursor: pointer;
  z-index: 9999;
`;

const NavBarListElements = styled.li`
  float: left;
`;
// box-shadow: 0 0 10px rgba(0,0,0,0,5);
const LinkStyle = styled(Link)`
  display: block;
  color: white;
  font-family: "Parisienne";
  font-size: 25px;
  margin: 0px;
  text-align: center;
  padding: 5px 35px;
  text-decoration: none;
  position: relative;
  border-radius: 5px;
  &:hover {
    color: #eca884;
    font-size: 22px;
  }
`;

const Badge = styled.span`
  position: absolute;
  top: 0px;
  right: 14px;
  background-color: #eca884;
  color: black;
  border-radius: 50%;
  padding: 0 2px;
  font-size: 12px;
  min-width: 20px;
  text-align: center;
`;

//#endregion CSS
