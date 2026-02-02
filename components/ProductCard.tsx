
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onView: (id: string) => void;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onView, onAddToCart }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all group flex flex-col h-full">
      <div 
        className="relative h-56 overflow-hidden cursor-pointer"
        onClick={() => onView(product.id)}
      >
        <img 
          src={product.imageUrl} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-blue-700 text-xs font-bold px-2 py-1 rounded-md shadow-sm">
          Min: {product.minOrderQuantity} units
        </div>
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button className="bg-white text-slate-800 px-4 py-2 rounded-lg font-bold text-sm shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform">
            View Details
          </button>
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">{product.category}</span>
          <span className="text-xs text-slate-400"><i className="fas fa-warehouse mr-1"></i> {product.wholesalerName}</span>
        </div>
        
        <h3 className="font-bold text-slate-800 text-lg mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>
        
        <p className="text-sm text-slate-500 line-clamp-2 mb-4">
          {product.description}
        </p>

        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-slate-900">${product.pricePerUnit.toFixed(2)}</div>
            <div className="text-[10px] text-slate-400 font-medium">UNIT PRICE (BULK)</div>
          </div>
          
          <button 
            onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
            className="bg-blue-600 text-white w-10 h-10 rounded-lg flex items-center justify-center hover:bg-blue-700 transition shadow-md hover:shadow-blue-200"
          >
            <i className="fas fa-plus"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
