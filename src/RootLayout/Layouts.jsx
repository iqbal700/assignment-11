import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../pages/Navbar';
import Footer from '../pages/Footer';
import SubNavbar from '../pages/SubNavbar';

const Layouts = () => {
    return (
        <div className='flex flex-col min-h-screen'>
            <SubNavbar></SubNavbar>
            <Navbar></Navbar>
                <div className='flex-1'>
                    <Outlet> </Outlet>
                </div>
            <Footer></Footer>
        </div>
    );
};

export default Layouts;