import React from "react";
import { Link } from "react-router-dom";
import Button from "./common/Button";
import Input from "./common/Input";
import FormContainer from "./common/FormContainer";

function LoginForm({ toggleState, goToSignUp, ...props }) {
  return (
    <FormContainer toggleState={toggleState}>
      <Input htmlFor="email" label="E-mail" type="email" id="email" />
      <Input label="Password" type="password" id="password" />
      <Input
        label="Remember me"
        className="appearance-none"
        type="checkbox"
        id="remember"
      />
      <Button type="submit" label="Login" fontSize="text-xl" />
      <Link to="/" className="text-base hover:underline">
        Forgot your Password?
      </Link>
      <p className="text-xl font-semibold pt-6">Are you new?</p>
      <Button onClick={goToSignUp} label="Sign up" fontSize="text-xl" />
    </FormContainer>
  );
}

export default LoginForm;
