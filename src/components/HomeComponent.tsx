import styled from "styled-components";

const HomeBackgroundContainer = styled.div`
    width: 100%;
    height: 89vh;
    z-index: 0;
`;

const HomeBg = styled.img`
    width: 100vw;
    height: 100vh;
`;

export function HomeComponent() {

    const HomeBackground = `/src/assets/images/MenuBg.jpg`;

    return (
        <>
            <HomeBackgroundContainer>
                <HomeBg src={HomeBackground} alt="BackgroundImage" />
            </HomeBackgroundContainer>
        </>
    );
}
