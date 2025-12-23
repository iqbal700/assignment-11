import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const MyRequest = () => {
    const [totalRequest, setTotalRequest] = useState(0);
    const [itemPerPage, setItemPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [myRequest, setMyRequest] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure.get(`/my-request?page=${currentPage - 1}&size=${itemPerPage}`)
            .then(res => {
                setMyRequest(res.data.request || []);
                setTotalRequest(res.data.totalRequest || 0);
            })
            .catch(err => console.error(err));
    }, [axiosSecure, currentPage, itemPerPage]);

    const numOfPages = Math.ceil(totalRequest / itemPerPage);
    const pages = [...Array(numOfPages).keys()].map(e => e + 1);

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };
    
    const handleNext = () => {
        if (currentPage < pages.length) setCurrentPage(currentPage + 1);
    };

    return (
        <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
            <div className="max-w-6xl mx-auto bg-white shadow-md rounded-xl overflow-hidden border border-gray-100">
                
                {/* Header Section */}
                <div className="bg-white border-b border-gray-100 p-6">
                    <h2 className="text-2xl font-bold text-gray-800">My Blood Requests</h2>
                    <p className="text-gray-500 text-sm">Track and manage your created donation requests.</p>
                </div>

                {/* Responsive Table Container */}
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        {/* Table Head */}
                        <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider">
                            <tr>
                                <th className="py-4">#</th>
                                <th className="py-4">Recipient Name</th>
                                <th className="py-4">District</th>
                                <th className="py-4">Blood Group</th>
                                <th className="py-4 text-center">Status</th>
                            </tr>
                        </thead>
                        
                        {/* Table Body */}
                        <tbody className="text-gray-700">
                            {myRequest.length > 0 ? (
                                myRequest.map((request, index) => (
                                    <tr key={request._id} className="hover:bg-blue-50/50 transition-colors border-b border-gray-50 last:border-none">
                                        <th className="font-medium text-gray-400">
                                            {(currentPage * itemPerPage) + (index + 1) - itemPerPage}
                                        </th>
                                        <td className="font-semibold text-gray-800">{request.name}</td>
                                        <td>{request.district}</td>
                                        <td>
                                            <span className="badge badge-error badge-outline font-bold">
                                                {request.blood}
                                            </span>
                                        </td>
                                        <td className="text-center">
                                            <span className={`badge badge-sm ${
                                                request.request === 'pending' ? 'badge-warning' : 
                                                request.request === 'inprogress' ? 'badge-info text-white' : 'badge-success text-white'
                                            }`}>
                                                {request.request}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center py-20 text-gray-400 italic">
                                        No requests found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Section */}
                <div className="p-6 bg-white border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="text-sm text-gray-500">
                        Showing page <span className="font-semibold text-gray-800">{currentPage}</span> of {numOfPages || 1}
                    </div>
                    
                    <div className="flex items-center gap-2">
                        <button 
                            onClick={handlePrev} 
                            disabled={currentPage === 1}
                            className="btn btn-sm btn-outline border-gray-300 text-gray-600 disabled:bg-gray-50"
                        >
                            Previous
                        </button>
                        
                        <div className="hidden sm:flex gap-1">
                            {pages.map(page => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`btn btn-sm ${
                                        page === currentPage 
                                        ? 'bg-blue-600 hover:bg-blue-700 text-white border-none' 
                                        : 'btn-ghost text-gray-600'
                                    }`}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>

                        <button 
                            onClick={handleNext} 
                            disabled={currentPage === pages.length || pages.length === 0}
                            className="btn btn-sm btn-outline border-gray-300 text-gray-600 disabled:bg-gray-50"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyRequest;