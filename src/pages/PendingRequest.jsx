import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import axios from 'axios';

const PendingRequest = () => {
    const [pendingRequests, setPendingRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // ব্যাকএন্ড থেকে সব পেন্ডিং রিকোয়েস্ট নিয়ে আসা
        axios.get('http://localhost:3000/all-pending-requests')
            .then(res => {
                setPendingRequests(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="text-center mt-20"><span className="loading loading-bars loading-lg"></span></div>;

    return (
        <div className="container mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold text-center mb-10 text-red-600 uppercase">Pending Donation Requests</h2>
            
            {pendingRequests.length === 0 ? (
                <p className="text-center text-xl">No pending requests at this moment.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pendingRequests.map((req) => (
                        <div key={req._id} className="card bg-base-100 shadow-xl border-t-4 border-red-500">
                            <div className="card-body">
                                <h2 className="card-title h1-heading text-2xl font-bold text-gray-700">{req.name}</h2>
                                <div className="space-y-2 mt-3">
                                    <p><strong>Blood Group:</strong> <span className="badge badge-error text-white font-bold">{req.blood}</span></p>
                                    <p><strong>Location:</strong> {req.upazila}, {req.district}</p>
                                    <p><strong>Date:</strong> {req.date || "N/A"}</p>
                                    <p><strong>Time:</strong> {req.time || "N/A"}</p>
                                </div>
                                <div className="card-actions justify-end mt-5">
                                                                                              
                                     <Link to={`/bloodrequest-details/${req._id}`}>
                                         <button className="border rounded-xl hover:text-red-700 hover:scale-101 hover:border-red-700 border-gray-600 nav-font cursor-pointer text-gray-600 p-txt px-5 min-h-0 h-10 flex items-center btn-sm">View Details</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PendingRequest;