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
        { name: 'Donation Request', path: '/donation-requests', icon: <ClipboardList size={18} /> },
        { name: 'Donate Now', path: '/donate', icon: <HeartHandshake size={18} /> },
        { name: 'Search', path: '/search-request', icon: <Search size={18} /> },
    ];

    return (
        <nav className="sticky top-0 z-50 w-full bg-white shadow-sm border-b border-gray-100">
            <div className="navbar container mx-auto px-4 py-2">
                
                {/* --- MOBILE VIEW: MENU & LOGO --- */}
                <div className="navbar-start">
                    <div className="dropdown">
                        <button tabIndex={0} className="btn btn-ghost lg:hidden mr-1">
                            <Menu size={24} />
                        </button>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow bg-white rounded-box w-60 gap-3">
                            {links.map((link) => (
                                <li key={link.path}>
                                    <Link to={link.path} className="nav-font flex items-center gap-2">
                                        <span className="text-red-600">{link.icon}</span>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
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

                {/* --- DESKTOP VIEW: LINKS WITH ICONS --- */}
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

                {/* --- END: ACTIONS --- */}
                <div className="navbar-end gap-2">
                    <Link to='/dashboard/main' className="hidden sm:flex items-center gap-1 nav-font text-gray-600 hover:text-red-600 mr-2">
                        <LayoutDashboard size={18} />
                        <span>Dashboard</span>
                    </Link>

                    {user ? (
                        <button 
                            onClick={handleSignOut} 
                            className="btn bg-red-600 hover:bg-red-700 text-white border-none p-txt px-5 min-h-0 h-10 flex items-center gap-2"
                        >
                            <LogOut size={18} />
                            <span>Logout</span>
                        </button>
                    ) : (
                        <Link 
                            to='/login' 
                            className="btn bg-red-600 hover:bg-red-700 text-white border-none p-txt px-5 min-h-0 h-10 flex items-center gap-2"
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