import monsteraImg from "@/assets/monstera.jpg";
import type { Plant } from "@/types/types";
import homeImg from "@/assets/categoriesImages/home.png";
import medicinalImg from "@/assets/categoriesImages/medicinal.png";
import indoorImg from "@/assets/categoriesImages/indoor.png";
import outdoorImg from "@/assets/categoriesImages/outdoor.png";
import flowerImg from "@/assets/categoriesImages/flower-pot.png";
import gardenToolsImg from "@/assets/categoriesImages/gardening-tools.png";

export const plants: Plant[] = [
  {
    id: "1",
    name: "Monstera Deliciosa",
    price: 45.99,
    categories: [{ id: "home-decor", name: "Home Decor" }],
    imageUrl: monsteraImg,
    description: "Beautiful split-leaf plant perfect for modern homes",
    careInstructions: ["Bright indirect light, water weekly"],
    inStock: true,
    isFeatured: true,
    units: 10,
    imagePublicId: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const defaultCategories = [
  { value: "all", label: "All Plants", icon: homeImg },
  { value: "Medicinal", label: "Medicinal", icon: medicinalImg },
  { value: "Home Decor", label: "Home Decor", icon: homeImg },
  { value: "Indoor", label: "Indoor", icon: indoorImg },
  { value: "Outdoor", label: "Outdoor", icon: outdoorImg },
  { value: "Flowers", label: "Flowers", icon: flowerImg },
  { value: "Garden Tools", label: "Garden Tools", icon: gardenToolsImg },
];
