import styled from "styled-components";

const BackgroundImageContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background-image: url("./images/OmOssBakgrund.jpg");
    background-size: cover;
    background-position: center;
`;

const AboutUsContainer = styled.div`
  width: 800px;
  height: 240px;
  margin: 220px 0 0 0;
  padding: 0 15px 0 15px;
  text-align: center;
  color: lightgrey;
  background-color: rgba(245, 245, 245, 0.2);
`;

const Title = styled.h3`
  font-family: "Open Sans";
  font-weight: 300;
  color: lightgrey;
`;

const Text = styled.p`
  text-align: justify;
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
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est 2024.
          </Text>
        </AboutUsContainer>
      </BackgroundImageContainer>
    </>
  );
}
