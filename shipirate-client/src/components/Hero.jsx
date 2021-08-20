import React, { useContext } from "react";
import { CheckBox } from "./common/Icons";
import Button from "./common/Button";
import Container from "./common/Container";
import { HeroPictureLight, HeroPictureDark } from "./common/Pictures";
import { ThemeContext } from "./context/ThemeContext";

function Hero(props) {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <Container
      tag="section"
      stylesOutside={`${
        theme !== "dark"
          ? "tablet:bg-gradient-to-b tablet:clip-bottom-point "
          : ""
      }tablet:from-blue-sky-1 tablet:via-blue-sky-2 tablet:to-blue-water tablet:dark:bg-blue-night-sky-1`}
      stylesInside="tablet:pb-10"
      marginBottom="mb-0"
    >
      <div className="grid text-center text-shadow tablet:max-w-screen-desktop-big tablet:grid-cols-2 tablet:mx-auto">
        <header className="flex flex-col justify-center items-center bg-blue-sky-1 dark:bg-blue-night-sky-1 tablet:bg-transparent tablet:dark:bg-transparent px-6 py-6 space-y-5 text-blue-dark tablet:text-left tablet:items-start tablet:pr-0">
          <h1 className="text-gray-100 dark:text-blue-whiteish-1">
            The rougher the Internet, the smoother we defend you!
          </h1>
          <p className="font-medium dark:text-blue-whiteish-2">
            Set sail online with our VPN.
          </p>
          <Button
            label="Embark now"
            fontSize="tablet:text-xl"
            linkPath="#plans"
          />
          <div className="tablet:flex tablet:flex-row tablet:items-center dark:text-blue-whiteish-2">
            <CheckBox className="w-4 mr-1.5 mb-0.5 inline-block tablet:mb-0 fill-current" />
            <span className="font-medium">30-day money-back guarantee</span>
          </div>
        </header>
        <div className="flex items-center">
          <HeroPictureLight
            className={`tablet:m-6 tablet:rounded-b-x2 tablet:overflow-hidden tablet:shadow-md${
              theme === "light" ? "" : " hidden"
            }`}
          />
          <HeroPictureDark
            className={`tablet:m-6 tablet:rounded-b-x2 tablet:overflow-hidden tablet:shadow-md${
              theme === "dark" ? "" : " hidden"
            }`}
          />
        </div>
      </div>
    </Container>
  );
}

export default Hero;
