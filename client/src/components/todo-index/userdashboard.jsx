import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { store } from "../../App";
import axios from "axios";

export const Userdashboard=()=>{
    const [token,setToken]=useContext(store)
    const [data,setdata]=useState([{Title:'',Description:'',date:'',AppoinmentId:0,UserId:""}]);
    let naviagte=useNavigate();
    useEffect(()=>{
        axios.get(`http://127.0.0.1:1234/myprofile`,{
            headers:{'token':token}
        }).then(res=>{
            axios.get(`http://127.0.0.1:1234/appoinment/${res.data.UserId}`).then(res=>{
                setdata(res.data)
            }).catch(err=>{
                console.log(err)
            })
        }).catch(err=>{
            console.log(err);
        })
    },[])
    if(!token){
        return naviagte('/login');
     }

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
        <h3 className="text-light mt-2">{data[0].UserId} Dashboard</h3>
        <Link to='/home'><button className=" mt-2 btn btn-danger p-1" onClick={()=>setToken(null)}>Signout</button></Link>
        
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