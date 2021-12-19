import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Navbar from "./Navbar";
import Loading from "./common/Loading";
const Hero = React.lazy(() => import("./Hero"));
const Features = React.lazy(() => import("./Features"));
const PlanSection = React.lazy(() => import("./PlanSection"));
const Testimonials = React.lazy(() => import("./Testimonials"));
const Footer = React.lazy(() => import("./Footer"));

function Home({ user }) {
  return (
    <Fragment>
      <Navbar user={user} />
      <React.Suspense fallback={<Loading />}>
        <main>
          <Hero />
          <div className="bg-gradient-to-b dark:from-blue-night-sky-1 dark:to-blue-night-sky-2 w-full py-16">
            <Features />
            <PlanSection />
            <Testimonials />
          </div>
          <Footer />
        </main>
      </React.Suspense>
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
