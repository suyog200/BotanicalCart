"use client";
import ColourfulText from "@/components/ui/colorful-text";

interface ColorfulTextHeaderProps {
  featuredText: string;
  text1: string;
  text2: string;
}

export function ColorfulTextHeader({featuredText, text1, text2}: ColorfulTextHeaderProps) {
  return (
    <div className="flex items-center justify-center relative overflow-hidden mt-2.5 mb-6">
      <h1 className="text-2xl md:text-5xl lg:text-7xl font-bold text-center text-black relative z-2 font-sans">
        {text1} <ColourfulText text={featuredText} /> <br /> {text2}
      </h1>
    </div>
  );
}
