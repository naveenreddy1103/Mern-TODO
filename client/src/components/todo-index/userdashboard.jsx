import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie"
import { Link, useNavigate } from "react-router-dom";
import './todoindex.css'



export function Userdashboard(){
    const [cookies,setcookie,removecookie]=useCookies(['UserId']);
    const [data,setdata]=useState([{Title:'',Description:'',date:'',AppoinmentId:0}]);
   
    function signOutClick(){
        alert(`${cookies['UserId']} signout successfully`);
        removecookie(['UserId']);

    }
    useEffect(()=>{
        axios.get(`http://127.0.0.1:1234/appoinment/${cookies['UserId']}`)
        .then(response=>{
            setdata(response.data);
        })
        
    },[]);
    function removeClick(e){
        
        axios.delete(`http://127.0.0.1:1234/delete-appoinment/${e.target.id}`)
        .then(()=>{
            alert(`${e.target.value} task removed`);
            window.location.href = "http://localhost:3000/user-dashboard?"; 
        })
    }
    
    return(<div className="bg-image">
        <header>
        <nav className="d-flex justify-content-between overflow-auto">
        <h3 className="text-light mt-2">{cookies['UserId']} Dashboard</h3>
        <Link to='/home'><button className=" mt-2 btn btn-danger p-1" onClick={signOutClick}>Signout</button></Link>
        
        </nav>
        <Link to='/add-appoinment'><button className="btn btn-dark bi bi-plus text-white mt-4"> Add Appoinment</button></Link>
        </header>
        <section >
            
            <div className="d-flex flex-wrap overflow-auto" style={{height:'430px'}}>
            {
                data.map((appoinment)=>
                <div className="bg-light p-4 rounded rounded-4 mx-2  my-2" style={{width:'380px',height:'230px'}}>
                    <h3>{appoinment.Title}</h3>
                    <p>{appoinment.Description}</p>
                    <p className="bi bi-calendar"> {appoinment.date.toString().slice(0,appoinment.date.toString().indexOf('T'))}</p>
                    <Link to={`/edit-appoinment/${appoinment.AppoinmentId}`} className="btn btn-primary mx-2 bi bi-pen-fill"> Edit</Link>
                    <button className="btn btn-danger bi bi-trash-fill" value={appoinment.Title} id={appoinment.AppoinmentId} onClick={removeClick}> Remove</button>
                </div>
                )
            }
            </div>
            
        </section>
        
    </div>)
}