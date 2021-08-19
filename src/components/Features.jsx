import React, { useContext } from "react";
import {
  key,
  compass,
  shield,
  keyDark,
  compassDark,
  shieldDark,
} from "./../utils/images";
import {
  FeatureOneLight,
  FeatureOneDark,
  FeatureTwoLight,
  FeatureTwoDark,
  FeatureThreeLight,
  FeatureThreeDark,
} from "./common/Pictures";
import Container from "./common/Container";
import Feature from "./common/Feature";
import { ThemeContext } from "./context/ThemeContext";

function Features(props) {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <Container
      tag="section"
      stylesInside="flex flex-col space-y-20"
      marginBottom="mb-6 tablet:mb-24 laptop:mb-36"
    >
      <Feature
        logoSrc={theme !== "dark" ? key : keyDark}
        logoAlt="A pirate key icon"
        heading="Secure all your devices with our VPN"
        text="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic
            necessitatibus veniam cum explicabo labore possimus tempore corrupti
            fuga consequuntur nobis, natus nemo eum! Rerum incidunt sapiente
            debitis unde dignissimos. Doloribus quae eaque perferendis illo,
            tempore tenetur veniam maiores perspiciatis reiciendis est officia.
            Culpa impedit ea provident beatae repellat fugit eius!"
        buttonLabel="Learn more"
        picture={theme !== "dark" ? FeatureOneLight : FeatureOneDark}
        reversedOrder={true}
      />
      <Feature
        id="features"
        logoSrc={theme !== "dark" ? shield : shieldDark}
        logoAlt="A pirate themed security icon"
        heading="Secure access to the Internet"
        text="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorum
        sapiente necessitatibus iure doloribus pariatur illum beatae minus
        excepturi dolor dicta qui perferendis cumque, ducimus nesciunt
        inventore expedita totam aliquam commodi corrupti quam natus
        mollitia rerum explicabo. Accusantium cupiditate dolore, nulla nam
        porro atque pariatur! Eaque sapiente ipsum magni omnis inventore."
        buttonLabel="See the features"
        picture={theme !== "dark" ? FeatureTwoLight : FeatureTwoDark}
      />
      <Feature
        id="servers"
        logoSrc={theme !== "dark" ? compass : compassDark}
        logoAlt="A compass icon"
        heading="Use our VPN services in any location"
        text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae
        beatae soluta velit debitis libero vitae, ipsa labore reprehenderit
        quos consequatur fuga culpa perferendis voluptas quisquam, animi
        officia ut eaque. Soluta totam eos dolores ab porro culpa velit id
        cupiditate consectetur, tempore quos ipsum facilis officia quas iste
        eligendi pariatur temporibus."
        buttonLabel="Check locations"
        picture={theme !== "dark" ? FeatureThreeLight : FeatureThreeDark}
        reversedOrder={true}
      />
    </Container>
  );
}

export default Features;
