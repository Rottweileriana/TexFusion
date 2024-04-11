import { Link, animateScroll as scroll } from "react-scroll";
import { NavLink } from "react-router-dom"
import styled from "styled-components";

export const FooterComponent: React.FC = () => {
    return (
        <MainDiv>
            <FooterNavbar>
                <FooterNavbarElements>
                <NavLinkStyle
              to="/"
            >
              Hem
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
                </FooterNavbarElements>
            </FooterNavbar>
        </MainDiv>
    )
}

const MainDiv = styled.div`
display: flex;
justify-content: center;
margin-top: 50;
`;

const FooterNavbar = styled.ul`
  position: fixed;
  bottom: 0;
  list-style-type: none;
  margin: 0px;
  overflow: hidden;
  background-color: #940fc9;
  border-radius: 10px;
  cursor: pointer;
  z-index: 9999;
  background-color: #333333;
  padding: 5px;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;

`;

const FooterNavbarElements = styled.li`
  float: left;
  display: flex;
`;

const LinkStyle = styled(Link)`
  display: block;
  color: white;
  font-family: "Parisienne";
  font-size: 20px;
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

const NavLinkStyle: typeof NavLink = styled(NavLink)`
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