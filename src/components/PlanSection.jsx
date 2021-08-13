import React, { Fragment, useEffect, useState } from "react";
import Plan from "./common/Plan";
import Container from "./common/Container";
import planService from "../services/planService";

function PlanSection(props) {
  const [plans, setPlans] = useState(null);
  const [gridStyle, setGridStyle] = useState("");

  function getGridStyle() {
    if (plans) {
      if (plans.length > 2)
        setGridStyle("laptop:grid-cols-2 desktop:grid-cols-3");
      else if (plans.length > 1)
        setGridStyle("laptop:grid-cols-2 desktop:grid-cols-2");
    }
  }

  useEffect(() => {
    async function getPlans() {
      const plansFound = await planService.getPlans();
      setPlans(plansFound);
    }

    getPlans();
    getGridStyle();
  }, [plans]);

  return (
    <Fragment>
      <Container
        tag="section"
        stylesInside={`relative px-8 mt-24 grid grid-cols-1 gap-y-36 laptop:gap-x-0 laptop:gap-y-32 desktop:gap-x-12 ${gridStyle}`}
      >
        <div
          id="plans"
          className="absolute bg-none w-0 h-0 -mt-36 laptop:-mt-40"
        />
        {plans &&
          plans.map((plan) => (
            <Plan
              key={plan._id}
              planFeatures={plan.features}
              numberOfMonths={plan.months}
              price={plan.price}
              discountPercentage={plan.discount}
              currency={plan.currency}
              isPopular={plan.popular}
            />
          ))}
      </Container>
    </Fragment>
  );
}

export default PlanSection;
