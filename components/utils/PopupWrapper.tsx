/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

// import React, { useRef, useEffect } from "react";
import React from "react";

import { X } from "lucide-react";

const PopupWrapper = ({
  children,
  close,
}: Readonly<{
  children: React.ReactNode;
  close?: () => void;
}>) => {
  // const ref = useRef<null | HTMLDivElement>(null);

  // useEffect(() => {
  //   const handleClickOutside: (
  //     event: EventListener | MouseEvent | any
  //   ) => void = (event) => {
  //     if (ref.current && !ref.current.contains(event.target)) {
  //       if (close) {
  //         close();
  //       }
  //     }
  //   };

  //   document.addEventListener("click", handleClickOutside, true);

  //   return () => {
  //     document.removeEventListener("click", handleClickOutside, true);
  //   };

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <div className="fixed top-0 left-0bg-black/20 backdrop-blur-md overflow-hidden !z-[10000000000000] w-full h-full">
      <div className="h-full">{children}</div>
      <button onClick={close} className="absolute top-7 right-5 text-light">
        <X />
      </button>
    </div>
  );
};

export default PopupWrapper;
