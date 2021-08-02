import React, { useState, useEffect } from "react";
import Joi from "joi";
import Button from "./common/Button";
import Input from "./common/Input";
import FormContainer from "./common/FormContainer";
import auth from "../services/authService";
import * as userService from "../services/userService";
import { removeCharacter } from "../utils/removeCharacter";

function SignupForm({ toggleState, ...props }) {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
    agree: false,
  });
  const [errors, setErrors] = useState({});
  const [isChecked, setIsChecked] = useState(false);

  const schema = {
    username: Joi.string().alphanum().min(5).required().label("Username"),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .label("E-mail"),
    password: Joi.string().min(5).required().label("Password"),
    repeatPassword: Joi.string()
      .valid(Joi.ref("password"))
      .required()
      .label("Repeat password")
      .messages({ "any.only": "Repeat password must match password" }),
    agree: Joi.bool()
      .valid(true)
      .required()
      .messages({ "any.only": "You must agree with T&C" }),
  };

  function handleCheckbox() {
    setIsChecked(!isChecked);
    const newData = { ...data };
    if (newData.agree) newData.agree = false;
    else newData.agree = true;
    setData(newData);
  }

  function validate() {
    const { error } = Joi.object(schema).validate(data, { abortEarly: false });
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
      input.target.name === "repeatPassword"
        ? {
            password: data.password,
            [input.target.name]: input.target.value,
          }
        : {
            [input.target.name]: input.target.value,
          };
    const schemaProps =
      input.target.name === "repeatPassword"
        ? Joi.object({
            password: schema["password"],
            [input.target.name]: schema[input.target.name],
          })
        : Joi.object({
            [input.target.name]: schema[input.target.name],
          });

    const { error } = schemaProps.validate(inputObject);
    return error ? error.details[0].message : null;
  }

  function handleChange(e) {
    if (e.target.name === "agree") handleCheckbox();
    else {
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

      const response = await userService.register(userData);
      auth.loginWithJwt(response.headers["x-auth-token"]);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const newErrors = { ...errors };
        if (ex.response.data.email)
          newErrors.email = removeCharacter(/"/g, ex.response.data.email);
        else newErrors.email = removeCharacter(/"/g, ex.response.data);
        setErrors(newErrors);
      }
    }
  }

  return (
    <FormContainer
      onSubmit={handleSubmit}
      onChange={handleChange}
      toggleState={toggleState}
    >
      <Input
        type="text"
        label="Username"
        id="username"
        name="username"
        error={errors.username}
      />
      <Input
        type="text"
        label="E-mail"
        id="emailnew"
        name="email"
        error={errors.email}
      />
      <Input
        type="password"
        label="Password"
        id="passwordnew"
        name="password"
        error={errors.password}
      />
      <Input
        type="password"
        label="Repeat password"
        id="repeatpasswordnew"
        name="repeatPassword"
        error={errors.repeatPassword}
      />
      <Input
        type="checkbox"
        label={"I agree with T&Cs"}
        id="terms"
        name="agree"
        styles="pt-2 tablet:pt-6"
        linkPath={"/"}
        defaultChecked={isChecked}
      />
      <Button
        type="submit"
        label="Register"
        fontSize="text-base tablet:text-xl"
        disabled={validate()}
      />
    </FormContainer>
  );
}

export default SignupForm;
