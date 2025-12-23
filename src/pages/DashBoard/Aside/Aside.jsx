import React, { useContext, useState } from 'react';
import { FaHome, FaTachometerAlt, FaUserCircle, FaPlusCircle, FaListAlt, FaSignOutAlt, FaUserEdit, FaBars, FaTimes } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router';
import { AuthContext } from '../../../Provider/AuthProvider';
import { signOut } from 'firebase/auth';
import auth from '../../../Firebase/firebase.config';

const Aside = () => {
  const { role, user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false); // মোবাইল মেনু কন্ট্রোল করার জন্য
  const navigate = useNavigate();
  const location = useLocation();

  const sidebarStructure = [
    { id: 0, name: 'Home', icon: <FaHome />, path: '/', roles: ['admin', 'donor', 'volunteer'] },
    { id: 1, name: 'Dashboard', icon: <FaTachometerAlt />, path: '/dashboard/main', roles: ['admin', 'donor', 'volunteer'] },
    { id: 2, name: 'All Users', icon: <FaUserCircle />, path: '/dashboard/all-users', roles: ['admin', 'volunteer'] },
    { id: 3, name: 'Add Request', icon: <FaPlusCircle />, path: '/dashboard/add-request', roles: ['admin', 'donor', 'volunteer'] },
    { id: 4, name: 'My Request', icon: <FaListAlt />, path: '/dashboard/my-request', roles: ['admin', 'donor', 'volunteer'] },
    { id: 5, name: 'My Profile', icon: <FaUserEdit />, path: '/dashboard/my-profile', roles: ['admin', 'donor', 'volunteer'] },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false); // মোবাইল ডিভাইসে লিঙ্কে ক্লিক করলে মেনু বন্ধ হয়ে যাবে
  };

  const handlelogout = () => {
    signOut(auth).then(() => navigate('/login'));
  };

  return (
    <>
      {/* 1. Mobile Toggle Button - শুধু মোবাইলে দেখাবে */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-3 bg-red-600 text-white rounded-xl shadow-lg focus:outline-none"
        >
          {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {/* 2. Overlay - মোবাইলে মেনু খোলা থাকলে পেছনের অংশ অন্ধকার করার জন্য */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* 3. Aside Component */}
      <aside className={`
        fixed top-0 left-0 h-screen z-40 bg-white text-gray-700 shadow-xl border-r border-gray-100 flex flex-col justify-between transition-all duration-300
        ${isOpen ? 'translate-x-0 w-72' : '-translate-x-full lg:translate-x-0 w-72'}
      `}>
        
        <div>
          {/* Brand/Logo Section */}
          <div className="p-6 mb-2 flex items-center space-x-3 bg-red-50/30">
            <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-200">
              <span className="text-white font-black text-xl">R</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-900 tracking-tight h1-heading">RedHero</span>
              <span className="text-[10px] uppercase tracking-widest text-red-600 font-bold nav-font">{role} Panel</span>
            </div>
          </div>

          {/* User Info Quick View */}
          <div className="mx-4 my-4 p-4 rounded-2xl bg-gray-50 flex items-center space-x-3 border border-gray-100">
              <img 
                className="w-11 h-11 rounded-full border-2 border-white shadow-sm object-cover" 
                src={user?.photoURL || "https://i.ibb.co/dstsQwfJ/user_v1.png"} 
                alt="profile" 
              />
              <div className="overflow-hidden">
                  <p className="text-sm font-bold text-gray-800 truncate p-txt">{user?.displayName}</p>
                  <p className="text-[11px] text-gray-500 truncate">{user?.email}</p>
              </div>
          </div>

          {/* Navigation */}
          <nav className="px-4 mt-4 overflow-y-auto max-h-[calc(100vh-250px)]">
            <ul className="space-y-1.5">
              {sidebarStructure
                .filter(item => item.roles.includes(role))
                .map(item => {
                  const isActive = location.pathname === item.path;
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => handleNavigation(item.path)}
                        className={`w-full flex items-center p-3 text-sm font-semibold rounded-xl transition-all duration-200 group nav-font ${
                          isActive 
                          ? 'bg-red-600 text-white shadow-md shadow-red-200' 
                          : 'text-gray-600 hover:bg-red-50 hover:text-red-600'
                        }`}
                      >
                        <span className={`text-lg mr-4 transition-transform duration-200 group-hover:scale-110 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-red-600'}`}>
                          {item.icon}
                        </span>
                        {item.name}
                      </button>
                    </li>
                  );
                })}
            </ul>
          </nav>
        </div>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-50">
          <button
            onClick={handlelogout}
            className="w-full flex items-center p-3 text-sm font-bold text-gray-500 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all duration-200 nav-font"
          >
            <FaSignOutAlt className="text-lg mr-4" />
            Logout System
          </button>
        </div>
      </aside>
    </>
  );
};

export default Aside;