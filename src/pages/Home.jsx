import React from 'react';
import Slider from '../Components/Slider';
import ContactSection from './ContactSection';
import FeaturesSection from './FeaturesSection';

const Home = () => {
    return (
        <div>
            <Slider></Slider>
            <FeaturesSection></FeaturesSection>
            <ContactSection></ContactSection>
        </div>
    );
};

export default Home;