import React from 'react';
import { Link } from 'react-router';
import { Globe, Droplet, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Heart, ArrowRight } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-black text-white pt-12 md:pt-16 pb-8 border-t-2 border-red-600">
            <div className="container mx-auto px-6 md:px-12">
                
                {/* Main Content Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-12 text-center sm:text-left">
                    
                    {/* Column 1: Brand & Mission */}
                    <div className="space-y-5 flex flex-col items-center sm:items-start">
                        <div className="flex items-center gap-2">
                            <div className="relative flex items-center">
                                <Globe size={32} className="text-gray-500" />
                                <Droplet size={16} className="fill-red-600 absolute left-3 top-3" />
                            </div>
                            <span className="logo text-2xl tracking-tighter">
                                Red<span className="text-red-600">Hero</span>
                            </span>
                        </div>
                        <p className="p-txt text-gray-400 text-sm leading-relaxed max-w-xs">
                            Connecting heroes with those in need. Our platform makes blood donation accessible, fast, and transparent to save lives every day.
                        </p>
                        <div className="flex gap-5 pt-2">
                            <Facebook size={20} className="text-red-600 hover:text-white cursor-pointer transition-all hover:scale-110" />
                            <Twitter size={20} className="text-red-600 hover:text-white cursor-pointer transition-all hover:scale-110" />
                            <Instagram size={20} className="text-red-600 hover:text-white cursor-pointer transition-all hover:scale-110" />
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="sm:pl-4">
                        <h4 className="nav-font text-sm md:text-lg mb-6 text-red-600 uppercase tracking-widest font-bold">Quick Links</h4>
                        <ul className="space-y-3 p-txt text-sm text-gray-400">
                            <li><Link to="/donate" className="hover:text-red-500 transition-colors flex items-center justify-center sm:justify-start gap-2">Donate Now</Link></li>
                            <li><Link to="/search-request" className="hover:text-red-500 transition-colors flex items-center justify-center sm:justify-start gap-2">Search Donor</Link></li>
                            <li><Link to="/dashboard/main" className="hover:text-red-500 transition-colors flex items-center justify-center sm:justify-start gap-2">User Dashboard</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Contact Info */}
                    <div>
                        <h4 className="nav-font text-sm md:text-lg mb-6 text-red-600 uppercase tracking-widest font-bold">Contact Us</h4>
                        <ul className="space-y-4 p-txt text-sm text-gray-400">
                            <li className="flex items-start justify-center sm:justify-start gap-3">
                                <MapPin size={18} className="text-red-600 shrink-0 mt-1" />
                                <span>123 Health Ave, Medical District,<br className="hidden md:block" /> Chittagong, Bangladesh</span>
                            </li>
                            <li className="flex items-center justify-center sm:justify-start gap-3">
                                <Phone size={18} className="text-red-600 shrink-0" />
                                <span>+880 1234-567890</span>
                            </li>
                            <li className="flex items-center justify-center sm:justify-start gap-3">
                                <Mail size={18} className="text-red-600 shrink-0" />
                                <span>support@redhero.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Newsletter */}
                    <div className="flex flex-col items-center sm:items-start">
                        <h4 className="nav-font text-sm md:text-lg mb-6 text-red-600 uppercase tracking-widest font-bold">Newsletter</h4>
                        <p className="p-txt text-[13px] text-gray-400 mb-4 max-w-xs">Stay updated on emergency blood requirements in your area.</p>
                        <div className="flex w-full max-w-sm">
                            <input 
                                type="email" 
                                placeholder="Your email" 
                                className="bg-gray-900 border-none px-4 py-2.5 w-full text-sm focus:ring-1 focus:ring-red-600 outline-none rounded-l-md"
                            />
                            <button className="bg-red-600 hover:bg-red-700 px-4 py-2.5 rounded-r-md transition-all active:scale-95">
                                <ArrowRight size={20} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-center">
                    <p className="text-[11px] md:text-xs p-txt text-gray-500">
                        © 2025 RedHero Donation. All Rights Reserved.
                    </p>
                    
                    <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                        <span>Made with</span>
                        <Heart size={14} className="fill-red-600 text-red-600 animate-pulse" />
                        <span>for humanity</span>
                    </div>

                    <div className="flex gap-6 text-[11px] md:text-xs p-txt text-gray-500">
                        <a href="#" className="hover:text-red-500 transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-red-500 transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;