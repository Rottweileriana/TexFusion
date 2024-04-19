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
    const imageUrlHomePageLeft = `/src/assets/images/CactusBackground.jpg`;
    const imageUrlHomepageRight = `/src/assets/images/TableBackground.jpg`;
    const imageUrlHomePageCenter = `/src/assets/images/LogoWithGirl.jpg`;

    return (
        <>
            <LeftRightBackgroundImage>
                <BackgroundImage src={imageUrlHomePageLeft} alt="CactusBackground" className="image" />
                <BackgroundImage src={imageUrlHomepageRight} alt="TableBackground" className="image" />
            </LeftRightBackgroundImage>
            <CenterLogoContainer>
                <Logotype src={imageUrlHomePageCenter} alt="LogoWithGirl" className="CenterImage" />
            </CenterLogoContainer>
            {/* <h4>Home</h4>
            <p>TexFusion dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore
                magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat. Duis aute irure dolor in reprehenderit
                in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est 2024.</p> */}
        </>
    );
}

