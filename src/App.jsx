import { useEffect, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  gap: 20px;
  margin: 100px auto;
`;

const DigitButton = styled.button`
  padding: 15px 30px;
  font-size: 16px;
  border: 1px solid #888;
  border-radius: 3px;
  margin-bottom: 10px;
  margin-right: 15px;
  background-color: blue;
  color: #fff;
  background: ${(props) => props.color};

  &:hover {
    opacity: 0.8;
  }
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 2px solid gray;

  color: ${(props) => (props.isValid ? "#000" : "red")};
`;

const CompanyIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const ClearButton = styled(DigitButton)`
  background-color: #ff3333;
  color: white;
`;

const companies = [
  { codes: [90, 91], icon: "https://beeline.uz/favicon.ico" },
  { codes: [97, 88], icon: "https://mobi.uz/favicon.ico" },
  { codes: [94, 93, 50], icon: "https://ucell.uz/img/favicon.ico" },
  { codes: [33], icon: "https://humans.uz/app-icons/favicon-32x32.png" },
  { codes: [99, 98, 77, 95], icon: "https://uztelecom.uz/images/favicon.ico" },
];

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

const App = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isValid, setIsValid] = useState(true);

  const handleDigitClick = (digit) => {
    if (phoneNumber.length < 12) {
      const newPhoneNumber = phoneNumber + digit;
      const formattedNumber = newPhoneNumber.replace(
        /^(\d{2})(\d{3})(\d{2})(\d{2})$/,
        "$1 $2-$3-$4"
      );

      setPhoneNumber(formattedNumber);
      setIsValid(isValidCode(formattedNumber));
    }
  };

  const handleInputChange = (event) => {
    const inputValue = event.target.value;

    const numericValue = inputValue.replace(/\D/g, "");

    const formattedNumber =
      numericValue.slice(0, 2) +
      (numericValue.slice(2, 5) ? ` ${numericValue.slice(2, 5)}` : "") +
      (numericValue.slice(5, 7) ? `-${numericValue.slice(5, 7)}` : "") +
      (numericValue.slice(7, 9) ? `-${numericValue.slice(7, 9)}` : "");

    setPhoneNumber(formattedNumber);
    setIsValid(isValidCode(formattedNumber));
  };

  const handleClearClick = () => {
    setPhoneNumber("");
    setIsValid(true);
  };

  const handleOneDelete = () => {
    setPhoneNumber((prev) => prev.slice(0, -1));
    setIsValid(true);
  };

  const getCompanyIcon = () => {
    const code = parseInt(phoneNumber.substring(0, 2));
    const company = companies.find((c) => c.codes.includes(code));
    return company && <CompanyIcon src={company.icon} alt="Company Icon" />;
  };

  const isValidCode = (value) => {
    const code = parseInt(value.substring(0, 2));
    return companies.some((c) => c.codes.includes(code));
  };

  useEffect(() => {
    setIsValid(isValidCode(phoneNumber));
  }, [phoneNumber]);

  return (
    <Wrapper>
      <div className="flex gap-2 items-center">
        {getCompanyIcon()}
        <Input
          type="tel"
          placeholder="Enter phone number"
          value={phoneNumber}
          onChange={handleInputChange}
          isValid={isValid}
          inputMode="numeric"
          maxLength={14}
        />
      </div>

      <div className="grid grid-cols-3 place-items-center">
        {numbers.map((number) => (
          <DigitButton key={number} onClick={() => handleDigitClick(number)}>
            {number}
          </DigitButton>
        ))}
        <DigitButton color="green" onClick={handleOneDelete}>
          ⌫
        </DigitButton>
        <ClearButton onClick={handleClearClick}>AC</ClearButton>
      </div>
    </Wrapper>
  );
};

export default App;
