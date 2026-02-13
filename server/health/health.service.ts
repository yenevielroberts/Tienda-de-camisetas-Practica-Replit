import { Injectable } from '@nestjs/common';

export interface SportsTshirt {
  id: number;
  name: string;
  category: string;
  price: number;
  color: string;
  material: string;
  features: string[];
  inStock: boolean;
}

export interface HealthResponse {
  status: string;
  message: string;
  timestamp: string;
  data: SportsTshirt[];
  count: number;
}

@Injectable()
export class HealthService {
  getSportsTshirts(): HealthResponse {
    const sportsTshirts: SportsTshirt[] = [
      {
        id: 1,
        name: 'Performance Dry-Fit',
        category: 'sports',
        price: 39.99,
        color: 'Black',
        material: '100% Polyester Mesh',
        features: ['Moisture-wicking', 'Breathable', 'Lightweight'],
        inStock: true,
      },
      {
        id: 2,
        name: "Runner's Elite",
        category: 'sports',
        price: 44.99,
        color: 'Navy Blue',
        material: '85% Polyester, 15% Spandex',
        features: ['Stretch fabric', 'Reflective strips', 'Odor-resistant'],
        inStock: true,
      },
      {
        id: 3,
        name: 'Gym Beast',
        category: 'sports',
        price: 34.99,
        color: 'Gray',
        material: '90% Cotton, 10% Polyester',
        features: ['Comfortable fit', 'Durable', 'Machine washable'],
        inStock: true,
      },
      {
        id: 4,
        name: "Athlete's Choice",
        category: 'sports',
        price: 49.99,
        color: 'White',
        material: '100% Polyester',
        features: ['Quick-dry', 'UV protection', 'Anti-microbial'],
        inStock: true,
      },
      {
        id: 5,
        name: 'Yoga Flow',
        category: 'sports',
        price: 42.99,
        color: 'Purple',
        material: '92% Nylon, 8% Spandex',
        features: ['Four-way stretch', 'Moisture-wicking', 'Eco-friendly'],
        inStock: true,
      },
      {
        id: 6,
        name: 'Training Max',
        category: 'sports',
        price: 37.99,
        color: 'Red',
        material: '87% Polyester, 13% Spandex',
        features: ['Flat-lock seams', 'Ventilation panels', 'Lightweight'],
        inStock: true,
      },
    ];

    return {
      status: 'healthy',
      message: 'Sports t-shirts collection',
      timestamp: new Date().toISOString(),
      data: sportsTshirts,
      count: sportsTshirts.length,
    };
  }
}
