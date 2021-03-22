import React from "react";
import Button from "./common/Button";
import Input from "./common/Input";
import FormContainer from "./common/FormContainer";

function LoginForm(props) {
  return (
    <FormContainer>
      <Input type="email" placeholder="E-mail" id="email" />
      <Input type="password" placeholder="Password" id="password" />
      <div className="flex flex-row justify-center items-center">
        <Input className="appearance-none" type="checkbox" id="remember" />
        <label className="cursor-pointer text-base ml-2" htmlFor="remember">
          Remember me
        </label>
      </div>
      <Button label="Login" fontColor="text-blue-dark" fontSize="text-xl" />
      <a className="text-base hover:underline" href="/">
        Forgot your Password?
      </a>
      <p className="text-xl font-semibold pt-6">Are you new?</p>
      <Button label="Sign up" fontColor="text-blue-dark" fontSize="text-xl" />
    </FormContainer>
  );
}

export default LoginForm;
