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
        className={`relative flex flex-col justify-center items-center text-blue-dark dark:text-purple-light-3 rounded-3xl shadow-xl bg-gradient-to-t from-blue-sky-2 to-blue-water dark:from-blue-night-sky-2 dark:to-blue-night-sky-1 w-64 tablet:w-80 p-8 tablet:p-12`}
      >
        <Cross
          className="absolute fill-current m-4 top-0 right-0 cursor-pointer transition-colors hover:text-gray-25 w-4 tablet:w-5"
          onClick={closeWindow}
        />
        <Logo
          disableClick={true}
          styles="hidden cursor-default tablet:absolute tablet:transition-all tablet:flex tablet:-top-16"
          fontColor="text-blue-dark"
          fontSize="text-2xl tablet:text-3xl laptop:text-4xl"
          phoneLogoSize="w-8"
        />
        <form
          {...props}
          className="max-w-full flex flex-col justify-center items-center space-y-3 tablet:space-y-4 mt-4"
        >
          {children}
        </form>
      </div>
    </div>
  );
}

export default FormContainer;
