import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { signOut } from 'firebase/auth';
import auth from '../Firebase/firebase.config';
import { Link, NavLink } from 'react-router';
import { Globe, Droplet, Menu, ClipboardList, HeartHandshake, Search, LayoutDashboard, LogOut, LogIn } from 'lucide-react';

const Navbar = () => {
    const { user } = useContext(AuthContext);
    const handleSignOut = () => signOut(auth);

    const links = [
        { name: 'Pending Request', path: '/pending-request', icon: <ClipboardList size={18} /> },
        { name: 'Donate Now', path: '/donate', icon: <HeartHandshake size={18} /> },
        { name: 'Search', path:'/search-request', icon: <Search size={18} /> },
    ];

    // অ্যাক্টিভ লিঙ্ক স্টাইল করার জন্য কমন ফাংশন
    const activeLinkStyles = ({ isActive }) => 
        `nav-font flex items-center gap-2 transition-all ${
            isActive 
            ? 'text-red-600 font-bold bg-red-50 lg:bg-transparent lg:border-b-2 lg:border-red-600 lg:rounded-none rounded-lg' 
            : 'text-gray-600 hover:text-red-600'
        }`;

    return (
        <nav className="fixed top-0 md:top-10 z-[100] w-full bg-white shadow-sm border-b border-gray-100 transition-all duration-300">
            <div className="navbar container mx-auto px-4 py-2">
                
                {/* --- Start Section --- */}
                <div className="navbar-start">
                    <div className="dropdown">
                        <button tabIndex={0} className="btn btn-ghost lg:hidden mr-1">
                            <Menu size={24} />
                        </button>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-1 p-4 shadow bg-white rounded-box w-60 gap-1 border border-gray-100">
                            {links.map((link) => (
                                <li key={link.path}>
                                    {/* মোবাইলের জন্যও NavLink ব্যবহার করা হয়েছে */}
                                    <NavLink to={link.path} className={activeLinkStyles}>
                                        {link.icon}
                                        {link.name}
                                    </NavLink>
                                </li>
                            ))}
                            <div className="divider my-1"></div>
                            <li>
                                <NavLink to='/dashboard/main' className={activeLinkStyles}>
                                    <LayoutDashboard size={18} />
                                    Dashboard
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    <Link to="/" className="flex items-center gap-2">
                        <div className="relative flex items-center">
                            <Globe size={34} className="text-gray-300" />
                            <Droplet size={18} className="fill-red-600 absolute left-3 top-3" />
                        </div>
                        <span className="logo text-2xl md:text-3xl text-gray-900">
                            Red<span className="text-red-600">Hero</span>
                        </span>
                    </Link>
                </div>

                {/* --- Center Section (Desktop) --- */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="flex gap-6">
                        {links.map((link) => (
                            <NavLink 
                                key={link.path} 
                                to={link.path} 
                                className={({ isActive }) => `nav-font flex items-center gap-2 pb-1 transition-all ${isActive ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-600 hover:text-red-600'}`}
                            >
                                {link.icon}
                                <span>{link.name}</span>
                            </NavLink>
                        ))}
                    </ul>
                </div>

                {/* --- End Section --- */}
                <div className="navbar-end gap-2">
                    <NavLink to='/dashboard/main' className={({ isActive }) => `hidden sm:flex items-center gap-1 nav-font transition-all ${isActive ? 'text-red-600' : 'text-gray-600 hover:text-red-600 mr-2'}`}>
                        <LayoutDashboard size={18} />
                        <span>Dashboard</span>
                    </NavLink>

                    {user ? (
                        <button 
                            onClick={handleSignOut} 
                            className="border rounded-xl hover:text-red-700 hover:border-red-700 border-gray-600 nav-font cursor-pointer text-gray-600 px-5 min-h-0 h-10 flex items-center gap-2 transition-all active:scale-95"
                        >
                            <LogOut size={18} />
                            <span>Logout</span> 
                        </button>
                    ) : (
                        <Link 
                            to='/login' 
                            className="border rounded-xl hover:text-red-700 hover:border-red-700 border-gray-600 nav-font cursor-pointer text-gray-600 px-5 min-h-0 h-10 flex items-center gap-2 transition-all active:scale-95"
                        >
                            <LogIn size={18} />
                            <span>Login</span>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;