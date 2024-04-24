import styled from "styled-components";
import {
  useContext,
  useEffect,
  FontAwesomeIcon,
  faShoppingCart,
  faBars,
  useLocation,
} from "./index";
import { CartContext } from "./context";
import { Link } from "react-scroll";
import { NavLink } from "react-router-dom";

export const NavBarComponent: React.FC = () => {
  const { cart } = useContext(CartContext)!;
  const location = useLocation();
  const WomanLogoTopLeft = `/src/assets/images/WomanLogo.png`;

  let totCartQuant = 0;

  try {
    totCartQuant = cart.reduce((total, item) => total + item.quantity, 0);
  } catch (error) {
    console.error("Error calculating total quantity in cart:", error);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  //<i class="fa fa-bars" aria-hidden="true"></i>

  return (
    <>
      {location.pathname === "/" ? (
        <NavbarBackgroundHome>
          <MainDiv>
            <LogoContainer>
              {/* <LogoNavLink to="/">
                <img src={WomanLogoTopLeft} alt="WomanLogoTopLeft" />
              </LogoNavLink> */}
            </LogoContainer>
            <HamburgerMenuButtonHome>
                <FontAwesomeIcon icon={faBars} />
              </HamburgerMenuButtonHome>
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
              <img src={WomanLogoTopLeft} alt="WomanLogoTopLeft" />
            </LogoNavLink>
          </LogoContainer>
          <LogotextSubnavbarContainer>
            <TexFusionLogoTextContainer>
              <TexFusionLogoImage src="/src/assets/images/TexFusionLogo.jpg" alt="TexFusionLogotype" />
            </TexFusionLogoTextContainer>
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
          <HamburgerMenuButton>
                <FontAwesomeIcon icon={faBars} />
              </HamburgerMenuButton>
          <NavBarListMain>
            <NavLinkStyle to="/Menu">MENY</NavLinkStyle>
            <NavLinkStyle to="/Info/OmOss">OM OSS</NavLinkStyle>
            <NavLinkStyle to="/Info/Kontakt">KONTAKT</NavLinkStyle>
            <NavLinkStyle to="/Shoppingcart">
              <CartIconAndBadge>
                <FontAwesomeIcon icon={faShoppingCart} />
                <Badge>
                  {totCartQuant > 0 && (totCartQuant > 10 ? "10+" : totCartQuant)}
                </Badge>
              </CartIconAndBadge>
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
  background-color: ${location.pathname === "/Info/OmOss" ? "#535bf2" : "#F9DDD2"};
  z-index: 9999;
  width: 100%;
  height: 175px;
  position: fixed;
  top: 0;
  z-index: 9999;

  @media (max-width: 768px) {
    height: 100px;
  }
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
  justify-content:space-between;
  width: 95%;
  max-width: 2048px;
  height: 95%;
  z-index: 9999;
`;

const LogoContainer = styled.div`
  display: flex;
  align-self: center;
  width: 22%;
  height: 120px;
  margin-left: 0px;  
`;

const LogoNavLink: typeof NavLink = styled(NavLink)`
  display: flex;
  width: 115px;
  height: 100%;
  border-radius:90px;
  text-decoration: none;
  &:hover {
    cursor: pointer;
  }

  @media (max-width: 900px) {
    visibility: hidden;
  }
`;

const LogotextSubnavbarContainer = styled.div`
  width: 30%;
  min-width:30%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  justify-self:center;
`;

const TexFusionLogoTextContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 9999;
  size: 50px;
`;

const TexFusionLogoImage = styled.img`
  min-width:420px;
  max-width: 95%;
  max-height: 95%;

  @media (max-width: 768px) {
    margin-top: 20px;
    min-width: 230px;
    object-fit: cover;
  }
`;

/* const NavBarLogoTextLeft = styled.h1`
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
`; */

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

  
  @media (max-width: 768px) {
    visibility: hidden;
  }
`;

const NavBarListMain = styled.div`
  overflow:visible;
  list-style-type: none;
  display: flex;
  justify-content: flex-end;
  justify-self:flex-end;
  margin: 0 0 95px 0;
  padding-top: 20px;
  width: 22%;
  overflow: visible;
  cursor: pointer;
  z-index: 9999;
  position: relative;

  @media (max-width: 1200px) {
    visibility: hidden;
  }
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
  width:25%;
  min-width:75px;
  max-width:100px;
  height:100%;
  margin: 0 0 0 0;
  padding:0 5px 0 0;
  text-align: center;
  text-decoration: none;
  &:hover {
    color: #eca884;
  }
`;

const NavLinkStyleHome: typeof NavLink = styled(NavLink)`
  display: block;
  color: #ffc000;;
  font-family: "Open Sans";
  font-size: 14px;
  width:25%;
  min-width:75px;
  max-width:100px;
  height:100%;
  margin: 0 0 0 0;
  padding:0 5px 0 0;
  text-align: center;
  text-decoration: none;
  position: relative;
  &:hover {
    color: #eca884;
  }
`;

const CartIconAndBadge = styled.span`
  position: relative;
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

const HamburgerMenuButtonHome = styled.div`
  display: none;
  cursor: pointer;

  @media (max-width: 1200px) {
    display: block;
    position: absolute;
    top: 36px;
    right: 45px;
    z-index: 9999;

    & > svg {
      font-size: 25px;
      font-weight: 100;
      color: #ffc000;
    }
  }
`;

//"#535bf2" : "#F9DDD2"

const HamburgerMenuButton = styled.div`
  display: none;
  cursor: pointer;

  @media (max-width: 1200px) {
    display: block;
    position: absolute;
    top: 36px;
    right: 45px;
    z-index: 9999;

    & > svg {
      font-size: 25px;
      font-weight: 100;
      color: #2b4175;
    }
  }
`;

//#endregion CSS
