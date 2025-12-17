import React from 'react';
import { Outlet } from 'react-router';
import Aside from '../pages/DashBoard/Aside/Aside';

const DashLayout = () => {
    return (
        <div className='flex' >
            <Aside ></Aside>
            <div className='ml-64 px-10 py-5 flex-1'>
               <Outlet></Outlet>
            </div>
            
        </div>
    );
};

export default DashLayout;