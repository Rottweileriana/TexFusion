import { Link, animateScroll as scroll } from "react-scroll";
import styled from "styled-components";

export const FooterComponent: React.FC = () => {
    return (
        <MainDiv>
            <FooterNavbar>
                <FooterNavbarElements>
                    <LinkStyle
                        activeClass="active"
                        to="Home"
                        spy={true}
                        smooth={true}
                        offset={-162}
                        duration={500}
                    >
                        Home
                    </LinkStyle>
                </FooterNavbarElements>
                <FooterNavbarElements>
                    <LinkStyle
                        activeClass="active"
                        to="AboutUs"
                        spy={true}
                        smooth={true}
                        offset={-162}
                        duration={500}
                    >
                        About us
                    </LinkStyle>
                </FooterNavbarElements>
                <FooterNavbarElements>
                    <LinkStyle
                        activeClass="active"
                        to="Contact"
                        spy={true}
                        smooth={true}
                        offset={-162}
                        duration={500}
                    >
                        Contact
                    </LinkStyle>
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