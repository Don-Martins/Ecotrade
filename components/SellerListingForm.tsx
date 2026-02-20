import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface SellerListingFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const SellerListingForm: React.FC<SellerListingFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Plastic',
    quantity: '',
    pricePerKg: '',
    description: '',
    location: ''
  });

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <motion.form 
      onSubmit={handleSubmit}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div>
        <label className="block text-sm font-semibold text-secondary-300 mb-2">Listing Title *</label>
        <input 
          type="text" 
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full bg-secondary-700 border border-secondary-600 text-secondary-50 rounded-lg px-4 py-3 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition"
          placeholder="e.g. 500kg Clear PET Bottles" 
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-secondary-300 mb-2">Category *</label>
          <select 
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full bg-secondary-700 border border-secondary-600 text-secondary-50 rounded-lg px-4 py-3 focus:border-primary-500 outline-none"
          >
            <option value="Plastic">Plastic</option>
            <option value="Metal">Metal</option>
            <option value="Paper">Paper</option>
            <option value="Glass">Glass</option>
            <option value="Electronics">Electronics</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-secondary-300 mb-2">Quantity (kg) *</label>
          <input 
            type="number" 
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
            className="w-full bg-secondary-700 border border-secondary-600 text-secondary-50 rounded-lg px-4 py-3 focus:border-primary-500 outline-none"
            placeholder="100" 
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-secondary-300 mb-2">Price per KG (₦) *</label>
          <input 
            type="number" 
            name="pricePerKg"
            value={formData.pricePerKg}
            onChange={handleChange}
            required
            className="w-full bg-secondary-700 border border-secondary-600 text-secondary-50 rounded-lg px-4 py-3 focus:border-primary-500 outline-none"
            placeholder="150" 
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-secondary-300 mb-2">Location *</label>
          <input 
            type="text" 
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full bg-secondary-700 border border-secondary-600 text-secondary-50 rounded-lg px-4 py-3 focus:border-primary-500 outline-none"
            placeholder="e.g. Ikeja, Lagos" 
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-secondary-300 mb-2">Description</label>
        <textarea 
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="w-full bg-secondary-700 border border-secondary-600 text-secondary-50 rounded-lg px-4 py-3 focus:border-primary-500 outline-none resize-none"
          placeholder="Describe condition, quality, pickup details..." 
        ></textarea>
      </div>

      <div className="border-2 border-dashed border-secondary-600 rounded-xl p-8 text-center hover:border-primary-500 transition-colors">
        <i className="fas fa-cloud-upload-alt text-secondary-500 text-4xl mb-3 block"></i>
        <p className="text-secondary-50 font-medium">Drag and drop images here</p>
        <p className="text-secondary-400 text-sm">or click to upload (up to 5 images)</p>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <button 
          type="button"
          onClick={onCancel}
          className="px-6 py-2.5 text-secondary-300 hover:bg-secondary-700 rounded-lg font-semibold transition-colors"
        >
          Cancel
        </button>
        <button 
          type="submit"
          className="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition-colors shadow-md"
        >
          Publish Listing
        </button>
      </div>
    </motion.form>
  );
};

export default SellerListingForm;
