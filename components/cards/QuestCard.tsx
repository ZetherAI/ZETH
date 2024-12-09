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

      <Motion className="w-full h-full md:col-span-3 relative rounded-lg md:rounded-xl overflow-hidden">
        <Image
          src={featuredQuest.image}
          width={750}
          height={300}
          className="object-cover w-full h-full"
          alt="Quest"
        />
        <div className="flex-center absolute top-0 left-0 w-full h-full bg-black/50">
          <Motion className="featured-title uppercase text-gray-300 text-center leading-[110%] !font-black">
            Astra
            <br />
            Challenge
          </Motion>
        </div>
      </Motion>
      <div className="md:col-span-4 relative">
        <Motion tag="h1" className="featured-title">
          {featuredQuest.title}
        </Motion>
        <div className="flex-v-center mt-1 mb-3">
          <Motion>
            <Button
              text="FAQ"
              link="/faq"
              className="btn-3"
              icon={<List className="size-4" />}
            />
          </Motion>
          <Motion>
            <Button
              text="Terms"
              link="/terms"
              className="btn-4"
              icon={<Handshake className="size-4" />}
            />
          </Motion>
        </div>
        <Motion tag="p">{featuredQuest.desc}</Motion>
        <Motion className="flex mt-5">
          <Button text="Challenge" link="/" />
        </Motion>
      </div>
    </Motion>
  );
};

export default QuestCard;
