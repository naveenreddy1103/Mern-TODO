import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate, useParams } from "react-router-dom";


export function EditAppoinment(){
    const [appoinment,setappoinment]=useState([{AppoinmentId:0,Title:'',Description:'',date:'',UserId:''}]);
    let params=useParams();
    const[cookies,setcookie,removecookie]=useCookies(['UserId'])
    let appoinmentid=useRef();
    let title=useRef();
    let description=useRef();
    let date=useRef();
    let userid=useRef();
    let navigate=useNavigate();
    useEffect(()=>{
        // axios.get(`http://127.0.0.1:1234/appoinment-id/${params.id}`) 
        // .then(response=>{
        //     setappoinment(response.data)
        // })
        let api=`http://127.0.0.1:1234/appoinment-id/${params.id}`
        async function userdata(){
            const data=await axios(api);
            const jsondata=await data.data;
            setappoinment(jsondata);
            console.log(jsondata)

        }
        userdata();

    },[]);
    function idChange(e){
        appoinmentid.current=e.target.value;
        console.log(e.target.value)

    }
    function titleChange(e){
         title.current=e.target.value;
    }
    function descriptionChange(e){
          description.current=e.target.value;
    }
    function dateChange(e){
         date.current=e.target.value;
    }
    function userChange(e){
         userid.current=e.target.value;
    }

    function addClick(){
      let appionment={
        AppoinmentId:appoinmentid.current,
        Title:title.current,
        Description:description.current,
        date:date.current,
        UserId:userid.current
      }
      axios.put(`http://127.0.0.1:1234/edit-appoinment/${params.id}`,appionment)
      .then(()=>{
        console.log('Task edited successfully');
      })
      navigate('/user-dashboard');
    }

    return(<div className="d-flex justify-content-center">
        <form className="bg-warning p-4 rounded rounded-3 mt-3">
        <h3>Edit Appoinment</h3>
        <dl>
            <dt className='form-label'>Appoinment Id</dt>
            <dd><input className="form-control" type="number"  name='id'  ></input></dd>
            <dt className='form-label'>Title</dt>
            <dd><input className="form-control"  type='text' name='title' onChange={titleChange}></input></dd>
            <dt className="form-label">Description</dt>
            <dd><input type='text' className='form-control'  name='description' onChange={descriptionChange}></input></dd>
            <dt className='form-label'>Date</dt>
            <dd><input type="date" className="form-control"  name='date' onChange={dateChange}></input></dd>
            <dt className='form-label'>UserId</dt>
            <dd><input type='text'  className="form-control" name='userId' onChange={userChange}></input></dd>
        </dl>
        <button className='btn btn-primary mx-3' onClick={addClick}>Add</button>
        <Link to='/user-dashboard' className='btn btn-danger'>Cancel</Link>
        </form>
    </div>)
}

