import React from "react";
import Button from "./common/Button";
import Input from "./common/Input";
import FormContainer from "./common/FormContainer";
import InputLabel from "./common/InputLabel";

function LoginForm(props) {
  return (
    <FormContainer>
      <Input type="email" placeholder="E-mail" id="email" />
      <Input type="password" placeholder="Password" id="password" />
      <InputLabel htmlFor="remember" label="Remember me">
        <Input className="appearance-none" type="checkbox" id="remember" />
      </InputLabel>
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
