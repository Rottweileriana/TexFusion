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
  paymentMethod: "",
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

const TextInput = styled.input`
  margin-left: 5px;
  background-color: #d3d3d3;
  color: #333333;
  border: 1px solid #222222;
  border-radius: 5px;
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

  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const { firstName, lastName, email, address, zipCode, city, phone } =
    formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onPaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      paymentMethod: e.target.value,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
                  value="Kreditkort"
                  onChange={onPaymentChange}
                />
                Kreditkort
              </PaymentRadio>
              <PaymentRadio>
                <input
                  type="radio"
                  id="klarna"
                  name="paymentMethod"
                  value="Klarna"
                  onChange={onPaymentChange}
                />
                Klarna
              </PaymentRadio>
              <PaymentRadio>
                <input
                  type="radio"
                  id="swish"
                  name="paymentMethod"
                  value="Swish"
                  onChange={onPaymentChange}
                />
                Swish
              </PaymentRadio>
            </PaymentInput>
          </div>
          <NameInput>
            <div>
              <label>
                Förnamn:
                <TextInput
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
                <TextInput
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
              <TextInput
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
              <TextInput
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
                <TextInput
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
                <TextInput
                  type="text"
                  id="city"
                  value={city}
                  onChange={onChange}
                />
              </label>
            </div>
          </CityInput>
          <div>
            <label>
              Telefon:
              <TextInput
                type="text"
                id="phone"
                value={phone}
                onChange={onChange}
              />
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
