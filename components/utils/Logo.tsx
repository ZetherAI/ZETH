import React from "react";
import Image from "next/image";
import Link from "next/link";

import { images } from "@/constants";

const Logo = ({
  black,
  showName,
}: {
  black?: boolean | string;
  showName?: boolean;
}) => {
  return (
    <Link href="/" className="flex-v-center">
      <Image
        src={black ? images.lyra : images.lyra}
        alt="diamond photos"
        width={250}
        height={100}
        className="size-[40px] rounded-full object-cover object-center"
        priority
      />
      {showName && (
        <h2 className="text-[2vw] tracking-[0.1em] font-bold transition-500">
          LYRA
        </h2>
      )}
    </Link>
  );
};

export default Logo;
