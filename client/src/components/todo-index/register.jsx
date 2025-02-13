import axios from "axios";
import { useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export function Register(){
    
    let userId=useRef(null);
    let userName=useRef(null);
    let passwor=useRef(null);
    let Emai=useRef(null);
    let Mobil=useRef(null);
    let navigate=useNavigate();
    

    function userid(e){
        userId.current=e.target.value;
        console.log(parseInt(e.target.value))
    }
    function username(e){
        userName.current=e.target.value;
        console.log(e.target.value)
    }
    function password(e){
        passwor.current=e.target.value;
    }
    function email(e){
        Emai.current=e.target.value;
    }
    function mobile(e){
        Mobil.current=e.target.value;
    }
   
    function registerClick(){
        let user={UserId:userId.current,UserName:userName.current,Password:passwor.current
        ,Email:Emai.current,Mobile:Mobil.current
    }
       axios.post('http://127.0.0.1:1234/add-user',user)
       .then(()=>{
        alert('user is added successfully');
        
       });
       navigate('/login');
       
    }
    function formsubmit(e){
        e.preventDefault();
    }


    return(<div className="container-fluid d-flex justify-content-center  " >
        
        <form className="mt-3 p-5 rounded rounded bg-white text-black" onSubmit={formsubmit}>
            <h3 className="bi bi-person-fill"> User Register</h3>
            <dl>
                <dt>User Id</dt>
                <dd><input className="form-control" type="text" placeholder="UserId" name="UserId" onChange={userid}></input></dd>
                <dt>User Name</dt>
                <dd><input type="text" className="form-control" placeholder="UserName" name="UserName" onChange={username}></input></dd>
                <dt>Password</dt>
                <dd><input type="password" className="form-control" placeholder="password" name="Password" onChange={password}></input></dd>
                <dt>Email</dt>
                <dd><input type="email" className="form-control" placeholder="Email" name="Email" onChange={email}></input></dd>
                <dt>Mobile</dt>
                <dd><input type="tel" className="form-control" placeholder="Mobile" name="Mobile" onChange={mobile}></input></dd>
            </dl>
            <button className="btn btn-warning w-100" onClick={registerClick}>Register</button>
            <Link to='/login' className="mx-2">Already account?</Link>
            <Link to="/home">Home</Link>
        </form>
        
    </div>)
}