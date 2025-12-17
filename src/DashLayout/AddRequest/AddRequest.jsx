import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import axios from 'axios';
import useAxios from '../../Hooks/useAxios';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const AddRequest = () => {

 const {user} = useContext(AuthContext);
 //const axiosInstance = useAxios();
 const axiosSecure = useAxiosSecure();

  const [districts, setDistricts] = useState([]);
    const [district, setDistrict] = useState('');
    const [upazilas, setUpazilas] = useState([]);
    const [upazila, setUpazila] = useState('');
  


    useEffect(()=>{
        axios.get('/upazila.json')
         .then(res => setUpazilas(res.data.upazilas))

        axios.get('/district.json')
         .then(res => setDistricts(res.data.districts))

    },[])


 console.log(upazilas, districts)


  


  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.requesterName.value;
    const email = form.requesterEmail.value;
    const phone = form.requesterPhone.value;
    const patientName = form.recipientName.value;
    const hospitalName = form.hospitalName.value;
    const hospitalAddress = form.fullAddress.value;
   

  const formData = {
        name,
        email,
        phone,
        patientName,
        district,
        upazila,
        hospitalName,
        hospitalAddress,
        dontation_status: 'pending'
  }
    console.log(formData)

     axiosSecure.post('/request', formData)
      .then(res => console.log(res.data))
      .catch(err => console.log(err))

   
  
  };

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Any/Unknown'];

 
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-xl rounded-xl mt-10 border border-red-200">
      <h2 className="text-3xl font-extrabold mb-6 text-red-700 text-center border-b pb-3">
          <span role="img" aria-label="blood-drop">🩸</span> Urgent Blood Request Form
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* --- Requester Information --- */}
          <fieldset className="p-4 border border-gray-300 rounded-lg">
              <legend className="text-lg font-semibold text-red-600 px-2">1. Requester Details</legend>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Requester Name */}
                  <div>
                      <label htmlFor="requesterName" className="block text-sm font-medium text-gray-700">Your Name*</label>
                      <input type="text" id="requesterName" name="requesterName" value={user?.displayName}  required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500" placeholder="e.g., Jane Smith" />
                  </div>
                  {/* Requester Email */}
                  <div>
                      <label htmlFor="requesterEmail" className="block text-sm font-medium text-gray-700">Your Email*</label>
                      <input type="email" id="requesterEmail" name="requesterEmail" value={user?.email}  required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500" placeholder="e.g., your@example.com" />
                  </div>
                  {/* Requester Phone */}
                  <div>
                      <label htmlFor="requesterPhone" className="block text-sm font-medium text-gray-700">Contact Phone*</label>
                      <input type="tel" id="requesterPhone" name="requesterPhone" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500" placeholder="e.g., +8801XXXXXXXXX" />
                  </div>
              </div>
          </fieldset>

          {/* --- Recipient and Blood Information --- */}
          <fieldset className="p-4 border border-gray-300 rounded-lg">
              <legend className="text-lg font-semibold text-red-600 px-2">2. Patient & Blood Details</legend>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Recipient Name */}
                  <div>
                      <label htmlFor="recipientName" className="block text-sm font-medium text-gray-700">Patient/Recipient Name*</label>
                      <input type="text" id="recipientName" name="recipientName"   required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500" placeholder="e.g., Patient X" />
                  </div>
                  
                  {/* Required Blood Group */}
                  <div>
                      <label htmlFor="requiredBloodGroup" className="block text-sm font-medium text-gray-700">Blood Group*</label>
                      <select id="requiredBloodGroup" name="requiredBloodGroup"  onChange={''} required className="mt-1 block w-full pl-3 pr-10 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-red-500 focus:border-red-500">
                          <option value="" disabled>Select Group</option>
                          {bloodGroups.map(group => (<option key={group} value={group}>{group}</option>))}
                      </select>
                  </div>
                  
                  {/* Required Units */}
                  <div>
                      <label htmlFor="requiredUnits" className="block text-sm font-medium text-gray-700">Units Required (Bags)*</label>
                      <input type="number" id="requiredUnits" name="requiredUnits"  onChange={''} required min="1" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500" placeholder="e.g., 3" />
                  </div>
              </div>
          </fieldset>

          {/* --- Location Details --- */}
          <fieldset className="p-4 border border-gray-300 rounded-lg">
              <legend className="text-lg font-semibold text-red-600 px-2">3. Location & Hospital Details</legend>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {/* District */}
                  <div>
                      <label htmlFor="district" className="block text-sm font-medium text-gray-700">District*</label>
                     
                        <select id='district' value={district} onChange={(e) => setDistrict(e.target.value)} name='district' className='select mt-1 block w-full pl-3 pr-10 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-red-500 focus:border-red-500'>
                            <option value="" disabled >Select your district</option>
                            {
                                districts.map(d => <option value={d?.name} key={d?.id} >{d?.name}</option>)
                            }

                        </select>
                  </div>
                  {/* Upazila */}
                  <div>
                      <label htmlFor="upazila" className="block text-sm font-medium text-gray-700">Upazila/Sub-District*</label>

                       <select id='upazila' onChange={(e) => setUpazila(e.target.value)} name='upazila' value={upazila} className='select mt-1 block w-full pl-3 pr-10 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-red-500 focus:border-red-500'>
                            <option value="" disabled >Select your upazila</option>
                            {
                                upazilas.map(u => <option value={u?.name} key={u?.id} >{u?.name}</option>)
                            }

                        </select>
                  </div>
              </div>
              
              {/* Hospital Name */}
              <div className="mb-4">
                  <label htmlFor="hospitalName" className="block text-sm font-medium text-gray-700">Hospital/Clinic Name*</label>
                  <input type="text" id="hospitalName" name="hospitalName"  required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500" placeholder="e.g., XYZ Medical College Hospital" />
              </div>
              
              {/* Full Address */}
              <div>
                  <label htmlFor="fullAddress" className="block text-sm font-medium text-gray-700">Full Hospital Address (Room No., Ward, etc.)*</label>
                  <textarea id="fullAddress" name="fullAddress" rows="2"   required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500" placeholder="Enter street address, specific ward/room number for the donor." />
              </div>
          </fieldset>

          {/* --- Timing and Message --- */}
          <fieldset className="p-4 border border-gray-300 rounded-lg">
              <legend className="text-lg font-semibold text-red-600 px-2">4. Request Timing & Message</legend>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {/* Required Date */}
                  <div>
                      <label htmlFor="requiredDate" className="block text-sm font-medium text-gray-700">Date Required*</label>
                      <input type="date" id="requiredDate" name="requiredDate" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500" />
                  </div>
                  {/* Required Time */}
                  <div>
                      <label htmlFor="requiredTime" className="block text-sm font-medium text-gray-700">Time Required*</label>
                      <input type="time" id="requiredTime" name="requiredTime"  onC required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500" />
                  </div>
              </div>

              {/* Requester Message */}
              <div>
                  <label htmlFor="requesterMessage" className="block text-sm font-medium text-gray-700">Request Message (Context/Emergency Details)*</label>
                  <textarea id="requesterMessage" name="requesterMessage" rows="3"  required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500" placeholder="Briefly explain the situation, why the blood is needed, and any special instructions for the donor." />
              </div>
          </fieldset>

          {/* Submission Button */}
          <div>
              <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-lg font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out"
              >
                  <span className="mr-2">📢</span> Post Urgent Blood Request
              </button>
          </div>
      </form>
    </div>
  );
};

export default AddRequest;