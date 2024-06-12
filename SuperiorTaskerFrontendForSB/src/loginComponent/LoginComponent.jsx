import './loginDark.css'
import logo from '../../public/SuperiorTasker.png'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { login, getUserByEmail } from '../services/api';

function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const loginRequest = {email: email, password: password};
            console.log(loginRequest);
            const res = await login(loginRequest);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', res.data.user);
            console.log(res.data.token);
            console.log(res.data.user);
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className='login-container'>
            <div className="header-container">
                <img src={logo} alt='LOGO' className='login-logo'/>
                <h1 className='login-title'>Superior Tasker</h1>
            </div>

            <form className="login-form" onSubmit={handleSubmit}>
                {error && <div className="error-message">{error}</div>}
                <div className="form-group">
                    <label className='login-label'>Email: </label>
                </div>
                <div className='login-form-group'>
                    <input className='login-input' type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} />
                </div>

                <div className="login-form-group">
                    <label className='login-label'>Password: </label>
                </div>
                <div className='login-form-group'>
                    <input className='login-input' type="password" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <button type="submit" className="login-button">LOGIN</button>
            </form>
            
            <p > Don`t have an account? Register for free here ➡️ <Link className='register-link' to="/register">Register</Link></p>        </div>
    );
}

export default LoginScreen;