import React, { useState, useEffect, useRef } from "react";
import Logo from "./common/Logo";
import ChangeEmailForm from "./ChangeEmailForm";
import ChangeUsernameForm from "./ChangeUsernameForm";
import ChangePasswordForm from "./ChangePasswordForm";
import DeleteAccount from "./DeleteAccount";
import { Cross } from "./common/Icons";
import Button from "./common/Button";
import PropTypes from "prop-types";

function Profile({ children, toggleState, user, ...props }) {
  const ref = useRef(null);
  const visibleFormStyle =
    "w-full flex flex-col justify-center items-center space-y-3 tablet:space-y-4 visible opacity-100 animate-opacity-slow";
  const visible = "visible opacity-100 animate-opacity-slow";
  const notVisible = "hidden opacity-0";
  const [buttonVisibilityStyle, setButtonVisibilityStyle] = useState(visible);
  const [isVisible, setIsVisible] = useState(notVisible);
  const [emailFormStyle, setEmailFormStyle] = useState(notVisible);
  const [usernameFormStyle, setUsernameFormStyle] = useState(notVisible);
  const [passwordFormStyle, setPasswordFormStyle] = useState(notVisible);
  const [deleteAccountStyle, setDeleteAccountStyle] = useState(notVisible);
  const [message, setMessage] = useState(
    `Hello, ${user.username ? user.username : "No username"}`
  );

  function closeWindow() {
    setIsVisible(notVisible);
  }

  function handleClickOutside(e) {
    if (ref.current && !ref.current.contains(e.target))
      setIsVisible(notVisible);
  }

  function handleButtonClick() {
    setButtonVisibilityStyle(notVisible);
  }

  function handleEmailForm() {
    handleButtonClick();
    setEmailFormStyle(visibleFormStyle);
    setMessage(`Current e-mail: ${user.email}`);
  }

  function handleUsernameForm() {
    handleButtonClick();
    setUsernameFormStyle(visibleFormStyle);
    setMessage(`Current username: ${user.username}`);
  }

  function handlePasswordForm() {
    handleButtonClick();
    setPasswordFormStyle(visibleFormStyle);
    setMessage(`New password`);
  }

  function handleDeleteAccount() {
    handleButtonClick();
    setDeleteAccountStyle(visibleFormStyle);
    setMessage(`Are you sure you want to delete your account?`);
  }

  function resetProfile() {
    setEmailFormStyle(notVisible);
    setUsernameFormStyle(notVisible);
    setPasswordFormStyle(notVisible);
    setDeleteAccountStyle(notVisible);
    setButtonVisibilityStyle(visible);
    setMessage(`Hello, ${user.username ? user.username : "No username"}`);
  }

  useEffect(() => {
    if (toggleState) {
      setIsVisible(visible);
    }
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
      resetProfile();
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
        <div
          {...props}
          className="flex flex-col justify-center items-center w-full"
        >
          <p className="overflow-ellipsis px-4 tablet:px-6 overflow-hidden font-semibold text-center text-lg mb-6 w-64 tablet:-mt-1 tablet:mb-8 tablet:w-80 tablet:text-xl laptop:text-1.5xl">
            {message}
          </p>
          <div className="w-44 tablet:w-52">
            <Button
              onClick={handleEmailForm}
              label="Change e-mail"
              type="button"
              fontSize="text-base tablet:text-xl"
              styles={`w-full py-1 tablet:py-3 mb-4 tablet:mb-5 ${buttonVisibilityStyle}`}
            />
            <Button
              onClick={handleUsernameForm}
              label="Change username"
              type="button"
              fontSize="text-base tablet:text-xl"
              styles={`w-full py-1 tablet:py-3 mb-4 tablet:mb-5 ${buttonVisibilityStyle}`}
            />
            <Button
              onClick={handlePasswordForm}
              label="Change password"
              type="button"
              fontSize="text-base tablet:text-xl"
              styles={`w-full py-1 tablet:py-3 mb-4 tablet:mb-5 ${buttonVisibilityStyle}`}
            />
            <Button
              onClick={handleDeleteAccount}
              label="Delete account"
              type="button"
              fontSize="text-base tablet:text-xl"
              styles={`w-full py-1 tablet:py-3 ${buttonVisibilityStyle}`}
            />
          </div>
          <ChangeEmailForm
            className={emailFormStyle}
            resetProfile={resetProfile}
            toggleState={toggleState}
          />
          <ChangeUsernameForm
            className={usernameFormStyle}
            resetProfile={resetProfile}
            toggleState={toggleState}
          />
          <ChangePasswordForm
            className={passwordFormStyle}
            resetProfile={resetProfile}
            toggleState={toggleState}
          />
          <DeleteAccount
            className={deleteAccountStyle}
            resetProfile={resetProfile}
            toggleState={toggleState}
          />
        </div>
      </div>
    </div>
  );
}

Profile.defaultProps = {
  user: null,
  toggleState: false,
};

Profile.propTypes = {
  user: PropTypes.object,
  toggleState: PropTypes.bool,
};

export default Profile;
