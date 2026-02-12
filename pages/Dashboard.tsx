import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { UserRole, Listing } from '../types';
import { MOCK_LISTINGS, MOCK_REQUESTS, MOCK_USER_SELLER, MOCK_USER_BUYER, MOCK_USER_ADMIN } from '../constants';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import ListingCard from '../components/ListingCard';

interface DashboardProps {
  initialRole: UserRole;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ initialRole, onLogout }) => {
  const [role] = useState<UserRole>(initialRole);
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [listings, setListings] = useState(MOCK_LISTINGS);
  const [searchTerm, setSearchTerm] = useState('');

  // --- Constants for Charts ---
  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'];
  const CHART_DATA = [
    { name: 'Mon', sales: 4000, revenue: 2400 },
    { name: 'Tue', sales: 3000, revenue: 1398 },
    { name: 'Wed', sales: 2000, revenue: 9800 },
    { name: 'Thu', sales: 2780, revenue: 3908 },
    { name: 'Fri', sales: 1890, revenue: 4800 },
    { name: 'Sat', sales: 2390, revenue: 3800 },
    { name: 'Sun', sales: 3490, revenue: 4300 },
  ];
  const PIE_DATA = [
    { name: 'Plastic', value: 400 },
    { name: 'Metal', value: 300 },
    { name: 'Paper', value: 300 },
    { name: 'Electronics', value: 200 },
  ];

  // --- Components ---

  const StatCard = ({ title, value, icon, color, trend }: any) => (
    <motion.div 
      whileHover={{ y: -4 }}
      className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start justify-between"
    >
      <div>
         <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
         <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
         {trend && <p className="text-green-500 text-xs font-medium mt-2 flex items-center"><i className="fas fa-arrow-up mr-1"></i> {trend}</p>}
      </div>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg ${color}`}>
         <i className={`fas ${icon}`}></i>
      </div>
    </motion.div>
  );

  const SectionHeader = ({ title, action }: { title: string, action?: React.ReactNode }) => (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
      {action}
    </div>
  );

  // --- Views ---

  const AdminView = () => {
    switch (activeTab) {
      case 'users':
        return (
          <div>
            <SectionHeader title="User Management" action={
              <button className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-black transition-colors">Export CSV</button>
            }/>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
               <div className="p-4 border-b border-gray-100 flex gap-4">
                  <input type="text" placeholder="Search users..." className="bg-white border border-gray-200 text-sm rounded-lg px-4 py-2 w-64 outline-none focus:border-primary-500" />
                  <select className="bg-white border border-gray-200 text-sm rounded-lg px-4 py-2 outline-none">
                     <option>All Roles</option>
                     <option>Seller</option>
                     <option>Buyer</option>
                  </select>
               </div>
               <table className="w-full text-left">
                  <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold">
                     <tr>
                        <th className="px-6 py-4">User</th>
                        <th className="px-6 py-4">Role</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Joined</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                     {[MOCK_USER_SELLER, MOCK_USER_BUYER].map((u) => (
                       <tr key={u.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 flex items-center gap-3">
                             <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold text-xs">{u.name[0]}</div>
                             <div>
                                <p className="text-sm font-medium text-gray-900">{u.name}</p>
                                <p className="text-xs text-gray-500">{u.email}</p>
                             </div>
                          </td>
                          <td className="px-6 py-4"><span className="capitalize text-sm bg-gray-100 px-2 py-1 rounded text-gray-600">{u.role}</span></td>
                          <td className="px-6 py-4"><span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Active</span></td>
                          <td className="px-6 py-4 text-sm text-gray-500">Oct 24, 2023</td>
                          <td className="px-6 py-4 text-right">
                             <button className="text-gray-400 hover:text-red-500"><i className="fas fa-ban"></i></button>
                          </td>
                       </tr>
                     ))}
                  </tbody>
               </table>
            </div>
          </div>
        );
      case 'overview':
      default:
        return (
          <div className="space-y-6">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Users" value="1,240" icon="fa-users" color="bg-blue-50 text-blue-600" trend="+12% vs last month" />
                <StatCard title="Active Sellers" value="84" icon="fa-store" color="bg-purple-50 text-purple-600" />
                <StatCard title="Total Volume" value="45T" icon="fa-weight-hanging" color="bg-green-50 text-green-600" trend="+5% vs last week" />
                <StatCard title="Revenue" value="₦2.4M" icon="fa-chart-line" color="bg-amber-50 text-amber-600" trend="+18% vs last month" />
             </div>
             
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                   <h3 className="font-bold text-gray-800 mb-6">Platform Revenue</h3>
                   <div className="h-72">
                      <ResponsiveContainer width="100%" height="100%">
                         <AreaChart data={CHART_DATA}>
                            <defs>
                               <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                               </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                            <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                            <Tooltip />
                            <Area type="monotone" dataKey="revenue" stroke="#10b981" fillOpacity={1} fill="url(#colorRev)" />
                         </AreaChart>
                      </ResponsiveContainer>
                   </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                   <h3 className="font-bold text-gray-800 mb-6">Category Split</h3>
                   <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                         <PieChart>
                            <Pie data={PIE_DATA} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                               {PIE_DATA.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                               ))}
                            </Pie>
                            <Tooltip />
                         </PieChart>
                      </ResponsiveContainer>
                   </div>
                   <div className="flex justify-center gap-4 mt-4 text-xs text-gray-500">
                      {PIE_DATA.map((d, i) => (
                         <div key={i} className="flex items-center gap-1"><span className="w-2 h-2 rounded-full" style={{backgroundColor: COLORS[i]}}></span> {d.name}</div>
                      ))}
                   </div>
                </div>
             </div>
          </div>
        );
    }
  };

  const SellerView = () => {
    switch (activeTab) {
      case 'create-listing':
        return (
          <div className="max-w-3xl mx-auto">
             <SectionHeader title="Add New Listing" />
             <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                <div className="grid grid-cols-1 gap-6">
                   <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Listing Title</label>
                      <input type="text" className="w-full border-gray-200 bg-white rounded-lg focus:ring-primary-500" placeholder="e.g. 500kg Clear PET Bottles" />
                   </div>
                   <div className="grid grid-cols-2 gap-6">
                      <div>
                         <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                         <select className="w-full border-gray-200 bg-white rounded-lg focus:ring-primary-500">
                            <option>Plastic</option>
                            <option>Metal</option>
                            <option>Paper</option>
                         </select>
                      </div>
                      <div>
                         <label className="block text-sm font-medium text-gray-700 mb-2">Quantity (kg)</label>
                         <input type="number" className="w-full border-gray-200 bg-white rounded-lg focus:ring-primary-500" placeholder="100" />
                      </div>
                   </div>
                   <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Price per KG (₦)</label>
                      <input type="number" className="w-full border-gray-200 bg-white rounded-lg focus:ring-primary-500" placeholder="0.00" />
                   </div>
                   <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <textarea rows={4} className="w-full border-gray-200 bg-white rounded-lg focus:ring-primary-500" placeholder="Describe condition, pickup details..."></textarea>
                   </div>
                   <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center">
                      <i className="fas fa-cloud-upload-alt text-gray-400 text-3xl mb-3"></i>
                      <p className="text-sm text-gray-500">Drag and drop images here, or click to upload</p>
                   </div>
                   <div className="flex justify-end gap-3 pt-4">
                      <button onClick={() => setActiveTab('overview')} className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">Cancel</button>
                      <button className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 shadow-md">Publish Listing</button>
                   </div>
                </div>
             </div>
          </div>
        );
      case 'my-listings':
         return (
           <div>
              <SectionHeader title="My Listings" action={
                 <button onClick={() => setActiveTab('create-listing')} className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-primary-700 transition-colors shadow-md">
                    <i className="fas fa-plus mr-2"></i> Add Listing
                 </button>
              }/>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {listings.filter(l => l.sellerId === MOCK_USER_SELLER.id).map(l => (
                    <div key={l.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                       <div className="relative h-40">
                          <img src={l.imageUrl} className="w-full h-full object-cover" alt={l.title} />
                          <span className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 text-xs font-bold rounded text-gray-700 capitalize">{l.status}</span>
                       </div>
                       <div className="p-4">
                          <h3 className="font-bold text-gray-900 mb-1">{l.title}</h3>
                          <p className="text-sm text-gray-500 mb-4">{l.quantity} kg • ₦{l.pricePerKg}/kg</p>
                          <div className="flex gap-2">
                             <button className="flex-1 bg-gray-50 text-gray-600 py-2 rounded-lg text-xs font-bold hover:bg-gray-100">Edit</button>
                             <button className="flex-1 bg-red-50 text-red-600 py-2 rounded-lg text-xs font-bold hover:bg-red-100">Delete</button>
                          </div>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
         );
      case 'overview':
      default:
         return (
           <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Active Listings" value="12" icon="fa-boxes" color="bg-blue-50 text-blue-600" />
                <StatCard title="Pending Orders" value="5" icon="fa-clock" color="bg-amber-50 text-amber-600" />
                <StatCard title="Total Earnings" value="₦850k" icon="fa-wallet" color="bg-green-50 text-green-600" trend="+8%" />
                <StatCard title="Views" value="2.4k" icon="fa-eye" color="bg-purple-50 text-purple-600" />
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                 <h3 className="font-bold text-gray-800 mb-6">Earnings Performance</h3>
                 <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                       <BarChart data={CHART_DATA}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                          <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                          <Tooltip cursor={{fill: '#f9fafb'}} />
                          <Bar dataKey="sales" fill="#10b981" radius={[4, 4, 0, 0]} />
                       </BarChart>
                    </ResponsiveContainer>
                 </div>
              </div>
           </div>
         );
    }
  };

  const BuyerView = () => {
    switch (activeTab) {
      case 'marketplace':
        return (
          <div>
            <SectionHeader title="Marketplace" />
            <div className="flex flex-col md:flex-row gap-6">
               <div className="w-full md:w-64 flex-shrink-0 space-y-6">
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                     <h4 className="font-bold text-sm mb-3">Filters</h4>
                     <div className="space-y-2">
                        {['All', 'Plastic', 'Metal', 'Paper'].map(cat => (
                           <label key={cat} className="flex items-center space-x-2 cursor-pointer">
                              <input type="checkbox" className="rounded text-primary-600 focus:ring-primary-500" />
                              <span className="text-sm text-gray-600">{cat}</span>
                           </label>
                        ))}
                     </div>
                  </div>
               </div>
               <div className="flex-1">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                     {listings.map(l => (
                        <ListingCard key={l.id} listing={l} onClick={() => {}} />
                     ))}
                  </div>
               </div>
            </div>
          </div>
        );
      case 'overview':
      default:
        return (
           <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 <StatCard title="Total Orders" value="24" icon="fa-shopping-bag" color="bg-blue-50 text-blue-600" />
                 <StatCard title="Pending" value="2" icon="fa-truck" color="bg-amber-50 text-amber-600" />
                 <StatCard title="Saved Items" value="8" icon="fa-heart" color="bg-red-50 text-red-600" />
                 <StatCard title="Total Spent" value="₦340k" icon="fa-receipt" color="bg-gray-100 text-gray-600" />
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                 <div className="p-6 border-b border-gray-100">
                    <h3 className="font-bold text-gray-800">Recent Orders</h3>
                 </div>
                 <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold">
                       <tr>
                          <th className="px-6 py-4">Order ID</th>
                          <th className="px-6 py-4">Item</th>
                          <th className="px-6 py-4">Status</th>
                          <th className="px-6 py-4">Amount</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                       {MOCK_REQUESTS.filter(r => r.buyerId === MOCK_USER_BUYER.id).map(r => (
                          <tr key={r.id} className="hover:bg-gray-50">
                             <td className="px-6 py-4 text-xs font-mono text-gray-500">#{r.id}</td>
                             <td className="px-6 py-4 text-sm font-medium text-gray-900">{r.listingTitle}</td>
                             <td className="px-6 py-4"><span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">{r.status}</span></td>
                             <td className="px-6 py-4 text-sm font-bold text-gray-900">₦{r.totalPrice.toLocaleString()}</td>
                          </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      <Sidebar 
         role={role} 
         activeTab={activeTab} 
         onTabChange={setActiveTab} 
         isOpen={sidebarOpen}
         onCloseMobile={() => setSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-6 z-10">
           <div className="flex items-center">
             <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-500 hover:text-gray-700 mr-4">
                <i className="fas fa-bars text-xl"></i>
             </button>
             <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-1.5 w-64">
                <i className="fas fa-search text-gray-400 text-sm"></i>
                <input type="text" placeholder="Search..." className="bg-transparent border-none outline-none text-sm ml-2 w-full text-gray-700" />
             </div>
           </div>
           
           <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
                 <i className="fas fa-bell"></i>
                 <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="h-8 w-px bg-gray-200 mx-2"></div>
              <div className="flex items-center gap-3 cursor-pointer" onClick={onLogout}>
                 <div className="text-right hidden sm:block">
                    <p className="text-sm font-bold text-gray-800 leading-none">{role === UserRole.SELLER ? MOCK_USER_SELLER.name : role === UserRole.BUYER ? MOCK_USER_BUYER.name : MOCK_USER_ADMIN.name}</p>
                    <p className="text-xs text-gray-500 capitalize mt-1">{role}</p>
                 </div>
                 <img src={`https://ui-avatars.com/api/?name=${role}&background=random`} className="w-9 h-9 rounded-full border border-gray-200" alt="Avatar" />
              </div>
           </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 lg:p-8 scrollbar-hide">
           <AnimatePresence mode="wait">
             <motion.div
               key={`${role}-${activeTab}`}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -10 }}
               transition={{ duration: 0.2 }}
             >
               {role === UserRole.ADMIN && <AdminView />}
               {role === UserRole.SELLER && <SellerView />}
               {role === UserRole.BUYER && <BuyerView />}
             </motion.div>
           </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;