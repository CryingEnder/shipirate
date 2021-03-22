import React, { Fragment } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import PlanSection from "./components/PlanSection";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";

function App() {
  return (
    <Fragment>
      <Navbar />
      <LoginForm />
      {/* <SignupForm /> */}
      <Hero />
      <main>
        <Features />
        <PlanSection />
        <Testimonials />
      </main>
      <Footer />
    </Fragment>
  );
}

export default App;
