import styled from "styled-components";

const BackgroundContainer = styled.div`
    display: flex;
    justify-content: center;
`;

const AboutUsContainer = styled.div`
    width: 800px;
    margin: 210px 0 0 0;
    text-align: center;
    color: lightgrey;
`;

const Title = styled.h3`
    font-family: "Open Sans";
    font-weight: 300;
    color: lightgrey;
`;

const Text = styled.p`
    text-align: justify;
`;


export function AboutComponent () {
    return (
        <>
            <BackgroundContainer>
                <AboutUsContainer>
                    <Title>OM OSS</Title>
                    <Text>TexFusion dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in reprehenderit
                        in voluptate velit esse cillum dolore eu fugiat nulla
                        pariatur. Excepteur sint occaecat cupidatat non proident,
                        sunt in culpa qui officia deserunt mollit anim id est 2024.</Text>
                </AboutUsContainer>
            </BackgroundContainer>
        </>
    )
}