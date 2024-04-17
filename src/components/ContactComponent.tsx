import styled from "styled-components";

export function ContactComponent () {
    return (
            <>
            <h4>KONTAKT</h4>
            <p>TexFusion</p>
            <p>Vägen 68</p>
            <p>235 62, Linköping</p>
            <p>Sverige</p>
            <p>+46 - 705 567 890</p>
            <p>info@texfusion.com</p>
            </>
    )
}

const StyledContact = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
`;
