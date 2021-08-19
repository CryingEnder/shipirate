import React, { Fragment, useState, useEffect } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import Profile from "./Profile";
import Container from "./common/Container";
import Logo from "./common/Logo";
import List from "./common/List";
import { MenuButton } from "./common/Icons";
import ToggleTheme from "./common/ToggleTheme";
import PropTypes from "prop-types";

function Navbar({ user }) {
  const off = "max-h-0 opacity-0";
  const on = "max-h-full opacity-100 transition-opacity";
  const [menuState, setMenuState] = useState(off);
  const [profileClicked, setProfileClicked] = useState(false);
  const [loginClicked, setLoginClicked] = useState(false);
  const [signupClicked, setSignupClicked] = useState(false);

  function toggleMenu() {
    if (menuState === off) setMenuState(on);
    else setMenuState(off);
  }

  function toggleLogin() {
    if (!loginClicked) setLoginClicked(true);
  }

  function toggleProfile() {
    if (!profileClicked) setProfileClicked(true);
  }

  function goToSignUp() {
    setLoginClicked(false);
    setSignupClicked(true);
  }

  useEffect(() => {
    return () => {
      setLoginClicked(false);
      setSignupClicked(false);
      setProfileClicked(false);
    };
  });

  return (
    <Fragment>
      {!signupClicked && (
        <LoginForm goToSignUp={goToSignUp} toggleState={loginClicked} />
      )}
      <SignupForm toggleState={signupClicked} />
      {user && <Profile toggleState={profileClicked} user={user} />}
      <Container
        tag="nav"
        stylesOutside={`sticky top-0 z-10 bg-blue-sky-1 dark:bg-blue-night-sky-1`}
        stylesInside={`flex flex-row flex-wrap justify-between py-3 px-3 tablet:px-6 text-shadow tracking-wide-2 font-semibold text-gray-100 dark:bg-blue-night-sky-1`}
      >
        <Logo />
        <div className="flex flex-row space-x-4 justify-center items-center laptop:hidden">
          <List
            doToggleLogin={toggleLogin}
            className="hidden tablet:flex tablet:flex-row tablet:space-x-4 tablet:justify-center tablet:items-center"
            itemsStyle="transition-colors hover:text-gray-200"
            items={[
              {
                content: "Get VPN",
                specialStyle:
                  "py-1 px-3 rounded-xl bg-blue-sky-3 dark:bg-purple-700",
                linkPath: "#plans",
                key: "getvpn1",
              },
              user && {
                content: "Logout",
                linkPath: "/logout",
                key: "logout1",
              },
              !user && { content: "Login", toggleLogin: true, key: "login1" },
            ]}
          />
          <ToggleTheme />
          <MenuButton
            className="w-6 mt-0.5 cursor-pointer fill-current text-gray-25 transition-colors hover:text-gray-200"
            onClick={toggleMenu}
          />
        </div>
        <div className="flex flex-row laptop:space-x-4 justify-center items-center w-full laptop:w-auto">
          <List
            doToggleMenu={toggleMenu}
            doToggleLogin={toggleLogin}
            doToggleProfile={toggleProfile}
            className={`${menuState} w-full laptop:w-auto divide-y-2 divide-blue-sky-4 dark:divide-purple-700 overflow-hidden laptop:flex laptop:flex-row laptop:justify-center laptop:items-center laptop:space-x-4 laptop:max-h-full laptop:divide-y-0 laptop:opacity-100`}
            itemsStyle={"py-3 transition-colors hover:text-gray-200"}
            items={[
              user && {
                content: user.username ? user.username : "No username",
                specialStyle: "block laptop:hidden",
                toggleProfile: true,
                key: user._id + "1",
              },
              {
                content: "Get VPN",
                specialStyle:
                  "transition-colors hover:text-gray-200 laptop:bg-blue-sky-3 laptop:py-1 laptop:px-3 laptop:rounded-xl laptop:dark:bg-purple-700",
                linkPath: "#plans",
                key: "getvpn2",
              },
              { content: "What is VPN?", key: "whatisvpn" },
              !user && {
                content: "Features",
                linkPath: "#features",
                key: "features1",
              },
              !user && {
                content: "Servers",
                linkPath: "#servers",
                key: "servers1",
              },
              user && {
                content: "Features",
                specialStyle: "hidden desktop:block",
                linkPath: "#features",
                key: "features2",
              },
              user && {
                content: "Servers",
                specialStyle: "hidden desktop:block",
                linkPath: "#servers",
                key: "servers2",
              },
              user && {
                content: user.username ? user.username : "No username",
                specialStyle: "hidden laptop:block",
                toggleProfile: true,
                key: user._id + "2",
              },
              user && {
                content: "Logout",
                linkPath: "/logout",
                key: "logout2",
              },
              !user && { content: "Login", toggleLogin: true, key: "login2" },
            ]}
          />
          <ToggleTheme styles="hidden laptop:block" />
        </div>
      </Container>
    </Fragment>
  );
}

Navbar.defaultProps = {
  user: null,
};

Navbar.propTypes = {
  user: PropTypes.object,
};

export default Navbar;
