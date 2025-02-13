import axios from "axios";
import { useRef, useState } from "react";
import { useCookies } from "react-cookie"
import { useNavigate} from "react-router-dom";



export function Add_appoinment(){
    const [cookies,setcookie,removecookie]=useCookies(['UserId']);
    const[id,setId]=useState();
    const[title,setTitle]=useState('');
    const[description,setDescription]=useState('');
    const[date,setDate]=useState('');
    let user=useRef(cookies['UserId']);
    let navigate=useNavigate();

    function idChange(e){
         setId(e.target.value);
    }
    function titleChange(e){
        setTitle(e.target.value);
    }
    function descriptionChange(e){
        setDescription(e.target.value);
    }
    function dateChange(e){
        setDate(e.target.value);
    }
    

    function addClick(){
     if(id){
        let appoinment={
            AppoinmentId:id,
            Title:title,
            Description:description,
            date:date,
            UserId:user.current
         }
         axios.post('http://127.0.0.1:1234/add-appoinment',appoinment)
         .then(()=>{
            alert('appoinment is created');
         })
         navigate('/user-dashboard');
     }
     else{
        alert("without fill the form you can't click add")
     }
    }

    return(<div className="container-fluid d-flex justify-content-center align-items-center" style={{height:'100vh'}}>
        <form className="bg-warning p-4 rounded rounded-3">
            <h3 className="bi bi-plus-circle "> Add appoinment</h3>
            <dl>
                <dt className="form-label">AppoinmentI d</dt>
                <dd><input onChange={idChange} required className="form-control" type="number" placeholder="number only allowed"></input></dd>
                <dt className="form-label">Appoinment Title</dt>
                <dd><input onChange={titleChange} className="form-control" type="text" placeholder="title"></input></dd>
                <dt className="form-label">Description</dt>
                <dd><input onChange={descriptionChange} className="form-control" type="text" ></input></dd>
                <dt className="form-label">Appoinment Date</dt>
                <dd><input onChange={dateChange} className="form-control" type='date'></input></dd>
                <dt className="form-label">UserId</dt>
                <dd><input  className="form-control" value={cookies['UserId']} readOnly></input></dd>
            </dl>
            <button type="submit" className="btn btn-primary w-100" onClick={addClick}>Add</button>
        </form>
    </div>)
}