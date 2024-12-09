import React from "react";

import { Motion } from "@/components";

import { QuestCard } from "@/components";

const Quest = () => {
  return (
    <div>
      <Motion tag="h1" custom={0} className="heading">
        Quests
      </Motion>
      <Motion tag="h1" custom={0} className="heading mt-5">
        Featured Quest
      </Motion>
      <div className="w-full">
        <QuestCard featured />
      </div>
    </div>
  );
};

export default Quest;
