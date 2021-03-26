import React from "react";
import Button from "./common/Button";
import Input from "./common/Input";
import FormContainer from "./common/FormContainer";
import InputLabel from "./common/InputLabel";

function LoginForm(props) {
  return (
    <FormContainer>
      <Input type="text" placeholder="Full name" id="name" />
      <Input type="email" placeholder="E-mail" id="email" />
      <Input type="password" placeholder="Password" id="password" />
      <InputLabel
        styles="pt-6"
        htmlFor="terms"
        linkLabel={true}
        label={"I agree with T&Cs"}
      >
        <Input type="checkbox" id="terms" />
      </InputLabel>
      <Button type="submit" label="Register" fontSize="text-xl" />
    </FormContainer>
  );
}

export default LoginForm;
