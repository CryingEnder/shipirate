import React from "react";
import Button from "./common/Button";
import Input from "./common/Input";
import FormContainer from "./common/FormContainer";

function LoginForm({ toggleState, ...props }) {
  return (
    <FormContainer toggleState={toggleState}>
      <Input type="text" label="Full name" id="name" />
      <Input type="email" label="E-mail" id="emailnew" />
      <Input type="password" label="Password" id="passwordnew" />
      <Input
        styles="pt-6"
        linkPath={"/"}
        label={"I agree with T&Cs"}
        type="checkbox"
        id="terms"
      />
      <Button type="submit" label="Register" fontSize="text-xl" />
    </FormContainer>
  );
}

export default LoginForm;
