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
        "group/bento shadow-md row-span-1 flex flex-col justify-between space-y-4 rounded-xl  bg-white p-4 transition duration-200 hover:shadow-lg",
        className
      )}
    >
      <div className="w-full h-full min-h-[6rem] rounded-xl overflow-hidden bg-white border border-gray-200">
        <img src={image} alt="" className="w-full h-full object-cover" />
      </div>

      <div className="transition duration-200 group-hover/bento:translate-x-2">
        <div className="mt-2 mb-2 font-sans font-bold text-[color:var(--color-hero-text-subtitle)] text-2xl">
          {title}
        </div>
        <div className="font-sans text-sm text-[color:var(--color-hero-text-accent)]">
          {description}
        </div>
      </div>
    </div>
  );
};
