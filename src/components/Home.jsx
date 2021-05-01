import React, { Fragment } from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Features from "./Features";
import PlanSection from "./PlanSection";
import Testimonials from "./Testimonials";
import Footer from "./Footer";

function Home({ children }) {
  console.log("I'm rendered!");
  return (
    <Fragment>
      {children}
      <Navbar />
      <main>
        <Hero />
        <Features />
        <PlanSection />
        <Testimonials />
        <Footer />
      </main>
    </Fragment>
  );
}

export default Home;
