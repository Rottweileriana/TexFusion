import styled from "styled-components";

const BackgroundImageContainer = styled.div`
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
    background-image: url("./images/StreetMexicoBackground6.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-attachment: fixed;
    filter: blur(4px);
    transform: scale(1.02);
    z-index: -1;
  }
`;

const AboutUsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 500px;
  width: 80%;
  height: 500px;
  margin: 229px 0 100px 0;
  padding: 0 0 30px 0;
  text-align: center;
  color: #333333;
  background-color: rgba(245, 245, 245, 0.7);
`;

const Title = styled.h3`
  font-family: "Open Sans";
  font-weight: 400;
  font-size: 30px;
  color: #333333;
  margin: 30px 0 0 0;
`;

const Text = styled.p`
  text-align: justify;
  font-weight: 400;
  margin: 20px 0;
  width: 85%;
`;

export function AboutComponent() {
  return (
    <>
      <BackgroundImageContainer>
        <AboutUsContainer>
          <Title>OM OSS</Title>
          <Text>
            TexFusion dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi gott.
          </Text>
          <Text>
            Premium aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est 2024.
            Välkomna!
            </Text>
        </AboutUsContainer>
      </BackgroundImageContainer>
    </>
  );
}
