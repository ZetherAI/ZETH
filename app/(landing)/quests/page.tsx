import React from "react";

import { Motion } from "@/components";

import { QuestCard } from "@/components";

const Quest = () => {
  return (
    <div>
      <Motion tag="h1" custom={0} className="heading">
        Subscription Options
      </Motion>
      {/* <Motion tag="h1" custom={1} className="heading my-3 lg:my-5">
        ZetherBot
      </Motion> */}
      <div className="w-full mt-3 pb-7">
        <QuestCard />
      </div>
    </div>
  );
};

export default Quest;
