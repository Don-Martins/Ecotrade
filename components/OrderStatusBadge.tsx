import React from 'react';

interface OrderStatusBadgeProps {
  status: string;
}

const OrderStatusBadge: React.FC<OrderStatusBadgeProps> = ({ status }) => {
  const statusConfig: Record<string, { bg: string; text: string; icon: string }> = {
    'pending': { bg: 'bg-accent-500/20', text: 'text-accent-300', icon: 'fa-clock' },
    'paid': { bg: 'bg-primary-500/20', text: 'text-primary-300', icon: 'fa-check-circle' },
    'shipped': { bg: 'bg-blue-500/20', text: 'text-blue-300', icon: 'fa-truck' },
    'delivered': { bg: 'bg-primary-500/20', text: 'text-primary-300', icon: 'fa-box' },
    'disputed': { bg: 'bg-accent-500/20', text: 'text-accent-300', icon: 'fa-exclamation-circle' },
    'completed': { bg: 'bg-primary-500/20', text: 'text-primary-300', icon: 'fa-check' },
    'cancelled': { bg: 'bg-secondary-600', text: 'text-secondary-300', icon: 'fa-times' },
  };

  const config = statusConfig[status.toLowerCase()] || statusConfig['pending'];

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text} border border-current border-opacity-30`}>
      <i className={`fas ${config.icon}`}></i>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default OrderStatusBadge;
