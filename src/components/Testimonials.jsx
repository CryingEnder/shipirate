import React, { useState, useEffect, useContext, Fragment } from "react";
import { testimonialsLogo, testimonialsLogoDark } from "./../utils/images";
import {
  AngleLeft,
  AngleRight,
  ArrowLeft,
  ArrowRight,
  DoubleQuotes,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
} from "./common/Icons";
import Container from "./common/Container";
import { ThemeContext } from "./context/ThemeContext";
import testimonialService from "../services/testimonialService";

function Testimonials(props) {
  const { theme, setTheme } = useContext(ThemeContext);

  const [testimonials, setTestimonials] = useState(null);
  const [currentUser, setCurrentUser] = useState(0);
  const [opacityAnimation, setOpacityAnimation] = useState("");

  useEffect(() => {
    async function getTestimonials() {
      const testimonialsFound = await testimonialService.getTestimonials();
      setTestimonials(testimonialsFound);
    }

    getTestimonials();
  }, []);

  function addOpacityAnimation() {
    setOpacityAnimation("animate-opacity-slow");
  }

  function getNextUser() {
    if (currentUser === testimonials.length - 1) setCurrentUser(0);
    else setCurrentUser(currentUser + 1);
    addOpacityAnimation();
  }

  function getPreviousUser() {
    if (currentUser === 0) setCurrentUser(testimonials.length - 1);
    else setCurrentUser(currentUser - 1);
    addOpacityAnimation();
  }

  return (
    <Fragment>
      {testimonials && (
        <Container tag="section" stylesInside="p-2">
          <header className="text-center mb-16 laptop:mb-10">
            <div className="flex flex-col justify-center items-center">
              <img
                className="w-12"
                src={theme !== "dark" ? testimonialsLogo : testimonialsLogoDark}
                alt="A testimonial logo"
              />
              <h2 className="text-blue-dark dark:text-blue-whiteish-1 text-shadow mt-2 mb-6">
                Testimonials
              </h2>
            </div>
            <p className="text-blue-dark dark:text-blue-whiteish-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore,
              sint.
            </p>
          </header>
          <div className="relative rounded-2xl mx-auto shadow-lg dark:shadow-xl w-full bg-gray-25 dark:bg-blue-night-sky-3 laptop:rounded-x2 tablet:w-11/12 laptop:bg-gradient-to-br laptop:from-blue-sky-1 laptop:via-blue-sky-2 laptop:to-blue-water laptop:dark:from-blue-night-sky-1 laptop:dark:to-blue-night-sky-1 laptop:w-3/5">
            <div
              className={`px-7 pt-4 pb-14 rounded-t-2xl ${
                theme !== "dark" ? "bg-gradient-to-br" : ""
              } from-blue-sky-1 via-blue-sky-2 to-blue-water dark:bg-blue-night-sky-1 laptop:inline-block laptop:px-14 laptop:py-8 laptop:pb-10 laptop:bg-none laptop:bg-gray-25 laptop:dark:bg-blue-night-sky-3 laptop:mt-2 laptop:mx-2 laptop:rounded-t-x1.5 desktop:py-12`}
            >
              <div className="absolute max-h-14 w-full flex flex-row justify-center rounded-full left-0 -top-7 laptop:top-0">
                <div className="text-gray-25 dark:text-purple-light-3 py-2 px-4 flex flex-row justify-center space-x-6 border-6 border-solid border-gray-25 dark:border-blue-night-sky-1 rounded-full bg-blue-sky-1 dark:bg-blue-night-sky-2 laptop:hidden">
                  <AngleLeft
                    className="w-8 fill-current cursor-pointer transform ease-out duration-200 hover:scale-110 active:scale-105"
                    onClick={getPreviousUser}
                  />
                  <AngleRight
                    className="w-8 fill-current cursor-pointer transform ease-out duration-200 hover:scale-110 active:scale-105"
                    onClick={getNextUser}
                  />
                </div>
                <div className="hidden laptop:text-blue-sky-1 laptop:dark:text-purple-light-3 laptop:pt-2 laptop:px-4 laptop:flex laptop:flex-row laptop:justify-center laptop:space-x-3 laptop:shadow-md laptop:rounded-b-x2 laptop:rounded-3xl">
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
              <div className="text-gray-25 dark:text-purple-light-3 laptop:text-blue-dark">
                <DoubleQuotes
                  className={`mb-2 w-10 tablet-small:w-12 laptop:w-14 fill-current ${opacityAnimation}`}
                  onAnimationEnd={() => setOpacityAnimation("")}
                />
                <p
                  className={`font-semibold ${opacityAnimation}`}
                  onAnimationEnd={() => setOpacityAnimation("")}
                >
                  {testimonials[currentUser].message}
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center space-y-6 px-7 pb-3 bg-transparent laptop:flex-row laptop:justify-between laptop:space-y-0 laptop:py-6 laptop:px-14">
              <div className="max-w-xs flex flex-col items-center text-center -mt-12 laptop:max-w-full laptop:flex-row laptop:justify-between laptop:text-left laptop:mt-0 laptop:space-x-3 laptop:p-0">
                <div
                  className={
                    "rounded-full box-content relative bg-gray-25 dark:bg-blue-night-sky-3 p-2.5 min-w-max laptop:p-1.5"
                  }
                >
                  <img
                    className="rounded-full w-20 laptop:w-24 desktop:w-28"
                    src={
                      testimonials[currentUser].profilePhoto.search("//") === -1
                        ? `${import.meta.env.VITE_APP_API_URL}/${
                            testimonials[currentUser].profilePhoto
                          }`
                        : testimonials[currentUser].profilePhoto
                    }
                    alt="A profile photo"
                  />
                  {testimonials[currentUser].socialPlatform && (
                    <div className="bg-gray-25 dark:bg-blue-night-sky-3 fill-current text-blue-sky-1 dark:text-purple-light-3 p-0.5 rounded-full absolute right-0.5 bottom-1 w-8 laptop:hidden">
                      {testimonials[currentUser].socialPlatform ===
                        "facebook" && <Facebook />}
                      {testimonials[currentUser].socialPlatform ===
                        "instagram" && <Instagram />}
                      {testimonials[currentUser].socialPlatform ===
                        "linkedin" && <Linkedin />}
                      {testimonials[currentUser].socialPlatform ===
                        "twitter" && <Twitter />}
                    </div>
                  )}
                </div>
                {
                  <div className="laptop:max-w-xs">
                    <p className="text-blue-dark laptop:text-gray-25 dark:text-purple-light-4 font-bold">
                      {testimonials[currentUser].name}
                    </p>
                    <p className="text-gray-bluegray-500 dark:text-blue-grayish font-semibold">
                      {testimonials[currentUser].profession}
                    </p>
                  </div>
                }
              </div>
              {testimonials[currentUser].socialPlatform && (
                <div className="hidden laptop:block laptop:w-16 fill-current text-blue-sky-1 dark:text-purple-light-3">
                  {testimonials[currentUser].socialPlatform === "facebook" && (
                    <Facebook />
                  )}
                  {testimonials[currentUser].socialPlatform === "instagram" && (
                    <Instagram />
                  )}
                  {testimonials[currentUser].socialPlatform === "linkedin" && (
                    <Linkedin />
                  )}
                  {testimonials[currentUser].socialPlatform === "twitter" && (
                    <Twitter />
                  )}
                </div>
              )}
            </div>
          </div>
        </Container>
      )}
    </Fragment>
  );
}

export default Testimonials;
