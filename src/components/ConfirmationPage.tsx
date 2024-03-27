import { useState } from "react";
import { CartItem, FormData } from "../types/index";
import { useNavigate } from "react-router-dom";

export function ConfirmationPage() {
  
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
  const navigate = useNavigate();

  const onClickTest = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    //Navigate to home
    navigate('/');
  };
  
  return(
<>
<button onClick={onClickTest}>HomePage</button>
<h2>Finns jag: {formvalue.firstName}</h2>
<h2>Finns jag: {cartValue[0].title}</h2>
</>
  ) 
}
