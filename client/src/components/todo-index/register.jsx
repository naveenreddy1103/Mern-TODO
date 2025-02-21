import axios from "axios";
import { useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export function Register(){
    
    // let userId=useRef(null);
    let navigate=useNavigate();
    const [data,setData]=useState({UserId:'',UserName:'',Password:'',Email:'',Mobile:''});

    function formChange(e){
        setData({...data,[e.target.name]:e.target.value});
    }
   
    function formsubmit(e){
        e.preventDefault();
        axios.post('http://127.0.0.1:1234/add-user',data)
       .then((response)=>{
        alert('user is added successfully');
        navigate('/login'); 
        
       });
       }


    return(<div className="container-fluid d-flex justify-content-center  " >
        
        <form className="mt-3 p-5 rounded rounded bg-white text-black" onSubmit={formsubmit}>
            <h3 className="bi bi-person-fill"> User Register</h3>
            <dl>
                <dt>User Id</dt>
                <dd><input className="form-control" type="text" placeholder="UserId" name="UserId" onChange={formChange} required></input></dd>
                <dt>User Name</dt>
                <dd><input type="text" className="form-control" placeholder="UserName" name="UserName" onChange={formChange} required></input></dd>
                <dt>Password</dt>
                <dd><input type="password" className="form-control" placeholder="password" name="Password" onChange={formChange} required></input></dd>
                <dt>Email</dt>
                <dd><input type="email" className="form-control" placeholder="Email" name="Email" onChange={formChange} required></input></dd>
                <dt>Mobile</dt>
                <dd><input type="tel" className="form-control" placeholder="Mobile" name="Mobile" onChange={formChange} required></input></dd>
            </dl>
            <input type='submit' className="btn btn-warning w-100" value="Rgister"></input>
            <Link to='/login' className="mx-2">Already account?</Link>
            <Link to="/home">Home</Link>
        </form>
        
    </div>)
}