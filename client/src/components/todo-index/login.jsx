import axios from 'axios';
import { useContext,useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { store } from '../../App';

export const Login = () => {
    const [data, setData] = useState({ UserId: '', Password: '' });
    const [token,setToken]=useContext(store)
    const valChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    let navigate = useNavigate();
    const [cookies, setcookie, removecookie] = useCookies(['UserId']);

    const formSubmit = (e) => {
        e.preventDefault();
        // Fetch user data from backend based on UserId
        axios.get(`http://127.0.0.1:1234/login/${data.UserId}`)
            .then((res) => {
                
                if(res.data.token){
                    setcookie('UserId', data.UserId);
                setToken(res.data.token)
                alert('Login successfully');
                navigate('/user-dashboard');
                }

            })
            .catch((error) => {
                console.error('Error logging in:', error);
                alert('An error occurred during login');
            });
    };

    return (
        <div className="container-fluid d-flex justify-content-center  " >
        
        <form className="mt-3 p-5 rounded rounded bg-white text-black" onSubmit={formSubmit}>
            <h3 className="bi bi-person-fill"> User Register</h3>
            <dl>
                        <dt>UserId</dt>
                        <dd><input type='text' name='UserId' className='form-control' onChange={valChange} value={data.UserId} required /></dd>
                        <dt>Password</dt>
                        <dd><input type='password' name='Password' className='form-control' onChange={valChange} value={data.Password} required /></dd>
                    </dl>
                    <input type="submit" value="Login" className='btn btn-primary w-100' />
                    <Link to='/register' className="mx-2">Add New User?</Link>
            <Link to="/home">Home</Link>
        </form>
        
    </div>
    );
};
