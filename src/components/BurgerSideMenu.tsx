import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useNavigate } from "./index";

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
  font-family: "Open Sans";
`;

const ButtonStyle = styled.button`
  margin-left: 50px;
  font-size: 13px;
  padding:2px;
  color: lightgrey;
  background-color:#333333;
  font-family: "Open Sans";
  border:none;
  &:focus {
    outline: none;
  }
  &:hover {
    color:#535bf2;
    border:none;
  }
`;

const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  padding: 0;
  font-family: "Open Sans";
  font-weight: 300;
  font-size: 20px;
  color: lightgrey;
  margin: 0 0 30px 20px;;
`;
//#endregion

export function BurgerSideMenu({
  isOpen,
  setIsOpen,
}: SideMenuProps): JSX.Element {
  const OpenCloseSidebar = () => {
    setIsOpen(!isOpen);
  };

  const navigate = useNavigate();

   const GoToMenuAndSubLink = (number: number) => {
     // 
     let offset = 0;
     switch (number) {
       case 1:
         //Navigera till menyn
         navigate('/Menu');
         //Aktivera timer så scroll sker efter component är renderad
         setTimeout(() => {
           //Definera courseMenuElemnt som HTMLelement och kan ej vara null
           const courseMenuElement: HTMLElement = document.getElementById('CourseMenu')!;
           //Scrolla till ElementID i routing + offset
           window.scrollTo(0, courseMenuElement?.offsetTop + offset);
         }, 100);
         OpenCloseSidebar();
         break;
       case 2:
         offset = -162;
         navigate('/Menu');
         setTimeout(() => {
           const sidesMenuElement: HTMLElement = document.getElementById('SidesMenu')!;
           window.scrollTo(0, sidesMenuElement?.offsetTop + offset);
         }, 180); // Adjust delay as needed
         OpenCloseSidebar();
         break;
       case 3:
         offset = -162;
         navigate('/Menu');
         setTimeout(() => {
           const cocktailMenuElement: HTMLElement = document.getElementById('CocktailMenu')!;
           window.scrollTo(0, cocktailMenuElement?.offsetTop + offset);
         }, 180);
         OpenCloseSidebar();
         break;
       default:
        navigate('/Menu');
        break;
     }
  }

  return (
      <BurgerSideMenuContainer isOpen={isOpen}>
        <CloseButton onClick={() => OpenCloseSidebar()}>
          x</CloseButton>
        <NavLinkStyle to="/Menu" onClick={() => OpenCloseSidebar()}>
          MENY</NavLinkStyle>
          <ButtonStyle onClick={() => GoToMenuAndSubLink(1)}>Huvudrätt</ButtonStyle>
          <ButtonStyle onClick={() => GoToMenuAndSubLink(2)}>Tillbehör</ButtonStyle>
          <ButtonStyle onClick={() => GoToMenuAndSubLink(3)}>Cocktails</ButtonStyle>
        <NavLinkStyle to="/Shoppingcart" onClick={() => OpenCloseSidebar()}>
          VARUKORG</NavLinkStyle>
        <NavLinkStyle to="/About" onClick={() => OpenCloseSidebar()}>
          OM OSS</NavLinkStyle>
        <NavLinkStyle to="/Contact" onClick={() => OpenCloseSidebar()}>
          KONTAKT</NavLinkStyle>
        <NavLinkStyle to="/" onClick={() => OpenCloseSidebar()}>
          HEM</NavLinkStyle>
      </BurgerSideMenuContainer>
  );
}
