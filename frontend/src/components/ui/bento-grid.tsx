import { cn } from "@/lib/utils";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-full grid-cols-1 gap-4 md:auto-rows-[18rem] md:grid-cols-3",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  image,
  tags,
  category,
  featured,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  image?: string;
  tags?: string[];
  category?: string;
  featured?: boolean;
}) => {
  return (
    <div
      className={cn(
        "group relative w-full h-70 rounded-xl overflow-hidden shadow-md transition duration-300 hover:shadow-xl",
        className
      )}
    >
      {/* Background Image */}
      <img
        src={image}
        alt=""
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 scale-100 group-hover:scale-105"
      />

      {/* Black Overlay on Hover */}
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition duration-300"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-end h-full p-4 text-white">
        {/* Category */}
        {category && (
          <span className="inline-block mb-2 bg-[--color-primary] text-xs font-medium px-3 py-1 rounded-full text-white w-fit border border-white/20">
            {category}
          </span>
        )}

        {/* Title */}
        <h3 className="text-2xl font-bold font-sans mb-1">{title}</h3>

        {/* Description */}
        <p className="text-sm font-sans text-white">{description}</p>
      </div>
    </div>
  );
};
