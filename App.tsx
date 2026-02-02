
import React, { useState, useEffect } from 'react';
import { UserRole, Product, CartItem, Order } from './types';
import { MOCK_PRODUCTS, CATEGORIES } from './constants';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import AIConsultant from './components/AIConsultant';

const App: React.FC = () => {
  const [role, setRole] = useState<UserRole>(UserRole.BUYER);
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [wholesalerInventory, setWholesalerInventory] = useState<Product[]>(MOCK_PRODUCTS);

  // Simple Router
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
    alert(`Added ${product.minOrderQuantity} units to cart!`);
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
    alert('Order placed successfully!');
  };

  // Views
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
            <button onClick={() => navigate('products')} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold transition shadow-lg shadow-blue-900/20">
              Browse Wholesale Inventory
            </button>
            <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-8 py-4 rounded-xl font-bold border border-white/20 transition">
              Learn More
            </button>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Featured Categories</h2>
            <p className="text-slate-500">Explore bulk items across various industries</p>
          </div>
          <button onClick={() => navigate('products')} className="text-blue-600 font-bold hover:underline">View All</button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map(cat => (
            <div key={cat} className="bg-white border border-slate-200 p-6 rounded-2xl text-center hover:border-blue-400 hover:shadow-md transition cursor-pointer group">
              <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-50 group-hover:text-blue-600 transition">
                <i className={`fas fa-${cat.includes('Clothing') ? 'shirt' : cat.includes('Electronics') ? 'laptop' : 'boxes-stacked'} text-xl`}></i>
              </div>
              <span className="text-sm font-bold text-slate-700">{cat}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-900 py-20 px-4 rounded-t-[3rem]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-white">Why Businesses Choose WholeX?</h2>
            <p className="text-slate-400 text-lg">We provide a unified ecosystem for buyers and sellers to thrive in the modern bulk commerce landscape.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
              {[
                { icon: 'shield-check', title: 'Verified Sellers', desc: 'Trust is our foundation.' },
                { icon: 'truck-fast', title: 'Global Logistics', desc: 'Reliable shipping networks.' },
                { icon: 'bolt', title: 'Instant Invoicing', desc: 'Automated paperwork.' },
                { icon: 'chart-line', title: 'AI Insights', desc: 'Smart demand forecasting.' }
              ].map((item, i) => (
                <div key={i} className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-blue-600/20 text-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i className={`fas fa-${item.icon}`}></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{item.title}</h4>
                    <p className="text-xs text-slate-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&q=80&w=800" className="rounded-3xl shadow-2xl" alt="Wholesale operations" />
            <div className="absolute -bottom-6 -left-6 bg-blue-600 text-white p-8 rounded-2xl shadow-xl hidden md:block">
              <div className="text-4xl font-extrabold">2.5M+</div>
              <div className="text-sm opacity-80 uppercase font-bold tracking-widest">Products Listed</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const renderProducts = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Bulk Marketplace</h1>
          <p className="text-slate-500 font-medium">Browse over 25,000 active wholesale listings</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
            <input 
              type="text" 
              placeholder="Search products, wholesalers..." 
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
            onView={(id) => {
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
        
        <div className="grid lg:grid-cols-2 gap-12 bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
          <div className="space-y-4">
            <div className="aspect-square rounded-3xl overflow-hidden shadow-inner bg-slate-50">
              <img src={selectedProduct.imageUrl} className="w-full h-full object-cover" alt={selectedProduct.name} />
            </div>
            <div className="grid grid-cols-3 gap-4">
               {[1,2,3].map(i => (
                 <div key={i} className="aspect-square rounded-2xl overflow-hidden border border-slate-100 cursor-pointer">
                   <img src={`https://picsum.photos/seed/${selectedProduct.id + i}/200/200`} className="w-full h-full object-cover" />
                 </div>
               ))}
            </div>
          </div>

          <div className="flex flex-col h-full">
            <div className="flex items-center space-x-3 mb-4">
              <span className="bg-blue-100 text-blue-700 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">{selectedProduct.category}</span>
              <span className="text-slate-400 text-sm font-medium"><i className="fas fa-check-circle text-green-500 mr-1"></i> Verified Wholesaler</span>
            </div>
            
            <h1 className="text-4xl font-extrabold text-slate-900 mb-2 leading-tight">{selectedProduct.name}</h1>
            <p className="text-slate-500 text-lg mb-8 leading-relaxed">{selectedProduct.description}</p>
            
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

            <div className="space-y-6 flex-grow">
               <div className="flex items-center justify-between p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
                 <div className="flex items-center space-x-3">
                   <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600">
                     <i className="fas fa-warehouse"></i>
                   </div>
                   <div>
                     <p className="text-xs font-bold text-slate-400 uppercase">Wholesaler</p>
                     <p className="text-sm font-bold text-slate-800">{selectedProduct.wholesalerName}</p>
                   </div>
                 </div>
                 <button className="text-blue-600 text-sm font-bold hover:underline">View Profile</button>
               </div>

               <div className="p-4 border border-slate-100 rounded-2xl space-y-3">
                 <div className="flex justify-between text-sm">
                   <span className="text-slate-500 font-medium">Availability</span>
                   <span className="text-slate-900 font-bold">{selectedProduct.stock.toLocaleString()} units in stock</span>
                 </div>
                 <div className="flex justify-between text-sm">
                   <span className="text-slate-500 font-medium">Est. Lead Time</span>
                   <span className="text-slate-900 font-bold">5 - 7 Business Days</span>
                 </div>
               </div>
            </div>

            <div className="mt-12 flex space-x-4">
              <button 
                onClick={() => addToCart(selectedProduct)}
                className="flex-grow bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-blue-200 transition-all flex items-center justify-center space-x-3"
              >
                <i className="fas fa-cart-plus"></i>
                <span>Bulk Order Now</span>
              </button>
              <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-5 rounded-2xl transition">
                <i className="fas fa-heart"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderCart = () => (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold mb-8">Wholesale Cart</h1>
      {cart.length === 0 ? (
        <div className="bg-white p-12 rounded-[2.5rem] text-center border border-slate-100 shadow-sm">
          <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="fas fa-shopping-basket text-4xl text-slate-300"></i>
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-2">Your cart is empty</h3>
          <p className="text-slate-500 mb-8">Looks like you haven't added any bulk items yet.</p>
          <button onClick={() => navigate('products')} className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg">Start Browsing</button>
        </div>
      ) : (
        <div className="grid gap-6">
          <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
            {cart.map(item => (
              <div key={item.productId} className="flex flex-col sm:flex-row items-center p-6 border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition">
                <img src={item.product.imageUrl} className="w-24 h-24 rounded-2xl object-cover mb-4 sm:mb-0 sm:mr-6" />
                <div className="flex-grow text-center sm:text-left">
                  <h4 className="font-bold text-slate-900 text-lg">{item.product.name}</h4>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-2">{item.product.wholesalerName}</p>
                  <p className="text-blue-600 font-bold">${item.product.pricePerUnit.toFixed(2)} / unit</p>
                </div>
                <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                  <div className="flex items-center bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                    <button 
                      onClick={() => updateQuantity(item.productId, item.quantity - 10)}
                      className="px-3 py-2 text-slate-400 hover:text-blue-600 transition"
                    >
                      <i className="fas fa-minus text-xs"></i>
                    </button>
                    <input 
                      type="number" 
                      value={item.quantity} 
                      onChange={(e) => updateQuantity(item.productId, parseInt(e.target.value) || 0)}
                      className="w-16 text-center font-bold text-slate-800 outline-none"
                    />
                    <button 
                      onClick={() => updateQuantity(item.productId, item.quantity + 10)}
                      className="px-3 py-2 text-slate-400 hover:text-blue-600 transition"
                    >
                      <i className="fas fa-plus text-xs"></i>
                    </button>
                  </div>
                  <button onClick={() => removeFromCart(item.productId)} className="text-slate-300 hover:text-red-500 transition p-2">
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-xl">
             <div className="flex justify-between items-center mb-6">
               <span className="text-slate-400 font-bold uppercase tracking-[0.2em] text-xs">Subtotal</span>
               <span className="text-2xl font-black">${cart.reduce((s, i) => s + (i.product.pricePerUnit * i.quantity), 0).toFixed(2)}</span>
             </div>
             <div className="flex justify-between items-center mb-10 pt-6 border-t border-white/10">
               <span className="text-slate-400 font-bold uppercase tracking-[0.2em] text-xs">Est. Tax & Logistics</span>
               <span className="text-xl font-bold">$0.00 <span className="text-[10px] bg-green-500/20 text-green-400 px-2 py-1 rounded ml-2">PROMO APPLIED</span></span>
             </div>
             <button 
              onClick={checkout}
              className="w-full bg-blue-600 hover:bg-blue-700 py-5 rounded-2xl font-black text-xl transition-all shadow-lg shadow-blue-500/20"
             >
               Confirm Bulk Purchase
             </button>
             <p className="text-center text-[10px] text-slate-500 mt-6 font-bold uppercase tracking-widest">Secure transaction powered by WholeX Pay</p>
          </div>
        </div>
      )}
    </div>
  );

  const renderOrders = () => (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold mb-8">Order History</h1>
      <div className="space-y-6">
        {orders.length === 0 ? (
          <p className="text-slate-500 bg-white p-8 rounded-2xl border border-slate-100 text-center">No orders placed yet.</p>
        ) : (
          orders.map(order => (
            <div key={order.id} className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition">
              <div className="bg-slate-50 px-8 py-4 border-b border-slate-100 flex justify-between items-center">
                <div className="flex space-x-6">
                   <div>
                     <p className="text-[10px] font-bold text-slate-400 uppercase">Order ID</p>
                     <p className="text-sm font-bold text-slate-800">#{order.id}</p>
                   </div>
                   <div>
                     <p className="text-[10px] font-bold text-slate-400 uppercase">Placed On</p>
                     <p className="text-sm font-bold text-slate-800">{order.date}</p>
                   </div>
                </div>
                <span className="bg-blue-100 text-blue-700 text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full">
                  {order.status}
                </span>
              </div>
              <div className="p-8">
                {order.items.map(item => (
                  <div key={item.productId} className="flex items-center space-x-4 mb-4 last:mb-0">
                    <img src={item.product.imageUrl} className="w-16 h-16 rounded-xl object-cover" />
                    <div className="flex-grow">
                      <h5 className="font-bold text-slate-800">{item.product.name}</h5>
                      <p className="text-sm text-slate-500">{item.quantity} Units x ${item.product.pricePerUnit.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
                <div className="mt-8 pt-8 border-t border-slate-50 flex justify-between items-center">
                  <button className="text-blue-600 font-bold text-sm hover:underline">Download Bulk Invoice</button>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Order Total</p>
                    <p className="text-2xl font-black text-slate-900">${order.totalAmount.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  const renderWholesalerDashboard = () => (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900">Wholesaler Portal</h1>
          <p className="text-slate-500 font-medium">Manage your bulk inventory and distribution</p>
        </div>
        <button className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg flex items-center">
          <i className="fas fa-plus mr-2"></i> List New Bulk Product
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[
          { label: 'Total Revenue', value: '$124,500', trend: '+12%', icon: 'sack-dollar' },
          { label: 'Active Listings', value: '42', trend: '+2', icon: 'box-open' },
          { label: 'Pending Orders', value: '18', trend: '-5%', icon: 'clock' },
          { label: 'Total Stock', value: '12.4K', trend: '+800', icon: 'warehouse' }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <div className="flex justify-between items-start mb-4">
               <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                 <i className={`fas fa-${stat.icon} text-xl`}></i>
               </div>
               <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${stat.trend.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                 {stat.trend}
               </span>
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
            <p className="text-3xl font-black text-slate-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-50 flex justify-between items-center">
          <h3 className="font-extrabold text-xl text-slate-900">Active Inventory</h3>
          <div className="flex space-x-2">
            <button className="text-sm font-bold text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg transition">Export CSV</button>
            <button className="text-sm font-bold text-slate-500 hover:bg-slate-100 px-4 py-2 rounded-lg transition">Bulk Update</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                <th className="px-8 py-4">Product Name</th>
                <th className="px-8 py-4">Category</th>
                <th className="px-8 py-4">Bulk Price</th>
                <th className="px-8 py-4">Stock Level</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {wholesalerInventory.map(prod => (
                <tr key={prod.id} className="hover:bg-slate-50/50 transition">
                  <td className="px-8 py-5">
                    <div className="flex items-center space-x-3">
                      <img src={prod.imageUrl} className="w-10 h-10 rounded-lg object-cover" />
                      <span className="font-bold text-slate-800">{prod.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-sm text-slate-500">{prod.category}</td>
                  <td className="px-8 py-5 font-bold text-slate-900">${prod.pricePerUnit.toFixed(2)}</td>
                  <td className="px-8 py-5">
                    <div className="flex items-center space-x-2">
                      <div className="flex-grow bg-slate-100 h-1.5 rounded-full overflow-hidden max-w-[100px]">
                        <div 
                          className={`h-full rounded-full ${prod.stock > 500 ? 'bg-green-500' : 'bg-orange-500'}`} 
                          style={{ width: `${Math.min(100, (prod.stock / 2500) * 100)}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-bold text-slate-700">{prod.stock}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="bg-green-100 text-green-700 text-[10px] font-black uppercase px-3 py-1 rounded-full">Active</span>
                  </td>
                  <td className="px-8 py-5 text-center">
                    <button className="text-slate-400 hover:text-blue-600 mr-4"><i className="fas fa-edit"></i></button>
                    <button className="text-slate-400 hover:text-red-500"><i className="fas fa-trash"></i></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      <Navbar 
        currentRole={role} 
        setRole={setRole} 
        cartCount={cart.length} 
        onNavigate={navigate}
      />
      
      <main className="flex-grow pb-24">
        {currentPage === 'home' && renderHome()}
        {currentPage === 'products' && renderProducts()}
        {currentPage === 'product-detail' && renderProductDetail()}
        {currentPage === 'cart' && renderCart()}
        {currentPage === 'orders' && renderOrders()}
        {currentPage === 'dashboard' && (role === UserRole.WHOLESALER ? renderWholesalerDashboard() : renderOrders())}
      </main>

      <footer className="bg-white border-t border-slate-200 pt-20 pb-10 mt-auto">
         <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
               <div className="flex items-center space-x-2 mb-6">
                <div className="bg-blue-600 text-white p-1.5 rounded-lg">
                  <i className="fas fa-cubes-stacked text-xl"></i>
                </div>
                <span className="text-2xl font-bold tracking-tight text-slate-800">Whole<span className="text-blue-600">X</span></span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                The leading global B2B marketplace designed for the digital age of wholesale. Connecting manufacturers and retailers seamlessly.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition"><i className="fab fa-linkedin-in"></i></a>
                <a href="#" className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition"><i className="fab fa-twitter"></i></a>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-widest text-xs">For Buyers</h4>
              <ul className="space-y-4 text-sm text-slate-500 font-medium">
                <li><button onClick={() => navigate('products')} className="hover:text-blue-600">Browse Inventory</button></li>
                <li><a href="#" className="hover:text-blue-600">Wholesale Protection</a></li>
                <li><a href="#" className="hover:text-blue-600">Bulk Discounts</a></li>
                <li><a href="#" className="hover:text-blue-600">Logistics Tracking</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-widest text-xs">For Wholesalers</h4>
              <ul className="space-y-4 text-sm text-slate-500 font-medium">
                <li><a href="#" className="hover:text-blue-600">Start Selling</a></li>
                <li><a href="#" className="hover:text-blue-600">Inventory Management</a></li>
                <li><a href="#" className="hover:text-blue-600">Fulfilment Centers</a></li>
                <li><a href="#" className="hover:text-blue-600">Business Analytics</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-widest text-xs">Join Our Newsletter</h4>
              <p className="text-sm text-slate-500 mb-4">Get the latest wholesale trends and deals.</p>
              <div className="flex space-x-2">
                <input type="email" placeholder="Email" className="bg-slate-100 border-none rounded-lg px-4 py-2 text-sm w-full outline-none focus:ring-1 focus:ring-blue-600" />
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold">Join</button>
              </div>
            </div>
         </div>
         <div className="max-w-7xl mx-auto px-4 pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center text-xs text-slate-400 font-medium uppercase tracking-widest">
           <p>© 2024 WHOLEX INC. ALL RIGHTS RESERVED.</p>
           <div className="flex space-x-8 mt-4 md:mt-0">
             <a href="#" className="hover:text-slate-600">Privacy Policy</a>
             <a href="#" className="hover:text-slate-600">Terms of Service</a>
             <a href="#" className="hover:text-slate-600">Cookie Settings</a>
           </div>
         </div>
      </footer>

      <AIConsultant />
    </div>
  );
};

export default App;
