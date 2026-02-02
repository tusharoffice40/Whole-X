
import React, { useState } from 'react';
import { UserRole, Product, CartItem, Order } from './types.ts';
import { MOCK_PRODUCTS, CATEGORIES } from './constants.tsx';
import Navbar from './components/Navbar.tsx';
import ProductCard from './components/ProductCard.tsx';
import AIConsultant from './components/AIConsultant.tsx';

const App: React.FC = () => {
  const [role, setRole] = useState<UserRole>(UserRole.BUYER);
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [wholesalerInventory] = useState<Product[]>(MOCK_PRODUCTS);

  const navigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.productId === product.id);
      if (existing) {
        return prev.map(item => 
          item.productId === product.id ? { ...item, quantity: item.quantity + product.minOrderQuantity } : item
        );
      }
      return [...prev, { productId: product.id, product, quantity: product.minOrderQuantity }];
    });
    alert(`Added ${product.minOrderQuantity} units of ${product.name} to cart.`);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.productId !== productId));
  };

  const updateQuantity = (productId: string, qty: number) => {
    setCart(prev => prev.map(item => 
      item.productId === productId ? { ...item, quantity: Math.max(item.product.minOrderQuantity, qty) } : item
    ));
  };

  const checkout = () => {
    if (cart.length === 0) return;
    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9).toUpperCase(),
      date: new Date().toLocaleDateString(),
      items: [...cart],
      totalAmount: cart.reduce((sum, item) => sum + (item.product.pricePerUnit * item.quantity), 0),
      status: 'PENDING',
      wholesalerId: cart[0].product.wholesalerId,
      buyerId: 'user_123'
    };
    setOrders([newOrder, ...orders]);
    setCart([]);
    navigate('orders');
    alert('Order successfully placed!');
  };

  const renderHome = () => (
    <div className="space-y-12">
      <section className="relative h-[500px] flex items-center overflow-hidden rounded-3xl mx-4 mt-6">
        <img 
          src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=2000" 
          className="absolute inset-0 w-full h-full object-cover"
          alt="Warehouse"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/40 to-transparent"></div>
        <div className="relative z-10 max-w-2xl px-12 text-white">
          <span className="bg-blue-600 text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full mb-6 inline-block">B2B Wholesale Hub</span>
          <h1 className="text-5xl font-extrabold leading-tight mb-6">
            Connecting Wholesalers <br/> With The Global Market.
          </h1>
          <p className="text-lg text-slate-300 mb-8 max-w-lg">
            Streamlining bulk commerce for retailers, resellers, and manufacturers. Fast, secure, and smart digital distribution.
          </p>
          <div className="flex space-x-4">
            <button onClick={() => navigate('products')} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold transition shadow-lg">
              Browse Inventory
            </button>
            <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-8 py-4 rounded-xl font-bold border border-white/20 transition">
              Our Mission
            </button>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Featured Categories</h2>
            <p className="text-slate-500">Source top-tier bulk items from verified suppliers</p>
          </div>
          <button onClick={() => navigate('products')} className="text-blue-600 font-bold hover:underline">View All</button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map(cat => (
            <div key={cat} onClick={() => navigate('products')} className="bg-white border border-slate-200 p-6 rounded-2xl text-center hover:border-blue-400 hover:shadow-md transition cursor-pointer group">
              <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-50 group-hover:text-blue-600 transition">
                <i className={`fas fa-${cat.includes('Clothing') ? 'shirt' : cat.includes('Electronics') ? 'laptop' : cat.includes('Home') ? 'house' : 'boxes-stacked'} text-xl`}></i>
              </div>
              <span className="text-sm font-bold text-slate-700">{cat}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  const renderProducts = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Marketplace</h1>
          <p className="text-slate-500 font-medium">Browse thousands of active wholesale listings</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
            <input 
              type="text" 
              placeholder="Search products..." 
              className="bg-white border border-slate-200 pl-11 pr-4 py-3 rounded-xl w-full md:w-80 focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>
          <button className="bg-white border border-slate-200 p-3 rounded-xl hover:bg-slate-50">
            <i className="fas fa-sliders text-slate-600"></i>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wholesalerInventory.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onView={() => {
              setSelectedProduct(product);
              navigate('product-detail');
            }}
            onAddToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );

  const renderProductDetail = () => {
    if (!selectedProduct) return null;
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <button onClick={() => navigate('products')} className="flex items-center text-blue-600 font-bold mb-8 hover:translate-x-1 transition">
          <i className="fas fa-arrow-left mr-2"></i> Back to Products
        </button>
        <div className="grid lg:grid-cols-2 gap-12 bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <div className="space-y-4">
            <div className="aspect-square rounded-3xl overflow-hidden shadow-inner bg-slate-50">
              <img src={selectedProduct.imageUrl} className="w-full h-full object-cover" alt={selectedProduct.name} />
            </div>
          </div>
          <div className="flex flex-col h-full">
            <div className="flex items-center space-x-3 mb-4">
              <span className="bg-blue-100 text-blue-700 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">{selectedProduct.category}</span>
            </div>
            <h1 className="text-4xl font-extrabold text-slate-900 mb-2 leading-tight">{selectedProduct.name}</h1>
            <p className="text-slate-500 text-lg mb-8">{selectedProduct.description}</p>
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 mb-8">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Price Per Unit</p>
                  <p className="text-3xl font-black text-slate-900">${selectedProduct.pricePerUnit.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Minimum Order</p>
                  <p className="text-3xl font-black text-slate-900">{selectedProduct.minOrderQuantity} <span className="text-sm text-slate-400 font-bold">Units</span></p>
                </div>
              </div>
            </div>
            <button 
              onClick={() => addToCart(selectedProduct)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-blue-200 transition-all"
            >
              Add Bulk Quantity to Cart
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderCart = () => (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold mb-8">Wholesale Cart</h1>
      {cart.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl text-center border border-slate-100 shadow-sm">
          <i className="fas fa-shopping-basket text-4xl text-slate-300 mb-4 block"></i>
          <h3 className="text-2xl font-bold text-slate-800 mb-2">Cart is empty</h3>
          <button onClick={() => navigate('products')} className="mt-4 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg">Browse Products</button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            {cart.map(item => (
              <div key={item.productId} className="flex flex-col sm:flex-row items-center p-6 border-b border-slate-50 last:border-0">
                <img src={item.product.imageUrl} className="w-24 h-24 rounded-2xl object-cover mb-4 sm:mb-0 sm:mr-6" />
                <div className="flex-grow">
                  <h4 className="font-bold text-slate-900 text-lg">{item.product.name}</h4>
                  <p className="text-blue-600 font-bold">${item.product.pricePerUnit.toFixed(2)} / unit</p>
                </div>
                <div className="flex items-center space-x-4">
                  <input 
                    type="number" 
                    min={item.product.minOrderQuantity}
                    value={item.quantity} 
                    onChange={(e) => updateQuantity(item.productId, parseInt(e.target.value) || 0)}
                    className="w-24 text-center font-bold text-slate-800 border rounded-xl px-2 py-2"
                  />
                  <button onClick={() => removeFromCart(item.productId)} className="text-red-500 hover:text-red-700 p-2">
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl flex justify-between items-center">
            <div>
               <p className="text-slate-400 font-bold text-xs">TOTAL ESTIMATE</p>
               <p className="text-3xl font-black">${cart.reduce((s, i) => s + (i.product.pricePerUnit * i.quantity), 0).toFixed(2)}</p>
            </div>
            <button onClick={checkout} className="bg-blue-600 hover:bg-blue-700 px-10 py-4 rounded-2xl font-black text-lg transition-all">
               Place Bulk Order
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar 
        currentRole={role} 
        setRole={setRole} 
        cartCount={cart.length} 
        onNavigate={navigate}
      />
      <main className="flex-grow">
        {currentPage === 'home' && renderHome()}
        {currentPage === 'products' && renderProducts()}
        {currentPage === 'product-detail' && renderProductDetail()}
        {currentPage === 'cart' && renderCart()}
        {currentPage === 'orders' && <div className="max-w-5xl mx-auto px-4 py-12"> <h1 className="text-4xl font-extrabold mb-8">Order History</h1> <p className="text-slate-500 bg-white p-8 rounded-2xl text-center border">Your orders will appear here after processing.</p> </div>}
        {currentPage === 'dashboard' && <div className="max-w-7xl mx-auto px-4 py-12"> <h1 className="text-4xl font-extrabold mb-8">Dashboard</h1> <p className="text-slate-500 bg-white p-8 rounded-2xl text-center border">Management dashboard available for verified users.</p> </div>}
      </main>
      <AIConsultant />
      <footer className="bg-white border-t border-slate-200 py-10 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-400 text-xs">
          <p>© 2024 WHOLEX INC. ALL RIGHTS RESERVED.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
