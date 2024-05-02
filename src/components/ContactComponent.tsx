import styled from "styled-components";

export function ContactComponent() {
  return (
    <BackgroundWrapper>
      <BackgroundStyle>
        <ContactContainerTitle>
          <ContactTitle>Kontakt</ContactTitle>
          <ContactTitleInformation>
            Kontaktuppgifter & öppetider
          </ContactTitleInformation>
        </ContactContainerTitle>
        <ContactContainerInformation>
          <ContactOpenHoursContainer>
            <ContactContainer>
              <OpenHoursTitle>Adress</OpenHoursTitle>
              <p>
                TexFusion Vägen 68
                <br></br>
                235 62, Linköping
              </p>
              <p>
                +46 - 705 567 890
                <br></br>
                info@texfusion.com
              </p>
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
    background-image: url("./images/TransparentBackgroundExample2.jpg");
    background-image: no-repeat;
    display: flex;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background-size: cover;
    background-position: center;
`;

const BackgroundStyle = styled.div`
    display:flex;
    height: 100vh;
    width:100%;
    justify-content:center;
    flex-direction:column;
    align-items:center;
    padding-top:20px;
`;

//Contact Title Container with children

const ContactContainerTitle = styled.div`
  background-color: white;
  max-width: 900px;
  width: 80%;
  padding-bottom: 5px;
  border-bottom: solid;
  border-color: black;
`;

const ContactTitle = styled.h2`
  font-family: "Open sans";
  color: black;
  padding-bottom: 10px;
  margin: 0px;
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
  max-width: 900px;
  width: 80%;
  margin: 0;
  padding: 0;
`;

const ContactOpenHoursContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  width: 50%;
  height: 100%;
`;

const ContactMapsContainer = styled.div`
  height: 100%;
  background-color: white;
  width: 50%;
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
  flex-direction: column;
  background-color: white;
  color: black;
  margin: 0;
  padding-top: 5px;
  border-bottom: solid;
`;

const OpenHoursContainer = styled.div`
  margin: 0;
  padding-bottom: 5px;
  padding-top: 5px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  background-color: white;
  color: black;
  width: 100%;
  height: 90%;
`;

const OpenHoursTitle = styled.h4`
  font-family: "Open sans";
  color: black;
  margin: 0;
`;

const StyledUl = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
  padding: 0;
  margin: 0;
  width: 90%;
`;

const StyledLi = styled.li`
  display: flex;
  align-items: center;
  padding: 0;
  margin: 0;
  width: 100%;
`;

const StyledP = styled.p`
  text-align: left;
  padding: 0;
  margin: 0;
  width: 50%;
`;

const StyledSpan = styled.span`
  text-align: right;
  padding: 0;
  margin: 0;
  width: 50%;
`;
