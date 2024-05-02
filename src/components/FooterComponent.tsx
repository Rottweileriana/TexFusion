import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const FooterComponent: React.FC = () => {
  return (
    <MainDiv>
      <CopyRightInfoTextWrapper>
        <p>CopyRight © {new Date().getFullYear()}</p>

        <CopyRightInfoText>
          | TexFusion | texfusion@texfusion.se | +4671234567
        </CopyRightInfoText>
      </CopyRightInfoTextWrapper>
      <FooterNavbar>
        <FooterNavbarElements>
          <NavLinkStyle to="/">Hem</NavLinkStyle>
          <NavLinkStyle to="/About">Om Oss</NavLinkStyle>
          <NavLinkStyle to="/Contact">Kontakt</NavLinkStyle>
        </FooterNavbarElements>
      </FooterNavbar>
    </MainDiv>
  );
};

const CopyRightInfoTextWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const CopyRightInfoText = styled.p`
  color: #ffc000;
  margin-left: 5px;
`;

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100px;
  background-color: black;
  bottom: 0;
  padding-bottom: 0;
`;

const FooterNavbar = styled.ul`
  display: flex;
  justify-content: center;
  list-style-type: none;
  margin: 0px;
  overflow: hidden;
  cursor: pointer;
  padding: 5px;
`;

const FooterNavbarElements = styled.li`
  float: left;
  display: flex;
`;

const NavLinkStyle: typeof NavLink = styled(NavLink)`
  display: block;
  color: white;
  font-family: "Open Sans";
  font-size: 15px;
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
