import React, { Fragment, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import './Create.css';
import Header from '../Header/Header';
import { AuthContext, FirebaseContext } from '../../store/AppContext';
import { addDoc, collection, getDoc } from 'firebase/firestore'
import { db, FirebaseApp } from '../../firebase/config'
import { ref, getStorage, getDownloadURL, uploadBytesResumable } from 'firebase/storage'

const Create = () => {
  const [imgUrl, setImgUrl] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);
  const [name, setName] = useState()
  const [category, setCategory] = useState()
  const [price, setPrice] = useState();
  const [image, setImage] = useState()
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)
  const { FirebaseApp } = useContext(FirebaseContext)
  const date = new Date();
  const addSellItem = async (e) => {
    try {
      e.preventDefault();

      var storage = getStorage(FirebaseApp)
      var storageRef = ref(storage, `/images/${image.name}`)

      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on("state_changed",
        (snapshot) => {
          const progress =
            Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setProgresspercent(progress);
        },
        (error) => {
          alert(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImgUrl(downloadURL)
            console.log("Download url: " + downloadURL);
            addDoc(collection(db, "sell_items"), {
              name: name,
              category: category,
              price: price,
              imageUrl: downloadURL,
              userId: user.uid,
              ceatedAt: date.toDateString()

            })
          });
          navigate("/home");
        }
      );
      
    }
    catch (error) {
      alert(error.message)
      console.log(error);
    }
  }
  return (
    <Fragment>
      <Header />

      <div className="centerDiv">
        <form>
          <label htmlFor="fname">Name</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
            }}
          />
          <br />
          <label htmlFor="fname">Category</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="category"
            value={category}
            onChange={
              (e) => {
                setCategory(e.target.value);
              }
            }
          />
          <br />
          <label htmlFor="fname">Price</label>
          <br />
          <input className="input"
            type="number"
            id="fname"
            name="Price"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value)
            }} />
          <br />
        </form>
        <br />
        <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ""}></img>
      
          <br />
          <input type="file" onChange={
            (e) => {
              setImage(e.target.files[0])
              console.log("FileName : " + image['name']);
            }} />
          <br />
          <button className="uploadBtn" onClick={addSellItem}>upload and Submit
          </button>
       
      </div>

    </Fragment>
  );
};

export default Create;
