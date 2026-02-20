import React from 'react';
import { Listing } from '../types';

interface ListingCardProps {
  listing: Listing;
  onClick: (listingId: string) => void;
}

const ListingCard: React.FC<ListingCardProps> = ({ listing, onClick }) => {
  return (
    <div 
      className="group bg-secondary-800 rounded-xl shadow-lg border border-secondary-700 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out cursor-pointer hover:border-primary-600"
      onClick={() => onClick(listing.id)}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={listing.imageUrl} 
          alt={listing.title} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md ${
            listing.materialType === 'Plastic' ? 'bg-blue-500/30 text-blue-300 border border-blue-500/50' :
            listing.materialType === 'Metal' ? 'bg-gray-500/30 text-gray-300 border border-gray-500/50' :
            listing.materialType === 'Paper' ? 'bg-amber-500/30 text-amber-300 border border-amber-500/50' :
            listing.materialType === 'Glass' ? 'bg-cyan-500/30 text-cyan-300 border border-cyan-500/50' :
            'bg-purple-500/30 text-purple-300 border border-purple-500/50'
          }`}>
            {listing.materialType}
          </span>
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <div>
            <p className="text-xs text-secondary-400 mb-1">{listing.sellerName}</p>
            <h3 className="font-bold text-secondary-50 line-clamp-1 group-hover:text-primary-400 transition-colors">
              {listing.title}
            </h3>
          </div>
        </div>
        
        <div className="flex items-center text-sm text-secondary-400 mb-4">
          <i className="fas fa-map-marker-alt text-primary-400 mr-2"></i>
          {listing.location}
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-secondary-700">
           <div>
             <span className="block text-xs text-secondary-500">Price per kg</span>
             <span className="font-bold text-lg text-primary-400">₦{listing.pricePerKg.toLocaleString()}</span>
           </div>
           <div className="text-right">
             <span className="block text-xs text-secondary-500">Available</span>
             <span className="font-semibold text-secondary-300">{listing.quantity} kg</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
