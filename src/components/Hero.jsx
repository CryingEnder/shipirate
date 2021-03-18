import React from "react";
import { CheckBox } from "./common/Icons";
import Button from "./common/Button";
import Container from "./common/Container";
import { HeroPicture } from "./common/Pictures";

function Hero(props) {
  return (
    <Container
      tag="section"
      stylesOutside="tablet:bg-gradient-to-b tablet:from-blue-sky-1 tablet:via-blue-sky-2 tablet:to-blue-water tablet:clip-bottom-point"
      stylesInside={"tablet:pb-10"}
    >
      <div className="grid text-center text-shadow tablet:max-w-screen-desktop-big tablet:grid-cols-2 tablet:mx-auto">
        <header className="flex flex-col justify-center items-center bg-blue-sky-1 px-6 py-6 space-y-5 text-blue-dark tablet:text-left tablet:items-start tablet:bg-transparent tablet:pr-0">
          <h1 className="text-gray-100">
            The rougher the Internet, the smoother we defend you!
          </h1>
          <p className="font-medium">Set sail online with our VPN.</p>
          <Button label="Embark now" fontSize="tablet:text-xl" />
          <div className="tablet:flex tablet:flex-row tablet:items-center">
            <CheckBox className="w-4 mr-1.5 mb-0.5 inline-block tablet:mb-0" />
            <span className="font-medium">30-day money-back guarantee</span>
          </div>
        </header>
        <div className="flex items-center">
          <HeroPicture className="tablet:m-6 tablet:rounded-b-x2 tablet:overflow-hidden tablet:shadow-md" />
        </div>
      </div>
    </Container>
  );
}

export default Hero;
