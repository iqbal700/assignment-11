import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from '../Provider/AuthProvider';
import axios from 'axios';
import useAxiosSecure from '../Hooks/useAxiosSecure';



const BloodRequestDetails = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [details, setDetails] = useState({});
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    console.log(details)

    useEffect(() => {
        // রিকোয়েস্টের ডিটেইলস লোড করা
        axios.get(`http://localhost:3000/request-details/${id}`)
            .then(res => setDetails(res.data))
    }, [id]);

    const handleConfirmDonation = (e) => {
        e.preventDefault();
        
       // Api call for request update 
        axiosSecure.patch(`/request/accept/${id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire("Success!", "You have accepted this donation request.", "success");
                    document.getElementById('donation_modal').close(); 
                    navigate('/pending-request'); 
                }
            })
    };

    return (
        <div className="container mt-30 mx-auto p-5 my-10">
            <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-lg overflow-hidden border">
                <div className="bg-red-500 p-4 text-white text-center">
                    <h2 className="md:text-2xl text-xl font-bold uppercase">Donation Request Details</h2>
                </div>
                
                {/* information all about request */}
                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <p><strong>Recipient Name:</strong> {details.name}</p>
                    <p><strong>Blood Group:</strong> <span className="text-red-600 font-bold">{details.blood}</span></p>
                    <p><strong>District:</strong> {details.district}</p>
                    <p><strong>Upazila:</strong> {details.upazila}</p>
                    <p><strong>Status:</strong> <span className="badge badge-warning uppercase">{details.request}</span></p>
                    <p><strong>Created At:</strong> {new Date(details.createdAt).toLocaleDateString()}</p>
                </div>

                {/* ডোনেট বাটন */}
                <div className="p-8 text-center border-t">
                    <button 
                        onClick={() => document.getElementById('donation_modal').showModal()}
                        className="btn btn-error text-white px-10"
                        disabled={details.request === 'inprogress'} 
                    >
                        {details.request === 'inprogress' ? "Already In Progress" : "Donate Now"}
                    </button>
                </div>
            </div>


  {/* // ==-==  modal section here ==-==  // */}
        
     <dialog id="donation_modal" className="modal modal-middle sm:modal-middle transition-all duration-300">
            <div className="modal-box p-0 overflow-hidden border-none shadow-2xl rounded-2xl">
            
                <div className="bg-linear-to-r from-red-600 to-red-500 py-6 px-8">
                    <h3 className="font-bold text-2xl text-white text-center tracking-wide uppercase">
                        Confirm Your Donation
                    </h3>
                    <p className="text-red-100 text-center text-sm mt-1">
                        Thank you for being a hero!
                    </p>
                </div>

                {/* Form Body */}
                <form onSubmit={handleConfirmDonation} className="p-8 space-y-6 bg-white">
                    <div className="space-y-4">
                        {/* Donor Name Field */}
                        <div className="form-control w-full">
                            <label className="label pb-1">
                                <span className="label-text font-bold text-gray-700 uppercase text-xs">Donor Name</span>
                            </label>
                            <input 
                                type="text" 
                                value={user?.displayName || "N/A"} 
                                readOnly 
                                className="input input-bordered w-full bg-gray-50 border-gray-200 text-gray-500 font-medium cursor-not-allowed focus:outline-none" 
                            />
                        </div>

                        {/* Donor Email Field */}
                        <div className="form-control w-full">
                            <label className="label pb-1">
                                <span className="label-text font-bold text-gray-700 uppercase text-xs">Donor Email</span>
                            </label>
                            <input 
                                type="email" 
                                value={user?.email || "N/A"} 
                                readOnly 
                                className="input input-bordered w-full bg-gray-50 border-gray-200 text-gray-500 font-medium cursor-not-allowed focus:outline-none" 
                            />
                        </div>
                    </div>

                
                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        <button 
                            type="submit" 
                            className="btn btn-success flex-1 text-white border-none shadow-lg hover:shadow-xl transition-all normal-case text-lg"
                        >
                            Confirm Donation
                        </button>
                        <button 
                            type="button" 
                            onClick={() => document.getElementById('donation_modal').close()} 
                            className="btn btn-ghost bg-gray-100 text-gray-600 hover:bg-gray-200 flex-1 border-none normal-case text-lg"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        
            <form method="dialog" className="modal-backdrop backdrop-blur-sm bg-black/30">
                <button>close</button>
            </form>
    </dialog>

     </div>
    );
};

export default BloodRequestDetails;

