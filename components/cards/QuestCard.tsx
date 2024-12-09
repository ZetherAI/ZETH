import React from "react";
import Image from "next/image";

import { List, Handshake } from "lucide-react";

import { featuredQuest } from "@/constants/staticText";
import { Motion, Button, DotGrid } from "@/components";

const QuestCard = () => {
  return (
    <Motion
      tag="div"
      className="card grid md:grid-cols-7 gap-8 md:items-center relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-[45%] h-full overflow-hidden">
        <DotGrid w={100} h={20} id={1} />
      </div>

      <Motion tag="div" className="w-full h-full md:col-span-3 relative">
        <Image
          src={featuredQuest.image}
          width={750}
          height={300}
          className="object-cover w-full h-full rounded-lg md:rounded-xl"
          alt="Quest"
        />
      </Motion>
      <div className="md:col-span-4 relative">
        <Motion tag="h1" className="featured-title">
          {featuredQuest.title}
        </Motion>
        <div className="flex-v-center mt-1 mb-3">
          <Motion tag="div">
            <Button
              text="FAQ"
              link="/faq"
              className="btn-3"
              icon={<List className="size-4" />}
            />
          </Motion>
          <Motion tag="div">
            <Button
              text="Terms"
              link="/terms"
              className="btn-4"
              icon={<Handshake className="size-4" />}
            />
          </Motion>
        </div>
        <Motion>{featuredQuest.desc}</Motion>
        <Motion tag="div" className="flex mt-5">
          <Button text="Challenge" link="/" />
        </Motion>
      </div>
    </Motion>
  );
};

export default QuestCard;
