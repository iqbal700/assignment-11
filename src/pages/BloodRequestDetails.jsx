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
                <div className="bg-red-600 p-4 text-white text-center">
                    <h2 className="text-2xl font-bold uppercase">Donation Request Details</h2>
                </div>
                
                {/* রিকোয়েস্টের সকল ইনফরমেশন */}
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
                        disabled={details.request === 'inprogress'} // অলরেডি ইন প্রগ্রেস থাকলে ডিজেবল
                    >
                        {details.request === 'inprogress' ? "Already In Progress" : "Donate Now"}
                    </button>
                </div>
            </div>

            {/* ডোনেশন কনফার্মেশন মডাল */}
            <dialog id="donation_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg border-b pb-2">Confirm Your Donation</h3>
                    <form onSubmit={handleConfirmDonation} className="mt-4 space-y-4">
                        <div className="form-control">
                            <label className="label">Donor Name</label>
                            <input type="text" value={user?.displayName} readOnly className="input input-bordered bg-gray-100" />
                        </div>
                        <div className="form-control">
                            <label className="label">Donor Email</label>
                            <input type="email" value={user?.email} readOnly className="input input-bordered bg-gray-100" />
                        </div>
                        
                        <div className="modal-action">
                            <button type="submit" className="btn btn-success text-white">Confirm Donation</button>
                            <button type="button" onClick={() => document.getElementById('donation_modal').close()} className="btn">Cancel</button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default BloodRequestDetails;