import React, { Fragment } from "react";
import Logo from "./common/Logo";
import Button from "./common/Button";
import { Cross } from "./common/Icons";
import Input from "./common/Input";

function LoginForm(props) {
  return (
    <div className="flex flex-row justify-center bg-white items-center fixed opacity-100 w-full h-full">
      <div className="relative space-y-4 flex flex-col justify-center items-center p-12 text-blue-dark rounded-3xl shadow-xl bg-gradient-to-t from-blue-sky-2 to-blue-water max-w-full tablet:max-w-screen-tablet">
        <Cross className="absolute w-5 fill-current m-4 top-0 right-0 cursor-pointer transition-colors hover:text-gray-25" />
        <Logo
          styles="absolute -top-18 laptop:-top-20"
          fontColor="text-blue-dark"
          fontSize="text-3xl laptop:text-4xl"
        />
        <form className="w-full flex flex-col justify-center items-center space-y-4">
          <Input type="email" placeholder="E-mail" id="email" />
          <Input type="password" placeholder="Password" id="password" />
          <div className="flex flex-row justify-center items-center">
            <Input className="appearance-none" type="checkbox" id="remember" />
            <label className="text-base ml-2" htmlFor="remember">
              Remember me
            </label>
          </div>
          <Button label="Login" fontColor="text-blue-dark" fontSize="text-xl" />
          <a className="text-base hover:underline" href="/">
            Forgot your Password?
          </a>
        </form>
        <p className="text-xl font-semibold pt-6">Are you new?</p>
        <Button label="Sign up" fontColor="text-blue-dark" fontSize="text-xl" />
      </div>
    </div>
  );
}

export default LoginForm;
