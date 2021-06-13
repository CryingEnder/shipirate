import React, { Fragment, useState, useEffect } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import Container from "./common/Container";
import Logo from "./common/Logo";
import List from "./common/List";
import { MenuButton } from "./common/Icons";
import ToggleTheme from "./common/ToggleTheme";

function Navbar(props) {
  const menuOff = "max-h-0 opacity-0";
  const menuOn = "max-h-full opacity-100 transition-opacity";
  const [menuState, setMenuState] = useState(menuOff);
  const [loginClicked, setLoginClicked] = useState(false);
  const [signupClicked, setSignupClicked] = useState(false);

  function toggleMenu() {
    if (menuState === menuOff) setMenuState(menuOn);
    else setMenuState(menuOff);
  }

  function toggleWindow() {
    if (!loginClicked) setLoginClicked(true);
  }

  function goToSignUp() {
    setLoginClicked(false);
    setSignupClicked(true);
  }

  useEffect(() => {
    return () => {
      setLoginClicked(false);
      setSignupClicked(false);
    };
  });

  return (
    <Fragment>
      {!signupClicked && (
        <LoginForm goToSignUp={goToSignUp} toggleState={loginClicked} />
      )}
      <SignupForm toggleState={signupClicked} />
      <Container
        tag="nav"
        stylesOutside={`sticky top-0 z-10 bg-blue-sky-1 dark:bg-blue-night-sky-1`}
        stylesInside={`flex flex-row flex-wrap justify-between py-3 px-3 tablet:px-6 text-shadow tracking-wide-2 font-semibold text-gray-100 dark:bg-blue-night-sky-1`}
      >
        <Logo />
        <div className="flex flex-row space-x-4 justify-center items-center laptop:hidden">
          <List
            doToggleWindow={toggleWindow}
            className="hidden tablet:flex tablet:flex-row tablet:space-x-4 tablet:justify-center tablet:items-center"
            itemsStyle="transition-colors hover:text-gray-200"
            items={[
              {
                content: "Get VPN",
                specialStyle:
                  "py-1 px-3 rounded-xl bg-blue-sky-3 dark:bg-purple-700",
                linkPath: "#plans",
              },
              { content: "Login", toggleWindow: true },
            ]}
          />
          <ToggleTheme />
          <MenuButton
            className="w-6 cursor-pointer fill-current text-gray-25 transition-colors hover:text-gray-200"
            onClick={toggleMenu}
          />
        </div>
        <div className="flex flex-row laptop:space-x-4 justify-center items-center w-full laptop:w-auto">
          <List
            doToggleWindow={toggleWindow}
            className={`${menuState} w-full laptop:w-auto divide-y-2 divide-blue-sky-4 dark:divide-purple-700 overflow-hidden laptop:flex laptop:flex-row laptop:justify-center laptop:items-center laptop:space-x-4 laptop:max-h-full laptop:divide-y-0 laptop:opacity-100`}
            itemsStyle={"py-3 transition-colors hover:text-gray-200"}
            items={[
              {
                content: "Get VPN",
                specialStyle:
                  "transition-colors hover:text-gray-200 laptop:bg-blue-sky-3 laptop:py-1 laptop:px-3 laptop:rounded-xl laptop:dark:bg-purple-700",
                linkPath: "#plans",
              },
              "What is VPN?",
              "Features",
              "Servers",
              { content: "Login", toggleWindow: true },
            ]}
          />
          <ToggleTheme styles="hidden laptop:block" />
        </div>
      </Container>
    </Fragment>
  );
}

export default Navbar;
