import { useState, useContext, useNavigate } from "./index";
import { CartContext } from "./context";
import styled from "styled-components";
import { CartItem, FormData } from "../types/index";

const defaultFormData: FormData = {
  firstName: '',
  lastName: '',
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

const FormInputElements = styled.div`
  display: flex;
  flex-wrap: wrap;
  border: none;
  margin-top: 20px;
`;

const PaymentRadioBtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  border: none;
  margin-left: 16px;
`;

const PaymentInput = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  border: none;
`;

const RadioElement = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  border: none;
`;

const RadioBtn = styled.input`
  margin-left: 90px;
}
`;

const PaymentRadio = styled.label`
  margin-left: 10px;
  
`;

const InputElement = styled.div`
  margin-left: auto;
  margin-right: 30px;
`;

const TextInput = styled.input`
  margin-left: 10px;
  background-color: #d3d3d3;
  color: #333333;
  border: 1px solid #222222;
  border-radius: 5px;
`;

const FormBtn = styled.div`
  margin-bottom: 20px;
`;

//#endregion

//ÄNDRA TILL STOR FÖRSTABOKSTAV!!!
function getSessionStorageOrDefault(key: string, defaultValue: CartItem[]) {
  const stored = sessionStorage.getItem(key);
  if (!stored) {
    return defaultValue;
  }
  return JSON.parse(stored);
}

export function CheckoutForm() {
  //Cart för senare användning för att skapa confirmation page
  const { cart, confirmation, deleteCart } = useContext(CartContext)!;
  const navigate = useNavigate();

 // var [confirmCheckout, setConfirmedCheckout] = useState();
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
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      address === "" ||
      zipCode === "" ||
      city === "" ||
      phone === "" ||
      formData.paymentMethod === ""
    ) {
      alert('Var vänlig fyll i alla obligatoriska fält.');
      return; // Avbryt inlämningen om något fält är tomt
    }

    const addressData: FormData = formData;

    //Store current formdata to SessionStorage
    sessionStorage.setItem("addressData", JSON.stringify(addressData));
    sessionStorage.setItem("confirmedItems", JSON.stringify(cart));
    confirmation(true);
    deleteCart();
    setFormData(defaultFormData);
    //Navigate to ConfirmationPage
    navigate("/ConfirmationPage");
  
  };

  return (
    <div>
      <h2>Kassa</h2>
      <InputForm>
        <form onSubmit={onSubmit}>
          <FormInputElements>
            <InputElement>
              <label>
                Förnamn
                </label>
                <TextInput
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={onChange}
                />
              </InputElement>
            <InputElement>
              <label>
                Efternamn
                </label>
                <TextInput
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={onChange}
                />
            </InputElement>
          <InputElement>
            <label>
              E-post
              </label>
              <TextInput
                type="email"
                id="email"
                value={email}
                onChange={onChange}
              />
          </InputElement>
          <InputElement>
            <label>
              Telefon
              </label>
              <TextInput
                type="text"
                id="phone"
                value={phone}
                onChange={onChange}
              />
          </InputElement>
          <InputElement>
            <label>
              Adress
              </label>
              <TextInput
                type="text"
                id="address"
                value={address}
                onChange={onChange}
              />
          </InputElement>
            <InputElement>
              <label>
                Postnummer
                </label>
                <TextInput
                  type="text"
                  id="zipCode"
                  value={zipCode}
                  onChange={onChange}
                />
            </InputElement>
            <InputElement>
              <label>
                Stad
                </label>
                <TextInput
                  type="text"
                  id="city"
                  value={city}
                  onChange={onChange}
                />
            </InputElement>
          </FormInputElements>
          <br/>
          <PaymentRadioBtnContainer>
            Betalmetod
            <PaymentInput>
              <RadioElement>
                <RadioBtn
                  type="radio"
                  id="card"
                  name="paymentMethod"
                  value="Kreditkort"
                  onChange={onPaymentChange}
                />
                <PaymentRadio htmlFor="card">
                Kreditkort
              </PaymentRadio>
              </RadioElement>
              <RadioElement>
                <RadioBtn
                  type="radio"
                  id="klarna"
                  name="paymentMethod"
                  value="Klarna"
                  onChange={onPaymentChange}
                />
                <PaymentRadio htmlFor="klarna">
                Klarna
              </PaymentRadio>
              </RadioElement>
              <RadioElement>
                <RadioBtn
                  type="radio"
                  id="swish"
                  name="paymentMethod"
                  value="Swish"
                  onChange={onPaymentChange}
                />
                <PaymentRadio htmlFor="swish">
                Swish
              </PaymentRadio>
              </RadioElement>
            </PaymentInput>
          </PaymentRadioBtnContainer>
          <br/>
          <FormBtn>
            <button type="submit">Beställ</button>
          </FormBtn>
        </form>
      </InputForm>
    </div>
  );
}
