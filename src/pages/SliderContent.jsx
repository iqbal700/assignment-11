import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';

const SliderContent = ({ title, description, imageSrc, imageAlt, buttonText,buttonText2 }) => {
    
    const contentVariant = {
        initial: { x: -100, opacity: 0 },
        animate: { x: 0, opacity: 1 },
    };

    return (
        <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
            
            {/* Background Image: Full Width & Height */}
            <div className="absolute inset-0">
                <img 
                    src={imageSrc} 
                    alt={imageAlt} 
                    className="w-full h-full object-cover" 
                />
                {/* Dark Gradient Overlay for text readability */}
                <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-transparent"></div>
            </div>

            {/* Text Content: Positioned on top of the image */}
            <div className="container mx-auto h-full relative z-10 flex items-center">
                <motion.div 
                    key={imageSrc + "text"} 
                    className="md:w-2/3 lg:w-1/2 px-6 md:px-12 space-y-4"
                    variants={contentVariant}
                    initial="initial"
                    animate="animate"
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <p className="nav-font text-xl text-white tracking-wide">
                        {description}
                    </p>
                    <h2 className="h1-heading text-3xl md:text-5xl text-white leading-tight">
                        {title}
                    </h2>
                    
                    <div className='flex gap-2'>
                         <motion.button 
                        className="mt-6 px-10 py-4 hover:scale-102 cursor-pointer  bg-white text-red-600 font-bold rounded-full hover:bg-white hover:text-red-600 transition-all shadow-xl p-txt flex items-center gap-2"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                    >
                       <Link to={'/register'}><span>{buttonText}</span></Link>

                    </motion.button>

                     <motion.button 
                        className="mt-6 px-10 py-4 hover:scale-102 cursor-pointer  bg-red-600 text-white font-bold rounded-full transition-all shadow-xl p-txt flex items-center gap-2"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                    >
                       <Link to={'/search-request'} > <span>{buttonText2}</span> </Link> 

                    </motion.button>
                    </div>
                   

                </motion.div>
            </div>
        </div>
    );
};

export default SliderContent;

