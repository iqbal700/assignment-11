import React, { useContext } from 'react';
import useAxios from '../Hooks/useAxios';
import { AuthContext } from '../Provider/AuthProvider';

const Donate = () => {
    const axiosInstance = useAxios();
    const { user } = useContext(AuthContext);

    const handleCheckout = (e) => {
        e.preventDefault();
        const donateAmount = e.target.donate.value;
        const donorEmail = user?.email;
        const donorName = user?.displayName;
        const donorPhone = e.target.phone.value; 
      

        const formData = {
            donateAmount,
            donorEmail,
            donorName,
            donorPhone,
        }

        axiosInstance.post('/create-payment-checkout', formData)
            .then(res => {
                console.log(res.data.url)
                if (res.data.url) {
                    window.location.href = res.data.url
                }
            })
            .catch(err => {
                console.error("Payment error:", err);
            });
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full bg-white shadow-2xl rounded-2xl p-8 border border-gray-100">
                <div className="text-center mb-8">
                    <h2 className="text-xl md:text-3xl font-extrabold text-red-600">Support Our Cause</h2>
                    <p className="text-gray-500 mt-2">Your contribution helps save lives.</p>
                </div>

                <form onSubmit={handleCheckout} className="space-y-5">
                    {/* Amount Input */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold text-gray-700">Donation Amount (USD)</span>
                        </label>
                        <input 
                            name="donate" 
                            type="number" 
                            required
                            placeholder="Enter amount (e.g. 10)" 
                            className="input input-bordered focus:border-red-500 focus:ring-1 focus:ring-red-500 w-full" 
                        />
                    </div>

                    {/* Display Only User Info */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-gray-500">Name</span>
                            </label>
                            <input 
                                type="text" 
                                value={user?.displayName || "Guest"} 
                                readOnly 
                                className="input input-bordered bg-gray-50 text-gray-400 text-sm cursor-not-allowed" 
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-gray-500">Email</span>
                            </label>
                            <input 
                                type="text" 
                                value={user?.email || ""} 
                                readOnly 
                                className="input input-bordered bg-gray-50 text-gray-400 text-sm cursor-not-allowed" 
                            />
                        </div>
                    </div>

                    {/* Additional Field: Phone Number */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold text-gray-700">Phone Number</span>
                        </label>
                        <input 
                            name="phone" 
                            type="tel" 
                            placeholder="Your contact number" 
                            className="input input-bordered focus:border-red-500 w-full" 
                        />
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="btn btn-error w-full text-white text-lg font-bold transition duration-300 hover:bg-red-700">
                        Donate Now
                    </button>
                    
                    <p className="text-xs text-center text-gray-400 mt-4">
                        Powered by Stripe Secure Payment
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Donate;

