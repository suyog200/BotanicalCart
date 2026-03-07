import { BentoGrid, BentoGridItem } from "./ui/bento-grid";
import { ColorfulTextHeader } from "./ColorfulTextHeader";
import { items } from "@/data/featuredProductsItems";

export function FeaturedProducts() {
  return (
    <div>
    <ColorfulTextHeader featuredText="Botanical" text1="The Best Of" text2="Cart" />
    <BentoGrid className="max-w-full mx-auto">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          className={i === 3 || i === 6 ? "md:col-span-2" : ""}
          image={item.image}
          tags={item.tags}
          category={item.category}
          featured={item.featured}
        />
      ))}
    </BentoGrid>
    </div>
  );
}

