import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Components/Navbar';
import SubNavbar from '../Components/SubNavbar';
import Footer from '../Components/Footer';

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