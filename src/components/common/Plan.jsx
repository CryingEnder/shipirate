import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Check, Cross } from "./Icons";
import {
  ocean,
  oceanDark,
  tierOne,
  tierTwo,
  tierThree,
  tierOneDark,
  tierTwoDark,
  tierThreeDark,
  popular,
  popularDark,
} from "./../../utils/images";
import Button from "./Button";
import Badge from "./Badge";
import { showTwoDecimals } from "./../../utils/showTwoDecimals";
import { ThemeContext } from "./../context/ThemeContext";
import { CartContext } from "./../context/CartContext";

function Plan({
  planFeatures,
  numberOfMonths,
  price: initialPrice,
  discountPercentage,
  currency,
  isPopular,
  ...props
}) {
  const { theme, setTheme } = useContext(ThemeContext);
  const { total, setTotal } = useContext(CartContext);

  const price = discountPercentage
    ? showTwoDecimals(initialPrice - (discountPercentage / 100) * initialPrice)
    : showTwoDecimals(initialPrice);
  const totalPrice = discountPercentage
    ? showTwoDecimals(price * numberOfMonths)
    : showTwoDecimals(initialPrice * numberOfMonths);
  let tier = "";

  if (numberOfMonths > 6) tier = theme !== "dark" ? tierThree : tierThreeDark;
  else if (numberOfMonths > 1) tier = theme !== "dark" ? tierTwo : tierTwoDark;
  else tier = theme !== "dark" ? tierOne : tierOneDark;

  return (
    <article>
      <div
        {...props}
        onClick={() => setTotal(`${currency}${totalPrice}`)}
        className="relative text-center rounded-2xl p-2 mx-auto shadow-md bg-gradient-to-b from-gray-25 to-gray-30 dark:from-purple-light-1 dark:to-purple-light-2 text-blue-bird dark:text-purple-light-3 w-4/5 tablet:w-3/5 tablet-small:w-4/6 tablet:max-w-md laptop:w-full tablet:transform tablet:ease-out tablet:duration-200 tablet:hover:scale-105"
      >
        {isPopular && (
          <img
            className="absolute right-2 -top-4 w-1/5"
            src={theme !== "dark" ? popular : popularDark}
            alt="A popular sale badge"
          />
        )}
        <header className="mb-6">
          <img
            className="mx-auto mb-2 -mt-16 w-37/100 tablet:-mt-20 tablet:w-1/3"
            src={tier}
            alt="A pirate hat"
          />
          <h3 className="clip-plan-header mb-3 pb-7 pt-3 -mx-4 shadow-sm text-shadow rounded-t-lg bg-blue-water text-gray-25 dark:bg-purple-light-6 dark:text-purple-light-5">
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
              numberOfMonths > 1
                ? "mb-4 font-medium text-gray-cloud dark:text-purple-light-4"
                : "hidden"
            }
          >
            {`${currency}${totalPrice} billed at once`}
          </p>
        </header>
        <div>
          <ul className="mb-6 font-semibold">
            {planFeatures.map((f) => (
              <li key={f._id} className="mb-1">
                {f.available ? (
                  <Check className="mb-1.5 mr-2 inline-block fill-current text-blue-water dark:text-blue-check w-4 tablet:w-5" />
                ) : (
                  <Cross className="mb-1.5 mr-2 inline-block fill-current text-red-faded dark:text-red-faded-dark w-3.5 tablet:w-5" />
                )}
                {f.feature}
              </li>
            ))}
          </ul>
          <div className="relative rounded-b-xl overflow-hidden">
            <div className="absolute left-0 right-0 bottom-1/10 mx-auto">
              {theme !== "dark" ? (
                <Button
                  linkPath="/checkout"
                  label="Buy now"
                  fontColor="text-blue-bird"
                />
              ) : (
                <Button linkPath="/checkout" label="Buy now" />
              )}
            </div>
            <img src={theme !== "dark" ? ocean : oceanDark} alt="Ocean" />
          </div>
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
