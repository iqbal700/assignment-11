import React, { useContext, useEffect, useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { AuthContext } from '../../../Provider/AuthProvider';

const AllUsers = () => {

const axiosSecure = useAxiosSecure();
const [users, setUsers] = useState([]);

console.log(users)


useEffect(()=> {
    axiosSecure.get('/users')
    .then(res => {
        setUsers(res.data)
    })
}, [axiosSecure])

console.log(users)


const handleStatusChange = (email, status) => {
     

}

    return (
       <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>
        <th>Name</th>
        <th>role</th>
        <th>Favorite Color</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
    
     {
        users?.map(user => 
             <tr>
        <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src={user?.photoUrl}
                  alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold">{user?.name}</div>
              <div className="text-sm opacity-50">{user?.email} </div>
            </div>
          </div>
        </td>
        <td>
          {user?.role}
          <br />
         
        </td>
        <td>Purple</td>
        <th className='flex items-center justify-center'>

          {
            !user?.status === 'active' ? <button  onClick={()=> handleStatusChange(user?.email, 'blocked')} className="btn btn-error btn-xs">Block</button> : 
            <button onClick={()=> handleStatusChange(user?.email, 'active')} className="btn btn-primary btn-xs">Active</button>
          }

          <button  onClick={()=> handleStatusChange(user?.email, 'blocked')} className="btn ml-2 btn-error btn-xs">Block</button>
          
          
        </th>
      </tr>
        )
     }
     
    </tbody>

  </table>
</div>
    );
};

export default AllUsers;



