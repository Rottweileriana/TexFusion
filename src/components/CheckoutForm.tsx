import { useState } from "react";
import styled from "styled-components";

const defaultFormData = {
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
`;

const NameInput = styled.div`
  display: flex;
`;

const CityInput = styled.div`
  display: flex;
`;
//#endregion

export function CheckoutForm() {
  const [formData, setFormData] = useState(defaultFormData);
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
    //lägg till logik för confirmation page??
    console.log(formData);

    setFormData(defaultFormData);
  };

  return (
    <div>
      <h2>KASSA</h2>
      <InputForm>
        <form onSubmit={onSubmit}>
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
            <button type="submit">Submit</button>
          </div>
        </form>
      </InputForm>
    </div>
  );
}
