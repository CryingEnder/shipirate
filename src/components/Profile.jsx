import React, { useState, useEffect, useRef } from "react";
import Joi from "joi";
import Logo from "./common/Logo";
import { Cross, ArrowBack } from "./common/Icons";
import { removeCharacter } from "../utils/removeCharacter";
import userService from "../services/userService";
import Input from "./common/Input";
import Button from "./common/Button";
import PropTypes from "prop-types";

function Profile({ toggleState, user, ...props }) {
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
  const [message, setMessage] = useState(
    `Hi, ${user.username ? user.username : "No username"}`
  );
  const [emailData, setEmailData] = useState({
    newEmail: "",
    repeatNewEmail: "",
  });
  const [usernameData, setUsernameData] = useState({
    newUsername: "",
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    repeatNewPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [serverErrors, setServerErrors] = useState("");

  const emailSchema = {
    newEmail: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .label("New e-mail"),
    repeatNewEmail: Joi.valid(Joi.ref("newEmail"))
      .required()
      .label("Repeat new e-mail")
      .messages({ "any.only": "Repeat new e-mail must match new e-mail" }),
  };

  const usernameSchema = {
    newUsername: Joi.string()
      .alphanum()
      .min(5)
      .max(30)
      .required()
      .label("New username"),
  };

  const passwordSchema = {
    currentPassword: Joi.string()
      .min(5)
      .required()
      .label("Current password")
      .pattern(new RegExp("^[a-zA-Z0-9!@#$%^&*()]{3,30}$"))
      .messages({
        "string.pattern.base":
          "Password may only contain alphanumeric or special characters",
      }),
    newPassword: Joi.string()
      .min(5)
      .disallow(Joi.ref("currentPassword"))
      .required()
      .label("New password")
      .pattern(new RegExp("^[a-zA-Z0-9!@#$%^&*()]{3,30}$"))
      .messages({
        "string.pattern.base":
          "Password may only contain alphanumeric or special characters",
        "any.only": "New password must not match current password",
      }),
    repeatNewPassword: Joi.valid(Joi.ref("newPassword"))
      .required()
      .label("Repeat new password")
      .messages({ "any.only": "Repeat new password must match new password" }),
  };

  function validateEmail() {
    const { error } = Joi.object(emailSchema).validate(emailData, {
      abortEarly: false,
    });
    if (!error) return null;

    const foundErrors = { ...error };
    const newErrors = {};
    foundErrors.details.map(
      (e) => (newErrors[e.path[0]] = removeCharacter(/"/g, e.message))
    );
    return newErrors;
  }

  function validateUsername() {
    const { error } = Joi.object(usernameSchema).validate(usernameData, {
      abortEarly: false,
    });
    if (!error) return null;

    const foundErrors = { ...error };
    const newErrors = {};
    foundErrors.details.map(
      (e) => (newErrors[e.path[0]] = removeCharacter(/"/g, e.message))
    );
    return newErrors;
  }

  function validatePassword() {
    const { error } = Joi.object(passwordSchema).validate(passwordData, {
      abortEarly: false,
    });
    if (!error) return null;

    const foundErrors = { ...error };
    const newErrors = {};
    foundErrors.details.map(
      (e) => (newErrors[e.path[0]] = removeCharacter(/"/g, e.message))
    );
    return newErrors;
  }

  function validateOneEmail(input) {
    const inputObject =
      input.target.name === "repeatNewEmail"
        ? {
            newEmail: emailData.newEmail,
            [input.target.name]: input.target.value,
          }
        : {
            [input.target.name]: input.target.value,
          };
    const schemaProps =
      input.target.name === "repeatNewEmail"
        ? Joi.object({
            newEmail: emailSchema["newEmail"],
            [input.target.name]: emailSchema[input.target.name],
          })
        : Joi.object({
            [input.target.name]: emailSchema[input.target.name],
          });

    const { error } = schemaProps.validate(inputObject);
    return error ? error.details[0].message : null;
  }

  function validateOneUsername(input) {
    const inputObject = {
      [input.target.name]: input.target.value,
    };
    const schemaProps = Joi.object({
      [input.target.name]: usernameSchema[input.target.name],
    });

    const { error } = schemaProps.validate(inputObject);
    return error ? error.details[0].message : null;
  }

  function validateOnePassword(input) {
    const inputObject =
      input.target.name === "repeatNewPassword"
        ? {
            newPassword: passwordData.newPassword,
            [input.target.name]: input.target.value,
          }
        : {
            [input.target.name]: input.target.value,
          };
    const schemaProps =
      input.target.name === "repeatNewPassword"
        ? Joi.object({
            newPassword: passwordSchema["newPassword"],
            [input.target.name]: passwordSchema[input.target.name],
          })
        : Joi.object({
            [input.target.name]: passwordSchema[input.target.name],
          });

    const { error } = schemaProps.validate(inputObject);
    return error ? error.details[0].message : null;
  }

  function handleChangeEmailForm(e) {
    const newErrors = { ...errors };
    const newErrMessage = validateOneEmail(e);
    if (newErrMessage) {
      newErrors[e.target.name] = removeCharacter(/"/g, newErrMessage);
    } else delete newErrors[e.target.name];

    const newData = { ...emailData };
    newData[e.target.name] = e.target.value;

    setEmailData(newData);
    setErrors(newErrors);
  }

  function handleChangeUsernameForm(e) {
    const newErrors = { ...errors };
    const newErrMessage = validateOneUsername(e);
    if (newErrMessage) {
      newErrors[e.target.name] = removeCharacter(/"/g, newErrMessage);
    } else delete newErrors[e.target.name];

    const newData = { ...usernameData };
    newData[e.target.name] = e.target.value;

    setUsernameData(newData);
    setErrors(newErrors);
  }

  function handleChangePasswordForm(e) {
    const newErrors = { ...errors };
    const newErrMessage = validateOnePassword(e);
    if (newErrMessage) {
      newErrors[e.target.name] = removeCharacter(/"/g, newErrMessage);
    } else delete newErrors[e.target.name];

    const newData = { ...passwordData };
    newData[e.target.name] = e.target.value;

    setPasswordData(newData);
    setErrors(newErrors);
  }

  function handleEmailSubmit(e) {
    e.preventDefault();

    const foundErrors = validateEmail();
    setErrors(foundErrors || {});
    if (foundErrors) return;

    doEmailSubmit();
  }

  function handleUsernameSubmit(e) {
    e.preventDefault();

    const foundErrors = validateUsername();
    setErrors(foundErrors || {});
    if (foundErrors) return;

    doUsernameSubmit();
  }

  function handlePasswordSubmit(e) {
    e.preventDefault();

    const foundErrors = validatePassword();
    setErrors(foundErrors || {});
    if (foundErrors) return;

    doPasswordSubmit();
  }

  async function doEmailSubmit() {
    try {
      const userData = { ...emailData };
      delete userData.agree;

      await userService.updateAccount(userData);

      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const newErrors = removeCharacter(/"/g, ex.response.data);
        setServerErrors(newErrors);
      }
    }
  }

  async function doUsernameSubmit() {
    try {
      const userData = { ...usernameData };
      delete userData.agree;

      await userService.updateAccount(userData);

      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const newErrors = removeCharacter(/"/g, ex.response.data);
        setServerErrors(newErrors);
      }
    }
  }

  async function doPasswordSubmit() {
    try {
      const userData = { ...passwordData };
      delete userData.agree;

      await userService.updateAccount(userData);

      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const newErrors = removeCharacter(/"/g, ex.response.data);
        setServerErrors(newErrors);
      }
    }
  }

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

  function resetProfile() {
    setEmailFormStyle(notVisible);
    setUsernameFormStyle(notVisible);
    setPasswordFormStyle(notVisible);
    setButtonVisibilityStyle(visible);
    setServerErrors("");
    setMessage(`Hi, ${user.username}`);
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
          <p className="overflow-ellipsis px-4 tablet:px-6 overflow-hidden font-semibold text-center text-base mb-6 w-64 tablet:-mt-2 tablet:mb-8 tablet:w-80 tablet:text-xl laptop:text-1.5xl">
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
              styles={`w-full py-1 tablet:py-3 ${buttonVisibilityStyle}`}
            />
          </div>
          <form
            onChange={handleChangeEmailForm}
            onSubmit={handleEmailSubmit}
            className={emailFormStyle}
          >
            <Input
              type="text"
              label="New e-mail"
              id="newemail"
              name="newEmail"
              error={errors.newEmail}
            />
            <Input
              type="text"
              label="Repeat new e-mail"
              id="repeatnewemail"
              name="repeatNewEmail"
              error={errors.repeatNewEmail}
            />
            <div className="flex flex-row justify-between items-center space-x-4 relative pt-4">
              <Button
                type="button"
                onClick={resetProfile}
                label="Back"
                labelIcon={ArrowBack}
                labelIconSize="w-5 tablet:w-6"
                fontSize="text-base tablet:text-xl"
              />
              <Button
                type="submit"
                label="Change"
                fontSize="text-base tablet:text-xl"
                disabled={validateEmail()}
                error={serverErrors}
              />
            </div>
          </form>
          <form
            onChange={handleChangeUsernameForm}
            onSubmit={handleUsernameSubmit}
            className={usernameFormStyle}
          >
            <Input
              type="text"
              label="New username"
              id="newusername"
              name="newUsername"
              error={errors.newUsername}
            />
            <div className="flex flex-row justify-between items-center space-x-4 pt-4">
              <Button
                type="button"
                onClick={resetProfile}
                label="Back"
                labelIcon={ArrowBack}
                labelIconSize="w-5 tablet:w-6"
                fontSize="text-base tablet:text-xl"
              />
              <Button
                type="submit"
                label="Change"
                fontSize="text-base tablet:text-xl"
                disabled={validateUsername()}
                error={serverErrors}
              />
            </div>
          </form>
          <form
            onChange={handleChangePasswordForm}
            onSubmit={handlePasswordSubmit}
            className={passwordFormStyle}
          >
            <Input
              type="password"
              label="Current password"
              id="currentpassword"
              name="currentPassword"
              error={errors.currentPassword}
            />
            <Input
              type="password"
              label="New password"
              id="newpassword"
              name="newPassword"
              error={errors.newPassword}
            />
            <Input
              type="password"
              label="Repeat new password"
              id="repeatnewpassword"
              name="repeatNewPassword"
              error={errors.repeatNewPassword}
            />
            <div className="flex flex-row justify-between items-center space-x-4 pt-4">
              <Button
                type="button"
                onClick={resetProfile}
                label="Back"
                labelIcon={ArrowBack}
                labelIconSize="w-5 tablet:w-6"
                fontSize="text-base tablet:text-xl"
              />
              <Button
                type="submit"
                label="Change"
                fontSize="text-base tablet:text-xl"
                disabled={validatePassword()}
                error={serverErrors}
              />
            </div>
          </form>
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
