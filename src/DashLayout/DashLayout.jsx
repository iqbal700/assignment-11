import React from 'react';
import { Outlet } from 'react-router';
import Aside from '../pages/DashBoard/Aside/Aside';

const DashLayout = () => {
    return (
        <div className='flex min-h-screen bg-gray-50'>
            <Aside />
            <div className='flex-1 w-full lg:ml-72 transition-all duration-300'>
            
                <div className='px-4 md:px-10 py-5 mt-16 lg:mt-5'>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default DashLayout;