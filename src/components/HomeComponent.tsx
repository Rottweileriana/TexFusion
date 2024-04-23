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
    top: 350px;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const WomanLogotype = styled.img`
    width:80%;
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
                <WomanLogotype src={ImageHomePageCenter} alt="LogoWithGirl" className="CenterImage" />
            </CenterLogoContainer>
        </>
    );
}

