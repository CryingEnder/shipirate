import React, { useContext } from "react";
import { paymentMethods } from "./../utils/images";
import List from "./common/List";
import Logo from "./common/Logo";
import Container from "./common/Container";
import { ThemeContext } from "./context/ThemeContext";

function Footer(props) {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <Container
      tag="footer"
      stylesOutside={`${
        theme !== "dark" ? "bg-gradient-to-b " : ""
      }from-blue-sky-1 via-blue-sky-2 to-blue-water dark:bg-blue-night-sky-1`}
      stylesInside="px-6 py-12"
    >
      <div className="flex flex-col">
        <div className="grid grid-cols-auto gap-y-6 mb-10 tablet:justify-items-center">
          <List
            title="Shipirate"
            items={[
              { content: "About Us", key: "aboutus" },
              { content: "Careers", key: "careers" },
              { content: "Affiliates", key: "affiliates" },
              { content: "Reviews", key: "reviews" },
            ]}
          />
          <List
            title="Support"
            items={[
              { content: "Contact us", key: "contactus" },
              { content: "FAQ", key: "faq" },
              { content: "Terms of Service", key: "termsofservice" },
              { content: "Privacy Policy", key: "privacypolicy" },
            ]}
          />
          <List
            title="Engage"
            items={[
              { content: "What is VPN", key: "whatisvpn123" },
              { content: "What is my IP", key: "whatismyip" },
              { content: "Donate", key: "donate" },
            ]}
          />
          <List
            title="Follow us"
            items={[
              { content: "Facebook", key: "facebookkey" },
              { content: "Twitter", key: "twitterkey" },
              { content: "Instagram", key: "instagramkey" },
              { content: "Linkedin", key: "linkedinkey" },
              { content: "Youtube", key: "youtubekey" },
            ]}
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
            <p className="text-lg text-blue-dark dark:text-blue-whiteish-2 font-normal">
              Copyright &copy; 2021 Cristian Botez
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Footer;
