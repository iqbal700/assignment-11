import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const MyRequest = () => {
    const  [totalRequest, setTotalRequest] = useState(0);
    const [itemPerPage, setItemPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [myRequest, setMyRequest] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(()=> {
            axiosSecure.get(`/my-request?page=${currentPage-1}&size=${itemPerPage}`)
             .then(res => {
                setMyRequest(res.data.request)
                setTotalRequest(res.data.totalRequest)
             })
    },[axiosSecure, currentPage, itemPerPage])

    const numOfPages =  Math.ceil(totalRequest / itemPerPage);
    const pages = [...Array(numOfPages).keys()].map(e => e + 1) // map for start from 0 

     console.log(myRequest)
    // console.log(totalRequest)
    // console.log(numOfPages)
    // console.log(pages)

    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
     
    }
    const handlenext = () => {
        if (currentPage < pages.length) {
            setCurrentPage(currentPage + 1)
        }
     
    }


   
    return (
         <div className='flex flex-col text-center'>
             <div className="overflow-x-auto">
                 <table className="table">
                        <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>District</th>
                            <th>Blood Group</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            myRequest.map((request, index) => {
                                return( 
                                    <tr>
                                        <th>{ (currentPage*10) + (index+1) - 10}</th>
                                        <td>{request.name}</td>
                                        <td>{request.district}</td>
                                        <td>{request.blood}</td>    
                                    </tr>
                                )
                            
                            })
                        }
                        </tbody>
                    </table>
                </div>

                <div className='mt-5'>
                    <button onClick={handlePrev} className="btn">prev</button>
                    {
                        pages.map(page => 
                            <button
                                onClick={() => setCurrentPage(page)}
                                className={`btn ml-1 ${page === currentPage ? 'bg-[#435585] text-white' : ''}`}>
                                    {page}
                            </button>
                        )
                    }
                    <button onClick={handlenext} className="btn ml-1">next</button>
                </div>
               
         </div>
    );
};

export default MyRequest;