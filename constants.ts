import { Listing, Request, User, UserRole, Transaction } from './types';

export const MOCK_USER_SELLER: User = {
  id: 'u1',
  name: 'Ahmed Bello',
  email: 'ahmed@ecotrade.com',
  role: UserRole.SELLER,
  businessName: 'Bello Recycling Enterprises',
  address: '12 Industrial Ave, Ikeja, Lagos',
  phone: '+234 800 111 2222',
  avatar: 'https://picsum.photos/id/64/100/100'
};

export const MOCK_USER_BUYER: User = {
  id: 'u2',
  name: 'Chioma Okeke',
  email: 'chioma@greenmanufacturing.com',
  role: UserRole.BUYER,
  businessName: 'GreenPlast Mfg',
  address: '45 Aba Road, Port Harcourt',
  phone: '+234 800 333 4444',
  avatar: 'https://picsum.photos/id/65/100/100'
};

export const MOCK_USER_ADMIN: User = {
  id: 'u3',
  name: 'System Admin',
  email: 'admin@ecotrade.com',
  role: UserRole.ADMIN,
  avatar: 'https://picsum.photos/id/2/100/100'
};

export const MOCK_LISTINGS: Listing[] = [
  {
    id: 'l1',
    sellerId: 'u1',
    sellerName: 'Bello Recycling Enterprises',
    title: '50kg Mixed Plastic Bottles (PET)',
    materialType: 'Plastic',
    quantity: 50,
    pricePerKg: 150,
    location: 'Ikeja, Lagos',
    description: 'Clean, sorted PET bottles ready for crushing. Minimal contamination.',
    imageUrl: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?q=80&w=800&auto=format&fit=crop',
    status: 'active',
    createdAt: '2023-10-25'
  },
  {
    id: 'l2',
    sellerId: 'u1',
    sellerName: 'Bello Recycling Enterprises',
    title: '200kg Aluminium Cans',
    materialType: 'Metal',
    quantity: 200,
    pricePerKg: 450,
    location: 'Ikeja, Lagos',
    description: 'Crushed aluminium cans, baled for easy transport.',
    imageUrl: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=800&auto=format&fit=crop',
    status: 'active',
    createdAt: '2023-10-26'
  },
  {
    id: 'l3',
    sellerId: 'u4',
    sellerName: 'Lagos Waste Management',
    title: '1 Ton Cardboard Waste',
    materialType: 'Paper',
    quantity: 1000,
    pricePerKg: 80,
    location: 'Yaba, Lagos',
    description: 'Dry cardboard boxes, flattened and baled.',
    imageUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=800&auto=format&fit=crop',
    status: 'pending',
    createdAt: '2023-10-27'
  },
  {
    id: 'l4',
    sellerId: 'u5',
    sellerName: 'Kano Metal Works',
    title: '500kg Copper Wire Scrap',
    materialType: 'Metal',
    quantity: 500,
    pricePerKg: 3200,
    location: 'Kano',
    description: 'Stripped copper wire, high purity.',
    imageUrl: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?q=80&w=800&auto=format&fit=crop',
    status: 'active',
    createdAt: '2023-10-28'
  },
  {
    id: 'l5',
    sellerId: 'u1',
    sellerName: 'Bello Recycling Enterprises',
    title: '100kg HDPE Plastic Drums',
    materialType: 'Plastic',
    quantity: 100,
    pricePerKg: 200,
    location: 'Ikeja, Lagos',
    description: 'Blue HDPE drums, washed and cut.',
    imageUrl: 'https://images.unsplash.com/photo-1562077552-9955364bea29?q=80&w=800&auto=format&fit=crop',
    status: 'sold',
    createdAt: '2023-10-20'
  },
  {
    id: 'l6',
    sellerId: 'u6',
    sellerName: 'City Glass Recyclers',
    title: '2 Tons Cullet Glass (Mixed)',
    materialType: 'Glass',
    quantity: 2000,
    pricePerKg: 45,
    location: 'Abuja',
    description: 'Mixed color glass cullet, washed and ready for melting.',
    imageUrl: 'https://images.unsplash.com/photo-1536599018102-9f8033dbc8b0?q=80&w=800&auto=format&fit=crop',
    status: 'active',
    createdAt: '2023-10-29'
  },
  {
    id: 'l7',
    sellerId: 'u7',
    sellerName: 'Tech Scrap Solutions',
    title: '500 Motherboards (E-Waste)',
    materialType: 'Electronics',
    quantity: 150,
    pricePerKg: 5000,
    location: 'Computer Village, Lagos',
    description: 'Old computer motherboards for gold recovery.',
    imageUrl: 'https://images.unsplash.com/photo-1591799264318-7e8400435952?q=80&w=800&auto=format&fit=crop',
    status: 'active',
    createdAt: '2023-10-30'
  },
  {
    id: 'l8',
    sellerId: 'u8',
    sellerName: 'Green Paper Co.',
    title: '500kg White Office Paper',
    materialType: 'Paper',
    quantity: 500,
    pricePerKg: 120,
    location: 'Victoria Island, Lagos',
    description: 'Shredded white office paper, baled.',
    imageUrl: 'https://images.unsplash.com/photo-1583508915901-b5f84c1dcde1?q=80&w=800&auto=format&fit=crop',
    status: 'active',
    createdAt: '2023-10-30'
  },
  {
    id: 'l9',
    sellerId: 'u9',
    sellerName: 'Delta Steel Scraps',
    title: '5 Tons Heavy Melting Steel',
    materialType: 'Metal',
    quantity: 5000,
    pricePerKg: 300,
    location: 'Warri',
    description: 'HMS 1&2 scrap steel, industrial cut.',
    imageUrl: 'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?q=80&w=800&auto=format&fit=crop',
    status: 'active',
    createdAt: '2023-10-31'
  },
  {
    id: 'l10',
    sellerId: 'u10',
    sellerName: 'Plastic Masters',
    title: '300kg LDPE Films',
    materialType: 'Plastic',
    quantity: 300,
    pricePerKg: 180,
    location: 'Ogun State',
    description: 'Clear LDPE films from packaging waste.',
    imageUrl: 'https://images.unsplash.com/photo-1595278069441-2cf29f8005e4?q=80&w=800&auto=format&fit=crop',
    status: 'active',
    createdAt: '2023-11-01'
  }
];

export const MOCK_REQUESTS: Request[] = [
  {
    id: 'r1',
    listingId: 'l1',
    listingTitle: '50kg Mixed Plastic Bottles (PET)',
    buyerId: 'u2',
    buyerName: 'Chioma Okeke',
    sellerId: 'u1',
    sellerName: 'Bello Recycling Enterprises',
    requestedQuantity: 50,
    totalPrice: 7500,
    message: 'Can we arrange pickup for tomorrow morning?',
    status: 'pending',
    createdAt: '2023-10-28T10:00:00Z'
  },
  {
    id: 'r2',
    listingId: 'l2',
    listingTitle: '200kg Aluminium Cans',
    buyerId: 'u6',
    buyerName: 'Global Metals Ltd',
    sellerId: 'u1',
    sellerName: 'Bello Recycling Enterprises',
    requestedQuantity: 200,
    totalPrice: 90000,
    message: 'Is the price negotiable for bulk purchase?',
    status: 'accepted',
    createdAt: '2023-10-27T14:30:00Z'
  }
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx1',
    requestId: 'r2',
    buyerName: 'Global Metals Ltd',
    sellerName: 'Bello Recycling Enterprises',
    listingTitle: '200kg Aluminium Cans',
    amount: 90000,
    status: 'completed',
    date: '2023-10-27'
  },
  {
    id: 'tx2',
    requestId: 'r3',
    buyerName: 'Chioma Okeke',
    sellerName: 'Bello Recycling Enterprises',
    listingTitle: '10kg Copper',
    amount: 15000,
    status: 'processing',
    date: '2023-10-26'
  }
];