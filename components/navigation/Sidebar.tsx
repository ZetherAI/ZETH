"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MotionDiv } from "@/constants/motionProps";
import {
  House,
  Swords,
  List,
  Handshake,
  FlaskConical,
  ChevronRight,
} from "lucide-react";
import { RiCustomerService2Line } from "react-icons/ri";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Logo, DotGrid } from "@/components";
import { variants } from "@/constants";

const navs = [
  { label: "Home", link: "" },
  { label: "Quest", link: "quest" },
  { label: "Assister", link: "assister" },
  { label: "FAQ", link: "faq" },
  { label: "Terms", link: "terms" },
  { label: "The Experiment", link: "the-experiment" },
];

const Icon = ({ i, color }: { i: number; color: string }) => (
  <>
    {i === 0 && <House style={{ color }} />}
    {i === 1 && <Swords style={{ color }} />}
    {i === 2 && (
      <RiCustomerService2Line style={{ color }} className="text-2xl" />
    )}
    {i === 3 && <List style={{ color }} />}
    {i === 4 && <Handshake style={{ color }} />}
    {i === 5 && <FlaskConical style={{ color }} />}
    {/* {i === 5 && <Swords style={{ color }} />}
    {i === 6 && <Swords style={{ color }} />} */}
  </>
);

const Sidebar = () => {
  const pathname = usePathname();
  const [showFull, setShowFull] = useState(true);
  return (
    <div className="relative h-full">
      <button
        onClick={() => setShowFull(!showFull)}
        className="absolute top-[60px] right-0 translate-x-3 z-10 p-1 rounded-full bg-brand-4/50 hover:bg-brand-4/90 backdrop-blur-sm show-lg"
      >
        <ChevronRight className={`size-5 ${showFull ? "rotate-180" : ""}`} />
      </button>

      <div
        className={`relative backdrop-blur w-full h-full py-4 md:py-5 overflow-hidden transition-500 bg-black/30 ${
          showFull
            ? "w-full md:max-w-fit lg:min-w-[250px] px-4 md:px-5"
            : "max-w-fit px-2"
        }`}
        //   onMouseEnter={() => setShowFull(true)}
        //   onMouseLeave={() => setShowFull(false)}
      >
        <DotGrid w={20} h={60} id={0} />
        {/* <div className="absolute top-0 left-0 w-full h-full ">
      </div> */}
        <MotionDiv
          initial="initial"
          animate="animate"
          exit="exit"
          variants={variants.scaleIn}
          className="pb-6 lg:pb-7 pt-2 relative flex"
        >
          <Logo showName={showFull} />
        </MotionDiv>
        <MotionDiv
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ staggerChildren: 0.1 }}
          className={`flex flex-col gap-3 relative ${
            !showFull ? "items-center" : ""
          }`}
        >
          {navs.map(({ label, link }, i) => (
            <motion.div key={i} variants={variants.slideInBottom}>
              <Link
                className={`uppercase font-semibold text-white p-[10px] flex-v-center group border  rounded-lg hover:border-white hover:bg-white/10 w-full transition-500 ${
                  pathname === `/${link}`
                    ? "border-white bg-white/10"
                    : "border-transparent"
                }`}
                href={`/${link}`}
                // scroll={false}
              >
                <Icon i={i} color="white" />

                {showFull && <span>{label}</span>}
              </Link>
            </motion.div>
          ))}
        </MotionDiv>
      </div>
    </div>
  );
};

export default Sidebar;
