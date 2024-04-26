import styled from "styled-components";
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
  display: ${({ isOpen }: { isOpen: boolean }) => (isOpen ? "flex" : "none")};
  flex-direction: column;
  align-items: flex-start;
  height: 100vh;
  width: 50%;
  max-width: 200px;
  background-color: #333333;
  padding-top: 45px;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 99999;
  transition: right;
  font-family: "Open Sans";
  font-weight: 300;
  font-size: 15px;
`;

const NavLinkStyle: typeof NavLink = styled(NavLink)`
  margin-left: 20px;
  color: lightgrey;
`;

const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  padding: 0;
  font-family: "Open Sans";
  font-weight: 300;
  font-size: 20px;
  color: lightgrey;
  margin: 0 0 30px 20px;
`;

//#endregion

export function BurgerSideMenu({
  isOpen,
  setIsOpen,
}: SideMenuProps): JSX.Element {
  const OpenCloseSidebar = () => {
    setIsOpen(!isOpen);
  };

  //skicka med scrollTop värde i urlen till navbar.
  return (
    <>
      <BurgerSideMenuContainer isOpen={isOpen}>
        <CloseButton onClick={() => OpenCloseSidebar()}>x</CloseButton>
        <NavLinkStyle to="/Menu" onClick={() => OpenCloseSidebar()}>
          MENY
        </NavLinkStyle>
        <NavLinkStyle to="/Shoppingcart" onClick={() => OpenCloseSidebar()}>
          VARUKORG
        </NavLinkStyle>
        <NavLinkStyle to="/Info/OmOss" onClick={() => OpenCloseSidebar()}>
          OM OSS
        </NavLinkStyle>
        <NavLinkStyle to="/Info/Kontakt" onClick={() => OpenCloseSidebar()}>
          KONTAKT
        </NavLinkStyle>
        <NavLinkStyle to="/" onClick={() => OpenCloseSidebar()}>
          HEM
        </NavLinkStyle>
      </BurgerSideMenuContainer>
    </>
  );
}
