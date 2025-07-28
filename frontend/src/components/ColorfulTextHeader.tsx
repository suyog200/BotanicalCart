"use client";
import ColourfulText from "@/components/ui/colorful-text";

export function ColorfulTextHeader() {
  return (
    <div className="flex items-center justify-center relative overflow-hidden bg-black mt-2.5 mb-2.5">
      <h1 className="text-2xl md:text-5xl lg:text-7xl font-bold text-center text-white relative z-2 font-sans">
        The best <ColourfulText text="featured" /> <br /> products you will ever find
      </h1>
    </div>
  );
}
