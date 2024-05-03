import styled from "styled-components";

const HomeBackgroundContainer = styled.div`
  width: 100%;
  height: 89vh;
  z-index: 0;
`;

const HomeBg = styled.img`
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  object-position: 0% 0%;
`;

export function HomeComponent() {
  const HomeBackground = `./images/MenuBg_2.png`;

  return (
    <>
      <HomeBackgroundContainer>
        <HomeBg src={HomeBackground} alt="BackgroundImage" />
      </HomeBackgroundContainer>
    </>
  );
}
