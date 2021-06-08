import React, { useState, useEffect } from "react";
import {
  customerOne,
  customerTwo,
  customerThree,
  customerFour,
  customerFive,
  customerSix,
  instagram,
  facebook,
  twitter,
  linkedin,
  testimonialsLogo,
} from "./../utils/images";
import {
  AngleLeft,
  AngleRight,
  ArrowLeft,
  ArrowRight,
  DoubleQuotes,
} from "./common/Icons";
import Container from "./common/Container";

function Testimonials(props) {
  const message =
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium animi excepturi totam provident sequi quisquam quibusdam impedit ex omnis! Minus fuga natus aliquam aliquid.";

  const userTestimonialsData = [
    {
      profilePhoto: customerOne,
      name: "John Smith",
      profession: "Front-End Developer",
      socialPlatform: twitter,
      message: message,
    },
    {
      profilePhoto: customerTwo,
      name: "Alex Fiero",
      profession: "Back-End Developer",
      socialPlatform: linkedin,
      message: message,
    },
    {
      profilePhoto: customerThree,
      name: "Gabriel Constantinescu",
      profession: "Full-Stack Developer",
      message: message,
    },
    {
      profilePhoto: customerFour,
      name: "Chun Hei",
      profession: "Front-End Developer",
      socialPlatform: facebook,
      message: message,
    },
    {
      profilePhoto: customerFive,
      name: "Ji Woo",
      profession: "Back-End Developer",
      socialPlatform: twitter,
      message: message,
    },
    {
      profilePhoto: customerSix,
      name: "Amy Oakwood",
      profession: "Full-Stack Developer",
      socialPlatform: instagram,
      message: message,
    },
  ];

  const [userTestimonials, setUserTestimonials] =
    useState(userTestimonialsData);
  const [currentUser, setCurrentUser] = useState(0);
  const [opacityAnimation, setOpacityAnimation] = useState("");

  useEffect(() => {
    setUserTestimonials(userTestimonialsData);
  }, []);

  function addOpacityAnimation() {
    setOpacityAnimation("animate-opacity-slow");
  }

  function getNextUser() {
    if (currentUser === userTestimonials.length - 1) setCurrentUser(0);
    else setCurrentUser(currentUser + 1);
    addOpacityAnimation();
  }

  function getPreviousUser() {
    if (currentUser === 0) setCurrentUser(userTestimonials.length - 1);
    else setCurrentUser(currentUser - 1);
    addOpacityAnimation();
  }

  return (
    <Container tag="section" stylesInside="p-2">
      <header className="text-center mb-16 laptop:mb-10">
        <div className="inline-block">
          <img
            className="w-12"
            src={testimonialsLogo}
            alt="A testimonial logo"
          />
          <h2 className="text-blue-dark dark:text-blue-whiteish-1 text-shadow mt-2 mb-6">
            Testimonials
          </h2>
        </div>
        <p className="text-blue-dark dark:text-blue-whiteish-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, sint.
        </p>
      </header>
      <div className="relative rounded-2xl mx-auto shadow-lg w-full bg-gray-25 laptop:rounded-x2 tablet:w-11/12 laptop:bg-gradient-to-br laptop:from-blue-sky-1 laptop:via-blue-sky-2 laptop:to-blue-water laptop:w-3/5">
        <div className="px-7 pt-4 pb-14 rounded-t-2xl bg-gradient-to-br from-blue-sky-1 via-blue-sky-2 to-blue-water laptop:inline-block laptop:px-14 laptop:py-8 laptop:pb-10 laptop:bg-none laptop:bg-gray-25 laptop:mt-2 laptop:mx-2 laptop:rounded-t-x1.5 desktop:py-12">
          <div className="absolute max-h-14 w-full flex flex-row justify-center rounded-full left-0 -top-7 laptop:top-0">
            <div className="text-gray-25 py-2 px-4 flex flex-row justify-center space-x-6 border-6 border-solid border-gray-25 rounded-full bg-blue-sky-1 laptop:hidden">
              <AngleLeft
                className="w-8 fill-current cursor-pointer transform ease-out duration-200 hover:scale-110 active:scale-105"
                onClick={getPreviousUser}
              />
              <AngleRight
                className="w-8 fill-current cursor-pointer transform ease-out duration-200 hover:scale-110 active:scale-105"
                onClick={getNextUser}
              />
            </div>
            <div className="hidden laptop:text-blue-sky-1 laptop:pt-2 laptop:px-4 laptop:flex laptop:flex-row laptop:justify-center laptop:space-x-3 laptop:shadow-md laptop:rounded-b-x2 laptop:rounded-3xl">
              <ArrowLeft
                className="w-12 laptop:w-14 fill-current cursor-pointer transform ease-out duration-200 hover:scale-120 active:scale-110"
                onClick={getPreviousUser}
              />
              <ArrowRight
                className="w-12 laptop:w-14 fill-current cursor-pointer transform ease-out duration-200 hover:scale-120 active:scale-110"
                onClick={getNextUser}
              />
            </div>
          </div>
          <div className="text-gray-25 laptop:text-blue-dark">
            <DoubleQuotes
              className={`mb-2 w-10 tablet-small:w-12 laptop:w-14 fill-current ${opacityAnimation}`}
              onAnimationEnd={() => setOpacityAnimation("")}
            />
            <p
              className={`font-semibold ${opacityAnimation}`}
              onAnimationEnd={() => setOpacityAnimation("")}
            >
              {userTestimonials[currentUser].message}
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center space-y-6 px-7 pb-3 bg-transparent laptop:flex-row laptop:justify-between laptop:space-y-0 laptop:py-6 laptop:px-14">
          <div className="max-w-xs flex flex-col items-center text-center -mt-12 laptop:max-w-full laptop:flex-row laptop:justify-between laptop:text-left laptop:mt-0 laptop:space-x-3 laptop:p-0">
            <div
              className={
                "rounded-full box-content relative bg-gray-25 p-2.5 min-w-max laptop:p-1.5"
              }
            >
              <img
                className="rounded-full w-20 laptop:w-24 desktop:w-28"
                src={userTestimonials[currentUser].profilePhoto}
                alt="A profile photo"
              />
              {userTestimonials[currentUser].socialPlatform && (
                <div className="bg-gray-25 p-0.5 rounded-full absolute right-0.5 bottom-1 w-8 laptop:hidden">
                  <img
                    src={userTestimonials[currentUser].socialPlatform}
                    alt="Social media icon"
                  />
                </div>
              )}
            </div>
            <div className="laptop:max-w-xs">
              <p className="text-blue-dark laptop:text-gray-25 font-bold">
                {userTestimonials[currentUser].name}
              </p>
              <p className="text-gray-bluegray-500 font-semibold">
                {userTestimonials[currentUser].profession}
              </p>
            </div>
          </div>
          {userTestimonials[currentUser].socialPlatform && (
            <img
              className={"hidden laptop:block laptop:w-16"}
              src={userTestimonials[currentUser].socialPlatform}
              alt="Social media icon"
            />
          )}
        </div>
      </div>
    </Container>
  );
}

export default Testimonials;
