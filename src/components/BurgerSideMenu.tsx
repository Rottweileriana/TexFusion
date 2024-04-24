import styled from "styled-components";
import { Link } from "react-scroll";
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

// const CloseSidebarButton = styled.button`
//   background
// `;

//#endregion

export function BurgerSideMenu({
  isOpen,
  setIsOpen,
}: SideMenuProps): JSX.Element {
  const OpenCloseSidebar = () => {
    setIsOpen(!isOpen);
  };

  const navigate = useNavigate();

//Din tidigare kod David

  /* const GoToMenuAndSubLink = (number: number) => {
    if (number === 1){
      navigate('/Menu');
    }
    else if (number === 2){
      navigate('/Menu', { state: { scrollTop: -162 }, replace: true });
    }
    else if (number === 3){
      navigate('/Menu', { state: { scrollTop: -162 }, replace: true });
    }
    OpenCloseSidebar;
    
  } */

  //Funkar men behöver ses över gemensamt? Finns saker i Navbar som behöver korrigeras

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
        }, 100); // Adjust delay as needed
        OpenCloseSidebar();
        break;
      case 3:
        offset = -162;
        navigate('/Menu');
        setTimeout(() => {
          const cocktailMenuElement: HTMLElement = document.getElementById('CocktailMenu')!;
          window.scrollTo(0, cocktailMenuElement?.offsetTop + offset);
        }, 100);
        OpenCloseSidebar();
        break;
      default:
        navigate('/Menu');
        break;
    }
  }

//skicka med scrollTop värde i urlen till navbar.
  return (
    <>
      <BurgerSideMenuContainer isOpen={isOpen}>
        <button onClick={() => OpenCloseSidebar()}>
          Close</button>
        <NavLinkStyle to="/Menu" onClick={() => OpenCloseSidebar()}>
          MENY</NavLinkStyle>
          <button onClick={() => GoToMenuAndSubLink(1)}>
          Menu1</button>
          <button onClick={() => GoToMenuAndSubLink(2)}>
          Tillbehör2</button>
          <button onClick={() => GoToMenuAndSubLink(3)}>
          Cocktails3</button>
        <SubLinkMenuContainer>
          <LinkStyle
            activeClass="active"
            to="CourseMenu"
            spy={true}
            smooth={true}
            offset={-162}
            duration={500}
            onClick={() => GoToMenuAndSubLink(1)}>
            Huvudrätter
          </LinkStyle>
          <LinkStyle
            activeClass="active"
            to="SidesMenu"
            spy={true}
            smooth={true}
            offset={-162}
            duration={500}
            onClick={() => GoToMenuAndSubLink(2)}>
            Tillbehör
          </LinkStyle>
          <LinkStyle
            activeClass="active"
            to="CocktailMenu"
            spy={true}
            smooth={true}
            offset={-162}
            duration={500}
            onClick={() => GoToMenuAndSubLink(3)}>
            Cocktails
          </LinkStyle>
        </SubLinkMenuContainer>
        <NavLinkStyle to="/Shoppingcart" onClick={() => OpenCloseSidebar()}>
          VARUKORG</NavLinkStyle>
        <NavLinkStyle to="/Info/OmOss" onClick={() => OpenCloseSidebar()}>
          OM OSS</NavLinkStyle>
        <NavLinkStyle to="/Info/Kontakt" onClick={() => OpenCloseSidebar()}>
          KONTAKT</NavLinkStyle>
        <NavLinkStyle to="/" onClick={() => OpenCloseSidebar()}>
          HEM</NavLinkStyle>
      </BurgerSideMenuContainer>
    </>
  );
}
