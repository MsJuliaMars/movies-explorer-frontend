import { useEffect, useState } from "react";

export function useFormWithValidation(inputValues) {
  const [values, setValues] = useState(inputValues);
  const [isErrors, setIsErrors] = useState({});
  const [errorMessages, setErrorMessages] = useState({});
  const [isFormNotValid, setIsFormNotValid] = useState(false);

  useEffect(() => {
    setIsFormNotValid(
      isErrors.name_profile ||
        isErrors.email_profile ||
        isErrors.email_login ||
        isErrors.password_login ||
        isErrors.name ||
        isErrors.email ||
        isErrors.password
    );
  }, [
    isErrors.name_profile,
    isErrors.email_profile,
    isErrors.email_login,
    isErrors.password_login,
    isErrors.name,
    isErrors.email,
    isErrors.password,
  ]);

  const handleChange = (event) => {
    const { value, name, validationMessage } = event.target;
    setValues({ ...values, [name]: value || "" });

    setIsErrors({ ...isErrors, [name]: !event.target.validity.valid });
    if ((name.indexOf("email") !== -1) && event.target.validity.valid) {
      const regMail = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
      const valid = regMail.test(value);
      if (!valid) {
        setIsErrors({ ...isErrors, [name]: "Некорректный адрес электронной почты"});
        setErrorMessages({ ...errorMessages, [name]:  "Некорректный адрес электронной почты" });
      }
    }
    else {
      setErrorMessages({ ...errorMessages, [name]: "" });
    }


    if (!event.target.validity.valid) {
      setErrorMessages({ ...errorMessages, [name]: validationMessage });
    } else {
      setErrorMessages({ ...errorMessages, [name]: "" });
    }
  };
  return {
    values,
    handleChange,
    setValues,
    isErrors,
    errorMessages,
    isFormNotValid,
  };
}
