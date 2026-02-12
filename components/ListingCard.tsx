import React from 'react';
import { Listing } from '../types';

interface ListingCardProps {
  listing: Listing;
  onClick: (listingId: string) => void;
}

const ListingCard: React.FC<ListingCardProps> = ({ listing, onClick }) => {
  return (
    <div 
      className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out cursor-pointer"
      onClick={() => onClick(listing.id)}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={listing.imageUrl} 
          alt={listing.title} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            listing.materialType === 'Plastic' ? 'bg-blue-100 text-blue-800' :
            listing.materialType === 'Metal' ? 'bg-gray-100 text-gray-800' :
            listing.materialType === 'Paper' ? 'bg-amber-100 text-amber-800' :
            'bg-green-100 text-green-800'
          }`}>
            {listing.materialType}
          </span>
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <div>
            <p className="text-xs text-gray-500 mb-1">{listing.sellerName}</p>
            <h3 className="font-bold text-gray-900 line-clamp-1 group-hover:text-primary-600 transition-colors">
              {listing.title}
            </h3>
          </div>
        </div>
        
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <i className="fas fa-map-marker-alt text-primary-500 mr-2"></i>
          {listing.location}
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
           <div>
             <span className="block text-xs text-gray-400">Price per kg</span>
             <span className="font-bold text-lg text-primary-700">₦{listing.pricePerKg.toLocaleString()}</span>
           </div>
           <div className="text-right">
             <span className="block text-xs text-gray-400">Available</span>
             <span className="font-semibold text-gray-800">{listing.quantity} kg</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;