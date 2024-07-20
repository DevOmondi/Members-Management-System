import React from 'react'
import Navigation from "../ui/Navigation";
import landingIllustration from "/assets/landing_illustration.svg";

const Landing = () => {
  return (
    <>
      <Navigation />
      <div className="flex flex-col lg:flex-row w-[90%] lg:w-[80%] mx-auto justify-between items-center my-[3rem] gap-[2rem]">
        <div className="order-2 lg:order-1 text-center lg:text-left">
          <h2 className="text-[2rem] lg:text-[3rem] text-primary mb-[2rem] lg:mb-[1rem]">
            Member Management System.
          </h2>
          <p className="text-[1rem] w-[90%] lg:w-[55%]">
            Unleash the Power of Connection: Seamlessly Manage Your Members,
            Effortlessly Grow Your Community!
          </p>
        </div>
        <div className="order-1 lg:order-2">
          <img src={landingIllustration} alt="member management illustration" />
        </div>
      </div>
    </>
  );
};

export default Landing;
