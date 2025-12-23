import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useAxios from '../Hooks/useAxios';

const SearchRequest = () => {

    const [districts, setDistricts] = useState([]);
    const [district, setDistrict] = useState('');
    const [upazilas, setUpazilas] = useState([]);
    const [upazila, setUpazila] = useState('');
    const axiosInstance = useAxios()
    
    useEffect(()=>{
        axios.get('/upazila.json')
         .then(res => setUpazilas(res.data.upazilas))

        axios.get('/district.json')
         .then(res => setDistricts(res.data.districts))

    },[])

   const handleSearch = (e) => {
      e.preventDefault();
      const bloodGroup = e.target.blood.value;
     
      axiosInstance.get(`/search-requests?bloodGroup=${bloodGroup}&district=${district}&upazila=${upazila}`)
      .then(res => console.log(res.data))

      
   }

 
    return (
        <div className='mt-50'>
           <form onSubmit={handleSearch} className='fieldset flex '>
             <select name='blood' defaultValue="Choose blood group" className="select">
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

                        <button type='submit' className="btn btn-primary">search</button>

           </form>
        </div>
    );
};

export default SearchRequest;