import React, { useState } from "react";
import Container from "./common/Container";
import Logo from "./common/Logo";
import List from "./common/List";
import { MenuButton } from "./common/Icons";

function Navbar(props) {
  const menuOff = "max-h-0 opacity-0";
  const menuOn = "max-h-full opacity-100 transition-opacity";
  const [menuState, setMenuState] = useState(menuOff);

  function toggleMenu() {
    if (menuState === menuOff) setMenuState(menuOn);
    else setMenuState(menuOff);
  }

  return (
    <Container
      tag="nav"
      stylesOutside={`sticky top-0 z-10 bg-blue-sky-1`}
      stylesInside={`flex flex-row flex-wrap justify-between py-3 px-3 tablet:px-6 text-shadow tracking-wide-2 font-semibold text-gray-100 dark:bg-purple-900`}
    >
      <Logo />
      <div className="flex flex-row space-x-4 justify-center items-center laptop:hidden">
        <List
          className="hidden tablet:flex tablet:flex-row tablet:space-x-4 tablet:justify-center tablet:items-center"
          itemsStyle="transition-colors hover:text-gray-200"
          items={[
            {
              content: "Get VPN",
              specialStyle:
                "py-1 px-3 rounded-xl dark:bg-purple-700 bg-blue-sky-3",
            },
            { content: "Login", linkPath: "/login" },
          ]}
        />
        <MenuButton
          className="w-6 cursor-pointer fill-current text-gray-25 transition-colors hover:text-gray-200"
          onClick={toggleMenu}
        />
      </div>
      <List
        className={`${menuState} divide-y-2 divide-blue-sky-4 overflow-hidden w-full laptop:w-auto laptop:flex laptop:flex-row laptop:justify-center laptop:items-center laptop:space-x-4 laptop:max-h-full laptop:divide-y-0 laptop:opacity-100`}
        itemsStyle={"py-3 transition-colors hover:text-gray-200"}
        items={[
          {
            content: "Get VPN",
            specialStyle:
              "transition-colors hover:text-gray-200 laptop:bg-blue-sky-3 laptop:py-1 laptop:px-3 laptop:rounded-xl dark:bg-purple-700",
          },
          "What is VPN?",
          "Features",
          "Servers",
          { content: "Login", linkPath: "/login" },
        ]}
      />
    </Container>
  );
}

export default Navbar;
