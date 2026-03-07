"use client";
import React from "react";
import { motion } from "motion/react";

export function ColourfulText({ text }: { text: string }) {
const colors = [
  "rgb(124, 252, 0)",   // LawnGreen (vibrant leaf)
  "rgb(127, 255, 0)",   // Chartreuse (fresh sapling)
  "rgb(50, 205, 50)",   // LimeGreen (tender stem)
  "rgb(34, 139, 34)",   // ForestGreen (mature leaves)
  "rgb(107, 142, 35)",  // OliveDrab (earthy leaf)
  "rgb(85, 107, 47)",   // DarkOliveGreen (succulent shadows)
  "rgb(60, 179, 113)",  // MediumSeaGreen (mint or herbal)
  "rgb(46, 139, 87)",   // SeaGreen (leafy vegetable)
  "rgb(0, 128, 0)",     // Green (classic chlorophyll)
  "rgb(152, 251, 152)", // PaleGreen (soft fern or indoor plant)
];

  const [currentColors, setCurrentColors] = React.useState(colors);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      const shuffled = [...colors].sort(() => Math.random() - 0.5);
      setCurrentColors(shuffled);
      setCount((prev) => prev + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return text.split("").map((char, index) => (
    <motion.span
      key={`${char}-${count}-${index}`}
      initial={{
        y: 0,
      }}
      animate={{
        color: currentColors[index % currentColors.length],
        y: [0, -3, 0],
        scale: [1, 1.01, 1],
        filter: ["blur(0px)", `blur(5px)`, "blur(0px)"],
        opacity: [1, 0.8, 1],
      }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
      }}
      className="inline-block whitespace-pre font-sans tracking-tight"
    >
      {char}
    </motion.span>
  ));
}

export default ColourfulText;
