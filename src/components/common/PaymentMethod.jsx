import React from "react";
import PropTypes from "prop-types";
import { creditCard, paypal } from "../../utils/images";

function PaymentMethod({ method }) {
  let paymentMethod = "";

  if (method !== "creditCard" && method !== "paypal") throw new Error();
  else if (method === "creditCard") paymentMethod = creditCard;
  else if (method === "paypal") paymentMethod = paypal;

  return (
    <div
      className={`hover:border-2 hover:border-solid hover:border-blue-dark hover:rounded-xl cursor-pointer flex flex-row items-center justify-center`}
    >
      <img src={paymentMethod} alt="Payment method" />
    </div>
  );
}

PaymentMethod.defaultProps = {
  method: "",
};

PaymentMethod.propTypes = {
  method: PropTypes.string.isRequired,
};

export default PaymentMethod;
