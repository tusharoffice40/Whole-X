
import React from 'react';
import { UserRole } from '../types';

interface NavbarProps {
  currentRole: UserRole;
  setRole: (role: UserRole) => void;
  cartCount: number;
  onNavigate: (page: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentRole, setRole, cartCount, onNavigate }) => {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 px-4 py-3 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <button onClick={() => onNavigate('home')} className="flex items-center space-x-2">
            <div className="bg-blue-600 text-white p-1.5 rounded-lg">
              <i className="fas fa-cubes-stacked text-xl"></i>
            </div>
            <span className="text-2xl font-bold tracking-tight text-slate-800">Whole<span className="text-blue-600">X</span></span>
          </button>
          
          <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-600">
            <button onClick={() => onNavigate('products')} className="hover:text-blue-600 transition">Browse Products</button>
            <button onClick={() => onNavigate('dashboard')} className="hover:text-blue-600 transition">My Dashboard</button>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden lg:flex items-center bg-slate-100 rounded-full px-3 py-1 mr-4 border border-slate-200">
            <span className="text-xs font-semibold uppercase text-slate-500 mr-2">Role:</span>
            <select 
              value={currentRole}
              onChange={(e) => setRole(e.target.value as UserRole)}
              className="bg-transparent text-xs font-bold text-blue-700 outline-none cursor-pointer"
            >
              <option value={UserRole.BUYER}>Buyer (Retailer)</option>
              <option value={UserRole.WHOLESALER}>Wholesaler</option>
              <option value={UserRole.ADMIN}>Admin</option>
            </select>
          </div>

          <button className="text-slate-500 hover:text-blue-600 p-2 relative">
            <i className="fas fa-search text-lg"></i>
          </button>
          
          <button 
            onClick={() => onNavigate('cart')}
            className="text-slate-500 hover:text-blue-600 p-2 relative"
          >
            <i className="fas fa-shopping-cart text-lg"></i>
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-white">
                {cartCount}
              </span>
            )}
          </button>

          <button className="flex items-center space-x-2 bg-slate-800 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-700 transition">
            <i className="fas fa-user-circle text-lg"></i>
            <span className="hidden sm:inline">Account</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
