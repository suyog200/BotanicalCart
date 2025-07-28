import { BentoGrid, BentoGridItem } from "./ui/bento-grid";
import aloveraImg from "@/assets/featuredImg/aloe-vera.jpg"
import arecaImg from "@/assets/featuredImg/ArecaPalm.jpg"
import snakePlantImg from "@/assets/featuredImg/snakePlant.jpg"
import peaceLilyImg from "@/assets/featuredImg/peacelily.jpg"
import succulentMixImg from "@/assets/featuredImg/SucculentMix.jpg"
import moneyPlantImg from "@/assets/featuredImg/moneyPlant.jpeg"
import zzPlantImg from "@/assets/featuredImg/zzPlant.jpg"
import lavenderPotImg from "@/assets/featuredImg/LavenderPlant.jpg"
import spiderPlantImg from "@/assets/featuredImg/spiderPlant.jpg"
import bostonFernImg from "@/assets/featuredImg/BostonFern.jpg"


import { ColorfulTextHeader } from "./ColorfulTextHeader";

export function FeaturedProducts() {
  return (
    <div>
    <ColorfulTextHeader />    
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

const items = [
  {
    title: "Aloe Vera – Nature’s Healer",
    description:
      "Soothe your skin and purify your space with this low-maintenance medicinal marvel.",
    image: aloveraImg,
    tags: ["Medicinal", "Easy Care", "Indoor"],
    category: "Medicinal Plants",
    featured: true,
  },
  {
    title: "Areca Palm – Tropical Vibes Indoors",
    description:
      "Bring a splash of green and fresh air to your home with this stylish air-purifying plant.",
    image: arecaImg,
    tags: ["Air Purifier", "Tropical", "Indoor"],
    category: "Indoor Plants",
    featured: true,
  },
  {
    title: "Snake Plant – The Oxygen Booster",
    description:
      "One of the easiest indoor plants, known for filtering air and surviving with minimal care.",
    image: snakePlantImg,
    tags: ["Air Purifier", "Low Light", "Beginner Friendly"],
    category: "Indoor Plants",
    featured: false,
  },
  {
    title: "Peace Lily – Elegance in Bloom",
    description:
      "Grace your home with lush green leaves and beautiful white blooms that purify the air.",
    image: peaceLilyImg,
    tags: ["Flowering", "Air Purifier", "Indoor"],
    category: "Flowering Plants",
    featured: true,
  },
  {
    title: "Succulent Mix – Tiny Wonders",
    description:
      "A curated set of vibrant succulents perfect for desks, windowsills, or gifting.",
    image: succulentMixImg,
    tags: ["Succulent", "Low Maintenance", "Decor"],
    category: "Succulents",
    featured: false,
  },
  {
    title: "Money Plant – Fortune in Foliage",
    description:
      "Symbol of prosperity and positivity—easy to grow, easier to love.",
    image: moneyPlantImg,
    tags: ["Vastu", "Indoor", "Beginner Friendly"],
    category: "Indoor Plants",
    featured: true,
  },
  {
    title: "ZZ Plant – The Survivor",
    description:
      "Perfect for beginners, thrives in low light and adds a bold look to any space.",
    image: zzPlantImg,
    tags: ["Low Light", "Office", "Tough"],
    category: "Indoor Plants",
    featured: false,
  },
  {
    title: "Lavender Pot – Fragrance & Calm",
    description:
      "Enjoy a soothing scent and soft purple blooms—ideal for balconies or sunny spots.",
    image: lavenderPotImg,
    tags: ["Fragrant", "Outdoor", "Flowering"],
    category: "Herbs & Flowers",
    featured: false,
  },
  {
    title: "Spider Plant – The Air Purifier",
    description:
      "Hardy, fast-growing, and excellent at removing indoor pollutants.",
    image: spiderPlantImg,
    tags: ["Air Purifier", "Pet Friendly", "Hanging"],
    category: "Hanging Plants",
    featured: true,
  },
  {
    title: "Boston Fern – Lush & Leafy",
    description:
      "Famous for its rich texture and graceful hanging fronds—perfect for hanging baskets.",
    image: bostonFernImg,
    tags: ["Hanging", "Humidity Loving", "Decorative"],
    category: "Hanging Plants",
    featured: false,
  },
];
