import styled from "styled-components";

export function ContactComponent() {
  return (
    <BackgroundWrapper>
      <BackgroundStyle>
        <ContactContainerTitle>
          <ContactTitle>KONTAKT</ContactTitle>
          <ContactTitleInformation>Kontakt & öppetider</ContactTitleInformation>
        </ContactContainerTitle>
        <ContactContainerInformation>
          <ContactOpenHoursContainer>
            <ContactContainer>
              <OpenHoursTitle>Adress</OpenHoursTitle>
              <Text>
                TexFusion Vägen 68
                <br />
                235 62, Linköping
              </Text>
              <Text>
                +46 - 705 567 890
                <br />
                info@texfusion.com
              </Text>
            </ContactContainer>
            <OpenHoursContainer>
              <OpenHoursTitle>Öppetider</OpenHoursTitle>
              <StyledUl>
                <StyledLi>
                  <StyledP>Måndag</StyledP> <StyledSpan>10 - 19</StyledSpan>
                </StyledLi>
                <StyledLi>
                  <StyledP>Tisdag</StyledP> <StyledSpan>10 - 19</StyledSpan>
                </StyledLi>
                <StyledLi>
                  <StyledP>Onsdag</StyledP> <StyledSpan>10 - 19</StyledSpan>
                </StyledLi>
                <StyledLi>
                  <StyledP>Torsdag</StyledP> <StyledSpan>10 - 19</StyledSpan>
                </StyledLi>
                <StyledLi>
                  <StyledP>Fredag</StyledP> <StyledSpan>10 - 19</StyledSpan>
                </StyledLi>
                <StyledLi>
                  <StyledP>Lördag</StyledP> <StyledSpan>12 - 22</StyledSpan>
                </StyledLi>
                <StyledLi>
                  <StyledP>Söndag</StyledP> <StyledSpan>Stängt</StyledSpan>
                </StyledLi>
              </StyledUl>
            </OpenHoursContainer>
          </ContactOpenHoursContainer>
          <ContactMapsContainer>
            <ContactMaps src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2017.294883613859!2d16.56118127728336!3d59.628098787069746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465e66ccbd21d357%3A0x7284132b69145150!2sViolstigen%206B%2C%20722%2027%20V%C3%A4ster%C3%A5s!5e0!3m2!1sen!2sse!4v1713428800569!5m2!1sen!2sse"></ContactMaps>
          </ContactMapsContainer>
        </ContactContainerInformation>
      </BackgroundStyle>
    </BackgroundWrapper>
  );
}

//Background

const BackgroundWrapper = styled.div`
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: center;
  width: 100vw;
  margin: 0;
  padding: 0;
  min-height: 100vh;

  &::before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-image: url("./images/StreetMexicoBackground4.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-attachment: fixed;
    filter: blur(4px);
    transform: scale(1.02);
    z-index: -1;
  }
`;

const BackgroundStyle = styled.div`
  display: flex;
  height: 750px;
  width: 500px;
  max-width: 80%;
  margin: 229px 0 100px 0;
  flex-direction: column;
  align-items: center;
  padding-top: 15px;
  background-color: rgba(245, 245, 245, 0.7);
`;

//Contact Title Container with children

const ContactContainerTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 500px;
  width: 80%;
  padding-bottom: 10px;
  border-bottom: solid;
  border-color: #333333;
`;

const ContactTitle = styled.h2`
  font-family: "Open sans";
  color: #333333;
  font-weight: 400;
  font-size: 30px;
  margin: 20px;
`;

const ContactTitleInformation = styled.p`
  font-family: "Open sans";
  color: black;
  padding: 0;
  margin: 0;
`;

//Contact information and Map Container

const ContactContainerInformation = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  width: 80%;
  margin: 0;
  padding: 0;
`;

const ContactOpenHoursContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
`;

const ContactMapsContainer = styled.div`
  height: 100%;
  width: 100%;
  margin: 0;
  padding-right: 4px;
`;

const ContactMaps = styled.iframe`
  width: 100%;
  height: 98%;
  margin: 0;
  padding: 0;
`;

const ContactContainer = styled.div`
  display: flex;
  max-width: 500px;
  flex-direction: column;
  color: #333333;
  margin: 0 0 20px 0;
  padding: 20px 0;
  border-bottom: solid;
`;

const OpenHoursContainer = styled.div`
  margin: 0 0 30px 0;
  padding-bottom: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  color: #333333;
  width: 100%;
  color: #333333;
  border-bottom: solid;
`;

const OpenHoursTitle = styled.h4`
  font-family: "Open sans";
  color: black;
  margin: 0 0 10px 0;
`;

const StyledUl = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
  padding: 0;
  margin: 0;
  width: 50%;
`;

const StyledLi = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0;
  width: 100%;
`;

const StyledP = styled.p`
  text-align: center;
  padding: 0;
  margin: 0;
  width: 50%;
`;

const StyledSpan = styled.span`
  text-align: center;
  padding: 0;
  margin: 0;
  width: 50%;
`;

const Text = styled.p`
  margin: 0;
`;
