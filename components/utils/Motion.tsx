"use client";

import React from "react";

import { MotionH1, MotionDiv, MotionP } from "@/constants/motionProps";
import { variants } from "@/constants";
// import { Variant } from "framer-motion";

interface IProps {
  tag?: string;
  //   variant?: Variant;
  custom?: number;
  children: React.ReactNode;
  className?: string;
  //   text?: string;
}

const Motion = ({ tag, children, className, custom }: IProps) => {
  return (
    <>
      {tag === "h1" && (
        <MotionH1
          custom={custom || 0}
          className={className || ""}
          initial="initial"
          animate="animate"
          variants={variants.slideInUpI}
        >
          {children}
        </MotionH1>
      )}
      {tag === "div" && (
        <MotionDiv
          initial="initial"
          animate="animate"
          variants={variants.slideInUpI}
          custom={custom || 0}
          className={className || ""}
        >
          {children}
        </MotionDiv>
      )}
      {tag === "p" && (
        <MotionP
          initial="initial"
          animate="animate"
          variants={variants.slideInUpI}
          custom={custom || 0}
          className={className || ""}
        >
          {children}
        </MotionP>
      )}

      {!tag && (
        <MotionDiv
          initial="initial"
          animate="animate"
          variants={variants.slideInUpI}
          custom={custom || 0}
          className={className || ""}
        >
          {children}
        </MotionDiv>
      )}
    </>
  );
};

export default Motion;
