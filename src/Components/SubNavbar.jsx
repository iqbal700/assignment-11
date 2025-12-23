import React from 'react';
import { Phone, Mail, Facebook, Instagram, Twitter } from 'lucide-react';

const SubNavbar = () => {
    return (
        <div className="bg-black fixed top-0 left-0 w-full z-110 text-white py-3 px-4 md:px-12 hidden md:flex flex-col md:flex-row justify-between items-center text-sm">
            
            {/* Left Side: Contact Info */}
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                    <Phone size={16} className="text-red-600" />
                    <span className="hover:text-red-500 cursor-pointer">+1 (234) 567-890</span>
                </div>
                <div className="flex items-center gap-2">
                    <Mail size={16} className="text-red-600" />
                    <span className="hover:text-red-500 cursor-pointer">donate@lifeblood.org</span>
                </div>
            </div>

            {/* Right Side: Social Media */}
            <div className="flex items-center gap-4 mt-2 md:mt-0">
                <span className="font-semibold uppercase tracking-wider text-xs">Follow Us:</span>
                <div className="flex gap-3">
                    <Facebook size={18} className="text-red-500 hover:text-white transition-colors cursor-pointer" />
                    <Instagram size={18} className="text-red-500 hover:text-white transition-colors cursor-pointer" />
                    <Twitter size={18} className="text-red-500 hover:text-white transition-colors cursor-pointer" />
                </div>
            </div>
        </div>
    );
};

export default SubNavbar;