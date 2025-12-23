import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

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
        <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
            {/* Table Heading */}
            <div className="mb-6">
                <h2 className=" text-3xl text-gray-800">User Management</h2>
                <p className=" text-gray-500 font-medium">Manage and monitor all users of the blood donation system.</p>
            </div>

            <div className="overflow-x-auto rounded-xl border border-gray-200">
                <table className="table w-full border-collapse">
                    {/* head */}
                    <thead className="bg-gray-50 nav-font text-gray-700 uppercase text-sm">
                        <tr>
                            <th className="py-4 px-6">User Information</th>
                            <th className="py-4">Role</th>
                            <th className="py-4 text-center">Status</th>
                            <th className="py-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="p-txt text-gray-600">
                        {Array.isArray(users) && users.length > 0 ? (
                            users.map((user) => (
                                <tr key={user?._id} className="hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-none">
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-4">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12 ring-2 ring-red-50">
                                                    <img
                                                        src={user?.photoUrl || "https://i.ibb.co/dstsQwfJ/user_v1.png"}
                                                        alt={user?.name} 
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold text-gray-800 nav-font text-base">{user?.name}</div>
                                                <div className="text-sm opacity-70 p-txt font-normal">{user?.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="badge badge-ghost nav-font px-4 py-3 border-gray-200">
                                            {user?.role}
                                        </span>
                                    </td>
                                    <td className="text-center">
                                        <div className={`badge font-bold p-txt ${user?.status === 'active' ? 'badge-success bg-green-100 text-green-700 border-none' : 'badge-error bg-red-100 text-red-700 border-none'}`}>
                                            {user?.status}
                                        </div>
                                    </td>
                                    <td className="text-center">
                                        {user?.status === 'active' ? (
                                            <button 
                                                onClick={() => handleStatusChange(user?.email, 'blocked')} 
                                                className="btn btn-sm bg-red-50 text-red-600 hover:bg-red-600 hover:text-white border-none nav-font transition-all px-4"
                                            >
                                                Block User
                                            </button>
                                        ) : (
                                            <button 
                                                onClick={() => handleStatusChange(user?.email, 'active')} 
                                                className="btn btn-sm bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white border-none nav-font transition-all px-4"
                                            >
                                                Unblock User
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center py-10 font-bold p-txt text-gray-400">
                                    No users found in the database.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;


