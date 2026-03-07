"use client";
import ColourfulText from "@/components/ui/colorful-text";

interface ColorfulTextHeaderProps {
  featuredText: string;
  text1: string;
  text2: string;
  className?: string;
}

export function ColorfulTextHeader({featuredText, text1, text2, className}: ColorfulTextHeaderProps) {
  return (
    <div className="flex items-center justify-center relative overflow-hidden mt-2 mb-4">
      <h1 className={ className ? className : "text-2xl md:text-5xl lg:text-7xl font-bold text-center text-black relative z-2 font-sans" }>
        {text1} <ColourfulText text={featuredText} /> <br /> {text2}
      </h1>
    </div>
  );
}
