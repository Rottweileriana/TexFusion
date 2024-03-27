import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "./context";
import styled from "styled-components";
import { CartItem, FormData } from "../types/index";

const defaultFormData: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  address: "",
  zipCode: "",
  city: "",
  phone: "",
};

//#region Styles
const InputForm = styled.div`
  display: flex;
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px;
  background-color: #e0e0e0;
  color: #333333;
`;

const PaymentInput = styled.div`
  diplay: flex;
  border: none;
`;

const PaymentRadio = styled.label`
  margin-right: 10px;
`;

const NameInput = styled.div`
  display: flex;
  flex-wrap: wrap;
  border: none;
`;

const CityInput = styled.div`
  display: flex;
  flex-wrap: wrap;
  border: none;
`;
//#endregion

function getSessionStorageOrDefault(key: string, defaultValue: CartItem[]) {
  const stored = sessionStorage.getItem(key);
  if (!stored) {
    return defaultValue;
  }
  return JSON.parse(stored);
}

export function CheckoutForm() {
  //Cart för senare användning för att skapa confirmation page
  const { cart, deleteCart } = useContext(CartContext)!;
  const navigate = useNavigate();

  const [confirmationItems, setConfirmationItems] = useState(
    getSessionStorageOrDefault("confirmationItems", [])
  );

  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const { firstName, lastName, email, address, zipCode, city, phone } =
    formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setConfirmationItems(cart);
    const addressData: FormData = formData;

    //Store current formdata to SessionStorage
    sessionStorage.setItem("addressData", JSON.stringify(addressData));
    sessionStorage.setItem("confirmedItems", JSON.stringify(cart));

    deleteCart();
    //Navigate to ConfirmationPage
    navigate("/ConfirmationPage");
    setFormData(defaultFormData);
  };

  return (
    <div>
      <h2>KASSA</h2>
      <InputForm>
        <form onSubmit={onSubmit}>
          <div>
            Välj betalmetod:
            <PaymentInput>
              <PaymentRadio>
                <input
                  type="radio"
                  id="card"
                  name="paymentMethod"
                  value="card"
                />
                Kreditkort
              </PaymentRadio>
              <PaymentRadio>
                <input
                  type="radio"
                  id="klarna"
                  name="paymentMethod"
                  value="klarna"
                />
                Klarna
              </PaymentRadio>
              <PaymentRadio>
                <input
                  type="radio"
                  id="swish"
                  name="paymentMethod"
                  value="swish"
                />
                Swish
              </PaymentRadio>
            </PaymentInput>
          </div>
          <NameInput>
            <div>
              <label>
                Förnamn:
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={onChange}
                />
              </label>
            </div>
            <div>
              <label>
                Efternamn:
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={onChange}
                />
              </label>
            </div>
          </NameInput>
          <div>
            <label>
              Epost:
              <input
                type="email"
                id="email"
                value={email}
                onChange={onChange}
              />
            </label>
          </div>
          <div>
            <label>
              Adress:
              <input
                type="text"
                id="address"
                value={address}
                onChange={onChange}
              />
            </label>
          </div>
          <CityInput>
            <div>
              <label>
                Postnr:
                <input
                  type="text"
                  id="zipCode"
                  value={zipCode}
                  onChange={onChange}
                />
              </label>
            </div>
            <div>
              <label>
                Stad:
                <input type="text" id="city" value={city} onChange={onChange} />
              </label>
            </div>
          </CityInput>
          <div>
            <label>
              Telefon:
              <input type="text" id="phone" value={phone} onChange={onChange} />
            </label>
          </div>
          <div>
            <button type="submit">Beställ</button>
          </div>
        </form>
      </InputForm>
    </div>
  );
}
