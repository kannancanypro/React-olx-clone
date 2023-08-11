import React,{useState,useEffect} from 'react';
import {getDocs,getDoc,doc,query,collection,where} from 'firebase/firestore'
import './View.css';
import { db } from '../../firebase/config';
import { useLocation } from 'react-router-dom';
import { async } from '@firebase/util';

function View(props) {
  
  const [name,setName] = useState('')
  const [price,setPrice] = useState()
  const [url,setImageUl] = useState('')
  const [itemId,setItemId] = useState('')
  const [userId,setUserId] = useState('')
  const [category,setCategory] = useState('')
  const [date,setDate] = useState();

  const getItem = async ()=>{
   var document =await  getDoc(doc(db,"sell_items",props.id))
   console.log(document.data())
   if(document.data()){
    setName(document.data().name)
    setPrice(document.data().price)
    setImageUl(document.data().imageUrl)
    setItemId(document.data().id)
    setUserId(document.data().userId)
    setCategory(document.data().category)
    setDate(document.data().createdAt)
    console.log("UserId : "+document.data())
    getUser(document.data().userId)
   }
  }
  const [phone,setPhone] = useState();
  const [userName,setUserName] = useState();

  const getUser =async(userid)=>{
    console.log("UserId inside : "+userid)
    getDocs(query(collection(db, "users"), where('id','==', userid))).then(docSnap => {
      let users = []; 
      docSnap.forEach((doc)=> {
          users.push({ ...doc.data(), id:doc.id })
      });
      setPhone(users[0].phone)
      setUserName(users[0].userName)
          console.log("Document data:", users[0].userName);           
  });
  }
  
  useEffect(()=>{
    getItem()
  },[])
  return (
   
<div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={`${url}`}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9;{price} </p>
          <span>{name}</span>
          <p>{category}</p>
          <span>{date}</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>{userName}</p>
          <p>{phone}</p>
        </div>
      </div>
  </div> 
  
  );
}
export default View;
