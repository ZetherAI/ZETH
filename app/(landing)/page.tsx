import React from "react";
import { Button, Text } from "@/components";

const Home = () => {
  return (
    <div className="h-full w-full flex-center !justify-end flex-col text-center !gap-0 max-w-[600px] mx-auto ">
      <Text tag="h1" custom={0} className="display ">
        Lyra’s Sentinel
      </Text>
      <Text tag="p" custom={1} className="">
        Lyra is the cosmic guardian, overseeing a growing prize pool and testing
        the ingenuity and wits of humanity. Prove your worth. Unlock the prize.
      </Text>
      <div className="flex-center pt-8 ">
        <Text tag="div" custom={2}>
          <Button text="EXPLORE QUESTS" link="/quests" />
        </Text>
        <Text tag="div" custom={3}>
          <Button text="CONNECT WALLET" link="/quests" className="btn-3" />
        </Text>
      </div>
    </div>
  );
};

export default Home;
