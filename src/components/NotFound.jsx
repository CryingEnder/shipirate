import React from "react";
import Button from "./common/Button";
import { treasure } from "../utils/images";
import { ArrowBack } from "./common/Icons";

function NotFound(props) {
  return (
    <div className="flex flex-col justify-center items-center space-y-8 bg-gradient-to-r from-blue-sky-1 to-blue-sky-2 dark:from-blue-night-sky-1 dark:to-blue-night-sky-2 h-screen w-full p-3">
      <header className="felx flex-col justify-center items-center space-y-3 text-center">
        <h1 className="uppercase text-gray-25 text-5xl tablet:text-7xl laptop:text-8xl">
          404 error
        </h1>
        <h2 className="text-white-faded-50 text-3xl tablet:text-4xl laptop:text-5xl">
          The treasure is somewhere else...
        </h2>
      </header>
      <img
        className="w-40 tablet:w-48 laptop:w-56"
        src={treasure}
        alt="Treasure chest"
      />
      <Button
        label="Go home"
        labelIcon={ArrowBack}
        labelIconSize="w-6 tablet:w-8 laptop:w-10"
        linkPath="/"
        fontSize="text-xl tablet:text-2xl laptop:text-3xl"
      />
    </div>
  );
}

export default NotFound;
