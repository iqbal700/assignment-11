import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import auth from '../Firebase/firebase.config';
import axios from 'axios';


export const AuthContext = createContext();
const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({children}) => {

  const [loading, setLoading] = useState(true);
  const [roleLoading, setRoleLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState('');
  const [userStatus, setUserStatus] = useState('')

const registerwithEmailPass = (email, pass) => {
  
  return createUserWithEmailAndPassword(auth, email, pass)

}

 const handlegoogleSignIn = () => {

    return signInWithPopup(auth, googleProvider )
 }


// 1 useEffect 
 useEffect(() => {
   const unSubscribe = onAuthStateChanged(auth, (currentuser) => {

       setUser(currentuser);
       setLoading(false)
       //console.log(currentuser)
   })
    return ()=> {
       unSubscribe()
    }
 }, [])

 // 2 UseEffect = save user in the mongodb database
  useEffect(()=> {
    if(!user) return ;
      axios.get(`http://localhost:3000/users/role/${user.email}`)
        .then(res=> {
         
            setRole(res.data.role)
            setUserStatus(res.data.status)
            setLoading(false)
            setRoleLoading(false)
        })
   },[user])




  const authData =  {
        registerwithEmailPass,
        user,
        setUser,
        handlegoogleSignIn,
        loading,
        roleLoading,
        userStatus
       
  }

  return <AuthContext value={authData}>
      {children}
  </AuthContext>


};

export default AuthProvider;

