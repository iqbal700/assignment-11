import React from 'react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination'; 
import SliderContent from '../pages/SliderContent';

// Assets
import img1 from '../assets/slider02.png';
import img2 from '../assets/sllider01.jpg';
import img3 from '../assets/slider02.png';



const Slider = () => {
    // Shared content to avoid repetition
    const sharedText = {
        title: "Professional Blood Donation Services",
        description: "Your donation can save up to three lives. Join our community of heroes today.",
        buttonText: "Join as Donor",
        buttonText2: "Search Donor"
    };

    const images = [
        { id: 1, src: img1, alt: "Hero Image 1" },
        { id: 2, src: img2, alt: "Hero Image 2" },
        { id: 3, src: img3, alt: "Hero Image 3" },
    ];

    return (
        <div className="w-full overflow-hidden">
            <Swiper
                navigation={true}
                modules={[Navigation, Autoplay, Pagination]}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                loop={true}
                speed={1200}
                pagination={{ clickable: true }}
                className="mySwiper"
            >
                {images.map((img) => (
                    <SwiperSlide key={img.id}>
                        <SliderContent
                            {...sharedText} 
                            imageSrc={img.src}
                            imageAlt={img.alt}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Slider;