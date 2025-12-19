import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { signOut } from 'firebase/auth';
import auth from '../Firebase/firebase.config';
import { Link } from 'react-router';

const Navbar = () => {
   
    const {user} = useContext(AuthContext)

    console.log('this is user:', user)

    const handleSignOut = () => {
        signOut(auth)
    }


    return (
        <div>
            <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                </div>
                <ul
                    tabIndex="-1"
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                    <li><a>Pending Request</a></li>
                    <li><a>Search</a></li>
                    <li> <Link to={'/donate'}>Donate</Link> </li>
                </ul>
                </div>
                <a className="btn btn-ghost text-xl">daisyUI</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                 <li><a>Pending Request</a></li>
                 <li><a>Search</a></li>
                 <li> <Link to={'/donate'}>Donate</Link> </li>
                </ul>
            </div>
            <div className="navbar-end">
                <Link  to='/dashboard/main'>
                  <button className="btn mr-3 btn-primary">Dashboard</button>
                </Link>
               

                {
                    user ?  <button onClick={handleSignOut} className="btn">Logout</button> :  <Link to={'/login'} className="btn"> Login </Link> 
                }
               
            </div>
            </div>
        </div>
    );
};

export default Navbar;