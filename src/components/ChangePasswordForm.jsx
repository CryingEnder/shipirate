import React, { useState, useEffect } from "react";
import { removeCharacter } from "../utils/removeCharacter";
import { ArrowBack } from "./common/Icons";
import Input from "./common/Input";
import Button from "./common/Button";
import userService from "../services/userService";
import Joi from "joi";
import PropTypes from "prop-types";

function ChangePasswordForm({ resetProfile, toggleState, ...props }) {
  const [errors, setErrors] = useState({});
  const [serverErrors, setServerErrors] = useState("");
  const [data, setData] = useState({
    currentPassword: "",
    newPassword: "",
    repeatNewPassword: "",
  });

  const schema = {
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

  function reset() {
    resetProfile();
    setServerErrors("");
  }

  function validate() {
    const { error } = Joi.object(schema).validate(data, {
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

  function validateOne(input) {
    const inputObject =
      input.target.name === "repeatNewPassword"
        ? {
            newPassword: data.newPassword,
            [input.target.name]: input.target.value,
          }
        : {
            [input.target.name]: input.target.value,
          };
    const schemaProps =
      input.target.name === "repeatNewPassword"
        ? Joi.object({
            newPassword: schema["newPassword"],
            [input.target.name]: schema[input.target.name],
          })
        : Joi.object({
            [input.target.name]: schema[input.target.name],
          });

    const { error } = schemaProps.validate(inputObject);
    return error ? error.details[0].message : null;
  }

  function handleChange(e) {
    const newErrors = { ...errors };
    const newErrMessage = validateOne(e);
    if (newErrMessage) {
      newErrors[e.target.name] = removeCharacter(/"/g, newErrMessage);
    } else delete newErrors[e.target.name];

    const newData = { ...data };
    newData[e.target.name] = e.target.value;

    setData(newData);
    setErrors(newErrors);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const foundErrors = validate();
    setErrors(foundErrors || {});
    if (foundErrors) return;

    doSubmit();
  }

  async function doSubmit() {
    try {
      const userData = { ...data };
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

  useEffect(() => {
    return () => {
      reset();
    };
  }, [toggleState]);

  return (
    <form {...props} onChange={handleChange} onSubmit={handleSubmit}>
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
          onClick={reset}
          label="Back"
          labelIcon={ArrowBack}
          labelIconSize="w-5 tablet:w-6"
          fontSize="text-base tablet:text-xl"
        />
        <Button
          type="submit"
          label="Change"
          fontSize="text-base tablet:text-xl"
          disabled={validate()}
          error={serverErrors}
        />
      </div>
    </form>
  );
}

ChangePasswordForm.propTypes = {
  resetProfile: PropTypes.func.isRequired,
  toggleState: PropTypes.bool.isRequired,
};

export default ChangePasswordForm;
