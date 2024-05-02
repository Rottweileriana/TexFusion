import styled from "styled-components"


export function ErrorPage () {
    return(
        <ConfirmationBackgroundContainer>
            <ErrorPageTitle>Error 404 page not found</ErrorPageTitle>
        </ConfirmationBackgroundContainer>
    );
}


const ConfirmationBackgroundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content:center;
  width: 100vw;
  min-height: 100vh;
  background-image: url("./images/StreetMexicoBackground6.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const ErrorPageTitle = styled.h1`
    font-family: "Open Sans";
    font-size: 25px;
    font-weight: 300;
    color: white;
`;