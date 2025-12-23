import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import auth from '../Firebase/firebase.config';
import { AuthContext } from '../Provider/AuthProvider';
import { Mail, Lock, LogIn, HeartPulse } from 'lucide-react';

const Login = () => {
    const { setUser } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const pass = e.target.password.value;

        signInWithEmailAndPassword(auth, email, pass)
            .then((userCredential) => {
                setUser(userCredential.user);
                navigate(location.state || '/');
            })
            .catch(error => console.log(error));
    };

    

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="bg-white w-full max-w-md p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
                {/* Minimalist Branding */}
                <div className="text-center mb-10">
                    <HeartPulse className="w-12 h-12 text-rose-500 mx-auto mb-3" />
                    <h2 className="text-2xl font-bold text-gray-900">Donor Login</h2>
                    <p className="text-gray-500 mt-2">Enter your credentials to access your account</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email Field */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-700 ml-1">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input 
                                onChange={(e) => setEmail(e.target.value)} 
                                name='email' 
                                type="email" 
                                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-100 outline-none transition-all text-gray-900" 
                                placeholder="example@mail.com"
                                required
                            />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div className="space-y-1.5">
                        <div className="flex justify-between items-center px-1">
                            <label className="text-sm font-medium text-gray-700">Password</label>
                            <button 
                              
                                className="text-xs text-rose-600 hover:text-rose-700 font-medium cursor-pointer"
                            >
                                Forgot password?
                            </button>
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input 
                                name='password' 
                                type="password" 
                                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-100 outline-none transition-all text-gray-900" 
                                placeholder="password"
                                required
                            />
                        </div>
                    </div>

                    <button className="w-full bg-gray-900 hover:scale-x-101 text-white cursor-pointer font-semibold py-3.5 rounded-lg transition-all flex items-center justify-center gap-2 mt-2">
                        <LogIn className="w-5 h-5" />
                        Sign In
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                    <p className="text-gray-600">
                        New to the platform?{' '}
                        <Link to='/register' className="text-rose-600 font-semibold hover:underline underline-offset-4">
                            Create an account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;