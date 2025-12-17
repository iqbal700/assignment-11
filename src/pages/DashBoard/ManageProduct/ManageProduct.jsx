import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router';
import useAxios from '../../../Hooks/useAxios';
import { AuthContext } from '../../../Provider/AuthProvider';

const ManageProducts = () => {

    const [products, setProducts] = useState([]);
    const {user} = useContext(AuthContext);
    const axiosInstance = useAxios();
      
          useEffect(() =>{
              axiosInstance.get(`/manager/product/${user?.email}`)
              .then(res => {setProducts(res.data)})
              .catch(err => console.log(err))
          }, [ axiosInstance, user?.email,])
        
          console.log(products)


    return (
       <div className='mt-20 mx-auto overflow-hidden p-4 md:p-10 bg-gray-50 min-h-screen'>
            
    <h1 className='text-3xl sm:text-4xl md:text-5xl h1-heading font-extrabold text-[#093672] text-center mb-6 md:mb-10 border-b-2 md:border-b-4 border-pink-500 pb-2 md:pb-3 mx-auto block'>
        My Products 🛠️
    </h1>

    <div className="overflow-x-auto bg-white rounded-xl shadow-lg md:shadow-2xl border border-gray-100">
        <table className="table w-full">
            <thead className='bg-[#093672] text-white'>
                <tr>
                    <th className='p-3 md:p-4 rounded-tl-xl'>
                    </th>
                    <th className='p-3 md:p-4 text-base md:text-lg'>Service Details</th>
                    <th className='p-3 md:p-4 text-base md:text-lg hidden sm:table-cell'>Payment Method</th>
                    <th className='p-3 md:p-4 text-base md:text-lg'>Price</th>
                    <th className='p-3 md:p-4 rounded-tr-xl text-base md:text-lg'>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    products?.map((product, index) => 
                        <tr key={product?._id} className={'border-b border-gray-100 text-gray-700 transition duration-30'}>
                            <th className='font-bold text-base md:text-lg text-pink-500 py-3 px-3 md:px-4'>
                                {index + 1}
                            </th>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle h-12 w-12 md:h-16 md:w-16">
                                            <img
                                                className='rounded-full'
                                                src={product?.imgUrl}
                                                alt={product?.serviceName} />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-extrabold text-[#093672] text-base md:text-xl">{product?.name || 'N/A'}</div>
                                        <div className="text-xs md:text-sm opacity-60 font-medium">category: {product?.category || 'N/A'}</div>
                                    </div>
                                </div>
                            </td>
                            <td className='hidden text-[16px] font-semibold sm:table-cell'>
                                {product?.PaymentMethod || 'N/A'}
                             
                            </td>
                            <td className='font-semibold text-green-600 text-lg md:text-xl'>{product?.price} tk</td>

                            <td className='flex flex-col sm:flex-row gap-2 md:gap-3 items-start sm:items-center py-4 md:h-28'>
                                <button 
                                   
                                    className="btn text-white bg-red-500 hover:bg-red-600 border-none btn-xs md:btn-sm"
                                >
                                    Delete
                                </button>

                                <Link to={`/update-services/${product._id}`}> 
                                    <button className="btn text-white bg-green-500 hover:bg-green-600 border-none btn-xs md:btn-sm">
                                        Edit
                                    </button>
                                </Link>
                            </td>
                        </tr>
                    )
                }
                {products?.length === 0 && (
                    <tr>
                        <td colSpan="5" className="text-center py-8 text-gray-500 text-base md:text-lg">
                            You haven't added any services yet. 🐾
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
</div>
    );
};

export default ManageProducts;