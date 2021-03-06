import React, { useState, useEffect } from "react";
import { removeCharacter } from "../utils/removeCharacter";
import { ArrowBack } from "./common/Icons";
import Input from "./common/Input";
import Button from "./common/Button";
import ErrorBox from "./common/ErrorBox";
import userService from "../services/userService";
import Joi from "joi";
import PropTypes from "prop-types";

function ChangeEmailForm({ resetProfile, toggleState, ...props }) {
  const [errors, setErrors] = useState({});
  const [serverErrors, setServerErrors] = useState("");
  const [data, setData] = useState({
    newEmail: "",
    repeatNewEmail: "",
  });

  const schema = {
    newEmail: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .label("New email"),
    repeatNewEmail: Joi.valid(Joi.ref("newEmail"))
      .required()
      .label("Repeat new email")
      .messages({ "any.only": "Repeat new email must match new email" }),
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
      input.target.name === "repeatNewEmail"
        ? {
            newEmail: data.newEmail,
            [input.target.name]: input.target.value,
          }
        : {
            [input.target.name]: input.target.value,
          };
    const schemaProps =
      input.target.name === "repeatNewEmail"
        ? Joi.object({
            newEmail: schema["newEmail"],
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
      if (
        (ex.response && ex.response.status === 400) ||
        ex.response.status === 401
      ) {
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
        type="text"
        label="New email"
        id="newemail"
        name="newEmail"
        error={errors.newEmail}
      />
      <Input
        type="text"
        label="Repeat new email"
        id="repeatnewemail"
        name="repeatNewEmail"
        error={errors.repeatNewEmail}
      />
      <div className="flex flex-row justify-between items-center space-x-4 relative pt-4">
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
        />
      </div>
      <ErrorBox error={serverErrors} />
    </form>
  );
}

ChangeEmailForm.propTypes = {
  resetProfile: PropTypes.func.isRequired,
  toggleState: PropTypes.bool.isRequired,
};

export default ChangeEmailForm;
