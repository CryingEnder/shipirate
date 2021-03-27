import React from "react";
import Button from "./common/Button";
import Input from "./common/Input";
import FormContainer from "./common/FormContainer";

function LoginForm(props) {
  return (
    <FormContainer>
      <Input htmlFor="email" label="E-mail" type="email" id="email" />
      <Input label="Password" type="password" id="password" />
      <Input
        label="Remember me"
        className="appearance-none"
        type="checkbox"
        id="remember"
      />
      <Button type="submit" label="Login" fontSize="text-xl" />
      <a className="text-base hover:underline" href="/">
        Forgot your Password?
      </a>
      <p className="text-xl font-semibold pt-6">Are you new?</p>
      <Button label="Sign up" fontSize="text-xl" />
    </FormContainer>
  );
}

export default LoginForm;
