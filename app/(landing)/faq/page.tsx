import React from "react";
import Link from "next/link";

import { Plus } from "lucide-react";
import { DotGrid, Motion } from "@/components";

import { FAQData } from "@/constants/staticText";

interface IFAQData {
  question: string;
  answers: string[];
  desc?: string;
  quote?: string;
  desc2?: string;
}

const FAQ = async ({
  searchParams,
}: {
  searchParams: Promise<{
    faq?: string;
  }>;
}) => {
  const faq = (await searchParams).faq;
  return (
    <div>
      <Motion custom={0} className="banner-container">
        <DotGrid w={100} h={20} id={2} />
        <div className="bg-pfp bg-center bg-no-repeat bg-cover rounded-xl w-full h-full flex flex-col justify-end ">
          <div className="heading flex-center w-full h-full bg-gradient-to-r from-brand-1/70 to-brand-3/50">
            <Motion custom={1} className="heading font-semibold p-5">
              Frequently Asked Questions
            </Motion>
          </div>
        </div>
      </Motion>

      <div className="flex flex-col gap-3 lg:gap-4 py-7 ">
        {FAQData.map(
          (
            { question, answers, desc, quote, desc2 }: IFAQData,
            index: number
          ) => (
            <Motion
              custom={index + 2}
              key={index}
              // className={faq === question ? "" : "hover:!scale-105"}
              // className="hover:border hover:border-brand-1/50 hover:shadow-lg"
            >
              <Link
                href={faq === question ? "?faq" : `?faq=${question}`}
                className={`flex flex-col gap-3 card md:!py-6 hover:bg-brand-1/20 transition-500 ${
                  faq === question ? "" : ""
                }`}
                scroll={false}
              >
                <Motion
                  className="subheading-faq flex justify-between"
                  custom={index + 2}
                >
                  {question}
                  <Plus
                    className={`size-5 min-w-5 max-w-5 transition-500 mt-[2px] ${
                      faq === question ? "rotate-45" : ""
                    }`}
                  />
                </Motion>

                {faq === question && (
                  <>
                    {desc && (
                      <Motion tag="p" custom={index + 2}>
                        {desc}
                      </Motion>
                    )}

                    {quote && (
                      <Motion
                        tag="p"
                        custom={index + 2}
                        className="italic font-medium"
                      >
                        {`"${quote}"`}
                      </Motion>
                    )}

                    {desc2 && (
                      <Motion tag="p" custom={index + 2}>
                        {desc2}
                      </Motion>
                    )}

                    {answers && (
                      <div className="flex flex-col gap-3">
                        {answers.map((item, j) => (
                          <Motion key={j} custom={index + 2 + j}>
                            <li>{item}</li>
                          </Motion>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </Link>
            </Motion>
          )
        )}
      </div>
    </div>
  );
};

export default FAQ;
