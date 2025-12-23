import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';

const SliderContent = ({ title, description, imageSrc, imageAlt, buttonText, buttonText2 }) => {
    
    const contentVariant = {
        initial: { y: 30, opacity: 0 },
        animate: { y: 0, opacity: 1 },
    };

    return (
        <div className="relative w-full h-[350px] sm:h-[450px] md:h-[550px] lg:h-[650px] overflow-hidden bg-gray-900">
            
            {/* Background Image Section */}
            <div className="absolute inset-0 w-full h-full">
                <img 
                    src={imageSrc} 
                    alt={imageAlt} 
                    className="w-full h-full object-cover object-center md:object-top lg:object-center" 
                />
                
               
                <div className="absolute inset-0 bg-linear-to-t md:bg-linear-to-r from-black/90 via-black/50 to-transparent"></div>
            </div>

            {/* Text Content */}
            <div className="container mx-auto h-full relative z-10 flex items-end md:items-center pb-10 md:pb-0">
                <motion.div 
                    key={imageSrc + "text"} 
                    className="w-full md:w-2/3 lg:w-3/5 px-6 md:px-12 space-y-3"
                    variants={contentVariant}
                    initial="initial"
                    animate="animate"
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <p className="nav-font text-sm md:text-xl text-red-500 font-bold tracking-widest uppercase">
                        Save Lives
                    </p>

                    <h2 className="h1-heading text-2xl sm:text-4xl md:text-5xl lg:text-7xl text-white leading-tight font-black">
                        {title}
                    </h2>

                    <p className="text-gray-200 text-xs md:text-lg max-w-md line-clamp-2 md:line-clamp-none">
                        {description}
                    </p>
                    
                    <div className='flex flex-wrap gap-3 pt-4'>
                         <Link to={'/register'}>
                            <button className="px-6 md:px-10 py-2.5 md:py-4 bg-red-600 text-white font-bold rounded-full hover:bg-red-700 transition-all shadow-xl text-xs md:text-base uppercase">
                                {buttonText}
                            </button>
                         </Link>

                         <Link to={'/search-request'}>
                            <button className="px-6 md:px-10 py-2.5 md:py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-black transition-all shadow-xl text-xs md:text-base uppercase">
                                {buttonText2}
                            </button>
                         </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default SliderContent;

