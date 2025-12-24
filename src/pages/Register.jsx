import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';
import { signOut, updateProfile } from 'firebase/auth';
import auth from '../Firebase/firebase.config';
import { MdOutlineBloodtype } from "react-icons/md";
import axios from 'axios';

const Register = () => {
    const { registerwithEmailPass, setUser } = useContext(AuthContext);
    const [districts, setDistricts] = useState([]);
    const [district, setDistrict] = useState('');
    const [upazilas, setUpazilas] = useState([]);
    const [upazila, setUpazila] = useState('');
    const [blood, setBlood] = useState('');
    const navigate = useNavigate();
    const handleSignOut = () => signOut(auth);

    useEffect(() => {
        axios.get('/upazila.json').then(res => setUpazilas(res.data.upazilas));
        axios.get('/district.json').then(res => setDistricts(res.data.districts));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const pass = form.password.value;
        const name = form.name.value;
        const photo = form.photoUrl.files[0];
        const role = form.role.value;

        if (pass.length < 6) return alert('Password must be 6 characters');

        try {
            const res = await axios.post(`https://api.imgbb.com/1/upload?&key=a27afdcff8cf604bda9d440d54fea18b`,
                { image: photo },
                { headers: { 'content-Type': 'multipart/form-data' } }
            );

            const photoUrl = res.data.data.display_url;
            const formData = { email, name, blood, role, photoUrl, district, upazila, status: 'active' };

            if (res.data.success) {
                const userCredential = await registerwithEmailPass(email, pass);
                await updateProfile(auth.currentUser, { displayName: name, photoURL: photoUrl });
                setUser(userCredential.user);
                await axios.post('https://assignment-backend-11.vercel.app/users', formData);
                handleSignOut();
                navigate('/login');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
       
        <div className="min-h-screen pt-20 md:pt-32 pb-12 bg-[url('https://images.unsplash.com/photo-1615461066159-fea0960485d5?q=80&w=2000')] bg-cover bg-fixed bg-center flex items-center justify-center px-4 relative">
            
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

            <div className="relative w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-gray-200">
                
                {/* Left Side: Branding */}
                <div className="md:w-5/12 bg-red-600 p-6 md:p-10 text-white flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-4 md:mb-8">
                            <MdOutlineBloodtype className="text-2xl md:text-4xl" />
                            <span className="nav-font text-xl md:text-2xl tracking-tight">RedHero</span>
                        </div>
                      
                        <h1 className="h1-heading text-xl md:text-3xl leading-tight mb-2 md:mb-4 text-white">Save Lives by Donating Blood.</h1>
                        <p className="p-txt text-red-50 text-xs md:text-sm">Join our network of heroes and help those in need.</p>
                    </div>

                    <div className="mt-6 md:mt-8 hidden sm:block"> 
                        <div className="flex -space-x-3 mb-4">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-red-600 bg-gray-200 overflow-hidden">
                                    <img src={`https://i.pravatar.cc/100?img=${i+15}`} alt="user" />
                                </div>
                            ))}
                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-red-600 bg-red-800 flex items-center justify-center text-[10px] md:text-xs font-bold text-white">
                                5k+
                            </div>
                        </div>
                        <p className="nav-font text-[10px] md:text-[12px] font-bold uppercase tracking-widest text-red-100">
                            Over 5,000 Donors Active
                        </p>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="md:w-7/12 p-6 lg:p-10 bg-white">
                    <div className="mb-4 md:mb-6">
                        <h2 className="h1-heading text-xl md:text-2xl text-gray-900">Create Account</h2>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                            <div className="space-y-1">
                                <label className="nav-font text-[10px] md:text-xs text-gray-500 uppercase tracking-wide">Full Name</label>
                                <input name="name" type="text" placeholder="Your Name" className="w-full px-3 py-2 md:px-4 md:py-2 bg-gray-50 border border-gray-300 rounded focus:border-red-500 outline-none text-sm" required />
                            </div>
                            <div className="space-y-1">
                                <label className="nav-font text-[10px] md:text-xs text-gray-500 uppercase tracking-wide">Email Address</label>
                                <input name="email" type="email" placeholder="email@example.com" className="w-full px-3 py-2 md:px-4 md:py-2 bg-gray-50 border border-gray-300 rounded focus:border-red-500 outline-none text-sm" required />
                            </div>
                        </div>

                      
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
                            <div>
                                <label className="nav-font text-[10px] md:text-xs text-gray-500 uppercase">Blood Group</label>
                                <select onChange={(e) => setBlood(e.target.value)} defaultValue="" className="w-full px-2 py-2 bg-gray-50 border border-gray-300 rounded text-sm outline-none appearance-none" required>
                                    <option value="" disabled>Select</option>
                                    {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(g => <option key={g} value={g}>{g}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="nav-font text-[10px] md:text-xs text-gray-500 uppercase">District</label>
                                <select onChange={(e) => setDistrict(e.target.value)} defaultValue="" className="w-full px-2 py-2 bg-gray-50 border border-gray-300 rounded text-sm outline-none appearance-none" required>
                                    <option value="" disabled>District</option>
                                    {districts.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="nav-font text-[10px] md:text-xs text-gray-500 uppercase">Upazila</label>
                                <select onChange={(e) => setUpazila(e.target.value)} defaultValue="" className="w-full px-2 py-2 bg-gray-50 border border-gray-300 rounded text-sm outline-none appearance-none" required>
                                    <option value="" disabled>Upazila</option>
                                    {upazilas.map(u => <option key={u.id} value={u.name}>{u.name}</option>)}
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                             <div>
                                <label className="nav-font text-[10px] md:text-xs text-gray-500 uppercase">Role</label>
                                <select name="role" defaultValue="" className="w-full px-3 py-2 md:px-4 md:py-2 bg-gray-50 border border-gray-300 rounded text-sm outline-none appearance-none" required>
                                    <option value="" disabled>Select Role</option>
                                    <option value="donor">Donor</option>
                                    <option value="volunteer">Volunteer</option>
                                </select>
                            </div>
                            <div>
                                <label className="nav-font text-[10px] md:text-xs text-gray-500 uppercase">Profile Photo</label>
                                <input name="photoUrl" type="file" className="w-full px-3 py-1.5 md:py-2 bg-gray-50 border border-gray-300 rounded text-[10px] md:text-xs cursor-pointer file:mr-2 file:py-1 file:px-2 file:border-0 file:text-xs file:bg-red-50 file:text-red-700 hover:file:bg-red-100" required />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="nav-font text-[10px] md:text-xs text-gray-500 uppercase tracking-wide">Password</label>
                            <input name="password" type="password" placeholder="••••••••" className="w-full px-3 py-2 md:px-4 md:py-2 bg-gray-50 border border-gray-300 rounded focus:border-red-500 outline-none text-sm" required />
                        </div>

                        <button className="nav-font w-full bg-red-600 hover:bg-black text-white font-bold py-2.5 md:py-3 rounded transition-all uppercase text-xs md:text-sm tracking-widest mt-2 shadow-lg active:scale-95">
                            Register Now
                        </button>
                    </form>

                    <div className="mt-4 md:mt-6 text-center">
                        <p className="p-txt text-gray-600 text-xs md:text-sm">
                            Already have an account? <Link to="/login" className="text-red-600 font-bold hover:underline">Login</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
