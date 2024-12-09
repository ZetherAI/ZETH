/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

const PopupWrapper = ({
  children,
  dark,
  close,
  isFunction,
  sm,
}: Readonly<{
  children: React.ReactNode;
  dark?: boolean | string;
  close?: () => void;
  isFunction?: boolean;
  sm?: boolean;
}>) => {
  const ref = useRef<null | HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside: (
      event: EventListener | MouseEvent | any
    ) => void = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        if (close && isFunction) {
          close();
        } else {
          router.back();
        }
      }
    };

    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return dark ? (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/20 flex-center p-4 md:p-7 overflow-y-auto overflow-x-clip !z-[10000000000000]">
      <div className={sm ? "" : "w-full max-w-[500px]"} ref={ref}>
        {children}
      </div>
      <div></div>
    </div>
  ) : (
    <div ref={ref}>{children}</div>
  );
};

export default PopupWrapper;
