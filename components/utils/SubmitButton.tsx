"use client";

import React from "react";
// import { motion } from 'framer-motion';

import { MotionButton } from "@/constants/motionProps";

import { variants } from "@/constants";

const Button = ({
  icon,
  className,
  text,
  onClick,
}: {
  icon?: React.ReactElement;
  className?: string;
  text: string;
  link?: string;
  cancel?: boolean | string;
  onClick?: () => void;
}) => {
  return (
    <div>
      <MotionButton
        whileTap="tap"
        whileHover="hover"
        variants={variants.buttonClick}
        className={className ? className : "btn-1"}
        onClick={onClick}
        type="submit"
      >
        {text}
        {icon}
      </MotionButton>
    </div>
  );
};

export default Button;
