import styled from "styled-components";
import {
  useContext,
  FontAwesomeIcon,
  faShoppingCart,
  useParams,
  useLocation,
} from "./index";
import { CartContext } from "./context";
import { Link } from "react-scroll";
import { NavLink } from "react-router-dom";

export const NavBarComponent: React.FC = () => {
  const { cart } = useContext(CartContext)!;
  const location = useLocation();

  let totCartQuant = 0;

  try {
    totCartQuant = cart.reduce((total, item) => total + item.quantity, 0);
  } catch (error) {
    console.error("Error calculating total quantity in cart:", error);
  }

  return (
    <>
     {location.pathname === "/" ? (
      <NavbarBackgroundHome>
      <MainDiv>
        <LogoContainer>
          <LogoNavLink to="/">
            <img src="https://fakeimg.pl/150x150" />
          </LogoNavLink>
        </LogoContainer>
        <LogotextSubnavbarContainer>
          <LogoTextContainer>
            <NavBarLogoTextLeft>Tex</NavBarLogoTextLeft>
            <NavBarLogoTextRight>Fusion</NavBarLogoTextRight>
          </LogoTextContainer>
            <NavBarListSub></NavBarListSub>
        </LogotextSubnavbarContainer>
        <NavBarListMain>
          <NavLinkStyleHome to="/Menu">MENY</NavLinkStyleHome>
          <NavLinkStyleHome to="/Info/OmOss">OM OSS</NavLinkStyleHome>
          <NavLinkStyleHome to="/Info/Kontakt">KONTAKT</NavLinkStyleHome>
          <NavLinkStyleHome to="/Shoppingcart">
            <Badge>
              {totCartQuant > 0 && (totCartQuant > 10 ? "10+" : totCartQuant)}
            </Badge>
            <FontAwesomeIcon icon={faShoppingCart} />
          </NavLinkStyleHome>
        </NavBarListMain>
      </MainDiv>
    </NavbarBackgroundHome>
     ) : (<NavbarBackground>
      <MainDiv>
        <LogoContainer>
          <LogoNavLink to="/">
            <img src="https://fakeimg.pl/150x150" />
          </LogoNavLink>
        </LogoContainer>
        <LogotextSubnavbarContainer>
          <LogoTextContainer>
            <NavBarLogoTextLeft>Tex</NavBarLogoTextLeft>
            <NavBarLogoTextRight>Fusion</NavBarLogoTextRight>
          </LogoTextContainer>
          {location.pathname === "/Menu" ? (
            <NavBarListSub>
              <LinkStyle
                activeClass="active"
                to="CourseMenu"
                spy={true}
                smooth={true}
                offset={-162}
                duration={500}
              >
                HUVUDRÄTTER
              </LinkStyle>
              <LinkStyle
                activeClass="active"
                to="SidesMenu"
                spy={true}
                smooth={true}
                offset={-162}
                duration={500}
              >
                TILLBEHÖR
              </LinkStyle>
              <LinkStyle
                activeClass="active"
                to="CocktailMenu"
                spy={true}
                smooth={true}
                offset={-162}
                duration={500}
              >
                COCKTAILS
              </LinkStyle>
            </NavBarListSub>
          ) : (
            <NavBarListSub></NavBarListSub>
          )}
        </LogotextSubnavbarContainer>
        <NavBarListMain>
          <NavLinkStyle to="/Menu">MENY</NavLinkStyle>
          <NavLinkStyle to="/Info/OmOss">OM OSS</NavLinkStyle>
          <NavLinkStyle to="/Info/Kontakt">KONTAKT</NavLinkStyle>
          <NavLinkStyle to="/Shoppingcart">
            <Badge>
              {totCartQuant > 0 && (totCartQuant > 10 ? "10+" : totCartQuant)}
            </Badge>
            <FontAwesomeIcon icon={faShoppingCart} />
          </NavLinkStyle>
        </NavBarListMain>
      </MainDiv>
    </NavbarBackground>)}
    </>
  );
};

//#region CSS

const NavbarBackground = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  background-color: ${location.pathname === "/Info/OmOss" ? "#535bf2" : "#fbe3d6"};
  z-index: 9999;
  width: 100%;
  height: 175px;
  position: fixed;
  top: 0;
  z-index: 9999;
`;

const NavbarBackgroundHome = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  background-color: rgba(0, 0, 0, 0);
  z-index: 9999;
  width: 100%;
  height: 175px;
  position: fixed;
  top: 0;
  z-index: 9999;
`;

const MainDiv = styled.div`
  display: flex;
  margin: 0;
  padding: 0;
  align-items: center;
  justify-content: space-between;
  width: 95%;
  max-width: 1200px;
  height: 95%;
  z-index: 9999;
`;

const LogoContainer = styled.div`
  display: flex;
  width: 33%;
  height: 150px;
`;

const LogoNavLink: typeof NavLink = styled(NavLink)`
  display: flex;
  width: 100%;
  height: 100%;
  text-decoration: none;
  &:hover {
    cursor: pointer;
  }
`;

const LogotextSubnavbarContainer = styled.div`
  width: 33%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LogoTextContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 9999;
`;

const NavBarLogoTextLeft = styled.h1`
  display: flex;
  height: 75%;
  justify-content: center;
  align-items: flex-end;
  font-family: "Parisienne";
  font-size: 70px;
  color: #e7dc43;
  margin: 0;
  padding: 0;
`;

const NavBarLogoTextRight = styled.h1`
  display: flex;
  height: 75%;
  justify-content: center;
  align-items: flex-end;
  font-family: "Parisienne";
  font-size: 70px;
  color: #156082;
  margin: 0;
  padding: 0;
`;

const NavBarListSub = styled.div`
  display: flex;
  height: 25%;
  width: 350px;
  align-items: flex-end;
  justify-content: space-between;
  list-style-type: none;
  margin: 0;
  padding: 0;
  cursor: pointer;
`;

const NavBarListMain = styled.div`
  list-style-type: none;
  display: flex;
  justify-content: flex-end;
  margin: 0 0 95px 0;
  padding-top: 20px;
  width: 33%;
  overflow: hidden;
  cursor: pointer;
  z-index: 9999;
`;

// const NavBarListElements = styled.li`
//   color:white;
//   display:flex;
//   flex-direction: row;
// `;

const LinkStyle = styled(Link)`
  display: block;
  color: grey;
  font-family: "Open Sans";
  font-size: 14px;
  margin: 0px;
  text-align: center;
  text-decoration: none;
  position: relative;
  border-radius: 5px;
  &:hover {
    color: #cc5500;
  }
`;

const NavLinkStyle: typeof NavLink = styled(NavLink)`
  display: block;
  color: #2b4175;
  font-family: "Open Sans";
  font-size: 14px;
  margin: 0 20px 0 15px;
  text-align: center;
  text-decoration: none;
  position: relative;
  border-radius: 5px;
  &:hover {
    color: #eca884;
  }
`;

const NavLinkStyleHome: typeof NavLink = styled(NavLink)`
  display: block;
  color: #ffc000;
  font-family: "Open Sans";
  font-size: 14px;
  margin: 0 20px 0 15px;
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
  top: -7px;
  right: -20px;
  background-color: #eca884;
  color: black;
  border-radius: 50%;
  padding: 0 2px;
  font-size: 12px;
  min-width: 20px;
  text-align: center;
`;

//#endregion CSS
