import { AboutComponent, ContactComponent, useParams, ErrorPage } from "./index";

type InfoParams = { InfoPart: string };

export function InfoComponent () {
    const {InfoPart} = useParams<InfoParams>();

    console.log(InfoPart)
    if (InfoPart === "OmOss")
        return <AboutComponent />;
    else if (InfoPart === "Kontakt")
        return <ContactComponent />;
    else 
    return <ErrorPage/>;
}

