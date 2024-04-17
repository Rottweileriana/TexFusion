import { AboutComponent, ContactComponent, useParams, ErrorPage } from "./index";
import styled from "styled-components";

type InfoParams = { InfoPart: string };

export function InfoComponent () {
    const {InfoPart} = useParams<InfoParams>();

    console.log(InfoPart)
    if (InfoPart === "OmOss")
        return(
            <BodyBackgroundComponent>
                <AboutComponent />
            </BodyBackgroundComponent>
    )
    else if (InfoPart === "Kontakt")
        return (
            <BodyBackgroundComponent>
                <ContactComponent />
            </BodyBackgroundComponent>)
    else 
    return <ErrorPage/>;
}


const BodyBackgroundComponent = styled.div`
  text:center;  
  width: 100vw;
  margin: 0;
  padding: 0;
`;

