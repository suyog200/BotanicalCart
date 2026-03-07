import { useState } from "react";
import { faqs } from "@/lib/FAQData";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <div className="max-w-xl mx-auto flex flex-col items-center justify-center px-4 md:px-0">
        {/* FAQ List */}
        {faqs.map((faq, index) => {
          // Use question as a stable key (or faq.id if available)
          const key = faq.question;
          const isOpen = openIndex === index;
          const answerId = `faq-answer-${key}`;
          const buttonId = `faq-question-${key}`;
          return (
            <div key={key} className="border-b border-slate-200 py-4 w-full">
              {/* Question Row as button */}
              <button
                id={buttonId}
                type="button"
                className="flex items-center justify-between w-full text-left focus:outline-none"
                aria-expanded={isOpen}
                aria-controls={answerId}
                onClick={() =>
                  setOpenIndex((prev) => (prev === index ? null : index))
                }
              >
                <span className="text-base font-medium">{faq.question}</span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`${
                    isOpen ? "rotate-180" : ""
                  } transition-all duration-500 ease-in-out`}
                >
                  <path
                    d="m4.5 7.2 3.793 3.793a1 1 0 0 0 1.414 0L13.5 7.2"
                    stroke="#38C771"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {/* Answer */}
              <div
                id={answerId}
                role="region"
                aria-labelledby={buttonId}
                className={`text-sm text-slate-500 transition-all duration-500 ease-in-out max-w-md ${
                  isOpen
                    ? "opacity-100 max-h-[300px] translate-y-0 pt-4"
                    : "opacity-0 max-h-0 -translate-y-2"
                }`}
              >
                {faq.answer}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default FAQ;
