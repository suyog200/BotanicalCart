export interface Review {
  id: string;
  plantId: string;
  username: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export const reviews: Review[] = [
  {
    id: '1',
    plantId: '1',
    username: 'Sarah M.',
    rating: 5,
    comment: 'Beautiful plant! It arrived in perfect condition and has been thriving in my living room.',
    date: '2024-01-15',
    verified: true
  },
  {
    id: '2',
    plantId: '1',
    username: 'Mike R.',
    rating: 4,
    comment: 'Great quality, though smaller than expected. Still very happy with the purchase.',
    date: '2024-01-10',
    verified: true
  },
  {
    id: '3',
    plantId: '2',
    username: 'Emma L.',
    rating: 5,
    comment: 'The lavender smells amazing! Perfect for my herb garden.',
    date: '2024-01-12',
    verified: true
  },
  {
    id: '4',
    plantId: '3',
    username: 'David K.',
    rating: 5,
    comment: 'This snake plant is exactly what I needed for my office. Low maintenance and looks great.',
    date: '2024-01-08',
    verified: true
  },
  {
    id: '5',
    plantId: '4',
    username: 'Lisa T.',
    rating: 4,
    comment: 'Stunning fiddle leaf fig! Took a few days to adjust but now growing beautifully.',
    date: '2024-01-05',
    verified: true
  }
];