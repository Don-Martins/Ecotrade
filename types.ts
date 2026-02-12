export enum UserRole {
  GUEST = 'guest',
  BUYER = 'buyer',
  SELLER = 'seller',
  ADMIN = 'admin'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  businessName?: string;
  address?: string;
  phone?: string;
  status?: 'active' | 'suspended';
  joinedDate?: string;
}

export interface Listing {
  id: string;
  sellerId: string;
  sellerName: string;
  title: string;
  materialType: 'Plastic' | 'Metal' | 'Paper' | 'Glass' | 'Electronics';
  quantity: number; // in kg
  pricePerKg: number;
  location: string;
  description: string;
  imageUrl: string;
  status: 'active' | 'sold' | 'pending' | 'rejected';
  createdAt: string;
}

export interface Request {
  id: string;
  listingId: string;
  listingTitle: string;
  buyerId: string;
  buyerName: string;
  sellerId: string;
  sellerName: string;
  requestedQuantity: number;
  totalPrice: number;
  message: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  createdAt: string;
}

export interface Transaction {
  id: string;
  requestId: string;
  buyerName: string;
  sellerName: string;
  listingTitle: string;
  amount: number;
  status: 'completed' | 'processing' | 'failed';
  date: string;
}

export interface Order {
  id: string;
  productName: string;
  buyerName: string;
  sellerName: string;
  amount: number;
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
}

export interface StatCardProps {
  title: string;
  value: string | number;
  icon: string;
  trend?: string;
  color: string;
}