import React, { Fragment } from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Features from "./Features";
import PlanSection from "./PlanSection";
import Testimonials from "./Testimonials";
import Footer from "./Footer";
import PropTypes from "prop-types";

function Home({ user }) {
  return (
    <Fragment>
      <Navbar user={user} />
      <main>
        <Hero />
        <div className="bg-gradient-to-b dark:from-blue-night-sky-1 dark:to-blue-night-sky-2 w-full py-16">
          <Features />
          <PlanSection />
          <Testimonials />
        </div>
        <Footer />
      </main>
    </Fragment>
  );
}

Home.defaultProps = {
  user: null,
};

Home.propTypes = {
  user: PropTypes.any,
};

export default Home;
