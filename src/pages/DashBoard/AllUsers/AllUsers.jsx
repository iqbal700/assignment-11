import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { UserX, UserCheck, Shield, Mail } from 'lucide-react';

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [users, setUsers] = useState([]);

    const fetchUsers = () => {
        axiosSecure.get('/users')
            .then(res => {
                setUsers(res.data);
            })
            .catch(err => console.error(err));
    }

    useEffect(() => {
        fetchUsers();
    }, [axiosSecure]);

    const handleStatusChange = (email, status) => {
        axiosSecure.patch(`/update/users/status?email=${email}&status=${status}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        title: "Updated!",
                        text: `User is now ${status}`,
                        icon: "success",
                        timer: 1500,
                        showConfirmButton: false
                    });
                    fetchUsers();
                }
            });
    }

    return (
        <div className="p-4 md:p-6 bg-white rounded-2xl shadow-sm border border-gray-100 min-h-screen">
            {/* Table Heading */}
            <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">User Management</h2>
                <p className="text-sm md:text-base text-gray-500 font-medium mt-1">Manage and monitor all users of the blood donation system.</p>
            </div>

            {/* Desktop Table View (Hidden on Mobile) */}
            <div className="hidden lg:block overflow-x-auto rounded-xl border border-gray-200">
                <table className="table w-full border-collapse">
                    <thead className="bg-gray-50 nav-font text-gray-700 uppercase text-xs md:text-sm">
                        <tr>
                            <th className="py-4 px-6">User Information</th>
                            <th className="py-4">Role</th>
                            <th className="py-4 text-center">Status</th>
                            <th className="py-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="p-txt text-gray-600">
                        {users.length > 0 ? (
                            users.map((user) => (
                                <tr key={user?._id} className="hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-none">
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-4">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12 ring-2 ring-red-50">
                                                    <img src={user?.photoUrl || "https://i.ibb.co/dstsQwfJ/user_v1.png"} alt={user?.name} />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold text-gray-800 nav-font text-base">{user?.name}</div>
                                                <div className="text-sm opacity-70 flex items-center gap-1"><Mail size={12} /> {user?.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="badge badge-ghost nav-font px-4 py-3 border-gray-200">
                                            {user?.role}
                                        </span>
                                    </td>
                                    <td className="text-center">
                                        <div className={`badge font-bold p-txt ${user?.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} border-none`}>
                                            {user?.status}
                                        </div>
                                    </td>
                                    <td className="text-center">
                                        <button 
                                            onClick={() => handleStatusChange(user?.email, user?.status === 'active' ? 'blocked' : 'active')} 
                                            className={`btn btn-sm border-none nav-font transition-all px-4 ${user?.status === 'active' ? 'bg-red-50 text-red-600 hover:bg-red-600 hover:text-white' : 'bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white'}`}
                                        >
                                            {user?.status === 'active' ? 'Block User' : 'Unblock User'}
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="4" className="text-center py-10 text-gray-400">No users found.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Mobile Card View (Hidden on Desktop) */}
            <div className="lg:hidden grid grid-cols-1 gap-4">
                {users.length > 0 ? (
                    users.map((user) => (
                        <div key={user?._id} className="bg-gray-50 rounded-xl p-5 border border-gray-100 space-y-4 shadow-sm">
                            <div className="flex items-center gap-4">
                                <img className="w-14 h-14 rounded-full object-cover ring-2 ring-white shadow-sm" src={user?.photoUrl || "https://i.ibb.co/dstsQwfJ/user_v1.png"} alt="" />
                                <div className="overflow-hidden">
                                    <h3 className="font-bold text-gray-800 truncate">{user?.name}</h3>
                                    <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                                </div>
                            </div>
                            
                            <div className="flex justify-between items-center bg-white p-3 rounded-lg border border-gray-200">
                                <div>
                                    <p className="text-[10px] uppercase text-gray-400 font-bold">Role</p>
                                    <div className="flex items-center gap-1 text-sm font-semibold text-gray-700">
                                        <Shield size={14} className="text-red-600" /> {user?.role}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] uppercase text-gray-400 font-bold">Status</p>
                                    <span className={`text-xs font-bold ${user?.status === 'active' ? 'text-green-600' : 'text-red-600'}`}>
                                        {user?.status.toUpperCase()}
                                    </span>
                                </div>
                            </div>

                            <button 
                                onClick={() => handleStatusChange(user?.email, user?.status === 'active' ? 'blocked' : 'active')} 
                                className={`w-full py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                                    user?.status === 'active' 
                                    ? 'bg-red-100 text-red-600 active:bg-red-600 active:text-white' 
                                    : 'bg-blue-100 text-blue-600 active:bg-blue-600 active:text-white'
                                }`}
                            >
                                {user?.status === 'active' ? <><UserX size={16}/> Block User</> : <><UserCheck size={16}/> Unblock User</>}
                            </button>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-10 text-gray-400">No users found.</div>
                )}
            </div>
        </div>
    );
};

export default AllUsers;

