import React from "react";

import { Motion } from "@/components";

import { QuestCard } from "@/components";

const Quest = () => {
  return (
    <div>
      <Motion tag="h1" custom={0} className="heading">
        Quests
      </Motion>
      <Motion tag="h1" custom={1} className="heading mt-3 lg:mt-5">
        Coming Soon
      </Motion>
      <div className="w-full mt-3 pb-7">
        <QuestCard />
      </div>
    </div>
  );
};

export default Quest;
