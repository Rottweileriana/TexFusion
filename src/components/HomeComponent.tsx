import styled from "styled-components";

const ImageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw; /* Set width to full viewport width */
    height: 100vh; /* Set height to full viewport height */
    overflow: hidden; /* Hide overflow to prevent scrollbar */
`;

const Image = styled.img`
  width: 100%; /* Set width to fill the container */
  height: 100%; /* Set height to fill the container */
  object-fit: cover; /* Ensure the image covers the container */
`;

export function HomeComponent() {
    const imageUrlHomePageLeft = `/src/assets/images/CactusBackground.jpg`;
    const imageUrlHomepageRight = `/src/assets/images/TableBackground.jpg`;

    return (
        <>
            <ImageContainer>
                <Image src={imageUrlHomePageLeft} alt="CactusBackground" className="image" />
                <Image src={imageUrlHomepageRight} alt="TableBackground" className="image" />
            </ImageContainer>
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

