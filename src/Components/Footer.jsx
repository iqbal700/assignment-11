import React from 'react';
import { Link } from 'react-router';
import { Globe, Droplet, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Heart, ArrowRight } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-black text-white pt-16 pb-8 border-t border-red-600">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    
                    {/* Column 1: Brand & Mission */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="relative flex items-center">
                                <Globe size={32} className="text-gray-500" />
                                <Droplet size={16} className="fill-red-600 absolute left-3 top-3" />
                            </div>
                            <span className="logo text-2xl tracking-tighter">
                                Red<span className="text-red-600">Hero</span>
                            </span>
                        </div>
                        <p className="p-txt text-gray-400 text-sm leading-relaxed">
                            Connecting heroes with those in need. Our platform makes blood donation accessible, fast, and transparent to save lives every day.
                        </p>
                        <div className="flex gap-4 pt-2">
                            <Facebook size={20} className="text-red-600 hover:text-white cursor-pointer transition-colors" />
                            <Twitter size={20} className="text-red-600 hover:text-white cursor-pointer transition-colors" />
                            <Instagram size={20} className="text-red-600 hover:text-white cursor-pointer transition-colors" />
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h4 className="nav-font text-lg mb-6 text-red-600 uppercase tracking-widest">Quick Links</h4>
                        <ul className="space-y-3 p-txt text-sm">
                            <li><Link to="/donate" className="hover:text-red-500 hover:underline underline-offset-4 flex items-center gap-2">Donate Now</Link></li>
                            <li><Link to="/search-request" className="hover:text-red-500 hover:underline underline-offset-4 flex items-center gap-2">Search Donor</Link></li>
                            <li><Link to="/dashboard/main" className="hover:text-red-500 hover:underline underline-offset-4 flex items-center gap-2">User Dashboard</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Contact Info */}
                    <div>
                        <h4 className="nav-font text-lg mb-6 text-red-600 uppercase tracking-widest">Contact Us</h4>
                        <ul className="space-y-4 p-txt text-sm">
                            <li className="flex items-start gap-3">
                                <MapPin size={18} className="text-red-600 shrink-0" />
                                <span className="text-gray-400">123 Health Ave, Medical District,<br /> Chittagong, Bangladesh</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={18} className="text-red-600 shrink-0" />
                                <span className="text-gray-400">+880 1234-567890</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={18} className="text-red-600 shrink-0" />
                                <span className="text-gray-400">support@redhero.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Newsletter */}
                    <div>
                        <h4 className="nav-font text-lg mb-6 text-red-600 uppercase tracking-widest">Newsletter</h4>
                        <p className="p-txt text-xs text-gray-400 mb-4">Stay updated on emergency blood requirements in your area.</p>
                        <div className="flex">
                            <input 
                                type="email" 
                                placeholder="Your email" 
                                className="bg-gray-900 border-none px-4 py-2 w-full text-sm focus:ring-1 focus:ring-red-600 outline-none rounded-l"
                            />
                            <button className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded-r transition-colors">
                                <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs p-txt text-gray-500">
                    <p>© 2025 RedHero Donation. All Rights Reserved.</p>
                    <div className="flex items-center gap-1">
                        <span>Made with</span>
                        <Heart size={14} className="fill-red-600 text-red-600 animate-pulse" />
                        <span>for humanity</span>
                    </div>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white">Privacy Policy</a>
                        <a href="#" className="hover:text-white">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;