import { useEffect, useState, useContext } from "react";
import { CartItem, FormData } from "../types/index";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { CartContext } from "./context";

export function ConfirmationPage() {
  const { confirmedCheckout } = useContext(CartContext)!;
  const navigate = useNavigate();
  useEffect(() => {
    if(!confirmedCheckout){
      navigate("/");
    }
  }, [confirmedCheckout, navigate])
  
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
      if(formvalue.paymentMethod === "Swish") {
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
    return formvalue.paymentMethod === 'Klarna' ?
      <>
        <button onClick={onClickTest}>Tillbaka</button>
        <h1>
          Tack för din beställning {formvalue.firstName} {formvalue.lastName}!
        </h1>
        <p>
          Din leverans kommer att skickas med PostNord Express. Leveranstid ca:
          10-15 minuter.
        </p>
        <p>
          Leverans sker till {formvalue.address}, {formvalue.zipCode},{" "}
          {formvalue.city}. Chauffören kommer att ringa dig på {formvalue.phone}.
        </p>
        <p>
          Ett bekräftelsemejl och fakturan på totalt {totalCost} SEK har skickats
          till {formvalue.email}
        </p>
        {cartValue.map((cartValue) => {
          return (
            <StyledMainCartItems key={cartValue._id}>
              <StyledCartItems>
                <Image src={cartValue.imageUrl} />
                <div>
                  <Title>
                    {cartValue.title} x {cartValue.quantity}{" "}
                  </Title>
                  {cartValue.price} Sek <br />
                </div>
              </StyledCartItems>
            </StyledMainCartItems>
          );
        })}
      </>
      : formvalue.paymentMethod === 'KreditKort' ?
      <>
      <button onClick={onClickTest}>Tillbaka</button>
      <h1>
        Tack för din betalning {formvalue.firstName} {formvalue.lastName}!
      </h1>
      <p>
        Din leverans kommer att skickas med PostNord Express. Leveranstid ca:
        10-15 minuter.
      </p>
      <p>
        Leverens sker till {formvalue.address}, {formvalue.zipCode},{" "}
        {formvalue.city}. Chauffören kommer att ringa dig på {formvalue.phone}.
      </p>
      <p>
        Ett bekräftelsemejl och kvittot på totalt {totalCost} SEK har skickats
        till {formvalue.email}
      </p>
      {cartValue.map((cartValue) => {
        return (
          <StyledMainCartItems key={cartValue._id}>
            <StyledCartItems>
              <Image src={cartValue.imageUrl} />
              <div>
                <Title>
                  {cartValue.title} x {cartValue.quantity}{" "}
                </Title>
                {cartValue.price} Sek <br />
              </div>
            </StyledCartItems>
          </StyledMainCartItems>
        );
      })}
    </>
    : formvalue.paymentMethod === 'Swish' && waiting ?
      <h1>Väntar på betalning...</h1>
    : 
  <>
      <button onClick={onClickTest}>Tillbaka</button>
        <h1>
          Tack för din betalning {formvalue.firstName} {formvalue.lastName}!
        </h1>
        <p>
          Din leverans kommer att skickas med PostNord Express. Leveranstid ca:
          10-15 minuter.
        </p>
        <p>
          Leverens sker till {formvalue.address}, {formvalue.zipCode},{" "}
          {formvalue.city}. Chauffören kommer att ringa dig på {formvalue.phone}.
        </p>
        <p>
          Ett bekräftelsemejl och kvittot på totalt {totalCost} SEK har skickats
          till {formvalue.email}
        </p>
        {cartValue.map((cartValue) => {
          return ( 
            <StyledMainCartItems key={cartValue._id}>
              <StyledCartItems>
                <Image src={cartValue.imageUrl} />
                <div>
                  <Title>
                    {cartValue.title} x {cartValue.quantity}{" "}
                  </Title>
                  {cartValue.price} Sek <br />
                </div>
              </StyledCartItems>
            </StyledMainCartItems>
          );
        })}
      </>
  };
//#region CSS...
const StyledMainCartItems = styled.div`
  display: block;
  flex-wrap: wrap;
`;

const StyledCartItems = styled.div`
  display: flex;
  width: 300px;
  height: 100px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px;
  background-color: #e0e0e0;
  color: #333333;
  margin-bottom: 10px;
  text-align: left;
  &:hover {
    cursor: default;
  }
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 5px;
  border: 1px solid #222222;
  margin-right: 20px;
`;

const Title = styled.h4`
  margin: 0;
`;
//#endregion
