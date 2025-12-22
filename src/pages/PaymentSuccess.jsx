import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router';
import useAxios from '../Hooks/useAxios';

const PaymentSuccess = () => {

  const [searchParam] = useSearchParams();

  const sessionId = searchParam.get('session_id');

  const axiosInstance = useAxios();

  useEffect(()=> {
        axiosInstance.post(`/success-payment?session_id=${sessionId}`)
        .then(res => console.log(res.data))
  },[axiosInstance, sessionId])

    return (
        <div>
            <h2 className='text-5xl font-bold text-violet-600'> your payment hasbeen successfully done </h2>
        </div>
    );
};

export default PaymentSuccess;