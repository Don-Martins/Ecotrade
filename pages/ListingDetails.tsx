import React, { useState } from 'react';
import { MOCK_LISTINGS } from '../constants';
import { motion } from 'framer-motion';

interface ListingDetailsProps {
  listingId: string;
  onBack: () => void;
}

const ListingDetails: React.FC<ListingDetailsProps> = ({ listingId, onBack }) => {
  const listing = MOCK_LISTINGS.find(l => l.id === listingId);
  const [requestQty, setRequestQty] = useState(listing ? listing.quantity : 0);
  const [message, setMessage] = useState('');

  if (!listing) return <div>Listing not found</div>;

  const totalPrice = requestQty * listing.pricePerKg;

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-gray-50 py-8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={onBack}
          className="mb-6 flex items-center text-gray-500 hover:text-primary-600 transition-colors font-medium"
        >
          <i className="fas fa-arrow-left mr-2"></i> Back to Marketplace
        </button>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
          <div className="flex flex-col lg:flex-row">
            {/* Image Gallery */}
            <div className="w-full lg:w-1/2 bg-gray-100 p-6 flex items-center justify-center relative group">
              <motion.img 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                src={listing.imageUrl} 
                alt={listing.title} 
                className="w-full h-auto max-h-[500px] object-contain rounded-lg shadow-sm group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Info */}
            <div className="w-full lg:w-1/2 p-8 lg:p-12">
              <div className="flex justify-between items-start mb-4">
                 <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    listing.materialType === 'Plastic' ? 'bg-blue-100 text-blue-800' :
                    listing.materialType === 'Metal' ? 'bg-gray-100 text-gray-800' :
                    listing.materialType === 'Paper' ? 'bg-amber-100 text-amber-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {listing.materialType}
                  </span>
                  <span className="text-sm text-gray-400">Posted {listing.createdAt}</span>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{listing.title}</h1>
              <p className="flex items-center text-gray-500 mb-6">
                 <i className="fas fa-map-marker-alt text-primary-500 mr-2"></i> {listing.location}
              </p>

              <div className="flex items-end gap-2 mb-8 border-b border-gray-100 pb-8">
                <span className="text-4xl font-bold text-primary-700">₦{listing.pricePerKg}</span>
                <span className="text-gray-500 mb-2">/ kg</span>
                <span className="ml-auto text-sm bg-green-50 text-green-700 px-3 py-1 rounded-full border border-green-100">
                   {listing.quantity} kg Available
                </span>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-600 leading-relaxed">{listing.description}</p>
              </div>

              <div className="mb-8">
                 <h3 className="text-lg font-bold text-gray-900 mb-3">Seller</h3>
                 <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 mr-4">
                      <i className="fas fa-user"></i>
                    </div>
                    <div>
                       <p className="font-semibold text-gray-900">{listing.sellerName}</p>
                       <p className="text-sm text-gray-500">Verified Business <i className="fas fa-check-circle text-blue-500 ml-1"></i></p>
                    </div>
                 </div>
              </div>

              {/* Purchase Box */}
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-4">Make a Request</h3>
                <div className="mb-4">
                   <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">Quantity (kg)</label>
                   <input 
                      type="number" 
                      min="1"
                      max={listing.quantity}
                      value={requestQty}
                      onChange={(e) => setRequestQty(Number(e.target.value))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                   />
                </div>
                <div className="mb-4">
                   <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">Message</label>
                   <textarea
                      rows={2}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Hi, I'm interested in this material..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none text-sm"
                   />
                </div>
                
                <div className="flex justify-between items-center mb-6">
                   <span className="text-gray-600 font-medium">Total Estimate:</span>
                   <span className="text-2xl font-bold text-gray-900">₦{totalPrice.toLocaleString()}</span>
                </div>

                <div className="space-y-3">
                   <motion.button 
                     whileHover={{ scale: 1.02 }}
                     whileTap={{ scale: 0.98 }}
                     className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 rounded-lg shadow-lg transition-all duration-300"
                   >
                      Send Request
                   </motion.button>
                   <div className="grid grid-cols-2 gap-3">
                      <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center justify-center bg-[#635bff] text-white py-3 rounded-lg hover:bg-[#4b45c6] transition-colors font-medium"
                      >
                         <i className="fab fa-stripe text-xl mr-2"></i> Pay with Stripe
                      </motion.button>
                      <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center justify-center bg-[#0ba4db] text-white py-3 rounded-lg hover:bg-[#0988b6] transition-colors font-medium"
                      >
                         <span className="font-bold mr-2">Paystack</span> Pay
                      </motion.button>
                   </div>
                   <p className="text-xs text-center text-gray-400 mt-2">
                     <i className="fas fa-lock mr-1"></i> Payments are held in escrow until pickup is confirmed.
                   </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ListingDetails;