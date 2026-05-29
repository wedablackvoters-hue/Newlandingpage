import { CarModel } from './types';

export const CAR_MODELS: CarModel[] = [
  {
    id: 'bmw-x5',
    year: 2024,
    make: 'BMW',
    model: 'X5 xDrive40i',
    trim: 'Premium Sport Utility',
    msrp: 66800,
    image: 'hero_luxury_bmw_1780007425241.png' // Matches the name generated
  },
  {
    id: 'tesla-y',
    year: 2025,
    make: 'Tesla',
    model: 'Model Y Long Range',
    trim: 'AWD Dual Motor',
    msrp: 48990,
    image: 'comp_car_white_1780007472064.png' // Reuses white modern car representation
  },
  {
    id: 'lexus-rx',
    year: 2024,
    make: 'Lexus',
    model: 'RX 350h',
    trim: 'Luxury Hybrid',
    msrp: 52100,
    image: 'comp_car_black_1780007492259.png' // Reuses black suv representation
  },
  {
    id: 'audi-q5',
    year: 2024,
    make: 'Audi',
    model: 'Q5 Premium Plus',
    trim: '45 TFSI quattro',
    msrp: 51200,
    image: 'comp_car_white_1780007472064.png'
  },
  {
    id: 'ford-f150',
    year: 2025,
    make: 'Ford',
    model: 'F-150 Lariat',
    trim: 'Crew Cab 4x4',
    msrp: 62990,
    image: 'comp_car_black_1780007492259.png'
  }
];

export interface SimulatedDealer {
  name: string;
  city: string;
  state: string;
  distance: number;
  rating: number;
  reviewsCount: number;
  discountPercentageMin: number;
  discountPercentageMax: number;
}

export const SIMULATED_DEALERS: SimulatedDealer[] = [
  {
    name: 'Prestige Motors',
    city: 'Plano',
    state: 'TX',
    distance: 12,
    rating: 4.8,
    reviewsCount: 384,
    discountPercentageMin: 0.08,
    discountPercentageMax: 0.12
  },
  {
    name: 'Summit Auto Group',
    city: 'Dallas',
    state: 'TX',
    distance: 18,
    rating: 4.7,
    reviewsCount: 512,
    discountPercentageMin: 0.06,
    discountPercentageMax: 0.10
  },
  {
    name: 'DriveOne Autos',
    city: 'Frisco',
    state: 'TX',
    distance: 8,
    rating: 4.9,
    reviewsCount: 220,
    discountPercentageMin: 0.09,
    discountPercentageMax: 0.13
  },
  {
    name: 'Autobahn Imports',
    city: 'Fort Worth',
    state: 'TX',
    distance: 35,
    rating: 4.6,
    reviewsCount: 840,
    discountPercentageMin: 0.07,
    discountPercentageMax: 0.11
  },
  {
    name: 'Lone Star Dealerships',
    city: 'Austin',
    state: 'TX',
    distance: 180,
    rating: 4.8,
    reviewsCount: 1205,
    discountPercentageMin: 0.10,
    discountPercentageMax: 0.14
  },
  {
    name: 'Vanguard Auto Center',
    city: 'Plano',
    state: 'TX',
    distance: 15,
    rating: 4.5,
    reviewsCount: 142,
    discountPercentageMin: 0.05,
    discountPercentageMax: 0.09
  }
];
