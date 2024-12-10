import React from "react";
// import Image from "next/image";

// import { images } from "@/constants";

import { DotGrid, Motion } from "@/components";

const FAQ = () => {
  return (
    <div>
      <Motion custom={0} className="banner-container">
        <DotGrid w={100} h={20} id={2} />
        <div className="bg-pfp bg-center bg-no-repeat rounded-lg md:rounded-xl w-full h-full flex flex-col justify-end">
          <div className="heading flex-center w-full h-full bg-gradient-to-r from-brand-1/70 to-brand-3/50">
            <Motion custom={1} className="heading font-semibold">
              Frequently Asked Questions
            </Motion>
          </div>
        </div>
      </Motion>
      {/* <Motion tag="h1" custom={0} className="heading mt-3">
        Frequently Asked Questions
      </Motion> */}
    </div>
  );
};

export default FAQ;
