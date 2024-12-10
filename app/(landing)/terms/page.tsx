import React from "react";

import { Motion, DotGrid } from "@/components";
import { TermsData } from "@/constants/staticText";

const Terms = () => {
  return (
    <div>
      <Motion custom={0} className="banner-container">
        <DotGrid w={100} h={20} id={2} />
        <div className="bg-pfp bg-center bg-no-repeat rounded-xl w-full h-full flex flex-col justify-end">
          <div className="heading flex-center w-full h-full bg-gradient-to-r from-brand-1/70 to-brand-3/50">
            <Motion custom={1} className="heading font-semibold p-5">
              Terms and conditions
            </Motion>
          </div>
        </div>
      </Motion>

      <div className="flex flex-col gap-3 lg:gap-4 py-7 ">
        {TermsData.map(
          ({ term, desc }: { term: string; desc: string[] }, index: number) => (
            <Motion
              custom={index + 2}
              key={index}
              className="flex flex-col gap-2 card"
            >
              <Motion className="subheading" custom={index + 2}>
                {term}
              </Motion>
              <div className="flex flex-col gap-2">
                {desc.map((item, j) => (
                  <Motion key={j} custom={index + 2 + j}>
                    <li>{item}</li>
                  </Motion>
                ))}
              </div>
            </Motion>
          )
        )}
      </div>
    </div>
  );
};

export default Terms;
