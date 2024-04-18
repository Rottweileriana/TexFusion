import styled from "styled-components";

const BackgroundImageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const LogotypeContainer = styled.div`
    position: fixed;
    overflow: hidden;
    top: 15px;
    left: 50%;
    transform: translate(-50%);
    z-index:9999;
`;

const CenterImage = styled.img`
    width: 100%;
    height: auto;
    max-width: 450px;
    object-fit: contain;
`;

export function HomeComponent() {
    const imageUrlHomePageLeft = `/src/assets/images/CactusBackground.jpg`;
    const imageUrlHomepageRight = `/src/assets/images/TableBackground.jpg`;
    const imageUrlHomePageCenter = `/src/assets/images/LogoAndWoman.jpg`;

    return (
        <>
            <BackgroundImageContainer>
                <Image src={imageUrlHomePageLeft} alt="CactusBackground" className="image" />
                <Image src={imageUrlHomepageRight} alt="TableBackground" className="image" />
            </ImageContainer>
            <LogotypeContainer>
                <CenterImage src={imageUrlHomePageCenter} alt="LogotypeAndWomen" />
            </LogotypeContainer>
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

