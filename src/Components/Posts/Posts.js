import React,{useState,useEffect,useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import {getAuth} from 'firebase/auth'
import {getDocs,collection} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
import Heart from '../../assets/Heart';
import './Post.css';
import { FirebaseContext } from '../../store/AppContext';
import { db } from '../../firebase/config';

function Posts() {
const {FirebaseApp} = useContext(FirebaseContext);
const storage = getStorage(FirebaseApp);

const navigate = useNavigate();

const [sellItem,setSellItems] = useState([]);

const dbReference = collection(db,"sell_items");

const getAllSellItems = async()=>{

 var snapShot = await getDocs(dbReference);
  var itemlist = snapShot.docs.map((item)=>{
    return{
      ...item.data(),
      id:item.id
    }
  })
  setSellItems(itemlist)
}
useEffect(()=>{
  getAllSellItems()
},[])
  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          <div
            className="card"
          >
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>Tue May 04 2021</span>
            </div>
          </div>
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          {
            sellItem.map((item)=>{
              return(
                <div className="card" onClick={()=>{
                  console.log("id is :"+item.id)
                  navigate('/view',{state:{id:item.id}})
                }}>
                <div className="favorite">
                  <Heart></Heart>
                </div>
                <div className="image">
                  <img src= {`${item.imageUrl}`} alt="Photo" />
                </div>
                <div className="content">
                  <p className="rate">&#x20B9; {item.price}</p>
                  <span className="kilometer">{item.category}</span>
                  <p className="name">{item.name}</p>
                </div>
                <div className="date">
                  <span>{item.createdAt}</span>
                </div>
              </div>
              
            )})
          }
          
        </div>
      </div>
    </div>
  );
}

export default Posts;
