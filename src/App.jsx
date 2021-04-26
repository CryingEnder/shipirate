import React, { Fragment } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import PlanSection from "./components/PlanSection";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import PaymentForm from "./components/PaymentForm";
import PaymentMethod from "./components/common/PaymentMethod";
import NotFound from "./components/NotFound";

function App() {
  return (
    // <Fragment>
    //   {/* <LoginForm />
    //   <SignupForm /> */}
    //   <Navbar />
    //   <Hero />
    //   <main>
    //     <Features />
    //     <PlanSection />
    //     <Testimonials />
    //   </main>
    //   <Footer />
    //   {/* <PaymentForm /> */}
    // </Fragment>
    <NotFound />
  );
}

export default App;
