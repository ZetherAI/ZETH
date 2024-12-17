import React from "react";
import Image from "next/image";

import { images } from "@/constants";

interface IMessage {
  message: string;
  ai_response: string | number;
  time: string;
}

const MessageNResponse = ({ message, ai_response, time }: IMessage) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-3 w-full justify-end">
        <div className="user-message flex flex-col items-end gap-1">
          <p className="w-full text-black">{message}</p>
          <p className="xs !text-dark/50">{time}</p>
        </div>
        {/* <div className="size-[35px] rounded-full bg-gradient-to-br from-brand-1/50 to-brand-4/50 backdrop-blur-xl" /> */}
        {/* <Image
          src={images.pfp}
          alt="user"
          className="size-[35px] rounded-full object-cover"
        /> */}
      </div>

      <div className="flex gap-2 md:gap-3 w-full justify-start">
        <Image
          src={images.lyra}
          alt="user"
          className="size-[35px] lg:size-[40px] rounded-full object-cover"
        />
        <div className="ai-message flex flex-col items-end gap-1">
          <p className="w-full">{ai_response}</p>
          <p className="xs !text-light/50">{time}</p>
        </div>
        {/* <div className="size-[35px] rounded-full bg-gradient-to-br from-brand-1/50 to-brand-4/50 backdrop-blur-xl" /> */}
      </div>

      {/* <p className="ai-message !leading-[1.7em]">{ai_response}</p> */}
    </div>
  );
};

export default MessageNResponse;
