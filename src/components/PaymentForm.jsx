import React, { useEffect, useState } from "react";
import Container from "./common/Container";
import Input from "./common/Input";
import Button from "./common/Button";
import PaymentMethod from "./common/PaymentMethod";
import { ArrowBack } from "./common/Icons";

function PaymentForm(props) {
  const formOn = "visible opacity-100";
  const formOff = "hidden opacity-0";
  const borderOn = "border-blue-dark";
  const borderOff = "";
  const [cardMethodStyle, setCardMethodStyle] = useState(formOff);
  const [paypalMethodStyle, setPaypalMethodStyle] = useState(formOff);
  const [opacityAnimation, setOpacityAnimation] = useState("");
  const [cardBorder, setCardBorder] = useState(borderOff);
  const [paypalBorder, setPaypalBorder] = useState(borderOff);
  const total = 0;
  const currency = "$";

  useEffect(() => {
    document.body.className =
      "bg-gradient-to-r from-blue-sky-1 to-blue-sky-2 h-screen";
    return () => {
      document.body.className = null;
    };
  }, []);

  function addOpacityAnimation() {
    setOpacityAnimation("animate-opacity-slow");
  }

  function selectCardMethod() {
    if (paypalMethodStyle === formOn) setPaypalMethodStyle(formOff);
    setCardMethodStyle(formOn);
    addOpacityAnimation();
    if (cardBorder !== borderOn) setCardBorder(borderOn);
    if (paypalBorder !== borderOff) setPaypalBorder(borderOff);
  }

  function selectPaypalMethod() {
    if (cardMethodStyle === formOn) setCardMethodStyle(formOff);
    setPaypalMethodStyle(formOn);
    addOpacityAnimation();
    if (paypalBorder !== borderOn) setPaypalBorder(borderOn);
    if (cardBorder !== borderOff) setCardBorder(borderOff);
  }

  return (
    <Container
      tag="section"
      stylesInside="flex flex-col justify-center items-center"
      stylesOutside="pt-3"
    >
      <form className="w-full tablet-small:max-w-lg p-4 flex flex-col space-y-6">
        <header className="text-center w-full">
          <h1 className="text-2xl text-blue-dark">
            Your total is {currency}
            {total}
          </h1>
          <h2 className="text-lg text-blue-bird">Choose a payment method</h2>
        </header>
        <div className="grid grid-cols-1 gap-2 tablet-small:grid-cols-2">
          <PaymentMethod
            method="creditCard"
            onClick={selectCardMethod}
            border={cardBorder}
          />
          <PaymentMethod
            method="paypal"
            onClick={selectPaypalMethod}
            border={paypalBorder}
          />
        </div>
        <div
          className={`flex flex-col space-y-6 ${cardMethodStyle} ${opacityAnimation}`}
          onAnimationEnd={() => setOpacityAnimation("")}
        >
          <div className="text-lg text-blue-dark font-semibold">
            Do you want to be billed automatically after this subscription
            expires?
            <Input
              label="Yes"
              type="radio"
              id="cardyes"
              name="cardbilling"
              defaultChecked
            />
            <Input label="No" type="radio" id="cardno" name="cardbilling" />
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
          <div className="flex flex-col justify-center items-start space-y-6 tablet-small:space-y-0 tablet-small:flex-row tablet-small:justify-between">
            <Button
              fontColor="text-gray-25"
              type="submit"
              isSubmit={true}
              label={`Pay ${currency}${total}`}
              fontSize="text-xl"
            />
            <Button
              goBack={true}
              label="Go back"
              labelIcon={ArrowBack}
              fontSize="text-xl"
            />
          </div>
        </div>
        <div
          className={`flex flex-col space-y-6 ${paypalMethodStyle} ${opacityAnimation}`}
          onAnimationEnd={() => setOpacityAnimation("")}
        >
          <div className="text-lg text-blue-dark font-semibold">
            Do you want to be billed automatically after this subscription
            expires?
            <Input
              label="Yes"
              type="radio"
              id="paypalyes"
              name="paypalbilling"
              defaultChecked
            />
            <Input label="No" type="radio" id="paypalno" name="paypalbilling" />
          </div>
          <div className="flex flex-col justify-center items-start space-y-6 tablet-small:space-y-0 tablet-small:flex-row tablet-small:justify-between">
            <Button
              fontColor="text-gray-25"
              type="submit"
              isSubmit={true}
              label={`Pay ${currency}${total}`}
              fontSize="text-xl"
            />
            <Button
              goBack={true}
              label="Go back"
              labelIcon={ArrowBack}
              fontSize="text-xl"
            />
          </div>
        </div>
      </form>
    </Container>
  );
}

export default PaymentForm;
