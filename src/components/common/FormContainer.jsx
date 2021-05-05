import React, { useState, useEffect, useRef } from "react";
import Logo from "./Logo";
import { Cross } from "./Icons";

function FormContainer({ children, toggleState, ...props }) {
  const ref = useRef(null);
  const visible = "visible opacity-100 animate-opacity-slow";
  const notVisible = "hidden opacity-0";
  const [isVisible, setIsVisible] = useState(notVisible);

  function closeWindow() {
    setIsVisible(notVisible);
  }

  function handleClickOutside(e) {
    if (ref.current && !ref.current.contains(e.target))
      setIsVisible(notVisible);
  }

  useEffect(() => {
    if (toggleState) {
      setIsVisible(visible);
    }
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [toggleState, ref]);

  return (
    <div
      className={`${isVisible} z-20 flex flex-row justify-center bg-white-faded-50 items-center fixed h-screen w-full`}
    >
      <div
        ref={ref}
        className={`relative flex flex-col justify-center items-center p-12 text-blue-dark rounded-3xl shadow-xl bg-gradient-to-t from-blue-sky-2 to-blue-water max-w-xs`}
      >
        <Cross
          className="absolute w-5 fill-current m-4 top-0 right-0 cursor-pointer transition-colors hover:text-gray-25"
          onClick={closeWindow}
        />
        <Logo
          styles="hidden tablet:absolute tablet:transition-all tablet:flex tablet:-top-16"
          fontColor="text-blue-dark"
          fontSize="text-2xl tablet:text-3xl laptop:text-4xl"
          phoneLogoSize="w-8"
        />
        <form className="max-w-full flex flex-col justify-center items-center space-y-4 mt-4">
          {children}
        </form>
      </div>
    </div>
  );
}

export default FormContainer;
