import React, { useState, useMemo } from 'react';
import ListingCard from '../components/ListingCard';
import { MOCK_LISTINGS } from '../constants';

interface MarketplaceProps {
  onViewListing: (id: string) => void;
}

const Marketplace: React.FC<MarketplaceProps> = ({ onViewListing }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<number>(5000);

  const materials = ['Plastic', 'Metal', 'Paper', 'Glass', 'Electronics'];

  const filteredListings = useMemo(() => {
    return MOCK_LISTINGS.filter(listing => {
      const matchesSearch = listing.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            listing.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesMaterial = selectedMaterial ? listing.materialType === selectedMaterial : true;
      const matchesPrice = listing.pricePerKg <= priceRange;
      
      return matchesSearch && matchesMaterial && matchesPrice;
    });
  }, [searchTerm, selectedMaterial, priceRange]);

  return (
    <div className="w-full bg-secondary-900 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-secondary-50 mb-2">Marketplace</h1>
          <p className="text-secondary-400">Browse live listings for recyclable materials.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="w-full lg:w-1/4">
            <div className="bg-secondary-800 p-6 rounded-xl shadow-lg border border-secondary-700 sticky top-24">
              <div className="mb-6">
                <h3 className="font-semibold text-secondary-50 mb-4">Search</h3>
                <div className="relative">
                  <i className="fas fa-search absolute left-3 top-3 text-secondary-500"></i>
                  <input
                    type="text"
                    placeholder="Keywords, Location..."
                    className="w-full pl-10 pr-4 py-2 border border-secondary-700 bg-secondary-900 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none text-sm text-secondary-50 placeholder-secondary-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-secondary-50 mb-4">Material Type</h3>
                <div className="space-y-2">
                  <label className="flex items-center cursor-pointer group">
                    <input 
                      type="radio" 
                      name="material"
                      checked={selectedMaterial === null}
                      onChange={() => setSelectedMaterial(null)}
                      className="form-radio text-primary-500 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-secondary-400 group-hover:text-primary-400 transition-colors">All Materials</span>
                  </label>
                  {materials.map(m => (
                    <label key={m} className="flex items-center cursor-pointer group">
                      <input 
                        type="radio" 
                        name="material"
                        checked={selectedMaterial === m}
                        onChange={() => setSelectedMaterial(m)}
                        className="form-radio text-primary-500 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-secondary-400 group-hover:text-primary-400 transition-colors">{m}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between mb-2">
                   <h3 className="font-semibold text-secondary-50">Max Price / kg</h3>
                   <span className="text-primary-400 font-bold text-sm">₦{priceRange}</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="5000" 
                  step="100"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full h-2 bg-secondary-700 rounded-lg appearance-none cursor-pointer accent-primary-500"
                />
              </div>

              <button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedMaterial(null);
                  setPriceRange(5000);
                }}
                className="w-full py-2 text-sm text-secondary-400 border border-secondary-700 rounded-lg hover:bg-secondary-700 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          </div>

          {/* Grid */}
          <div className="w-full lg:w-3/4">
            {filteredListings.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
                {filteredListings.map(listing => (
                  <ListingCard key={listing.id} listing={listing} onClick={onViewListing} />
                ))}
              </div>
            ) : (
              <div className="bg-secondary-800 p-12 rounded-xl text-center shadow-lg border border-secondary-700">
                <div className="w-16 h-16 bg-secondary-700 rounded-full flex items-center justify-center mx-auto mb-4 text-secondary-500">
                  <i className="fas fa-search text-2xl"></i>
                </div>
                <h3 className="text-lg font-bold text-secondary-50 mb-2">No listings found</h3>
                <p className="text-secondary-400">Try adjusting your filters or search terms.</p>
              </div>
            )}
            
            {/* Pagination Placeholder */}
            {filteredListings.length > 0 && (
              <div className="mt-12 flex justify-center">
                <nav className="flex space-x-2">
                  <button className="px-4 py-2 border border-secondary-700 rounded-md bg-secondary-800 text-secondary-400 hover:bg-secondary-700">Previous</button>
                  <button className="px-4 py-2 border border-primary-500 rounded-md bg-primary-500/20 text-primary-400 font-medium">1</button>
                  <button className="px-4 py-2 border border-secondary-700 rounded-md bg-secondary-800 text-secondary-400 hover:bg-secondary-700">2</button>
                  <button className="px-4 py-2 border border-secondary-700 rounded-md bg-secondary-800 text-secondary-400 hover:bg-secondary-700">3</button>
                  <button className="px-4 py-2 border border-secondary-700 rounded-md bg-secondary-800 text-secondary-400 hover:bg-secondary-700">Next</button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
