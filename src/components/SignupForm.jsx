import React from "react";
import Button from "./common/Button";
import Input from "./common/Input";
import FormContainer from "./common/FormContainer";

function LoginForm(props) {
  return (
    <FormContainer>
      <Input type="text" placeholder="Full name" id="name" />
      <Input type="email" placeholder="E-mail" id="email" />
      <Input type="password" placeholder="Password" id="password" />
      <div className="pt-6 flex flex-row justify-center items-center">
        <Input type="checkbox" id="terms" />
        <label
          className="cursor-pointer text-base hover:underline ml-2"
          htmlFor="terms"
        >
          <a href="/">{"I agree with T&Cs"}</a>
        </label>
      </div>
      <Button label="Register" fontColor="text-blue-dark" fontSize="text-xl" />
    </FormContainer>
  );
}

export default LoginForm;
