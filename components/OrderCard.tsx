import React from 'react';
import { motion } from 'framer-motion';
import OrderStatusBadge from './OrderStatusBadge';

interface Order {
  id: string;
  itemName: string;
  sellerName: string;
  quantity: number;
  pricePerUnit: number;
  totalPrice: number;
  status: string;
  orderDate: string;
  estimatedDelivery?: string;
}

interface OrderCardProps {
  order: Order;
  onClick: () => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, onClick }) => {
  return (
    <motion.div 
      whileHover={{ y: -2, boxShadow: '0 10px 25px rgba(34, 197, 94, 0.1)' }}
      onClick={onClick}
      className="bg-secondary-800 border border-secondary-700 rounded-xl p-5 cursor-pointer transition-all hover:border-primary-600"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-bold text-secondary-50 line-clamp-1">{order.itemName}</h3>
          <p className="text-sm text-secondary-400 mt-1">By {order.sellerName}</p>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-secondary-700">
        <div>
          <p className="text-xs text-secondary-500">Quantity</p>
          <p className="text-sm font-semibold text-secondary-50">{order.quantity} kg</p>
        </div>
        <div>
          <p className="text-xs text-secondary-500">Unit Price</p>
          <p className="text-sm font-semibold text-secondary-50">₦{order.pricePerUnit.toLocaleString()}</p>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <p className="text-xs text-secondary-500">Order Date</p>
          <p className="text-sm font-medium text-secondary-50">{order.orderDate}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-secondary-500">Total</p>
          <p className="text-lg font-bold text-primary-400">₦{order.totalPrice.toLocaleString()}</p>
        </div>
      </div>

      {order.estimatedDelivery && (
        <div className="mt-4 pt-4 border-t border-secondary-700">
          <p className="text-xs text-secondary-400">
            <i className="fas fa-calendar mr-1.5"></i>
            Est. Delivery: {order.estimatedDelivery}
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default OrderCard;
