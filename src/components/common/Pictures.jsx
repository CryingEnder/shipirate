import React from "react";
import {
  deviceFeature,
  deviceFeatureOld,
  deviceFeatureRetina,
  deviceFeatureRetinaOld,
  deviceFeatureDark,
  deviceFeatureDarkOld,
  deviceFeatureDarkRetina,
  deviceFeatureDarkRetinaOld,
  secureFeature,
  secureFeatureOld,
  secureFeatureRetina,
  secureFeatureRetinaOld,
  secureFeatureDark,
  secureFeatureDarkOld,
  secureFeatureDarkRetina,
  secureFeatureDarkRetinaOld,
  locationFeature,
  locationFeatureRetina,
  locationFeatureDark,
  locationFeatureDarkRetina,
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
} from "./../../utils/images";

function HeroPictureLight({ ...props }) {
  return (
    <picture {...props}>
      <source
        type="image/webp"
        srcSet={`${heroImgLightSmall} 200w, ${heroImgLightMedium} 617w, ${heroImgLightLarge} 946w, ${heroImgLightLarger} 1226w, ${heroImgLight} 1440w`}
      />
      <source
        type="image/jpg"
        srcSet={`${heroImgLightSmallOld} 200w, ${heroImgLightMediumOld} 617w, ${heroImgLightLargeOld} 946w, ${heroImgLightLargerOld} 1226w, ${heroImgLightOld} 1440w`}
      />
      <img src={heroImgLightOld} className="w-full" alt="A pirate ship" />
    </picture>
  );
}

function HeroPictureDark({ ...props }) {
  return (
    <picture {...props}>
      <source
        type="image/webp"
        srcSet={`${heroImgDarkSmall} 200w, ${heroImgDarkMedium} 617w, ${heroImgDarkLarge} 985w, ${heroImgDarkLarger} 1240w, ${heroImgDark} 1440w`}
      />
      <source
        type="image/jpg"
        srcSet={`${heroImgDarkSmallOld} 200w, ${heroImgDarkMediumOld} 617w, ${heroImgDarkLargeOld} 985w, ${heroImgDarkLargerOld} 1240w, ${heroImgDarkOld} 1440w`}
      />
      <img src={heroImgDarkOld} className="w-full" alt="A pirate ship" />
    </picture>
  );
}

function FeatureOneLight({ ...props }) {
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

function FeatureOneDark({ ...props }) {
  return (
    <picture {...props}>
      <source
        type="image/webp"
        srcSet={`${deviceFeatureDark} 1x, ${deviceFeatureDarkRetina} 2x`}
      />
      <source
        type="image/jpg"
        srcSet={`${deviceFeatureDarkOld} 1x, ${deviceFeatureDarkRetinaOld} 2x`}
      />
      <img
        src={deviceFeatureDarkRetinaOld}
        className="w-full"
        alt="A laptop of a pirate skull and a lamp"
      />
    </picture>
  );
}

function FeatureTwoLight({ ...props }) {
  return (
    <picture {...props}>
      <source
        type="image/webp"
        srcSet={`${secureFeature} 1x, ${secureFeatureRetina} 2x`}
      />
      <source
        type="image/png"
        srcSet={`${secureFeatureOld} 1x, ${secureFeatureRetinaOld} 2x`}
      />
      <img
        src={secureFeatureRetinaOld}
        className="w-full"
        alt="A pirate ship of pirates shooting the cannons"
      />
    </picture>
  );
}

function FeatureTwoDark({ ...props }) {
  return (
    <picture {...props}>
      <source
        type="image/webp"
        srcSet={`${secureFeatureDark} 1x, ${secureFeatureDarkRetina} 2x`}
      />
      <source
        type="image/png"
        srcSet={`${secureFeatureDarkOld} 1x, ${secureFeatureDarkRetinaOld} 2x`}
      />
      <img
        src={secureFeatureDarkRetinaOld}
        className="w-full"
        alt="A pirate ship of pirates shooting the cannons"
      />
    </picture>
  );
}

function FeatureThreeLight({ ...props }) {
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

function FeatureThreeDark({ ...props }) {
  return (
    <picture {...props}>
      <source
        type="image/jpg"
        srcSet={`${locationFeatureDark} 1x, ${locationFeatureDarkRetina} 2x`}
      />
      <img
        src={locationFeatureDarkRetina}
        className="w-full"
        alt="A pirate map"
      />
    </picture>
  );
}

export {
  HeroPictureLight,
  HeroPictureDark,
  FeatureOneLight,
  FeatureOneDark,
  FeatureTwoLight,
  FeatureTwoDark,
  FeatureThreeLight,
  FeatureThreeDark,
};
