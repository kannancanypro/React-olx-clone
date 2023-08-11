import React,{useEffect} from 'react'
import {useLocation} from 'react-router-dom'
import Header from '../Components/Header/Header'
import View from '../Components/View/View'

function ViewPost(props) {
    var location = useLocation()
    useEffect(()=>{
        
        console.log("view post :"+location.state.id)
    })
    return (
        <div>
            <Header />
            <View id={location.state.id}/>
        </div>
    )
}

export default ViewPost
