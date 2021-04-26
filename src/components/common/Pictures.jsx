import React from "react";
import {
  deviceFeature,
  deviceFeatureOld,
  deviceFeatureRetina,
  deviceFeatureRetinaOld,
  secureFeature,
  secureFeatureOld,
  secureFeatureRetina,
  secureFeatureRetinaOld,
  locationFeature,
  locationFeatureRetina,
  heroImgLight,
  heroImgLightLarger,
  heroImgLightLarge,
  heroImgLightMedium,
  heroImgLightSmall,
  heroImgLightOld,
  heroImgLightLargerOld,
  heroImgLightLargeOld,
  heroImgLightMediumOld,
  heroImgLightSmallOld,
  /*
  heroImgDark,
  heroImgDarkLarger,
  heroImgDarkLarge,
  heroImgDarkMedium,
  heroImgDarkSmall,
  heroImgDarkOld,
  heroImgDarkLargerOld,
  heroImgDarkLargeOld,
  heroImgDarkMediumOld,
  heroImgDarkSmallOld,
  */
} from "./../../utils/images";

function HeroPicture({ ...props }) {
  return (
    <picture {...props}>
      <source
        type="image/webp"
        srcSet={`${heroImgLightSmall} 200w, ${heroImgLightMedium} 616w, ${heroImgLightLarge} 946w, ${heroImgLightLarger} 1195w, ${heroImgLight} 1440w`}
      />
      <source
        type="image/jpg"
        srcSet={`${heroImgLightSmallOld} 200w, ${heroImgLightMediumOld} 616w, ${heroImgLightLargeOld} 946w, ${heroImgLightLargerOld} 1195w, ${heroImgLightOld} 1440w`}
      />
      <img src={heroImgLightOld} className="w-full" alt="A pirate ship" />
    </picture>
  );
}

function FeatureOne({ ...props }) {
  return (
    <picture {...props}>
      <source
        type="image/webp"
        srcSet={`${deviceFeature} 1x, ${deviceFeatureRetina} 2x`}
      />
      <source
        type="image/jpg"
        srcSet={`${deviceFeatureOld} 1x, ${deviceFeatureRetinaOld} 2x`}
      />
      <img
        src={deviceFeatureRetinaOld}
        className="w-full"
        alt="A laptop of a pirate skull and a lamp"
      />
    </picture>
  );
}

function FeatureTwo({ ...props }) {
  return (
    <picture {...props}>
      <source
        type="image/webp"
        srcSet={`${secureFeature} 1x, ${secureFeatureRetina} 2x`}
      />
      <source
        type="image/jpg"
        srcSet={`${secureFeatureOld} 1x, ${secureFeatureRetinaOld} 2x`}
      />
      <img
        src={deviceFeatureRetinaOld}
        className="w-full"
        alt="A pirate ship of pirates shooting the cannons"
      />
    </picture>
  );
}

function FeatureThree({ ...props }) {
  return (
    <picture {...props}>
      <source
        type="image/jpg"
        srcSet={`${locationFeature} 1x, ${locationFeatureRetina} 2x`}
      />
      <img src={locationFeatureRetina} className="w-full" alt="A pirate map" />
    </picture>
  );
}

export { HeroPicture, FeatureOne, FeatureTwo, FeatureThree };
