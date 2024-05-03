import styled from "styled-components";
import { CartContext } from "./context";
import { Link } from "react-scroll";
import { NavLink } from "react-router-dom";
import {
  useContext,
  useEffect,
  useState,
  FontAwesomeIcon,
  faShoppingCart,
  faBars,
  useLocation,
  BurgerSideMenu,
} from "./index";


export const NavBarComponent: React.FC = () => {

  const { cart } = useContext(CartContext)!;
  const location = useLocation();
  const RoundLogo = `/images/RoundLogoPic6.png`;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isScreenSmaller, setIsScreenSmaller] = useState<boolean>(false);

  let totCartQuant = 0;

  try {
    totCartQuant = cart.reduce((total, item) => total + item.quantity, 0);
  } catch (error) {
    console.error("Error calculating total quantity in cart:", error);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleResize = () => {
      setIsScreenSmaller(window.matchMedia("(max-width: 900px)").matches);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [location.pathname]);

  const OpenCloseSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleReload = () => {
    window.location.href = "/";    
  };

  return (
    <>
        <NavbarBackground>
          <MainDiv>
            <LogoContainer>
              {isScreenSmaller ? (
                <LogoNavLink to="/">
                  <TitleSmallScren>Tex Fusion</TitleSmallScren>
                </LogoNavLink>
              ) : (
                <LogoNavLink to="/" onClick={handleReload}>
                  <Logo src={RoundLogo} alt="LogoTopLeft" />
                </LogoNavLink>
              )}
            </LogoContainer>
            <LogotextSubnavbarContainer>
              <TexFusionLogoTextContainer>
                <Title>Tex Fusion</Title>
              </TexFusionLogoTextContainer>
              {location.pathname === "/" ? (
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
            <HamburgerMenuButton onClick={() => OpenCloseSidebar()}>
              <FontAwesomeIcon icon={faBars} />
              <BadgeBurger>
                {totCartQuant > 0 &&
                  (totCartQuant > 10 ? "10+" : totCartQuant)}
              </BadgeBurger>
            </HamburgerMenuButton>
            <BurgerSideMenu isOpen={isOpen} setIsOpen={setIsOpen} />
            <NavBarListMain>
              <NavLinkStyle to="/">MENY</NavLinkStyle>
              <NavLinkStyle to="/About">OM OSS</NavLinkStyle>
              <NavLinkStyle to="/Contact">KONTAKT</NavLinkStyle>
              <NavLinkStyle to="/Shoppingcart">
                <CartIconAndBadge>
                  <FontAwesomeIcon icon={faShoppingCart} />
                  <Badge>
                    {totCartQuant > 0 &&
                      (totCartQuant > 10 ? "10+" : totCartQuant)}
                  </Badge>
                </CartIconAndBadge>
              </NavLinkStyle>
            </NavBarListMain>
          </MainDiv>
        </NavbarBackground>
    </>
  );
};

//#region CSS

const Logo = styled.img`
max-width:150px;
@media (max-width: 900px) {
}
`;

const Title = styled.h2`
font-family: 'Marschel' sans-serif;
    font-size: 32px;
    font-weight: 30px;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: white;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
    margin:0;
    padding:0;
    min-width:34px;
    overflow:show;
    @media (max-width: 900px) {
      visibility: hidden;
    }
`;

const TitleSmallScren = styled.h2`
font-family: 'Marschel' sans-serif;
    font-size: 32px;
    font-weight: 30px;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: white;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
    margin:0;
    padding:0;
    min-width:34px;
    height:auto;
    @media (max-width:  768px) {
      font-size:18px;
    }
`;
//SUPREME HACK
const SubTitle = styled.p`
font-family: 'Marschel' sans-serif;
    font-size: 10px;
    font-weight: 30px;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: white;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
    margin:0;
    padding:0;
    @media (max-width:  900px) {
      visibility: hidden;
    }
`;
const NavbarBackground = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  background-color: #4c041d;
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

//#7B0E34

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
  max-width: 2048px;
  height: 95%;
  z-index: 9999;
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction:column;
  align-self: center;
  width: 22%;
  height: 120px;
  margin-left: 0px;
  min-width:250px;
`;

const LogoNavLink: typeof NavLink = styled(NavLink)`
  display: flex;
  align-items:center;
  width: 115px;
  height: 100%;
  border-radius: 90px;
  text-decoration: none;
  &:hover {
    cursor: pointer;
  }
`;

const LogotextSubnavbarContainer = styled.div`
  width: 30%;
  min-width: 30%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  justify-self: center;
`;

const TexFusionLogoTextContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 9999;
  size: 50px;
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

  @media (max-width: 900px) {
    visibility: hidden;
  }
`;

const NavBarListMain = styled.div`
  overflow: visible;
  list-style-type: none;
  display: flex;
  justify-content: flex-end;
  justify-self: flex-end;
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



const LinkStyle = styled(Link)`
  display: block;
  color:white;
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
  color: white;
  font-family: "Open Sans";
  font-size: 14px;
  width: 25%;
  min-width: 75px;
  max-width: 100px;
  height: 100%;
  margin: 0 0 0 0;
  padding: 0 5px 0 0;
  text-align: center;
  text-decoration: none;
  &:hover {
    color: #eca884;
  }
`;

const NavLinkStyleHome: typeof NavLink = styled(NavLink)`
  display: block;
  color: white;
  font-family: "Open Sans";
  font-size: 14px;
  width: 25%;
  min-width: 75px;
  max-width: 100px;
  height: 100%;
  margin: 0 0 0 0;
  padding: 0 5px 0 0;
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
  top: -9px;
  right: -22px;
  background-color: #cc5500;
  color: black;
  border-radius: 50%;
  padding: 0 2px;
  font-size: 12px;
  min-width: 20px;
  text-align: center;
`;

const BadgeBurger = styled.span`
  position: absolute;
  font-family: Arial, Helvetica, sans-serif;
  top: -1px;
  right: -3px;
  background-color: #cc5500;
  color: black;
  border-radius: 50%;
  padding: 0 2px;
  font-size: 15px;
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
      color: white;
    }
  }
`;

const HamburgerMenuButton = styled.button`
  display: none;
  cursor: pointer;
  border: none;
  background-color: rgba(0, 0, 0, 0);

  @media (max-width: 1200px) {
    display: block;
    position: absolute;
    top: 36px;
    right: 45px;
    z-index: 9999;

    & > svg {
      font-size: 25px;
      font-weight: 100;
      color: white;
    }
  }
`;

//#endregion CSS