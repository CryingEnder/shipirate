import React, { useState, useEffect } from "react";
import Button from "./common/Button";
import { ArrowBack } from "./common/Icons";
import { removeCharacter } from "../utils/removeCharacter";
import ErrorBox from "./common/ErrorBox";
import userService from "../services/userService";
import auth from "../services/authService";
import PropTypes from "prop-types";

function DeleteAccount({ resetProfile, toggleState, ...props }) {
  const [serverErrors, setServerErrors] = useState("");

  function reset() {
    setServerErrors("");
    resetProfile();
  }

  async function deleteAccount() {
    try {
      await userService.deleteAccount();
      auth.logout();

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
    <div {...props}>
      <div className="flex flex-row justify-between items-center space-x-4 relative">
        <Button
          type="button"
          onClick={reset}
          label="Back"
          labelIcon={ArrowBack}
          labelIconSize="w-5 tablet:w-6"
          fontSize="text-base tablet:text-xl"
        />
        <Button
          type="button"
          onClick={deleteAccount}
          label="Delete"
          fontSize="text-base tablet:text-xl"
        />
      </div>
      <ErrorBox error={serverErrors} />
    </div>
  );
}

DeleteAccount.propTypes = {
  resetProfile: PropTypes.func.isRequired,
  toggleState: PropTypes.bool.isRequired,
};

export default DeleteAccount;
