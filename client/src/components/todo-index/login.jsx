import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import {Link, useNavigate} from 'react-router-dom';

export function Login(){

    const [users,setusers]=useState([{UserId:'',Password:''}]);
    let userid=useRef(null);
    let password=useRef(null);
    const[cookies,setcookie,removecookie]=useCookies(['UserId']);
    let navigate=useNavigate();

    

    function userval(e){
        userid.current=e.target.value;
    }
    function passwordval(e){
        password.current=e.target.value;
    }

    function loginClick(){
       const userFound1= users.find(user=>
            userid.current==user.UserId && password.current==user.Password
        );
        if(userFound1){
            setcookie('UserId',userid.current)
            alert('login succesfully');
            navigate('/user-dashboard');
        }
        else{
            alert('invaild creditainls')
        }
     }

    useEffect(()=>{
        axios.get('http://127.0.0.1:1234/users')
        .then(response=>{
            setusers(response.data)
        })  
    },[]);
    function formsubmit(e){
        e.preventDefault();
    }

    return(<div className="container-fluid d-flex justify-content-center align-items-center  " style={{height:"100vh"}}>
        <form className="bg-secondary rounded text-white p-4" onSubmit={formsubmit}>
            <h3 className="bi bi-person-fill">User Login</h3>
            <dl>
                <dt className="form-label">UserId</dt>
                <dd><input type="text" className="form-control" onChange={userval}></input></dd>
                <dt className="form-label">Password</dt>
                <dd><input className="form-control" type="password" onChange={passwordval}></input></dd>
            </dl>
            <button className="btn btn-warning w-100" onClick={loginClick}>Login</button>
            <Link to="/register" className="mx-2 text-white">New User?</Link>
            <Link to="/home" className=" text-white">Home</Link>
            
        </form>
    </div>)
}