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

// Mock Orders for Buyer Dashboard
export const MOCK_ORDERS = [
  {
    id: 'ord1',
    itemName: '50kg Mixed Plastic Bottles (PET)',
    sellerName: 'Bello Recycling Enterprises',
    quantity: 50,
    pricePerUnit: 150,
    totalPrice: 7500,
    status: 'delivered',
    orderDate: '2023-10-15',
    estimatedDelivery: '2023-10-18',
    itemImage: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'ord2',
    itemName: '200kg Aluminium Cans',
    sellerName: 'Bello Recycling Enterprises',
    quantity: 200,
    pricePerUnit: 450,
    totalPrice: 90000,
    status: 'shipped',
    orderDate: '2023-10-20',
    estimatedDelivery: '2023-10-25',
    itemImage: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'ord3',
    itemName: '1 Ton Cardboard Waste',
    sellerName: 'Lagos Waste Management',
    quantity: 1000,
    pricePerUnit: 80,
    totalPrice: 80000,
    status: 'paid',
    orderDate: '2023-10-22',
    estimatedDelivery: '2023-10-28',
    itemImage: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'ord4',
    itemName: '500kg Copper Wire Scrap',
    sellerName: 'Kano Metal Works',
    quantity: 500,
    pricePerUnit: 3200,
    totalPrice: 1600000,
    status: 'pending',
    orderDate: '2023-10-25',
    estimatedDelivery: '2023-11-02',
    itemImage: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'ord5',
    itemName: '100kg HDPE Plastic Drums',
    sellerName: 'Bello Recycling Enterprises',
    quantity: 100,
    pricePerUnit: 200,
    totalPrice: 20000,
    status: 'completed',
    orderDate: '2023-10-10',
    estimatedDelivery: '2023-10-14',
    itemImage: 'https://images.unsplash.com/photo-1562077552-9955364bea29?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'ord6',
    itemName: '2 Tons Cullet Glass (Mixed)',
    sellerName: 'City Glass Recyclers',
    quantity: 2000,
    pricePerUnit: 45,
    totalPrice: 90000,
    status: 'completed',
    orderDate: '2023-10-05',
    estimatedDelivery: '2023-10-12',
    itemImage: 'https://images.unsplash.com/photo-1536599018102-9f8033dbc8b0?q=80&w=400&auto=format&fit=crop'
  }
];

// Mock Saved Items for Buyer Dashboard
export const MOCK_SAVED_ITEMS = [
  {
    id: 'l1',
    title: '50kg Mixed Plastic Bottles (PET)',
    sellerName: 'Bello Recycling Enterprises',
    pricePerKg: 150,
    quantity: 50,
    location: 'Ikeja, Lagos',
    materialType: 'Plastic',
    imageUrl: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?q=80&w=400&auto=format&fit=crop',
    savedDate: '2023-10-20'
  },
  {
    id: 'l4',
    title: '500kg Copper Wire Scrap',
    sellerName: 'Kano Metal Works',
    pricePerKg: 3200,
    quantity: 500,
    location: 'Kano',
    materialType: 'Metal',
    imageUrl: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?q=80&w=400&auto=format&fit=crop',
    savedDate: '2023-10-22'
  },
  {
    id: 'l6',
    title: '2 Tons Cullet Glass (Mixed)',
    sellerName: 'City Glass Recyclers',
    pricePerKg: 45,
    quantity: 2000,
    location: 'Abuja',
    materialType: 'Glass',
    imageUrl: 'https://images.unsplash.com/photo-1536599018102-9f8033dbc8b0?q=80&w=400&auto=format&fit=crop',
    savedDate: '2023-10-23'
  }
];

// Mock Seller Listings
export const MOCK_SELLER_LISTINGS = [
  {
    id: 'l1',
    title: '50kg Mixed Plastic Bottles (PET)',
    materialType: 'Plastic',
    quantity: 50,
    pricePerKg: 150,
    location: 'Ikeja, Lagos',
    description: 'Clean, sorted PET bottles ready for crushing. Minimal contamination.',
    imageUrl: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?q=80&w=400&auto=format&fit=crop',
    status: 'active',
    createdAt: '2023-10-25',
    views: 247,
    inquiries: 12
  },
  {
    id: 'l2',
    title: '200kg Aluminium Cans',
    materialType: 'Metal',
    quantity: 200,
    pricePerKg: 450,
    location: 'Ikeja, Lagos',
    description: 'Crushed aluminium cans, baled for easy transport.',
    imageUrl: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=400&auto=format&fit=crop',
    status: 'active',
    createdAt: '2023-10-26',
    views: 189,
    inquiries: 8
  },
  {
    id: 'l5',
    title: '100kg HDPE Plastic Drums',
    materialType: 'Plastic',
    quantity: 100,
    pricePerKg: 200,
    location: 'Ikeja, Lagos',
    description: 'Blue HDPE drums, washed and cut.',
    imageUrl: 'https://images.unsplash.com/photo-1562077552-9955364bea29?q=80&w=400&auto=format&fit=crop',
    status: 'sold',
    createdAt: '2023-10-20',
    views: 456,
    inquiries: 23
  }
];

// Mock Seller Orders
export const MOCK_SELLER_ORDERS = [
  {
    id: 'ord1',
    buyerName: 'Chioma Okeke',
    buyerId: 'u2',
    itemName: '50kg Mixed Plastic Bottles (PET)',
    quantity: 50,
    pricePerUnit: 150,
    totalPrice: 7500,
    status: 'delivered',
    orderDate: '2023-10-15',
    deliveryDate: '2023-10-18'
  },
  {
    id: 'ord2',
    buyerName: 'Global Metals Ltd',
    buyerId: 'u6',
    itemName: '200kg Aluminium Cans',
    quantity: 200,
    pricePerUnit: 450,
    totalPrice: 90000,
    status: 'shipped',
    orderDate: '2023-10-20',
    deliveryDate: '2023-10-25'
  },
  {
    id: 'ord3',
    buyerName: 'Lagos Manufacturing',
    buyerId: 'u7',
    itemName: '100kg HDPE Plastic Drums',
    quantity: 100,
    pricePerUnit: 200,
    totalPrice: 20000,
    status: 'pending',
    orderDate: '2023-10-22',
    deliveryDate: '2023-10-28'
  }
];

// Mock Admin - Platform Users
export const MOCK_PLATFORM_USERS = [
  {
    id: 'u1',
    name: 'Ahmed Bello',
    email: 'ahmed@ecotrade.com',
    role: 'Seller',
    status: 'Active',
    joinedDate: 'Oct 24, 2023',
    totalListings: 12,
    revenue: '₦187,500'
  },
  {
    id: 'u2',
    name: 'Chioma Okeke',
    email: 'chioma@greenmanufacturing.com',
    role: 'Buyer',
    status: 'Active',
    joinedDate: 'Oct 15, 2023',
    totalOrders: 24,
    spent: '₦340,000'
  },
  {
    id: 'u3',
    name: 'Lagos Waste Management',
    email: 'support@lgwaste.com',
    role: 'Seller',
    status: 'Active',
    joinedDate: 'Sep 10, 2023',
    totalListings: 8,
    revenue: '₦245,600'
  },
  {
    id: 'u4',
    name: 'John Smith',
    email: 'john@recyclesmart.com',
    role: 'Buyer',
    status: 'Inactive',
    joinedDate: 'Aug 20, 2023',
    totalOrders: 5,
    spent: '₦85,000'
  },
  {
    id: 'u5',
    name: 'Kano Metal Works',
    email: 'contact@kanometal.com',
    role: 'Seller',
    status: 'Active',
    joinedDate: 'Jul 30, 2023',
    totalListings: 15,
    revenue: '₦1,200,000'
  }
];

// Mock Admin - Platform Listings
export const MOCK_ADMIN_LISTINGS = [
  {
    id: 'l1',
    title: '50kg Mixed Plastic Bottles (PET)',
    seller: 'Bello Recycling Enterprises',
    category: 'Plastic',
    quantity: 50,
    pricePerKg: 150,
    status: 'active',
    createdDate: '2023-10-25',
    views: 247,
    inquiries: 12
  },
  {
    id: 'l2',
    title: '200kg Aluminium Cans',
    seller: 'Bello Recycling Enterprises',
    category: 'Metal',
    quantity: 200,
    pricePerKg: 450,
    status: 'active',
    createdDate: '2023-10-26',
    views: 189,
    inquiries: 8
  },
  {
    id: 'l3',
    title: '1 Ton Cardboard Waste',
    seller: 'Lagos Waste Management',
    category: 'Paper',
    quantity: 1000,
    pricePerKg: 80,
    status: 'pending',
    createdDate: '2023-10-27',
    views: 54,
    inquiries: 3
  },
  {
    id: 'l4',
    title: '500kg Copper Wire Scrap',
    seller: 'Kano Metal Works',
    category: 'Metal',
    quantity: 500,
    pricePerKg: 3200,
    status: 'active',
    createdDate: '2023-10-28',
    views: 412,
    inquiries: 18
  }
];

// Mock Admin - Platform Orders
export const MOCK_ADMIN_ORDERS = [
  {
    id: 'ord1',
    buyer: 'Chioma Okeke',
    seller: 'Bello Recycling Enterprises',
    item: '50kg Mixed Plastic Bottles',
    amount: 7500,
    status: 'delivered',
    orderDate: '2023-10-15'
  },
  {
    id: 'ord2',
    buyer: 'Global Metals Ltd',
    seller: 'Bello Recycling Enterprises',
    item: '200kg Aluminium Cans',
    amount: 90000,
    status: 'shipped',
    orderDate: '2023-10-20'
  },
  {
    id: 'ord3',
    buyer: 'Lagos Manufacturing',
    seller: 'Kano Metal Works',
    item: '500kg Copper Wire',
    amount: 1600000,
    status: 'pending',
    orderDate: '2023-10-25'
  }
];

// Mock Admin - Platform Payments
export const MOCK_ADMIN_PAYMENTS = [
  {
    id: 'tx1',
    seller: 'Bello Recycling Enterprises',
    amount: 90000,
    status: 'completed',
    method: 'Bank Transfer',
    date: '2023-10-27'
  },
  {
    id: 'tx2',
    seller: 'Kano Metal Works',
    amount: 1600000,
    status: 'processing',
    method: 'Bank Transfer',
    date: '2023-10-26'
  },
  {
    id: 'tx3',
    seller: 'Lagos Waste Management',
    amount: 50000,
    status: 'pending',
    method: 'Wallet',
    date: '2023-10-25'
  }
];

// Mock Messages/Conversations
export const MOCK_CONVERSATIONS = [
  {
    id: 'conv1',
    sellerName: 'Ahmed Bello',
    sellerId: 'u1',
    lastMessage: 'The order has been shipped. Track with this number: ABC123...',
    timestamp: '2 hours ago',
    unread: false,
    messages: [
      { id: 'm1', sender: 'buyer', text: 'Hi, when can I pickup the order?', timestamp: '2023-10-25 10:00' },
      { id: 'm2', sender: 'seller', text: 'Hi! You can pickup anytime between 9am-5pm weekdays', timestamp: '2023-10-25 10:15' },
      { id: 'm3', sender: 'buyer', text: 'Great! See you tomorrow morning', timestamp: '2023-10-25 10:30' },
      { id: 'm4', sender: 'seller', text: 'The order has been shipped. Track with this number: ABC123...', timestamp: '2023-10-25 14:00' }
    ]
  },
  {
    id: 'conv2',
    sellerName: 'Kano Metal Works',
    sellerId: 'u5',
    lastMessage: 'Can you negotiate on bulk pricing?',
    timestamp: '5 hours ago',
    unread: true,
    messages: [
      { id: 'm5', sender: 'buyer', text: 'Hi, interested in 500kg copper wire', timestamp: '2023-10-25 08:00' },
      { id: 'm6', sender: 'seller', text: 'Great choice! Price is 3200/kg', timestamp: '2023-10-25 08:30' },
      { id: 'm7', sender: 'buyer', text: 'Can you negotiate on bulk pricing?', timestamp: '2023-10-25 11:00' }
    ]
  },
  {
    id: 'conv3',
    sellerName: 'City Glass Recyclers',
    sellerId: 'u6',
    lastMessage: 'Delivered successfully',
    timestamp: '1 day ago',
    unread: false,
    messages: [
      { id: 'm8', sender: 'buyer', text: 'Order received, thank you!', timestamp: '2023-10-24 15:00' },
      { id: 'm9', sender: 'seller', text: 'Delivered successfully', timestamp: '2023-10-24 15:15' }
    ]
  }
];
