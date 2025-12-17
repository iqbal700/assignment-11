import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import auth from '../Firebase/firebase.config';
import { AuthContext } from '../Provider/AuthProvider';
import { FcGoogle } from "react-icons/fc";

const Login = () => {

    const {setUser, handlegoogleSignIn} = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault()
        const email = e.target.email.value;
        const pass = e.target.password.value;
        
        signInWithEmailAndPassword(auth, email, pass)
            .then((userCredential) => {
                setUser(userCredential.user);
                navigate(location.state);
            }) 
            .catch(error => {
                console.log(error)
            })
    }


    const googleSignIn = () => {

        handlegoogleSignIn()
         .then(result => setUser(result.user))
          .catch(error => console.log(error))
          navigate(location.state);
    }

    const handleForget = () => {
     
        navigate(`/forgetpass/${email}`)
    }

   

    return (

           <div className="card mt-20 mx-auto bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <div className="card-body">
                   <form onSubmit={handleSubmit}>
                         <fieldset className="fieldset">
                            <label className="label">Email</label>
                            <input onChange={(e) => setEmail(e.target.value)}  name='email' type="email" className="input" placeholder="Email"/>                   
                            <label className="label">Password</label>
                            <input name='password' type="password" className="input" placeholder="Password" />
                            <div><button onClick={handleForget} className="link link-hover">Forgot password?</button></div>
                            <button className="btn btn-neutral mt-4">Login</button>
                        </fieldset>
                   </form>
                    <div onClick={googleSignIn} className='btn my-1 bg-gray-100'><FcGoogle />Sign in with  google</div>
                    <div className='text-center'><span>Don't have an account?</span> <Link to='/register' className='text-blue-700'>Register</Link></div>
                </div>
            </div>
    );
};

export default Login;