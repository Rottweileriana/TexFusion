import { useEffect, useState } from "react";
import { FormData } from "../types/index";

export function ConfirmationPage() {
  const [value, setDisplayedValue] = useState<FormData>(() => {
    const storedValue = sessionStorage.getItem("addressData");
    return storedValue ? JSON.parse(storedValue) : [];
  });
  /*
  useEffect(() => {
    const storedValue = sessionStorage.getItem("addressData");
    if (storedValue) {
      const value = JSON.parse(storedValue);
      setDisplayedValue(value);
      console.log(value);
    }
  }, []);
*/
  return <h2>Finns jag: {value.firstName}</h2>;
}
