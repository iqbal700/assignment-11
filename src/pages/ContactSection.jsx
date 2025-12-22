import React from 'react';
import { HiOutlineMail, HiOutlinePhone, HiOutlineUser } from "react-icons/hi";
import doctorImg from '../assets/doctor.png'

const ContactSection = () => {
    return (
        <section className=" bg-gray-50 overflow-hidden">
            <div className="container mx-auto px-4 md:px-12 lg:px-20">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    
                    {/* Left Side: Contact Form */}
                    <div className="w-full lg:w-1/2 space-y-8">
                        <div>
                            <p className="nav-font text-red-600 font-bold uppercase tracking-widest text-sm mb-2">
                                Get In Touch
                            </p>
                            <h2 className="h1-heading text-4xl md:text-5xl text-gray-900 leading-tight">
                                Contact Us For Any <br /> <span className="text-red-600">Blood Requests</span>
                            </h2>
                            <p className="p-txt text-gray-600 mt-4 max-w-md">
                                Have questions? Our team is here to help you 24/7. Reach out to us and we'll respond as soon as possible.
                            </p>
                        </div>

                        <form className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="relative">
                                    <HiOutlineUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input 
                                        type="text" 
                                        placeholder="Your Name" 
                                        className="p-txt w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:border-red-500 outline-none transition-all shadow-sm"
                                    />
                                </div>
                                <div className="relative">
                                    <HiOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input 
                                        type="email" 
                                        placeholder="Email Address" 
                                        className="p-txt w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:border-red-500 outline-none transition-all shadow-sm"
                                    />
                                </div>
                            </div>

                            <div className="relative">
                                <HiOutlinePhone className="absolute left-3 top-3 text-gray-400" />
                                <input 
                                    type="text" 
                                    placeholder="Phone Number" 
                                    className="p-txt w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:border-red-500 outline-none transition-all shadow-sm"
                                />
                            </div>

                            <div className="relative">
                                <textarea 
                                    rows="4" 
                                    placeholder="How can we help you?" 
                                    className="p-txt w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:border-red-500 outline-none transition-all shadow-sm resize-none"
                                ></textarea>
                            </div>

                            <button className="nav-font w-full md:w-max px-10 py-4 bg-red-600 hover:bg-black text-white font-bold rounded-lg transition-all shadow-lg shadow-red-200 uppercase tracking-widest active:scale-95">
                                Send Message
                            </button>
                        </form>
                    </div>

                    {/* Right Side: Doctor Image Placeholder */}
                    <div className="w-full lg:w-1/2 relative">
                        <div className="relative w-full aspect-4/5 rounded-2xl overflow-hidden flex items-center justify-center group cursor-pointer">
                            <img src={doctorImg} alt="doctor" />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ContactSection;

