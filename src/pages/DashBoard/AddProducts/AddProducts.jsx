import React, { useContext } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import axios from 'axios';
import useAxios from '../../../Hooks/useAxios';

const AddProducts = () => {

    const {user} = useContext(AuthContext);
    const axiosInstance = useAxios();
    

const handleSubmit = async (e) => {
     e.preventDefault();
     console.log(axiosInstance)
       const form = e.target;
       const name = form.name.value;
       const category = form.category.value;
       const location = form.location.value;
       const price = Number(form.price.value.trim()) || 0;
       const description = form.description.value;
       const quantity = form.quantity.value;
       const miniQuantity = form.miniquantity.value;
       const PaymentMethod = form.payment.value;
       const imgUrl = form.imageUrl;
       const file = imgUrl.files[0]
       const email = form.email.value;

    
      const res = await axios.post(`https://api.imgbb.com/1/upload?&key=a27afdcff8cf604bda9d440d54fea18b`,
                 {image: file} , 
                 {
                     headers : {'content-Type' : 'multipart/form-data'}
                 }     
             )

              const photoUrl = res.data.data.display_url;

              
                const formData = {
                        name,
                        category,
                        location,
                        price,
                        description,
                        photoUrl,
                        quantity,
                        miniQuantity,
                        PaymentMethod,
                        email
            }

            console.log(formData);

                if(res.data.success) {

                    axiosInstance.post('/products', formData)
                        .then(res =>{ 
                            console.log(res);
                            form.reset();
                        })
                        .catch(err => console.log(err))
                 }


   
}

    return (
         <div className=" min-h-screen mt-20 md:mt-10 p-8 flex items-center justify-center">
            <div className="w-full max-w-2xl bg-white bg-opacity-95 backdrop-blur-sm p-8 rounded-xl shadow-2xl">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b h1-heading pb-2">
                Add New Product
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">

                <div>
                    <label htmlFor="productPetName" className="block text-sm font-medium text-gray-700">
                    Product Name
                    </label>
                    <input
                    type="text"
                    name="name"
                    id="productPetName"
                    placeholder='Item name'
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

            
                <div className="flex items-center space-x-4">
                    <div className="flex-1">
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                        Category
                    </label>
                    <select
                        name="category"
                        id="category"
                        required
                        defaultValue="chose category"
                        className="mt-1 border block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                    >
                        <option disabled={true}>chose category</option>
                        <option value="Pant">Pant</option>
                        <option value="jacket">Jacket</option>
                        <option value="Shirt">Shirt</option>
                        <option value="Accessories">Accessories</option>
                    </select>
                    </div>

                    <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                         price
                    </label>
                    <input
                        type="number"
                        name="price"
                        id="price"
                        min="0"
                        placeholder='price'
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
                    />
                    </div>

                </div>

                <div className="flex space-x-4">
                    <div className="flex-1 ">
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                        Location
                    </label>
                    <input
                        type="text"
                        name="location"
                        id="location"
                        placeholder="City, State"
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                    </div>
                    
                </div>

                <div className="flex-1">
                    <label htmlFor="payment" className="block text-sm font-medium text-gray-700">
                        Select Payment Method
                    </label>
                    <select
                        name="payment"
                        id="payment"
                        required
                        className="mt-1 border border-gray-300 block w-full pl-3 pr-10 py-2 text-base focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                    >
                        <option value="choose payment method" disabled selected>choose payment method</option>
                        <option value="bikash">Bikash</option>
                        <option value="Nagod">Nagod</option>
                        <option value="cellfin">Cellfin</option>
                    </select>
                    </div>

                
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                    </label>
                    <textarea
                    name="description"
                    id="description"
                    rows="4"
                    placeholder="Tell us more about the item or pet..."
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    ></textarea>
                </div>

                <div>
                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700"> Available Quantity
                    </label>
                    <input
                        type="number"
                        name="quantity"
                        id="quantity"
                        min="0"
                        placeholder='available quantity'
                        className={`mt-1 block w-full border-gray-300 px-3 py-2 border rounded-md shadow-sm focus:outline-none`}
                    />
                    </div>
                <div>
                    <label htmlFor="miniquantity" className="block text-sm font-medium text-gray-700"> Minimum Quantity
                    </label>
                    <input
                        type="number"
                        name="miniquantity"
                        id="miniquantity"
                        min="0"
                        placeholder='available quantity'
                        className={`mt-1 block w-full border-gray-300 px-3 py-2 border rounded-md shadow-sm focus:outline-none`}
                    />
                    </div>

            
                <div>
                    <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
                     choose an Image
                    </label>
                    <input
                    type="file"
                    name="imageUrl"
                    id="imageUrl"
                    placeholder="https://example.com/image.jpg"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

            
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Contact Email
                    </label>
                    <input
                    defaultValue={user?.email}
                    type="email"
                    name="email"
                    id="email"
                    
                    className="mt-1 block w-full px-3 py-2 border border-gray-200 bg-gray-50 rounded-md shadow-sm text-gray-600 cursor-not-allowed"
                    />
                </div>

                <div>
                    <input type="checkbox" /> <span className='ml-1'> Show on home page </span> 
                </div>

            
                <button
                    type="submit"
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-[#093672] hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-150 ease-in-out"
                >
                    Add product
                </button>
                </form>
            </div>
    </div>
    );
};

export default AddProducts;