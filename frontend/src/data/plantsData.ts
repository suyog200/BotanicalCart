import monsteraImg from '@/assets/monstera.jpg';
import lavenderImg from '@/assets/lavender.jpg';
import snakePlantImg from '@/assets/snake-plant.jpg';
import fiddleLeafImg from '@/assets/fiddle-leaf.jpg';
import aloeVeraImg from '@/assets/aloe-vera.jpg';
import type { Plant } from '@/types/types';

export const plants: Plant[] = [
  {
    id: '1',
    name: 'Monstera Deliciosa',
    price: 45.99,
    category: 'home-decor',
    image: monsteraImg,
    description: 'Beautiful split-leaf plant perfect for modern homes',
    care: 'Bright indirect light, water weekly',
    inStock: true
  },
  {
    id: '2',
    name: 'Lavender',
    price: 18.99,
    category: 'medicinal',
    image: lavenderImg,
    description: 'Aromatic herb with calming properties',
    care: 'Full sun, water sparingly',
    inStock: true
  },
  {
    id: '3',
    name: 'Snake Plant',
    price: 28.99,
    category: 'indoor',
    image: snakePlantImg,
    description: 'Low-maintenance air purifying plant',
    care: 'Low light tolerant, water monthly',
    inStock: true
  },
  {
    id: '4',
    name: 'Fiddle Leaf Fig',
    price: 89.99,
    category: 'home-decor',
    image: fiddleLeafImg,
    description: 'Statement plant with large glossy leaves',
    care: 'Bright indirect light, water when top soil is dry',
    inStock: true
  },
  {
    id: '5',
    name: 'Aloe Vera',
    price: 22.99,
    category: 'medicinal',
    image: aloeVeraImg,
    description: 'Healing succulent with soothing gel',
    care: 'Bright light, water deeply but infrequently',
    inStock: true
  },
  {
    id: '6',
    name: 'Monstera Adansonii',
    price: 32.99,
    category: 'indoor',
    image: monsteraImg,
    description: 'Swiss cheese plant with unique fenestrations',
    care: 'Bright indirect light, regular watering',
    inStock: true
  },
  {
    id: '7',
    name: 'English Lavender',
    price: 24.99,
    category: 'outdoor',
    image: lavenderImg,
    description: 'Hardy perennial with intense fragrance',
    care: 'Full sun, well-draining soil',
    inStock: true
  },
  {
    id: '8',
    name: 'Golden Pothos',
    price: 19.99,
    category: 'indoor',
    image: snakePlantImg,
    description: 'Easy-care trailing vine',
    care: 'Medium to low light, water weekly',
    inStock: true
  },
  {
    id: '9',
    name: 'Rubber Tree',
    price: 65.99,
    category: 'home-decor',
    image: fiddleLeafImg,
    description: 'Bold statement plant with dark green leaves',
    care: 'Bright indirect light, water when dry',
    inStock: true
  },
  {
    id: '10',
    name: 'Jade Plant',
    price: 16.99,
    category: 'indoor',
    image: aloeVeraImg,
    description: 'Lucky succulent that\'s easy to grow',
    care: 'Bright light, water sparingly',
    inStock: true
  },
  {
    id: '11',
    name: 'Bird of Paradise',
    price: 125.99,
    category: 'home-decor',
    image: monsteraImg,
    description: 'Tropical showstopper with dramatic leaves',
    care: 'Bright direct light, consistent moisture',
    inStock: true
  },
  {
    id: '12',
    name: 'Rosemary',
    price: 15.99,
    category: 'medicinal',
    image: lavenderImg,
    description: 'Fragrant herb for cooking and aromatherapy',
    care: 'Full sun, well-draining soil',
    inStock: true
  }
];

export const categories = [
  { value: 'all', label: 'All Plants' },
  { value: 'medicinal', label: 'Medicinal' },
  { value: 'home-decor', label: 'Home Decor' },
  { value: 'indoor', label: 'Indoor' },
  { value: 'outdoor', label: 'Outdoor' }
];