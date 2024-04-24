import styled from "styled-components";
import { Link } from "react-scroll";
import { NavLink } from "react-router-dom";

type SideMenuProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

interface StylesProps {
  isOpen: boolean;
}

//#region Styles

const BurgerSideMenuContainer = styled.div<StylesProps>`
  //display: none;
  display: ${({ isOpen }: { isOpen: boolean }) => (isOpen ? "flex" : "none")};
  flex-direction: column;
  align-items: flex-start;
  height: 100vh;
  width: 80%;
  background-color: #333333;
  padding-top: 100px;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 99999;
  transition: right;
`;

const SubLinkMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const NavLinkStyle: typeof NavLink = styled(NavLink)`
  margin-left: 20px;
  color: lightgrey;
`;

const LinkStyle: typeof Link = styled(Link)`
  margin-left: 50px;
  color: lightgrey;
`;

//#endregion

export function BurgerSideMenu({
  isOpen,
  setIsOpen,
}: SideMenuProps): JSX.Element {
  const OpenCloseSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <BurgerSideMenuContainer isOpen={isOpen}>
        <button onClick={() => OpenCloseSidebar()}>Close</button>
        <NavLinkStyle to="/Menu">MENY</NavLinkStyle>
        <SubLinkMenuContainer>
          <LinkStyle
            activeClass="active"
            to="CourseMenu"
            spy={true}
            smooth={true}
            offset={-162}
            duration={500}
          >
            Huvudrätter
          </LinkStyle>
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
          <LinkStyle
            activeClass="active"
            to="CocktailMenu"
            spy={true}
            smooth={true}
            offset={-162}
            duration={500}
          >
            Cocktails
          </LinkStyle>
        </SubLinkMenuContainer>
        <NavLinkStyle to="/Shoppingcart">VARUKORG</NavLinkStyle>
        <NavLinkStyle to="/Info/OmOss">OM OSS</NavLinkStyle>
        <NavLinkStyle to="/Info/Kontakt">KONTAKT</NavLinkStyle>
        <NavLinkStyle to="/">HEM</NavLinkStyle>
      </BurgerSideMenuContainer>
    </>
  );
}
