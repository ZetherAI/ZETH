"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import { motion } from 'framer-motion';

import { MotionButton, MotionDiv } from "@/constants/motionProps";

import { variants } from "@/constants";

const Button = ({
  icon,
  className,
  text,
  link,
  cancel,
  onClick,
}: {
  icon?: React.ReactElement;
  className?: string;
  text: string;
  link?: string;
  cancel?: boolean | string;
  onClick?: () => void;
}) => {
  const router = useRouter();
  return (
    <div>
      {link ? (
        <MotionDiv
          whileTap="tap"
          whileHover="hover"
          variants={variants.buttonClick}
          className=""
        >
          <Link href={link} className={className ? className : "btn-1"}>
            {icon}
            {text}
          </Link>
        </MotionDiv>
      ) : cancel ? (
        <MotionButton
          whileTap="tap"
          whileHover="hover"
          variants={variants.buttonClick}
          className={className ? className : "btn-1"}
          onClick={router.back}
        >
          {icon}
          {text}
        </MotionButton>
      ) : (
        <MotionButton
          whileTap="tap"
          whileHover="hover"
          variants={variants.buttonClick}
          className={className ? className : "btn-1"}
          onClick={onClick}
        >
          {icon}
          {text}
        </MotionButton>
      )}
    </div>
  );
};

export default Button;
