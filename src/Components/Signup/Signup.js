import React,{useState,useContext} from 'react';
import Logo from '../../olx-logo.png';
import './Signup.css';
import {useNavigate} from 'react-router-dom'
import { FirebaseContext } from '../../store/AppContext';
import { getAuth, createUserWithEmailAndPassword,updateProfile,signInWithEmailAndPassword, signOut } from "firebase/auth";
import {getFirestore,addDoc,collection} from 'firebase/firestore'
import { async } from '@firebase/util';


export default function Signup() {
 
  const [userName,setUserName]=useState('')
  const [password,setPassword]=useState('')
  const [phone,setPhone]=useState('')
  const [email,setEmail] = useState('')
  var signUpModel={};
  var {FirebaseApp} = useContext(FirebaseContext);
  var db = getFirestore(FirebaseApp)
  var navigate = useNavigate()
  const navigateToLogin = ()=>{
    navigate("/login");
  }
  const signUpFunc =async (e)=>{
    e.preventDefault();
      signUpModel={
        "name":userName,
        "password":password,
        "phone":phone,
        "email":email
      }
      console.log(signUpModel.name);
      console.log(FirebaseApp)
      const auth = getAuth()
  const {user} = await createUserWithEmailAndPassword(auth,signUpModel.email,signUpModel.password);
   if(user.uid){
    await updateProfile(user,{
      displayName:signUpModel.name
    })
    addSignupDetails(signUpModel,user.uid)
   }
         
  }

  const addSignupDetails=(model,uid)=>{
    addDoc(collection(db,'users'),{
      userName:model.name,
      phone:model.phone,
      id:uid
    }).then(()=>{
      console.log('data submitted');
      navigateToLogin()
    })
  }
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={signUpFunc}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            value={userName}
            defaultValue="John"
            onChange={(e)=>{
                setUserName(e.target.value)
               
            }}
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={email}
            defaultValue="John"
            onChange={(e)=>{
              setEmail(e.target.value)
            }}
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            name="phone"
            value={phone}
            onChange={(e)=>{
              setPhone(e.target.value)
            }}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            value={password}
            defaultValue="Doe"
            onChange={(e)=>{
              setPassword(e.target.value);
            }}
          />
          <br />
          <br />
          <button>Signup</button>
         
        </form>
        <a>Login</a>
      </div>
    </div>
  );
}
