import React, { Fragment } from "react";
import Plan from "./common/Plan";
import Container from "./common/Container";

function PlanSection(props) {
  return (
    <Fragment>
      <Container
        tag="section"
        stylesInside="flex-col justify-evenly items-start space-y-28 p-3 tablet:p-0 laptop:flex laptop:flex-row laptop:space-y-0 laptop:mx-auto"
      >
        <div
          id="plans"
          className="absolute bg-none w-0 h-0 -mt-36 laptop:-mt-52"
        ></div>
        <Plan
          planFeatures={[
            { available: true, feature: "Lorem ipsum dolor sit amet" },
            { available: true, feature: "Lorem ipsum dolor sit amet" },
            { available: false, feature: "Lorem ipsum dolor sit amet" },
          ]}
          numberOfMonths={1}
          price={10}
          currency="$"
        />
        <Plan
          planFeatures={[
            { available: true, feature: "Lorem ipsum dolor sit amet" },
            { available: true, feature: "Lorem ipsum dolor sit amet" },
            { available: true, feature: "Lorem ipsum dolor sit amet" },
          ]}
          numberOfMonths={6}
          discountPercentage={10}
          price={10}
          currency="$"
          isPopular={true}
        />
        <Plan
          planFeatures={[
            { available: true, feature: "Lorem ipsum dolor sit amet" },
            { available: true, feature: "Lorem ipsum dolor sit amet" },
            { available: true, feature: "Lorem ipsum dolor sit amet" },
          ]}
          numberOfMonths={12}
          discountPercentage={20}
          price={10}
          currency="$"
        />
      </Container>
    </Fragment>
  );
}

export default PlanSection;
