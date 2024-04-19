import styled from "styled-components";

const LeftRightBackgroundImage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
`;

const BackgroundImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CenterLogoContainer = styled.div`
    position: fixed;
    top: 305px;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const Logotype = styled.img`
    width:70%;
    max-width: 100%;
    min-width:400px;
    object-fit: contain;
`;

export function HomeComponent() {
    const ImageHomePageLeft = `/src/assets/images/CactusBackground.jpg`;
    const ImageHomepageRight = `/src/assets/images/TableBackground.jpg`;
    const ImageHomePageCenter = `/src/assets/images/LogoWithGirl.jpg`;

    return (
        <>
            <LeftRightBackgroundImage>
                <BackgroundImage src={ImageHomePageLeft} alt="CactusBackground" className="image" />
                <BackgroundImage src={ImageHomepageRight} alt="TableBackground" className="image" />
            </LeftRightBackgroundImage>
            <CenterLogoContainer>
                <Logotype src={ImageHomePageCenter} alt="LogoWithGirl" className="CenterImage" />
            </CenterLogoContainer>
        </>
    );
}

