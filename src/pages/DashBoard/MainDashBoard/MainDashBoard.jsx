import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import { FaUsers, FaTint, FaHandHoldingHeart, FaClock, FaDollarSign } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import axios from 'axios';

const MainDashBoard = () => {
    const { user, role } = useContext(AuthContext);
    const [statsData, setStatsData] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStats = async () => {
         
            if (!user?.email || !role) return;

            try {
                setLoading(true);
                const token = localStorage.getItem('access-token');
                const baseUrl = 'https://assignment-backend-11.vercel.app'; 
                let url = role === 'admin' || role === 'volunteer' 
                    ? `${baseUrl}/admin-stats` 
                    : `${baseUrl}/user-stats/${user?.email}`;

                const response = await axios.get(url, {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                });
                
                setStatsData(response.data);
            } catch (error) {
                console.error("Error fetching stats:", error?.response?.data || error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [user?.email, role]);

   
    const stats = [
        { id: 1, label: 'Total Users', value: statsData?.totalUsers || 0, icon: <FaUsers />, color: 'bg-blue-500', roles: ['admin'] },
        { id: 2, label: 'Total Requests', value: statsData?.totalRequests || 0, icon: <FaTint />, color: 'bg-red-500', roles: ['admin', 'volunteer'] },
        { id: 3, label: 'My Requests', value: statsData?.myTotalRequests || 0, icon: <FaHandHoldingHeart />, color: 'bg-green-500', roles: ['donor'] },
        { id: 4, label: 'Pending', value: (role === 'donor' ? statsData?.myPendingRequests : statsData?.pendingRequests) || 0, icon: <FaClock />, color: 'bg-amber-500', roles: ['admin', 'donor', 'volunteer'] },
        { id: 5, label: 'Donations', value: `$${statsData?.totalDonation || 0}`, icon: <FaDollarSign />, color: 'bg-emerald-600', roles: ['admin'] }
    ];

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-bars loading-lg text-red-600"></span>
            </div>
        );
    }

    return (
        <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
            <div className="mb-8">
                <h2 className="text-3xl font-black text-gray-900 uppercase">
                    Welcome, <span className="text-red-600">{user?.displayName || 'User'}</span>
                </h2>
                <p className="text-gray-500 mt-1">Summary of your {role} dashboard.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats
                    .filter(stat => stat.roles.includes(role))
                    .map(stat => (
                        <div key={stat.id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center space-x-4">
                            <div className={`${stat.color} p-4 rounded-2xl text-white text-xl`}>
                                {stat.icon}
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase">{stat.label}</p>
                                <h3 className="text-2xl font-black text-gray-900">{stat.value}</h3>
                            </div>
                        </div>
                    ))}
            </div>

            <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Shortcuts</h3>
                    <div className="space-y-3">
                        <button onClick={() => navigate('/dashboard/add-request')} className="w-full text-left p-4 bg-red-50 text-red-600 rounded-xl font-bold text-sm hover:bg-red-600 hover:text-white transition-all">
                            Create New Blood Request
                        </button>
                        <button onClick={() => navigate('/dashboard/my-profile')} className="w-full text-left p-4 bg-gray-50 text-gray-600 rounded-xl font-bold text-sm hover:bg-gray-200 transition-all">
                            Update My Profile
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainDashBoard;


