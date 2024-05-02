import { useEffect, useState, useContext, useNavigate } from "./index";
import { CartItem, FormData } from "../types/index";
import { styled } from "styled-components";
import { CartContext } from "./context";

export function ConfirmationPage() {
  const { confirmedCheckout } = useContext(CartContext)!;
  const navigate = useNavigate();

  useEffect(() => {
    if (!confirmedCheckout) {
      navigate("/");
    }
  }, [confirmedCheckout, navigate]);

  // Get AdressData
  const [formvalue] = useState<FormData>(() => {
    const storedValue = sessionStorage.getItem("addressData");

    return storedValue ? JSON.parse(storedValue) : [];
  });

  // Get CartData
  const [cartValue] = useState<CartItem[]>(() => {
    const storedValue = sessionStorage.getItem("confirmedItems");

    return storedValue ? JSON.parse(storedValue) : [];
  });

  const [waiting, setWaiting] = useState(false);
  useEffect(() => {
    if (formvalue.paymentMethod === "Swish") {
      setWaiting(true);
      const timer = setTimeout(() => {
        setWaiting(false);
      }, 3000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [formvalue.paymentMethod]);

  // Navigera till Huvudmeny via knapp
  const onClickTest = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    navigate("/");
  };

  //Beräkna totala kostnaden för beställningsbekräftelsen
  const totalCost = cartValue.reduce(
    (acc, cartValue) => acc + cartValue.price * cartValue.quantity,
    0
  );

  return (
    <>
      {waiting === true ? (
        <ConfirmationBackgroundContainer>
          <PageTitle></PageTitle>
          <ConfirmationCardContainer>
            <ThankYouText>Din order bearbetas...</ThankYouText>
            <Address></Address>
          </ConfirmationCardContainer>
        </ConfirmationBackgroundContainer>
      ) : (
        <ConfirmationBackgroundContainer>
          <PageTitle>DIN BESTÄLLNING</PageTitle>
          <ConfirmationCardContainer>
            <ThankYouText>Tack för att du beställer från oss!</ThankYouText>
            <Address>
              <AdressParts>
                {formvalue.firstName} {formvalue.lastName}
              </AdressParts>
              <AdressParts>{formvalue.address}</AdressParts>
              <AdressParts>
                {formvalue.zipCode} {formvalue.city}
              </AdressParts>
            </Address>
            <InfoToCustomer>
              {" "}
              Din mat är hos dig om ca 30-35 minuter.
            </InfoToCustomer>
            <InfoToCustomer>
              Vi ringer dig på {formvalue.phone} när vi är vid din dörr.
            </InfoToCustomer>
            {formvalue.paymentMethod === "Klarna" && (
              <>
                <InfoToCustomerMail>
                  Ett bekräftelsemejl med faktura på totalt {totalCost} SEK
                </InfoToCustomerMail>
                <InfoToCustomerMail>
                  har skickats till {formvalue.email}.
                </InfoToCustomerMail>
              </>
            )}
            {(formvalue.paymentMethod === "Swish" ||
              formvalue.paymentMethod === "KreditKort") && (
              <>
                <InfoToCustomerMail>
                  Ett bekräftelsemejl och kvitto på totalt {totalCost} SEK
                </InfoToCustomerMail>
                <InfoToCustomerMail>
                  har skickats till {formvalue.email}.
                </InfoToCustomerMail>
              </>
            )}
            <ConfirmedProducts>
              {cartValue.map((cartValue) => {
                return (
                  <StyledMainCartItems key={cartValue._id}>
                    <StyledCartItems>
                      <Image src={cartValue.imageUrl} />
                      <div>
                        <Title>
                          {cartValue.title} x {cartValue.quantity}{" "}
                        </Title>
                        <Price>
                          {cartValue.price * cartValue.quantity} Sek <br />
                        </Price>
                      </div>
                    </StyledCartItems>
                  </StyledMainCartItems>
                );
              })}
            </ConfirmedProducts>
            <TotalCost>Summa: {totalCost} kr</TotalCost>
            <BackHomeButton onClick={onClickTest}>Tillbaka</BackHomeButton>
          </ConfirmationCardContainer>
        </ConfirmationBackgroundContainer>
      )}
    </>
  );
}

//#region CSS...

const ConfirmationBackgroundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  min-height: 100vh;

  &::before {
    content: "";
    position: fixed;
    background-image: url("./images/StreetMexicoBackground6.jpg");
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-attachment: fixed;
    filter: blur(4px);
    transform: scale(1.02);
    z-index: -1;
  }
`;

const PageTitle = styled.h2`
  margin-top: 240px;
  font-family: "Open Sans";
  font-size: 30px;
  font-weight: 500;
  color: lightgrey;
`;

const ConfirmationCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 110px;
  padding: 20px;
  width: 500px;
  background-color: lightgrey;
`;

const ThankYouText = styled.h3`
  font-family: "Open Sans";
  font-size: 25px;
  font-weight: 300;
  color: #333333;
  margin-bottom: 35px;
`;

const Address = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
`;

const AdressParts = styled.p`
  display: flex;
  font-family: "Open Sans";
  font-size: 15px;
  font-weight: 300;
  color: #333333;
  margin: 0;
`;

const InfoToCustomer = styled.p`
  display: flex;
  font-family: "Open Sans";
  font-size: 18px;
  font-weight: 300;
  color: #333333;
  margin: 0;
`;

const InfoToCustomerMail = styled.p`
  display: flex;
  font-family: "Open Sans";
  font-size: 18px;
  font-weight: 300;
  color: #333333;
  margin: 0;
`;

const ConfirmedProducts = styled.p`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 45px;
  margin-bottom: 5px;
  font-family: "Open Sans";
  font-size: 15px;
  font-weight: 300;
  color: #333333;
`;

const StyledMainCartItems = styled.div``;

const StyledCartItems = styled.div`
  display: flex;
  align-items: center;
  width: 350px;
  height: 116px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #e0e0e0;
  color: #333333;
  margin-bottom: 2px;
  text-align: left;
  &:hover {
    cursor: default;
  }
`;

const Image = styled.img`
  width: 102px;
  height: 102px;
  border-radius: 5px;
  border: 1px solid #222222;
  margin: 0 25px 0 7px;
`;

const Title = styled.h4`
  margin: 5px 0 5px 0;
  font-family: "Open Sans";
  font-size: 15px;
  font-weight: 400;
  color: #333333;
`;

const Price = styled.p`
  margin: 5px 0 35px 0;
  font-family: "Open Sans";
  font-size: 15px;
  font-weight: 300;
  color: #333333;
`;

const TotalCost = styled.p`
  margin: 10px 0 35px 0;
  font-family: "Open Sans";
  font-size: 15px;
  font-weight: 300;
  color: #333333;
`;

const BackHomeButton = styled.button`
  margin-bottom: 15px;
`;

//EASTER EGG

//#endregion
