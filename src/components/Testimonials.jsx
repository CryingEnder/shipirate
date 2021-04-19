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

  const [userTestimonials, setUserTestimonials] = useState(
    userTestimonialsData
  );
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
      <header className="text-blue-dark text-center mb-10">
        <div className="inline-block">
          <img
            className="w-12"
            src={testimonialsLogo}
            alt="A testimonial logo"
          />
          <h2 className="text-shadow mt-2 mb-6">Testimonials</h2>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, sint.
        </p>
      </header>
      <div className="relative rounded-2xl mx-auto shadow-lg w-full bg-gray-25 tablet:rounded-x2 tablet:w-11/12 tablet:bg-gradient-to-br tablet:from-blue-sky-1 tablet:via-blue-sky-2 tablet:to-blue-water laptop:w-3/5">
        <div className="px-7 pt-4 pb-14 rounded-t-2xl bg-gradient-to-br from-blue-sky-1 via-blue-sky-2 to-blue-water tablet:inline-block tablet:px-14 tablet:py-8 tablet:pb-10 tablet:bg-none tablet:bg-gray-25 tablet:mt-2 tablet:mx-2 tablet:rounded-t-x1.5 desktop:py-12">
          <div className="absolute max-h-14 w-full flex flex-row justify-center rounded-full left-0 -top-7 tablet:top-0">
            <div className="text-gray-25 py-2 px-4 flex flex-row justify-center space-x-6 border-6 border-solid border-gray-25 rounded-full bg-blue-sky-1 tablet:hidden">
              <AngleLeft
                className="w-8 fill-current cursor-pointer transform ease-out duration-200 hover:scale-110 active:scale-105"
                onClick={getPreviousUser}
              />
              <AngleRight
                className="w-8 fill-current cursor-pointer transform ease-out duration-200 hover:scale-110 active:scale-105"
                onClick={getNextUser}
              />
            </div>
            <div className="hidden tablet:text-blue-sky-1 tablet:pt-2 tablet:px-4 tablet:flex tablet:flex-row tablet:justify-center tablet:space-x-3 tablet:shadow-md tablet:rounded-b-x2 tablet:rounded-3xl">
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
          <div className="text-gray-25 tablet:text-blue-dark">
            <DoubleQuotes
              className={`mb-2 w-10 tablet:w-12 laptop:w-14 fill-current ${opacityAnimation}`}
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
        <div className="flex flex-col justify-center items-center space-y-6 px-7 pb-3 bg-transparent tablet:flex-row tablet:justify-between tablet:space-y-0 tablet:py-6 tablet:px-14">
          <div className="max-w-xs flex flex-col items-center text-center -mt-12 tablet:max-w-full tablet:flex-row tablet:justify-between tablet:text-left tablet:mt-0 tablet:space-x-3 tablet:p-0">
            <div
              className={
                "rounded-full box-content relative bg-gray-25 p-2.5 min-w-max tablet:p-1.5"
              }
            >
              <img
                className="rounded-full w-20 tablet:w-24 desktop:w-28"
                src={userTestimonials[currentUser].profilePhoto}
                alt="A profile photo"
              />
              {userTestimonials[currentUser].socialPlatform && (
                <div className="bg-gray-25 p-0.5 rounded-full absolute right-0.5 bottom-1 w-8 tablet:hidden">
                  <img
                    src={userTestimonials[currentUser].socialPlatform}
                    alt="Social media icon"
                  />
                </div>
              )}
            </div>
            <div className="tablet:max-w-xs">
              <p className="text-blue-dark tablet:text-gray-25 font-bold">
                {userTestimonials[currentUser].name}
              </p>
              <p className="text-gray-bluegray-500 font-semibold">
                {userTestimonials[currentUser].profession}
              </p>
            </div>
          </div>
          {userTestimonials[currentUser].socialPlatform && (
            <img
              className={"hidden tablet:block tablet:w-16"}
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
