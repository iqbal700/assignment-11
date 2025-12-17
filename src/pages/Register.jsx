import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';
import { updateProfile } from 'firebase/auth';
import auth from '../Firebase/firebase.config';
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';

const Register = () => {

    const {registerwithEmailPass, setUser, handlegoogleSignIn} = useContext(AuthContext);
    const [districts, setDistricts] = useState([]);
    const [district, setDistrict] = useState('');
    const [upazilas, setUpazilas] = useState([]);
    const [upazila, setUpazila] = useState([]);
    const [blood, setBlood] = useState('')
     const navigate = useNavigate();


    useEffect(()=>{
        axios.get('/upazila.json')
         .then(res => setUpazilas(res.data.upazilas))

        axios.get('/district.json')
         .then(res => setDistricts(res.data.districts))

    },[])

    

    const handleSubmit = async (e) => {

            e.preventDefault();
            const email = e.target.email.value;
            const pass = e.target.password.value;
            const name = e.target.name.value;
            const photo = e.target.photoUrl;
            const role = e.target.role.value;
            const file = photo.files[0]

        console.log(role)

        
            const uppercase = /[A-Z]/;
            const lowercase = /[a-z]/;

            if ( pass.length < 6) {
                return alert('must be 6 character')
            }
            if (!uppercase.test(pass)) {
                return alert('must be uppercase')
            }
            if (!lowercase.test(pass)) {
                return alert('must be lowercase')
            }
            

            const res = await axios.post(`https://api.imgbb.com/1/upload?&key=a27afdcff8cf604bda9d440d54fea18b`,
                 {image: file} , 
                 {
                     headers : {'content-Type' : 'multipart/form-data'}
                 }     
             )

              const photoUrl = res.data.data.display_url

                  const formData = {
                    email,
                    pass,
                    name ,
                    blood,
                    role,
                    photoUrl,
                    district,
                    upazila
            }
                    console.log(formData)
                    console.log(res.data)

                    if (res.data.success) {
 
                    registerwithEmailPass(email, pass)
                        .then((userCredential) => {

                            updateProfile(auth.currentUser, {
                                displayName: name, photoURL: photoUrl
                                }).then(() => {
                                setUser(userCredential.user);
                                axios.post('http://localhost:3000/users', formData)
                                 .then(res => {
                                    console.log(res.data)
                                 })
                                 .catch(err => console.log(err))
                                navigate('/')
                                
                                })
                                .catch((error) => {
                                    console.log(error)
                                });                    
                            })
                            .catch(error => {
                                console.log('error message', error)
                            })
                    }
          
    }


      const googleSignIn = () => {

        handlegoogleSignIn()
         .then(result => setUser(result.user))
          .catch(error => console.log(error))
    }

    return (
        <div className="card mt-20 mx-auto bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <div className="card-body">
                    <form onSubmit={handleSubmit} className="fieldset">
                        <label className="label">Name</label>
                        <input name='name'  type="text" className="input" placeholder="Full Name" />
                        <label className="label">Email</label>
                        <input name='email'  type="email" className="input" placeholder="Email" />
                        <label className="label">Photo Url</label>
                        <input name='photoUrl'  type="file" className="input" placeholder="choose a file" />    
                        <select name='role' defaultValue="Choose role" className="select">
                            <option disabled={true}>Choose a role</option>
                            <option value='manager' >Manager</option>
                            <option value='buyer' >Buyer</option>
                          
                        </select>   

                        <select name='blood' onChange={(e) => setBlood(e.target.value)} defaultValue="Choose blood group" className="select">
                            <option disabled={true}>Choose blood group</option>
                            <option value='A+'>A+</option>
                            <option value='A-'>A-</option>
                            <option value='B+'>B+</option>
                            <option value='B-'>B-</option>
                            <option value='AB+'>AB+</option>
                            <option value='AB-'>AB-</option>
                            <option value='o+'>o+</option>
                            <option value='o-'>o-</option>
                        </select>       

                        <select onChange={(e) => setDistrict(e.target.value)} name='district' defaultValue='select your district' className='select'>
                            <option disabled selected>Select your district</option>
                            {
                                districts.map(d => <option value={d?.name} key={d.id} >{d?.name}</option>)
                            }

                        </select>

                        <select onChange={(e) => setUpazila(e.target.value)} name='upazila' defaultValue='select your upazila' className='select'>
                            <option disabled selected>Select your upazila</option>
                            {
                                upazilas.map(u => <option value={u?.name} key={u.id} >{u?.name}</option>)
                            }

                        </select>



                        <label className="label">Password</label>
                        <input name='password'  type="password" className="input" placeholder="Password" />
                        <button className="btn btn-neutral mt-4">Register</button>
                   </form>
                     <div onClick={googleSignIn} className='btn my-1 bg-gray-100'><FcGoogle />Sign in with  google</div>
                     <div className='text-center'><span>Already have an account?</span> <Link to='/login' className='text-blue-700'>Login</Link></div>
                  

                </div>
            </div>
        
    );
};

export default Register;

