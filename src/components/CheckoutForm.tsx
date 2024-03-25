import { useState } from "react";

const defaultFormData = {
  firstName: "",
  lastName: "",
  email: "",
  address: "",
  zipCode: "",
  city: "",
  phone: "",
};

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
      <form onSubmit={onSubmit}>
        <div>
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
        </div>
        <div>
          <label>
            Epost:
            <input type="email" id="email" value={email} onChange={onChange} />
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
        <div>
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
        </div>
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
    </div>
  );
}
