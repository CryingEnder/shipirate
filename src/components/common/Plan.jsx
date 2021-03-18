import React from "react";
import { Check, Cross } from "./Icons";
import {
  ocean,
  tierOne,
  tierTwo,
  tierThree,
  popular,
} from "./../../utils/images";
import Button from "./Button";
import Badge from "./Badge";
import { showTwoDecimals } from "./../../utils/showTwoDecimals";
import PropTypes from "prop-types";

function Plan({
  planFeatures,
  numberOfMonths,
  price: initialPrice,
  discountPercentage,
  currency,
  isPopular,
}) {
  const price = discountPercentage
    ? showTwoDecimals(initialPrice - (discountPercentage / 100) * initialPrice)
    : showTwoDecimals(initialPrice);
  const totalPrice = discountPercentage
    ? showTwoDecimals(price * numberOfMonths)
    : showTwoDecimals(initialPrice * numberOfMonths);
  let tier = "";

  if (numberOfMonths > 6) tier = tierThree;
  else if (numberOfMonths > 1) tier = tierTwo;
  else tier = tierOne;

  return (
    <article className="relative cursor-pointer text-center rounded-2xl p-2 mx-auto shadow-md bg-gradient-to-b from-gray-25 to-gray-30 text-blue-bird max-w-sm tablet:max-w-md tablet:transform tablet:ease-out tablet:duration-200 tablet:hover:scale-105 laptop:w-3/10">
      {isPopular && (
        <img
          className="absolute right-2 -top-4 w-1/5"
          src={popular}
          alt="A popular sale badge"
        />
      )}
      <header className="mb-6">
        <img
          className="mx-auto mb-2 -mt-20 w-1/3"
          src={tier}
          alt="A pirate hat"
        />
        <h3 className="clip-plan-header mb-3 pb-7 pt-3 -mx-4 shadow-sm text-shadow rounded-t-lg bg-blue-water text-gray-25">
          {`${numberOfMonths} month plan`}
        </h3>
        <div className="flex flex-wrap space-x-1 mb-2 justify-center items-center">
          {discountPercentage > 0 && (
            <div className="flex flex-col">
              <p className="line-through font-normal">
                {`${currency}${initialPrice}`}
              </p>
              <Badge label={`Save ${discountPercentage}%`} />
            </div>
          )}
          <div className="flex flex-row">
            <p className="font-bold text-5xl tablet:text-6xl">{`${currency}${price}`}</p>
            <p className="self-end font-semibold ml-0.5">/mo</p>
          </div>
        </div>
        <p
          className={
            numberOfMonths > 1 ? "mb-4 font-medium text-gray-cloud" : "hidden"
          }
        >
          {`${currency}${totalPrice} billed at once`}
        </p>
      </header>
      <div>
        <ul className="mb-6 font-semibold">
          {planFeatures.map((f) => (
            <li className="mb-1">
              {f.available ? (
                <Check className="mb-1.5 mr-2 inline-block fill-current text-blue-water w-4 tablet:w-5" />
              ) : (
                <Cross className="mb-1.5 mr-2 inline-block fill-current text-red-faded w-3.5 tablet:w-5" />
              )}
              {f.feature}
            </li>
          ))}
        </ul>
        <div className="relative rounded-b-xl overflow-hidden">
          <div className="absolute left-0 right-0 bottom-1/10 mx-auto">
            <Button label="Buy now" fontColor="text-blue-bird" />
          </div>
          <img src={ocean} alt="Ocean" />
        </div>
      </div>
    </article>
  );
}

Plan.propTypes = {
  planFeatures: PropTypes.array.isRequired,
  numberOfMonths: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  discountPercentage: PropTypes.number,
  currency: PropTypes.string.isRequired,
  isPopular: PropTypes.bool,
};

export default Plan;
