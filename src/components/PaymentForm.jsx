import React, { useEffect } from "react";
import Container from "./common/Container";
import Input from "./common/Input";
import Button from "./common/Button";
import PaymentMethod from "./common/PaymentMethod";
import { ArrowBack } from "./common/Icons";

function PaymentForm(props) {
  useEffect(() => {
    document.body.className =
      "bg-gradient-to-r from-blue-light-1 to-blue-light-2 h-screen";
    return () => {
      document.body.className = null;
    };
  }, []);

  return (
    <Container
      tag="section"
      stylesInside="flex flex-col justify-center items-center"
      stylesOutside="pt-3"
    >
      <form className="max-w-lg p-4 flex flex-col space-y-6">
        <header className="text-center">
          <h1 className="text-2xl text-blue-dark">Your total is $250</h1>
          <h2 className="text-lg text-blue-bird">Choose a payment method</h2>
        </header>
        <div className="grid grid-cols-1 gap-2 tablet-small:grid-cols-2">
          <PaymentMethod method="creditCard" />
          <PaymentMethod method="paypal" />
        </div>
        <div className="text-lg text-blue-dark font-semibold">
          Do you want to be billed automatically after this subscription
          expires?
          <Input
            label="Yes"
            type="radio"
            id="billyes"
            name="billing"
            defaultChecked
          />
          <Input label="No" type="radio" id="billno" name="billing" />
        </div>
        <Input type="text" label="Name on the card" id="cardname" />
        <Input type="tel" label="Card number" id="cardnum" />
        <div className="flex flex-col space-y-6 tablet-small:flex-row tablet-small:space-x-6 tablet-small:space-y-0">
          <div className="flex flex-row space-x-6 justify-around tablet-small:w-4/6">
            <Input type="tel" label="MM / YY" id="cardexp" />
            <Input type="tel" label="CVC" id="cardcvc" />
          </div>
          <Input
            styles="tablet-small:w-4/6"
            type="tel"
            label="Zip / Postal Code"
            id="cardzip"
          />
        </div>
        <Input
          checkboxLabelFontSize="text-lg"
          type="checkbox"
          id="savecard"
          label="Save the card for future purchases"
          className="cursor-pointer text-base ml-2"
        />
        <div className="flex flex-row flex-wrap justify-between">
          <Button
            styles="mb-4 mr-4"
            fontColor="text-gray-25"
            type="submit"
            isGreen={true}
            label={`Pay $${250}`}
            fontSize="text-xl"
          />
          <Button label="Go back" labelIcon={ArrowBack} fontSize="text-xl" />
        </div>
      </form>
    </Container>
  );
}

export default PaymentForm;
