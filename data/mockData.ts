export interface Route {
  id: string;
  name: string;
  from: string;
  to: string;
  distance: string;
  duration: string;
  difficulty: 'Easy' | 'Moderate' | 'Hard';
  type: 'Scenic' | 'Fastest' | 'Adventure';
  districts: string[];
  highlights: string[];
  checkpoints: number;
  hotels: number;
  fuelStops: number;
  rating: number;
  image: string;
}

export interface Hotel {
  id: string;
  name: string;
  location: string;
  district: string;
  priceRange: string;
  rating: number;
  amenities: string[];
  bikerFriendly: boolean;
  hasParking: boolean;
  parkingType: string;
}

export interface Checkpoint {
  id: string;
  name: string;
  type: 'Army' | 'BGB' | 'Police';
  location: string;
  district: string;
  documents: string[];
  notes: string;
  guideRequired: boolean;
}

export interface TouristSpot {
  id: string;
  name: string;
  district: string;
  category: string;
  description: string;
  viral: boolean;
  rating: number;
}

export const ROUTES: Route[] = [
  {
    id: '1',
    name: 'Chittagong Hill Tracts Loop',
    from: 'Chittagong',
    to: 'Bandarban',
    distance: '280 km',
    duration: '2 days',
    difficulty: 'Hard',
    type: 'Adventure',
    districts: ['Chittagong', 'Bandarban', 'Rangamati', 'Khagrachhari'],
    highlights: ['Nilgiri viewpoint', 'Boga Lake', 'Nafakhum waterfall', 'Sangu River valley'],
    checkpoints: 6,
    hotels: 12,
    fuelStops: 4,
    rating: 4.8,
    image: 'cht',
  },
  {
    id: '2',
    name: 'Cox\'s Bazar Coastal Ride',
    from: 'Chittagong',
    to: "Cox's Bazar",
    distance: '155 km',
    duration: '1 day',
    difficulty: 'Easy',
    type: 'Scenic',
    districts: ['Chittagong', "Cox's Bazar"],
    highlights: ['Marine Drive road', 'Inani Beach', 'Himchori waterfall', 'Laboni Beach'],
    checkpoints: 2,
    hotels: 30,
    fuelStops: 6,
    rating: 4.9,
    image: 'coxsbazar',
  },
  {
    id: '3',
    name: 'Sylhet Tea Garden Trail',
    from: 'Dhaka',
    to: 'Sylhet',
    distance: '244 km',
    duration: '2 days',
    difficulty: 'Moderate',
    type: 'Scenic',
    districts: ['Dhaka', 'Narsingdi', 'Brahmanbaria', 'Habiganj', 'Sylhet'],
    highlights: ['Srimangal tea gardens', 'Ratargul swamp forest', 'Jaflong', 'Lalakhal river'],
    checkpoints: 1,
    hotels: 18,
    fuelStops: 8,
    rating: 4.7,
    image: 'sylhet',
  },
  {
    id: '4',
    name: 'Sundarbans Border Ride',
    from: 'Khulna',
    to: 'Mongla',
    distance: '190 km',
    duration: '1 day',
    difficulty: 'Moderate',
    type: 'Adventure',
    districts: ['Khulna', 'Bagerhat', 'Satkhira'],
    highlights: ['Sundarbans mangrove edge', 'Sixty Dome Mosque', 'Mongla port view'],
    checkpoints: 3,
    hotels: 8,
    fuelStops: 5,
    rating: 4.5,
    image: 'sundarbans',
  },
];

export const HOTELS: Hotel[] = [
  {
    id: '1',
    name: 'Hill View Guest House',
    location: 'Bandarban Sadar',
    district: 'Bandarban',
    priceRange: '৳ 800–1,500 / night',
    rating: 4.3,
    amenities: ['WiFi', 'Hot water', 'Restaurant', 'Generator'],
    bikerFriendly: true,
    hasParking: true,
    parkingType: 'Covered secured parking',
  },
  {
    id: '2',
    name: 'Seagull Hotel',
    location: 'Marine Drive, Kolatoli',
    district: "Cox's Bazar",
    priceRange: '৳ 2,000–4,500 / night',
    rating: 4.6,
    amenities: ['WiFi', 'AC', 'Pool', 'Restaurant', 'Rooftop'],
    bikerFriendly: true,
    hasParking: true,
    parkingType: 'Open guarded parking',
  },
  {
    id: '3',
    name: 'Nilachal Resort',
    location: 'Nilachal Hill, Bandarban',
    district: 'Bandarban',
    priceRange: '৳ 3,000–6,000 / night',
    rating: 4.8,
    amenities: ['WiFi', 'AC', 'Restaurant', 'Valley view', 'Generator'],
    bikerFriendly: true,
    hasParking: true,
    parkingType: 'Covered secured parking',
  },
];

export const CHECKPOINTS: Checkpoint[] = [
  {
    id: '1',
    name: 'Kaptai Army Checkpoint',
    type: 'Army',
    location: 'Kaptai Entry Point',
    district: 'Rangamati',
    documents: ['National ID (NID)', 'Bike Registration Paper', 'Insurance Certificate', 'Driving License'],
    notes: 'Entry restricted after 5:00 PM. Group riding (2+ bikes) allowed without special permit. Solo riders may need a guide.',
    guideRequired: false,
  },
  {
    id: '2',
    name: 'Thanchi BGB Checkpoint',
    type: 'BGB',
    location: 'Thanchi Bazar',
    district: 'Bandarban',
    documents: ['National ID (NID)', 'Bike Registration Paper', 'Insurance Certificate', 'Driving License', 'District Entry Permit'],
    notes: 'District entry permit required. Available at DC Office Bandarban. Photography restricted near the checkpoint.',
    guideRequired: true,
  },
  {
    id: '3',
    name: 'Alikadam Check Post',
    type: 'Army',
    location: 'Alikadam Sadar',
    district: 'Bandarban',
    documents: ['National ID (NID)', 'Bike Registration Paper', 'Driving License'],
    notes: 'Routine check. Usually quick. Keep documents readily accessible.',
    guideRequired: false,
  },
];

export const TOURIST_SPOTS: TouristSpot[] = [
  {
    id: '1',
    name: 'Nafakhum Waterfall',
    district: 'Bandarban',
    category: 'Waterfall',
    description: 'Bangladesh\'s largest waterfall. A 2-hour trek from Remakri. Best visited Oct–Feb.',
    viral: true,
    rating: 4.9,
  },
  {
    id: '2',
    name: 'Nilgiri Hills',
    district: 'Bandarban',
    category: 'Viewpoint',
    description: 'Highest accessible point in Bangladesh at ~3,000 ft. Clouds below you at dawn.',
    viral: true,
    rating: 4.8,
  },
  {
    id: '3',
    name: 'Inani Beach',
    district: "Cox's Bazar",
    category: 'Beach',
    description: 'Rocky coral beach — less crowded than Laboni. Excellent for sunrise rides.',
    viral: true,
    rating: 4.7,
  },
  {
    id: '4',
    name: 'Ratargul Swamp Forest',
    district: 'Sylhet',
    category: 'Forest',
    description: 'Bangladesh\'s only freshwater swamp forest. Boat rides through flooded trees.',
    viral: true,
    rating: 4.6,
  },
  {
    id: '5',
    name: 'Jaflong Zero Point',
    district: 'Sylhet',
    category: 'River',
    description: 'Crystal clear river at the India border. Stone collection site with hill views.',
    viral: false,
    rating: 4.5,
  },
];

export const FUEL_STATIONS = [
  { id: '1', name: 'Padma Filling Station', location: 'Kaptai Road, Rangamati', octane: true, distance: '45 km from Chittagong' },
  { id: '2', name: 'Meghna Fuel Center', location: 'Bandarban Sadar', octane: true, distance: '92 km from Chittagong' },
  { id: '3', name: 'Eastern Petroleum', location: 'Ruma Bazar', octane: false, distance: '138 km from Chittagong' },
];

export const DISTRICTS = [
  'Dhaka', 'Chittagong', 'Bandarban', 'Rangamati', 'Khagrachhari',
  "Cox's Bazar", 'Sylhet', 'Khulna', 'Barisal', 'Rajshahi',
  'Mymensingh', 'Comilla', 'Habiganj', 'Moulvibazar', 'Sunamganj',
];
