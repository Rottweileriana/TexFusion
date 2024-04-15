import styled from "styled-components";
import { useContext, FontAwesomeIcon, faShoppingCart } from "./index";
import { CartContext } from "./context";
import { Link, animateScroll as scroll } from "react-scroll";
import { NavLink } from "react-router-dom"

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
        <LogoContainer>
          <img src="https://fakeimg.pl/150x150"/>
        </LogoContainer>
        <LogotextSubnavbarContainer>
          <NavBarLogo>TexFusion</NavBarLogo>
          <NavBarListSub>
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
          </NavBarListSub>
        </LogotextSubnavbarContainer>
        <NavBarListMain>
          <NavBarListElements>
            <NavLinkStyle
              to="/menu"
            >
              Meny
            </NavLinkStyle>
            <NavLinkStyle
              to="/"
            >
              Home
            </NavLinkStyle>
            <NavLinkStyle
              to="/Info/OmOss" 
            >
              Om Oss
            </NavLinkStyle>
            <NavLinkStyle
              to="/Info/Kontakt"
            >
              Kontakt
            </NavLinkStyle>
            <NavLinkStyle
              to="/Shoppingcart"
            >
              <Badge>
                {totCartQuant > 0 && (totCartQuant > 10 ? "10+" : totCartQuant)}
              </Badge>
              <FontAwesomeIcon icon={faShoppingCart} />
            </NavLinkStyle>
          </NavBarListElements>
        </NavBarListMain>
      </MainDiv>
    </>
  );
};

//#region CSS

const LogoContainer = styled.div`
  display:flex;
  width:150px;
  height:150px;
`;

const LogotextSubnavbarContainer = styled.div`
  width:250px;
  height:100%;
  display:flex;
  flex-direction: column;
  align-items:center;
  justify-content:center;
`;

const MainDiv = styled.div`
  display: flex;
  margin: 0;
  padding: 0;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 250px;
  position: fixed;
  top: 0;
  margin-bottom: 10px;
  background-color: #145775;
`;

const NavBarLogo = styled.h1`
  display:flex;
  height:50%;
  justify-content:center;
  align-items:flex-end;
  font-family: "Open Sans";
  font-size: 50px;
  font-weight: bold;
  color: #eca884;
  margin: 0;
  padding: 0;
`;

const NavBarListMain = styled.ul`
  list-style-type: none;
  display:flex;
  margin: 0px;
  overflow: hidden;
  background-color: #145775;
  border-radius: 10px;
  cursor: pointer;
  z-index: 9999;
`;

const NavBarListSub = styled.ul`
  display:flex;
  height:50%;
  justify-content:center;
  align-items:flex-end;
  list-style-type: none;
  margin: 0px;
  padding: 0px;
  background-color: #145775;
  cursor: pointer;
  z-index: 9999;
`;

const NavBarListElements = styled.li`
  color:white;
  display:flex;
  flex-direction: row;
`;
// box-shadow: 0 0 10px rgba(0,0,0,0,5);
const LinkStyle = styled(Link)`
  display: block;
  color: white;
  font-family: "Open Sans";
  font-size: 20px;
  margin: 0px;
  text-align: center;
  padding: 5px 35px;
  text-decoration: none;
  position: relative;
  border-radius: 5px;
  &:hover {
    color: #eca884;
  }
`;

const NavLinkStyle: (typeof NavLink) = styled(NavLink)`
  display: block;
  color: white;
  font-family: "Open Sans";
  font-size: 15px;
  margin: 0px;
  padding-right:10px;
  text-align: center;
  text-decoration: none;
  position: relative;
  border-radius: 5px;
  &:hover {
    color: #eca884;
  }
`;

const Badge = styled.span`
  position: absolute;
  font-family: Arial, Helvetica, sans-serif;
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
