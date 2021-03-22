import React, { useState } from "react";
import Logo from "./Logo";
import { Cross } from "./Icons";

function FormContainer({ children }) {
  return (
    <div className="z-10 flex flex-row justify-center bg-white-faded-50 items-center fixed opacity-100 w-full h-full overflow-hidden">
      <div className="relative flex flex-col justify-center items-center p-12 text-blue-dark rounded-3xl shadow-xl bg-gradient-to-t from-blue-sky-2 to-blue-water max-w-xs">
        <Cross className="absolute w-5 fill-current m-4 top-0 right-0 cursor-pointer transition-colors hover:text-gray-25" />
        <Logo
          styles="absolute -top-18 laptop:-top-20"
          fontColor="text-blue-dark"
          fontSize="text-3xl laptop:text-4xl"
        />
        <form className="max-w-full flex flex-col justify-center items-center space-y-4">
          {children}
        </form>
      </div>
    </div>
  );
}

export default FormContainer;
