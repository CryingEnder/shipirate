import React from "react";
import PropTypes from "prop-types";
import { creditCard, paypal } from "../../utils/images";

function PaymentMethod({ method }) {
  let paymentMethod = "";

  if (method !== "creditCard" && method !== "paypal") throw new Error();
  else if (method === "creditCard") paymentMethod = creditCard;
  else if (method === "paypal") paymentMethod = paypal;

  return (
    <img
      className={`border-2 border-solid rounded-xl border-transparent hover:border-blue-dark cursor-pointer`}
      src={paymentMethod}
      alt="Payment method"
    />
  );
}

PaymentMethod.defaultProps = {
  method: "",
};

PaymentMethod.propTypes = {
  method: PropTypes.string.isRequired,
};

export default PaymentMethod;
