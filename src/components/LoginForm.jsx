import React, { useState, useEffect } from "react";
import Joi from "joi";
import { Link } from "react-router-dom";
import Button from "./common/Button";
import Input from "./common/Input";
import FormContainer from "./common/FormContainer";
import auth from "../services/authService";
import { removeCharacter } from "./../utils/removeCharacter";

function LoginForm({ toggleState, goToSignUp, ...props }) {
  const [data, setData] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [errors, setErrors] = useState({});
  const [serverErrors, setServerErrors] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const schema = {
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .label("E-mail"),
    password: Joi.string().min(5).required().label("Password"),
    remember: Joi.bool().required(),
  };

  function handleCheckbox() {
    setIsChecked(!isChecked);
    const newData = { ...data };
    if (newData.remember) newData.remember = false;
    else newData.remember = true;
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
    const inputObject = { [input.target.name]: input.target.value };
    const schemaProperty = Joi.object({
      [input.target.name]: schema[input.target.name],
    });

    const { error } = schemaProperty.validate(inputObject);
    return error ? error.details[0].message : null;
  }

  function handleChange(e) {
    if (e.target.name === "remember") handleCheckbox();
    else {
      const newErrors = { ...errors };
      const newErrMessage = validateOne(e);
      if (newErrMessage) {
        newErrors[e.target.name] = newErrors[e.target.name] = removeCharacter(
          /"/g,
          newErrMessage
        );
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

      await auth.login(userData.email, userData.password);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const newErrors = removeCharacter(/"/g, ex.response.data);
        setServerErrors(newErrors);
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
        label="E-mail"
        id="email"
        name="email"
        error={errors.email}
      />
      <Input
        type="password"
        label="Password"
        id="password"
        name="password"
        error={errors.password}
      />
      <Input
        label="Remember me"
        type="checkbox"
        id="remember"
        name="remember"
        defaultChecked={isChecked}
      />
      <Button
        type="submit"
        label="Login"
        fontSize="text-base tablet:text-xl"
        disabled={validate()}
        error={serverErrors}
      />
      <Link
        to="/"
        className="text-center hover:underline text-sm tablet:text-base"
      >
        Forgot your Password?
      </Link>
      <p className="text-base tablet:text-xl font-semibold pt-3 tablet:pt-6">
        Are you new?
      </p>
      <Button
        onClick={goToSignUp}
        label="Sign up"
        fontSize="text-base tablet:text-xl"
      />
    </FormContainer>
  );
}

export default LoginForm;
