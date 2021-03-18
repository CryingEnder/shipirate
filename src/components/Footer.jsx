import React from "react";
import { paymentMethods } from "./../utils/images";
import List from "./common/List";
import Logo from "./common/Logo";
import Container from "./common/Container";

function Footer(props) {
  return (
    <Container
      tag="footer"
      stylesOutside="bg-gradient-to-br from-blue-sky-1 via-blue-sky-2 to-blue-water"
      stylesInside="px-6 py-12"
    >
      <div className="flex flex-col">
        <div className="grid grid-cols-auto gap-y-6 mb-10 tablet:justify-items-center">
          <List
            title="Shipirate"
            items={["About Us", "Careers", "Affiliates", "Reviews"]}
          />
          <List
            title="Support"
            items={["Contact us", "FAQ", "Terms of Service", "Privacy Policy"]}
          />
          <List
            title="Engage"
            items={["What is VPN", "What is my IP", "Donate"]}
          />
          <List
            title="Follow us"
            items={["Facebook", "Twitter", "Instagram", "Linkedin", "Youtube"]}
          />
        </div>
        <div className="flex flex-col justify-between space-y-6 tablet:flex-row tablet:space-y-0 tablet:items-center">
          <div className="tablet:order-1">
            <img
              className="max-h-10"
              src={paymentMethods}
              alt="Payment methods"
            />
          </div>
          <div>
            <Logo styles="mb-2" />
            <p className="text-lg text-blue-dark font-normal">
              Copyright &copy; 2021 Cristian Botez
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Footer;
