import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const DigitButton = styled.button`
  padding: 5px 10px;
  font-size: 16px;
  border: 1px solid #888;
  border-radius: 3px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 2px solid gray;
`;

const ClearButton = styled.button`
  padding: 10px;
  font-size: 16px;
`;

const CompanyIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const companies = [
  {
    codes: [90, 91],
    icon: "https://beeline.uz/favicon.ico",
  },
  {
    codes: [97, 88],
    icon: "https://mobi.uz/favicon.ico",
  },
  {
    codes: [94, 93, 50],
    icon: "https://ucell.uz/img/favicon.ico",
  },
  {
    codes: [33],
    icon: "https://humans.uz/app-icons/favicon-32x32.png",
  },
  {
    codes: [99, 98, 77, 95],
    icon: "https://uztelecom.uz/images/favicon.ico",
  },
];

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

const App = () => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleDigitClick = (digit) => {
    setPhoneNumber((prevPhoneNumber) => prevPhoneNumber + digit);
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setPhoneNumber(value);
  };

  const handleClearClick = () => {
    setPhoneNumber("");
  };

  const getCompanyIcon = () => {
    const code = parseInt(phoneNumber.substring(0, 2));
    const company = companies.find((c) => c.codes.includes(code));

    return company ? (
      <CompanyIcon src={company.icon} alt="Company Icon" />
    ) : null;
  };

  return (
    <Wrapper>
      {numbers.map((digit) => (
        <DigitButton key={digit} onClick={() => handleDigitClick(digit)}>
          {digit}
        </DigitButton>
      ))}
      <Input
        type="tel"
        placeholder="Enter phone number"
        value={phoneNumber}
        onChange={handleInputChange}
      />
      {getCompanyIcon()}
      {phoneNumber.length > 0 && (
        <ClearButton onClick={handleClearClick}>Clear</ClearButton>
      )}
    </Wrapper>
  );
};

export default App;
