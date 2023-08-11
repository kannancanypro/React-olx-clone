import React,{useContext,useEffect} from 'react';
import  {AuthContext,FirebaseContext} from './store/AppContext'
import {getAuth,onAuthStateChanged} from 'firebase/auth'
import './App.css';
import {BrowserRouter as Router,Link,Routes,Route,useNavigate} from 'react-router-dom'
import Signup from "./Components/Signup/Signup"
import Login from './Components/Login/Login'
import Home from './Pages/Home';
import Create from './Pages/Create';
import ViewPost from './Pages/ViewPost';

function App() {
  const {setUser} = useContext(AuthContext)
  const {FirebasApp} = useContext(FirebaseContext);
  useEffect(()=>{
   const auth = getAuth()
   onAuthStateChanged(auth,(user)=>{
    setUser(user);
  })

  })
 return(
  <Router>
    <div>
      <Routes>
        <Route  path='/' element={<Home/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/create' element={<Create/>}></Route>
        <Route path = '/view' element={<ViewPost/>}></Route>
      </Routes>
    </div>
  </Router>
 )
}

export default App;
