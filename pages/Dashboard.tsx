import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { UserRole, Listing } from '../types';
import { MOCK_LISTINGS, MOCK_REQUESTS, MOCK_USER_SELLER, MOCK_USER_BUYER, MOCK_USER_ADMIN } from '../constants';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import ListingCard from '../components/ListingCard';
import OrderCard from '../components/OrderCard';
import OrderStatusBadge from '../components/OrderStatusBadge';
import OrderTimeline from '../components/OrderTimeline';
import { MOCK_ORDERS, MOCK_SAVED_ITEMS, MOCK_CONVERSATIONS, MOCK_SELLER_LISTINGS, MOCK_SELLER_ORDERS, MOCK_PLATFORM_USERS, MOCK_ADMIN_LISTINGS, MOCK_ADMIN_ORDERS, MOCK_ADMIN_PAYMENTS } from '../constants';
import SellerListingForm from '../components/SellerListingForm';

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
  const COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444'];
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
      className="bg-secondary-800 p-6 rounded-xl shadow-lg border border-secondary-700 flex items-start justify-between hover:border-primary-600"
    >
      <div>
         <p className="text-secondary-400 text-sm font-medium mb-1">{title}</p>
         <h3 className="text-2xl font-bold text-secondary-50">{value}</h3>
         {trend && <p className="text-primary-400 text-xs font-medium mt-2 flex items-center"><i className="fas fa-arrow-up mr-1"></i> {trend}</p>}
      </div>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg ${color}`}>
         <i className={`fas ${icon}`}></i>
      </div>
    </motion.div>
  );

  const SectionHeader = ({ title, action }: { title: string, action?: React.ReactNode }) => (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <h2 className="text-2xl font-bold text-secondary-50">{title}</h2>
      {action}
    </div>
  );

  // --- Views ---

  const AdminView = () => {
    switch (activeTab) {
      case 'listings':
        return (
          <div>
            <SectionHeader title="Platform Listings" action={
              <div className="flex gap-2">
                <select className="bg-secondary-700 border border-secondary-600 text-secondary-50 text-sm rounded-lg px-3 py-2 outline-none">
                  <option>All Status</option>
                  <option>Active</option>
                  <option>Pending</option>
                  <option>Sold</option>
                </select>
              </div>
            }/>
            <div className="bg-secondary-800 rounded-xl shadow-lg border border-secondary-700 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-secondary-700 text-secondary-400 text-xs uppercase font-semibold">
                  <tr>
                    <th className="px-6 py-4">Listing</th>
                    <th className="px-6 py-4">Seller</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Quantity</th>
                    <th className="px-6 py-4">Price/kg</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-secondary-700">
                  {MOCK_ADMIN_LISTINGS.map(listing => (
                    <tr key={listing.id} className="hover:bg-secondary-700/30">
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-secondary-50 line-clamp-1">{listing.title}</p>
                      </td>
                      <td className="px-6 py-4 text-sm text-secondary-50">{listing.seller}</td>
                      <td className="px-6 py-4">
                        <span className="text-xs bg-secondary-700 px-2 py-1 rounded text-secondary-300">{listing.category}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-secondary-50">{listing.quantity} kg</td>
                      <td className="px-6 py-4 text-sm font-semibold text-secondary-50">₦{listing.pricePerKg.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <OrderStatusBadge status={listing.status} />
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-secondary-400 hover:text-primary-400">
                          <i className="fas fa-eye text-sm"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'orders':
        return (
          <div>
            <SectionHeader title="Platform Orders" action={
              <select className="bg-secondary-700 border border-secondary-600 text-secondary-50 text-sm rounded-lg px-3 py-2 outline-none">
                <option>All Orders</option>
                <option>Pending</option>
                <option>Paid</option>
                <option>Shipped</option>
                <option>Delivered</option>
              </select>
            }/>
            <div className="bg-secondary-800 rounded-xl shadow-lg border border-secondary-700 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-secondary-700 text-secondary-400 text-xs uppercase font-semibold">
                  <tr>
                    <th className="px-6 py-4">Order ID</th>
                    <th className="px-6 py-4">Buyer</th>
                    <th className="px-6 py-4">Seller</th>
                    <th className="px-6 py-4">Item</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-secondary-700">
                  {MOCK_ADMIN_ORDERS.map(order => (
                    <tr key={order.id} className="hover:bg-secondary-700/30">
                      <td className="px-6 py-4 text-xs font-mono text-secondary-400">#{order.id}</td>
                      <td className="px-6 py-4 text-sm text-secondary-50">{order.buyer}</td>
                      <td className="px-6 py-4 text-sm text-secondary-50">{order.seller}</td>
                      <td className="px-6 py-4 text-sm text-secondary-50">{order.item}</td>
                      <td className="px-6 py-4 text-sm font-bold text-primary-400">₦{order.amount.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <OrderStatusBadge status={order.status} />
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-secondary-400 hover:text-primary-400 text-sm">
                          <i className="fas fa-ellipsis-h"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'payments':
        return (
          <div>
            <SectionHeader title="Payment Transactions" action={
              <select className="bg-secondary-700 border border-secondary-600 text-secondary-50 text-sm rounded-lg px-3 py-2 outline-none">
                <option>All Payments</option>
                <option>Completed</option>
                <option>Processing</option>
                <option>Pending</option>
                <option>Failed</option>
              </select>
            }/>
            <div className="bg-secondary-800 rounded-xl shadow-lg border border-secondary-700 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-secondary-700 text-secondary-400 text-xs uppercase font-semibold">
                  <tr>
                    <th className="px-6 py-4">Transaction ID</th>
                    <th className="px-6 py-4">Seller</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Method</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-secondary-700">
                  {MOCK_ADMIN_PAYMENTS.map(payment => (
                    <tr key={payment.id} className="hover:bg-secondary-700/30">
                      <td className="px-6 py-4 text-xs font-mono text-secondary-400">{payment.id}</td>
                      <td className="px-6 py-4 text-sm text-secondary-50">{payment.seller}</td>
                      <td className="px-6 py-4 text-sm font-bold text-primary-400">₦{payment.amount.toLocaleString()}</td>
                      <td className="px-6 py-4 text-sm text-secondary-50">{payment.method}</td>
                      <td className="px-6 py-4">
                        <OrderStatusBadge status={payment.status} />
                      </td>
                      <td className="px-6 py-4 text-sm text-secondary-400">{payment.date}</td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-secondary-400 hover:text-primary-400 text-sm">
                          <i className="fas fa-download"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'users':
        return (
          <div>
            <SectionHeader title="User Management" action={
              <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">Export CSV</button>
            }/>
            <div className="bg-secondary-800 rounded-xl shadow-lg border border-secondary-700 overflow-hidden">
               <div className="p-4 border-b border-secondary-700 flex gap-4">
                  <input type="text" placeholder="Search users..." className="bg-secondary-700 border border-secondary-600 text-secondary-50 text-sm rounded-lg px-4 py-2 flex-1 outline-none focus:border-primary-500" />
                  <select className="bg-secondary-700 border border-secondary-600 text-secondary-50 text-sm rounded-lg px-4 py-2 outline-none">
                     <option>All Roles</option>
                     <option>Seller</option>
                     <option>Buyer</option>
                  </select>
               </div>
               <table className="w-full text-left">
                  <thead className="bg-secondary-700 text-secondary-400 text-xs uppercase font-semibold">
                     <tr>
                        <th className="px-6 py-4">User</th>
                        <th className="px-6 py-4">Role</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Joined</th>
                        <th className="px-6 py-4">Activity</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-secondary-700">
                     {MOCK_PLATFORM_USERS.map((u) => (
                       <tr key={u.id} className="hover:bg-secondary-700/50">
                          <td className="px-6 py-4 flex items-center gap-3">
                             <div className="w-8 h-8 rounded-full bg-primary-500/30 text-primary-400 flex items-center justify-center font-bold text-xs">{u.name[0]}</div>
                             <div>
                                <p className="text-sm font-medium text-secondary-50">{u.name}</p>
                                <p className="text-xs text-secondary-400">{u.email}</p>
                             </div>
                          </td>
                          <td className="px-6 py-4"><span className="capitalize text-sm bg-secondary-700 px-2 py-1 rounded text-secondary-300">{u.role}</span></td>
                          <td className="px-6 py-4"><span className={`text-xs px-2 py-1 rounded-full border ${u.status === 'Active' ? 'bg-primary-500/30 text-primary-300 border-primary-500/50' : 'bg-secondary-700 text-secondary-400 border-secondary-600'}`}>{u.status}</span></td>
                          <td className="px-6 py-4 text-sm text-secondary-400">{u.joinedDate}</td>
                          <td className="px-6 py-4 text-sm text-secondary-50">
                             {u.role === 'Seller' ? `${u.totalListings} listings` : `${u.totalOrders} orders`}
                          </td>
                          <td className="px-6 py-4 text-right">
                             <button className="text-secondary-400 hover:text-primary-400"><i className="fas fa-ellipsis-h text-sm"></i></button>
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
                <div className="lg:col-span-2 bg-secondary-800 p-6 rounded-xl shadow-lg border border-secondary-700">
                   <h3 className="font-bold text-secondary-50 mb-6">Platform Revenue</h3>
                   <div className="h-72">
                      <ResponsiveContainer width="100%" height="100%">
                         <AreaChart data={CHART_DATA}>
                            <defs>
                               <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.2}/>
                                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                               </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                            <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                            <Tooltip contentStyle={{backgroundColor: '#1f2937', border: '1px solid #4b5563'}} />
                            <Area type="monotone" dataKey="revenue" stroke="#22c55e" fillOpacity={1} fill="url(#colorRev)" />
                         </AreaChart>
                      </ResponsiveContainer>
                   </div>
                </div>
                <div className="bg-secondary-800 p-6 rounded-xl shadow-lg border border-secondary-700">
                   <h3 className="font-bold text-secondary-50 mb-6">Category Split</h3>
                   <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                         <PieChart>
                            <Pie data={PIE_DATA} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                               {PIE_DATA.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                               ))}
                            </Pie>
                            <Tooltip contentStyle={{backgroundColor: '#1f2937', border: '1px solid #4b5563'}} />
                         </PieChart>
                      </ResponsiveContainer>
                   </div>
                   <div className="flex justify-center gap-4 mt-4 text-xs text-secondary-400">
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
             <div className="bg-secondary-800 rounded-xl shadow-lg border border-secondary-700 p-8">
                <SellerListingForm 
                  onSubmit={(data) => {
                    console.log('New listing:', data);
                    setActiveTab('my-listings');
                  }}
                  onCancel={() => setActiveTab('my-listings')}
                />
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
                    <div key={l.id} className="bg-secondary-800 rounded-xl border border-secondary-700 shadow-lg overflow-hidden hover:shadow-xl hover:border-primary-600 transition-all">
                       <div className="relative h-40">
                          <img src={l.imageUrl} className="w-full h-full object-cover" alt={l.title} />
                          <span className="absolute top-2 right-2 bg-secondary-900/90 backdrop-blur px-2 py-1 text-xs font-bold rounded text-secondary-200 capitalize">{l.status}</span>
                       </div>
                       <div className="p-4">
                          <h3 className="font-bold text-secondary-50 mb-1">{l.title}</h3>
                          <p className="text-sm text-secondary-400 mb-4">{l.quantity} kg • ₦{l.pricePerKg}/kg</p>
                          <div className="flex gap-2">
                             <button className="flex-1 bg-secondary-700 text-secondary-300 py-2 rounded-lg text-xs font-bold hover:bg-secondary-600">Edit</button>
                             <button className="flex-1 bg-accent-500/20 text-accent-400 py-2 rounded-lg text-xs font-bold hover:bg-accent-500/30 border border-accent-500/30">Delete</button>
                          </div>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
         );
      case 'orders':
        return (
          <div>
            <SectionHeader title="Orders Received" action={
              <select className="bg-secondary-700 border border-secondary-600 text-secondary-50 text-sm rounded-lg px-3 py-2 outline-none">
                <option>All Orders</option>
                <option>Pending</option>
                <option>Paid</option>
                <option>Shipped</option>
                <option>Delivered</option>
                <option>Completed</option>
              </select>
            }/>
            <div className="bg-secondary-800 rounded-xl shadow-lg border border-secondary-700 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-secondary-700 text-secondary-400 text-xs uppercase font-semibold">
                  <tr>
                    <th className="px-6 py-4">Order ID</th>
                    <th className="px-6 py-4">Buyer</th>
                    <th className="px-6 py-4">Item</th>
                    <th className="px-6 py-4">Quantity</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-secondary-700">
                  {MOCK_SELLER_ORDERS.map(order => (
                    <tr key={order.id} className="hover:bg-secondary-700/30">
                      <td className="px-6 py-4">
                        <span className="text-xs font-mono text-secondary-400">#{order.id}</span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-secondary-50">{order.buyerName}</p>
                      </td>
                      <td className="px-6 py-4 text-sm text-secondary-50">{order.itemName}</td>
                      <td className="px-6 py-4 text-sm text-secondary-50">{order.quantity} kg</td>
                      <td className="px-6 py-4 text-sm font-bold text-primary-400">₦{order.totalPrice.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <OrderStatusBadge status={order.status} />
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-secondary-400 hover:text-primary-400 text-sm">
                          <i className="fas fa-ellipsis-h"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'earnings':
        return (
          <div>
            <SectionHeader title="Earnings & Analytics" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <StatCard title="Total Revenue" value="₦187.5k" icon="fa-chart-line" color="bg-primary-500/20 text-primary-400" trend="+23% this month" />
              <StatCard title="Pending Payment" value="₦47.5k" icon="fa-clock-circle" color="bg-accent-500/20 text-accent-400" />
              <StatCard title="Total Sold" value="12,450 kg" icon="fa-boxes" color="bg-blue-500/20 text-blue-400" trend="+1,200 kg this week" />
              <StatCard title="Active Orders" value="8" icon="fa-truck" color="bg-purple-500/20 text-purple-400" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-secondary-800 rounded-xl shadow-lg border border-secondary-700 p-6">
                <h3 className="font-bold text-secondary-50 mb-6">Recent Transactions</h3>
                <div className="space-y-4">
                  {MOCK_SELLER_ORDERS.map((order, i) => (
                    <div key={i} className="flex justify-between items-center p-4 bg-secondary-700/30 rounded-lg hover:bg-secondary-700/50 transition">
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-secondary-50">{order.itemName}</p>
                        <p className="text-xs text-secondary-400">{order.buyerName}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-primary-400">+₦{order.totalPrice.toLocaleString()}</p>
                        <p className="text-xs text-secondary-400">{order.orderDate}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-secondary-800 rounded-xl shadow-lg border border-secondary-700 p-6">
                <h3 className="font-bold text-secondary-50 mb-6">Payment Methods</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-secondary-700/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <i className="fas fa-university text-primary-400 text-lg"></i>
                      <div>
                        <p className="text-sm font-semibold text-secondary-50">Bank Transfer</p>
                        <p className="text-xs text-secondary-400">Guaranteed Bank • ****2847</p>
                      </div>
                    </div>
                    <span className="text-xs bg-primary-500/20 text-primary-400 px-2 py-1 rounded">Default</span>
                  </div>
                  <button className="w-full p-4 border-2 border-dashed border-secondary-600 rounded-lg text-secondary-400 hover:border-primary-500 hover:text-primary-400 transition flex items-center justify-center gap-2">
                    <i className="fas fa-plus"></i> Add Payment Method
                  </button>
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
                <StatCard title="Active Listings" value="12" icon="fa-boxes" color="bg-blue-50 text-blue-600" />
                <StatCard title="Pending Orders" value="5" icon="fa-clock" color="bg-amber-50 text-amber-600" />
                <StatCard title="Total Earnings" value="₦850k" icon="fa-wallet" color="bg-green-50 text-green-600" trend="+8%" />
                <StatCard title="Views" value="2.4k" icon="fa-eye" color="bg-purple-50 text-purple-600" />
              </div>
              <div className="bg-secondary-800 p-6 rounded-xl shadow-lg border border-secondary-700">
                 <h3 className="font-bold text-secondary-50 mb-6">Earnings Performance</h3>
                 <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                       <BarChart data={CHART_DATA}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                          <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                          <Tooltip cursor={{fill: '#374151'}} contentStyle={{backgroundColor: '#1f2937', border: '1px solid #4b5563'}} />
                          <Bar dataKey="sales" fill="#22c55e" radius={[4, 4, 0, 0]} />
                       </BarChart>
                    </ResponsiveContainer>
                 </div>
              </div>
           </div>
         );
    }
  };

  const BuyerView = () => {
    const [selectedOrder, setSelectedOrder] = useState<any>(null);

    switch (activeTab) {
      case 'my-orders':
        return (
          <div>
            <SectionHeader title="My Orders" action={
              <div className="flex gap-2">
                <select className="bg-secondary-700 border border-secondary-600 text-secondary-50 text-sm rounded-lg px-3 py-2 outline-none">
                  <option>All Status</option>
                  <option>Pending</option>
                  <option>Paid</option>
                  <option>Shipped</option>
                  <option>Delivered</option>
                  <option>Completed</option>
                </select>
              </div>
            }/>
            {selectedOrder ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-secondary-800 rounded-xl border border-secondary-700 p-8"
              >
                <button 
                  onClick={() => setSelectedOrder(null)}
                  className="mb-6 flex items-center text-primary-400 hover:text-primary-300"
                >
                  <i className="fas fa-arrow-left mr-2"></i> Back to Orders
                </button>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-8">
                    <div>
                      <h2 className="text-2xl font-bold text-secondary-50 mb-6">Order #{selectedOrder.id}</h2>
                      <div className="space-y-6">
                        <div className="bg-secondary-700/30 border border-secondary-700 rounded-lg p-6">
                          <h3 className="font-bold text-secondary-50 mb-4">Item Details</h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-secondary-400">Item Name</p>
                              <p className="font-semibold text-secondary-50">{selectedOrder.itemName}</p>
                            </div>
                            <div>
                              <p className="text-sm text-secondary-400">Seller</p>
                              <p className="font-semibold text-secondary-50">{selectedOrder.sellerName}</p>
                            </div>
                            <div>
                              <p className="text-sm text-secondary-400">Quantity</p>
                              <p className="font-semibold text-secondary-50">{selectedOrder.quantity} kg</p>
                            </div>
                            <div>
                              <p className="text-sm text-secondary-400">Unit Price</p>
                              <p className="font-semibold text-secondary-50">₦{selectedOrder.pricePerUnit.toLocaleString()}</p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-secondary-700/30 border border-secondary-700 rounded-lg p-6">
                          <h3 className="font-bold text-secondary-50 mb-6">Order Timeline</h3>
                          <OrderTimeline steps={[
                            { status: 'Order Placed', timestamp: selectedOrder.orderDate, completed: true, current: false },
                            { status: 'Payment Confirmed', timestamp: '2023-10-16', completed: selectedOrder.status !== 'pending', current: selectedOrder.status === 'paid' },
                            { status: 'In Transit', timestamp: '2023-10-20', completed: ['shipped', 'delivered', 'completed'].includes(selectedOrder.status), current: selectedOrder.status === 'shipped' },
                            { status: 'Delivered', timestamp: selectedOrder.estimatedDelivery, completed: ['delivered', 'completed'].includes(selectedOrder.status), current: selectedOrder.status === 'delivered' },
                            { status: 'Completed', timestamp: '2023-10-29', completed: selectedOrder.status === 'completed', current: false }
                          ]} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="bg-secondary-700/30 border border-secondary-700 rounded-lg p-6">
                      <h3 className="font-bold text-secondary-50 mb-4">Order Summary</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-secondary-400">Status:</span>
                          <OrderStatusBadge status={selectedOrder.status} />
                        </div>
                        <div className="border-t border-secondary-600 pt-4">
                          <div className="flex justify-between mb-2">
                            <span className="text-secondary-400">Subtotal:</span>
                            <span className="text-secondary-50">₦{selectedOrder.totalPrice.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between mb-2">
                            <span className="text-secondary-400">Shipping:</span>
                            <span className="text-secondary-50">₦2,500</span>
                          </div>
                          <div className="border-t border-secondary-600 pt-4 flex justify-between">
                            <span className="font-bold text-secondary-50">Total:</span>
                            <span className="font-bold text-primary-400 text-lg">₦{(selectedOrder.totalPrice + 2500).toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-secondary-700/30 border border-secondary-700 rounded-lg p-6">
                      <h3 className="font-bold text-secondary-50 mb-4">Seller Info</h3>
                      <div className="space-y-3">
                        <p className="font-semibold text-secondary-50">{selectedOrder.sellerName}</p>
                        <button className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-lg text-sm font-semibold transition-colors">
                          <i className="fas fa-envelope mr-2"></i> Contact Seller
                        </button>
                        <button className="w-full bg-secondary-700 hover:bg-secondary-600 text-secondary-50 py-2 rounded-lg text-sm font-semibold transition-colors">
                          <i className="fas fa-file-download mr-2"></i> Invoice
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {MOCK_ORDERS.map(order => (
                  <OrderCard key={order.id} order={order} onClick={() => setSelectedOrder(order)} />
                ))}
              </div>
            )}
          </div>
        );
      case 'saved-items':
        return (
          <div>
            <SectionHeader title="Saved Items" action={
              <div className="text-secondary-400 text-sm">
                {MOCK_SAVED_ITEMS.length} items saved
              </div>
            }/>
            {MOCK_SAVED_ITEMS.length === 0 ? (
              <div className="bg-secondary-800 border border-secondary-700 rounded-xl p-16 text-center">
                <i className="fas fa-heart text-4xl text-secondary-600 mb-4"></i>
                <h3 className="text-lg font-bold text-secondary-50 mb-2">No Saved Items</h3>
                <p className="text-secondary-400">Start saving items to your favorites!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {MOCK_SAVED_ITEMS.map(item => (
                  <motion.div 
                    key={item.id}
                    whileHover={{ y: -4 }}
                    className="bg-secondary-800 rounded-xl border border-secondary-700 overflow-hidden shadow-lg hover:shadow-xl hover:border-primary-600 transition-all"
                  >
                    <img src={item.imageUrl} alt={item.title} className="w-full h-40 object-cover" />
                    <div className="p-5">
                      <h3 className="font-bold text-secondary-50 line-clamp-1 mb-2">{item.title}</h3>
                      <p className="text-sm text-secondary-400 mb-4">{item.sellerName}</p>
                      <div className="flex justify-between items-center mb-4 pb-4 border-b border-secondary-700">
                        <span className="text-xs text-secondary-500 bg-secondary-700/50 px-2 py-1 rounded">{item.materialType}</span>
                        <span className="text-sm font-semibold text-secondary-50">{item.quantity} kg</span>
                      </div>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-primary-400 font-bold">₦{item.pricePerKg.toLocaleString()}/kg</span>
                        <i className="fas fa-map-marker-alt text-secondary-500 text-xs"></i>
                      </div>
                      <div className="flex gap-2">
                        <button className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-lg text-xs font-bold transition-colors">
                          Buy Now
                        </button>
                        <button className="flex-1 bg-accent-500/20 hover:bg-accent-500/30 text-accent-400 py-2 rounded-lg text-xs font-bold border border-accent-500/30 transition-colors">
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        );
      case 'messages':
        return (
          <div>
            <SectionHeader title="Messages" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-96">
              <div className="bg-secondary-800 rounded-xl border border-secondary-700 overflow-hidden">
                <div className="p-4 border-b border-secondary-700">
                  <input type="text" placeholder="Search conversations..." className="w-full bg-secondary-700 border border-secondary-600 text-secondary-50 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary-500" />
                </div>
                <div className="overflow-y-auto h-80">
                  {MOCK_CONVERSATIONS.map(conv => (
                    <motion.div 
                      key={conv.id}
                      whileHover={{ backgroundColor: '#374151' }}
                      className="p-4 border-b border-secondary-700 cursor-pointer"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-secondary-50">{conv.sellerName}</h4>
                          <p className="text-sm text-secondary-400 line-clamp-1">{conv.lastMessage}</p>
                        </div>
                        {conv.unread && <span className="w-2 h-2 bg-primary-500 rounded-full mt-2"></span>}
                      </div>
                      <p className="text-xs text-secondary-500 mt-1">{conv.timestamp}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-2 bg-secondary-800 rounded-xl border border-secondary-700 flex flex-col">
                <div className="p-4 border-b border-secondary-700">
                  <h3 className="font-bold text-secondary-50">Select a conversation to view messages</h3>
                </div>
              </div>
            </div>
          </div>
        );
      case 'marketplace':
        return (
          <div>
            <SectionHeader title="Marketplace" />
            <div className="flex flex-col md:flex-row gap-6">
               <div className="w-full md:w-64 flex-shrink-0 space-y-6">
                  <div className="bg-secondary-800 p-4 rounded-xl shadow-lg border border-secondary-700">
                     <h4 className="font-bold text-sm text-secondary-50 mb-3">Filters</h4>
                     <div className="space-y-2">
                        {['All', 'Plastic', 'Metal', 'Paper'].map(cat => (
                           <label key={cat} className="flex items-center space-x-2 cursor-pointer">
                              <input type="checkbox" className="rounded text-primary-600 focus:ring-primary-500" />
                              <span className="text-sm text-secondary-300">{cat}</span>
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
                 <StatCard title="Total Orders" value="24" icon="fa-shopping-bag" color="bg-primary-500/20 text-primary-400" />
                 <StatCard title="Pending" value="2" icon="fa-truck" color="bg-accent-500/20 text-accent-400" />
                 <StatCard title="Saved Items" value="8" icon="fa-heart" color="bg-accent-600/20 text-accent-300" />
                 <StatCard title="Total Spent" value="₦340k" icon="fa-receipt" color="bg-secondary-700 text-secondary-300" />
              </div>
              <div className="bg-secondary-800 rounded-xl shadow-lg border border-secondary-700 overflow-hidden">
                 <div className="p-6 border-b border-secondary-700">
                    <h3 className="font-bold text-secondary-50">Recent Orders</h3>
                 </div>
                 <table className="w-full text-left">
                    <thead className="bg-secondary-700 text-secondary-400 text-xs uppercase font-semibold">
                       <tr>
                          <th className="px-6 py-4">Order ID</th>
                          <th className="px-6 py-4">Item</th>
                          <th className="px-6 py-4">Status</th>
                          <th className="px-6 py-4">Amount</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-secondary-700">
                       {MOCK_REQUESTS.filter(r => r.buyerId === MOCK_USER_BUYER.id).map(r => (
                          <tr key={r.id} className="hover:bg-secondary-700/50">
                             <td className="px-6 py-4 text-xs font-mono text-secondary-400">#{r.id}</td>
                             <td className="px-6 py-4 text-sm font-medium text-secondary-50">{r.listingTitle}</td>
                             <td className="px-6 py-4"><span className="text-xs bg-accent-500/20 text-accent-300 px-2 py-1 rounded-full border border-accent-500/30">{r.status}</span></td>
                             <td className="px-6 py-4 text-sm font-bold text-secondary-50">₦{r.totalPrice.toLocaleString()}</td>
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
    <div className="flex h-screen bg-secondary-900 font-sans">
      <Sidebar 
         role={role} 
         activeTab={activeTab} 
         onTabChange={setActiveTab} 
         isOpen={sidebarOpen}
         onCloseMobile={() => setSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="bg-secondary-800 border-b border-secondary-700 h-16 flex items-center justify-between px-6 z-10">
           <div className="flex items-center">
             <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-secondary-400 hover:text-secondary-300 mr-4">
                <i className="fas fa-bars text-xl"></i>
             </button>
             <div className="hidden md:flex items-center bg-secondary-700 rounded-lg px-3 py-1.5 w-64">
                <i className="fas fa-search text-secondary-500 text-sm"></i>
                <input type="text" placeholder="Search..." className="bg-transparent border-none outline-none text-sm ml-2 w-full text-secondary-50 placeholder-secondary-500" />
             </div>
           </div>
           
           <div className="flex items-center space-x-4">
              <button className="relative p-2 text-secondary-400 hover:text-secondary-300 transition-colors">
                 <i className="fas fa-bell"></i>
                 <span className="absolute top-1 right-1 w-2 h-2 bg-accent-500 rounded-full"></span>
              </button>
              <div className="h-8 w-px bg-secondary-700 mx-2"></div>
              <div className="flex items-center gap-3 cursor-pointer" onClick={onLogout}>
                 <div className="text-right hidden sm:block">
                    <p className="text-sm font-bold text-secondary-50 leading-none">{role === UserRole.SELLER ? MOCK_USER_SELLER.name : role === UserRole.BUYER ? MOCK_USER_BUYER.name : MOCK_USER_ADMIN.name}</p>
                    <p className="text-xs text-secondary-400 capitalize mt-1">{role}</p>
                 </div>
                 <img src={`https://ui-avatars.com/api/?name=${role}&background=random`} className="w-9 h-9 rounded-full border border-secondary-600" alt="Avatar" />
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
