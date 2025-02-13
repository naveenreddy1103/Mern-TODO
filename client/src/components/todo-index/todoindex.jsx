import { Link } from 'react-router-dom';
import './todoindex.css';

export function TodoIndex(){
    return(<div className="container-fluid  d-flex justify-content-center align-items-center " style={{height:"100vh"}}>
         <div>
            <Link to='/register'><button className="btn btn-primary mx-2">Register User</button></Link>
            <Link to='/login'><button className="btn btn-warning mx-2">Login</button></Link>
         </div>
    </div>)
}