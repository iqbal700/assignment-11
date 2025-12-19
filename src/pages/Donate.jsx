import React, { useContext } from 'react';
import useAxios from '../Hooks/useAxios';
import { AuthContext } from '../Provider/AuthProvider';


const Donate = () => {

     const axiosInstance = useAxios();
     const {user} = useContext(AuthContext);
   

    const handleCheckout = (e) => {
        e.preventDefault();
        const donateAmount = e.target.donate.value;
        const donorEmail = user?.email;
        const donorName = user?.displayName;

        const formData = {
            donateAmount,
            donorEmail,
            donorName
        }


        axiosInstance.post('/create-payment-checkout', formData)
        .then(res => {
            console.log(res.data.url)
              window.location.href = res.data.url
        })
        

    }


    return (
        <div>
            <form onSubmit={handleCheckout} className='flex justify-center items-center min-h-screen'>
                <input name='donate' type="text" placeholder="Type here" className="input" />
                <button className='btn m-1 btn-primary'>Donate</button>
            </form>
        </div>
    );
};

export default Donate;

