import React, { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../Provider/AuthProvider';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import axios from 'axios';
import { updateProfile } from 'firebase/auth';
import auth from '../Firebase/firebase.config';
import { FaUserEdit, FaCamera, FaEnvelope, FaIdCard } from 'react-icons/fa';

const MyProfile = () => {
    const { user, setUser } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState(user?.photoURL);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        const form = e.target;
        const name = form.name.value;
        const imageFile = form.photo.files[0];
        let photoUrl = user?.photoURL;

        try {
            if (imageFile) {
                const formData = new FormData();
                formData.append('image', imageFile);
                const res = await axios.post(`https://api.imgbb.com/1/upload?key=a27afdcff8cf604bda9d440d54fea18b`, formData);
                photoUrl = res.data.data.display_url;
            }

            // Firebase profile up
            await updateProfile(auth.currentUser, { displayName: name, photoURL: photoUrl });
            
            // Database profile up
            const dbRes = await axiosSecure.patch(`/users/update-profile/${user?.email}`, { name, photoUrl });

            if (dbRes.data.modifiedCount > 0 || dbRes.data.matchedCount > 0) {
                setUser({ ...user, displayName: name, photoURL: photoUrl });
                Swal.fire({
                    icon: "success",
                    title: "Profile Updated",
                    text: "Your changes have been saved successfully!",
                    confirmButtonColor: '#dc2626'
                });
            }
        } catch (error) {
            console.error(error);
            Swal.fire("Error", "Something went wrong while updating.", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 md:p-12 bg-gray-50 min-h-screen flex justify-center items-start">
            <div className="max-w-3xl w-full">
                {/* Header */}
                <div className="mb-8 flex items-center gap-4">
                    <div className="p-3 bg-red-600 rounded-2xl shadow-lg shadow-red-200 text-white">
                        <FaUserEdit size={24} />
                    </div>
                    <div>
                        <h2 className="text-xl md:text-3xl font-black text-gray-900 h1-heading uppercase">Edit Profile</h2>
                        <p className="text-gray-500 p-txt">Update your personal information and profile picture</p>
                    </div>
                </div>

                <div className="bg-white rounded-4xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
                    <form onSubmit={handleUpdate} className="p-8 md:p-12">
                        
                        {/* Avatar Section */}
                        <div className="flex flex-col items-center mb-10">
                            <div className="relative group">
                                <div className="w-32 h-32 rounded-full ring-4 ring-red-50 p-1 overflow-hidden bg-gray-100 shadow-inner">
                                    <img 
                                        className="w-full h-full rounded-full object-cover" 
                                        src={preview || "https://i.ibb.co/dstsQwfJ/user_v1.png"} 
                                        alt="User Avatar" 
                                    />
                                </div>
                                <label className="absolute bottom-1 right-1 bg-red-600 p-2.5 rounded-full text-white cursor-pointer shadow-lg hover:bg-black transition-colors border-2 border-white">
                                    <FaCamera size={16} />
                                    <input 
                                        type="file" 
                                        name="photo" 
                                        className="hidden" 
                                        onChange={(e) => setPreview(URL.createObjectURL(e.target.files[0]))}
                                    />
                                </label>
                            </div>
                            <p className="mt-3 text-xs font-bold text-red-600 uppercase tracking-widest nav-font">Change Photo</p>
                        </div>

                        {/* Input Fields Container */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            
                            {/* Full Name */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider nav-font px-1">
                                    <FaIdCard className="text-red-500" /> Full Name
                                </label>
                                <input 
                                    name="name" 
                                    type="text" 
                                    defaultValue={user?.displayName} 
                                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/5 outline-none transition-all p-txt text-gray-800 font-medium" 
                                    required 
                                />
                            </div>

                            {/* Email (Read Only) */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider nav-font px-1">
                                    <FaEnvelope className="text-gray-400" /> Email (Permanent)
                                </label>
                                <input 
                                    type="email" 
                                    value={user?.email} 
                                    readOnly 
                                    className="w-full px-5 py-4 bg-gray-100 border border-gray-200 rounded-2xl text-gray-400 cursor-not-allowed outline-none p-txt font-medium" 
                                />
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-12 flex items-center gap-4">
                            <button 
                                type="submit" 
                                disabled={loading}
                                className={`flex-1 bg-red-600 hover:bg-black text-white font-black py-4 rounded-2xl transition-all duration-300 uppercase tracking-widest nav-font shadow-lg shadow-red-200 flex items-center justify-center gap-3 ${loading ? 'opacity-70 cursor-wait' : ''}`}
                            >
                                {loading ? (
                                    <>
                                        <span className="loading loading-spinner loading-sm"></span>
                                        Updating...
                                    </>
                                ) : 'Save Profile Changes'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;