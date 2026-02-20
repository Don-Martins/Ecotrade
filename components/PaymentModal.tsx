import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PaymentModalProps {
  isOpen: boolean;
  order: any;
  onClose: () => void;
  onSuccess: () => void;
}

declare global {
  interface Window {
    PaystackPop: any;
  }
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, order, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const initializePayment = async () => {
    setLoading(true);
    setError('');

    try {
      // Call backend to initialize payment
      const response = await fetch('/api/payments/initiate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('api_token')}`
        },
        body: JSON.stringify({
          order_id: order.id
        })
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.message || 'Failed to initialize payment');
        setLoading(false);
        return;
      }

      // Load Paystack script if not already loaded
      if (!window.PaystackPop) {
        const script = document.createElement('script');
        script.src = 'https://js.paystack.co/v1/inline.js';
        script.async = true;
        document.body.appendChild(script);
        
        script.onload = () => {
          openPaystackCheckout(data);
        };
      } else {
        openPaystackCheckout(data);
      }
    } catch (err) {
      setError('Error initializing payment');
      setLoading(false);
    }
  };

  const openPaystackCheckout = (paymentData: any) => {
    window.PaystackPop.setup({
      key: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY || 'pk_live_your_key',
      email: order.buyer.email,
      amount: order.totalPrice * 100, // in kobo
      ref: paymentData.reference,
      onClose: () => {
        setLoading(false);
        setError('Payment cancelled');
      },
      onSuccess: (response: any) => {
        verifyPayment(paymentData.reference);
      }
    }).openIframe();
  };

  const verifyPayment = async (reference: string) => {
    try {
      const response = await fetch(`/api/payments/verify/${reference}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('api_token')}`
        }
      });

      const data = await response.json();

      if (data.success) {
        setLoading(false);
        onSuccess();
      } else {
        setError(data.message || 'Payment verification failed');
        setLoading(false);
      }
    } catch (err) {
      setError('Error verifying payment');
      setLoading(false);
    }
  };

  if (!order) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-secondary-800 border border-secondary-700 rounded-xl shadow-2xl z-50 p-6"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-secondary-50">Complete Payment</h2>
              <button
                onClick={onClose}
                className="text-secondary-400 hover:text-secondary-300"
              >
                <i className="fas fa-times text-lg"></i>
              </button>
            </div>

            {/* Order Summary */}
            <div className="bg-secondary-700/30 border border-secondary-700 rounded-lg p-4 mb-6">
              <h3 className="text-sm font-semibold text-secondary-50 mb-4">Order Summary</h3>
              
              <div className="space-y-3 mb-4 pb-4 border-b border-secondary-700">
                <div className="flex justify-between">
                  <span className="text-secondary-400">Item:</span>
                  <span className="text-secondary-50 font-medium">{order.itemName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-400">Quantity:</span>
                  <span className="text-secondary-50 font-medium">{order.quantity} kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-400">Price per kg:</span>
                  <span className="text-secondary-50 font-medium">₦{order.pricePerUnit.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-400">Subtotal:</span>
                  <span className="text-secondary-50 font-medium">₦{order.totalPrice.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-secondary-50 font-bold">Total Amount:</span>
                <span className="text-2xl font-bold text-primary-400">
                  ₦{order.totalPrice.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Seller Info */}
            <div className="bg-secondary-700/30 border border-secondary-700 rounded-lg p-4 mb-6">
              <h3 className="text-sm font-semibold text-secondary-50 mb-3">Seller</h3>
              <p className="text-secondary-50 font-medium">{order.sellerName}</p>
              <p className="text-xs text-secondary-400 mt-1">
                Payment will be transferred to seller upon delivery confirmation
              </p>
            </div>

            {/* Payment Method Info */}
            <div className="bg-primary-500/10 border border-primary-500/30 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <i className="fas fa-info-circle text-primary-400"></i>
                <h4 className="font-semibold text-primary-300">Payment via Paystack</h4>
              </div>
              <p className="text-sm text-primary-200">
                You will be redirected to Paystack to complete your payment securely. 
                We accept all major payment methods.
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-accent-500/10 border border-accent-500/30 rounded-lg p-4 mb-6"
              >
                <p className="text-sm text-accent-300">
                  <i className="fas fa-exclamation-circle mr-2"></i>
                  {error}
                </p>
              </motion.div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={onClose}
                disabled={loading}
                className="flex-1 px-4 py-2.5 bg-secondary-700 hover:bg-secondary-600 text-secondary-50 rounded-lg font-semibold transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={initializePayment}
                disabled={loading}
                className="flex-1 px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <i className="fas fa-spinner animate-spin"></i>
                    Processing...
                  </>
                ) : (
                  <>
                    <i className="fas fa-credit-card"></i>
                    Pay Now
                  </>
                )}
              </button>
            </div>

            {/* Security Notice */}
            <div className="mt-4 pt-4 border-t border-secondary-700 text-center">
              <p className="text-xs text-secondary-500">
                <i className="fas fa-lock mr-1"></i>
                Your payment information is secure and encrypted
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PaymentModal;
