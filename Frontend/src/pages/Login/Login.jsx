import {useNavigate, NavLink } from "react-router-dom";
import styles from './Login.module.css'
import { FcGoogle } from 'react-icons/fc';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

import { AuthContext } from "../../context/AuthContext";
import { useState, useContext } from "react";


const Login = () =>{
    const [showPassword , setShowPassword] = useState(false);
        const [inputs, setInputs] = useState({ email: "", password: "" });
        const { login } = useContext(AuthContext);
        const navigate = useNavigate();
    
        const handleChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
        };
    
        const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("https://stockx-1-0ef9.onrender.com/api/v1/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(inputs),
            });
            const data = await res.json();
            if (res.ok) {
                login(data.token);
                navigate("/dashboard");
            } else {
                alert(data.error);
            }
        } catch (err) {
            alert("Login failed");
        }
    };

    return(
        <>
            <div className={styles.main_container}>
                <div className={styles.form_container}>
                    <div className={styles.header}>
                        <h2>Welcome back!</h2>
                    </div>
                    <button className={styles.googleBtn}>
                        <FcGoogle size={20} />
                        <span></span>
                    </button>

                    <div className={styles.orline}>
                        <div className={styles.line}></div>
                        <p>OR</p>
                        <div className={styles.line}></div>
                    </div>
                    <form className={styles.form}>

                        <div className={styles.inputBox}>
                            <p>Email</p>
                            <FaEnvelope className={styles.icon} />
                            <input 
                            name="email" 
                            type = "email"
                            onChange={handleChange} 
                            placeholder="example@site.com"
                            required/>
                        </div>

                        <div className={styles.inputBox}>
                            <p>Password</p>
                            <FaLock className={styles.icon} />
                            <input 
                            name="password"
                            type = {showPassword ? "text" : "password"}
                            onChange={handleChange} 
                            placeholder="Minimum 8 characters" 
                            required />
                        </div>

                        <div className={styles.button_container}>
                            <NavLink to="/dashboard"><button onClick={handleLogin}> Login</button></NavLink>
                        </div>

                    </form>
                    <div className={styles.footer}>
                        <p>Don't have an account? <NavLink to="/register"> <a href="">Signup</a> </NavLink></p>
                    </div>
                </div>

            </div>
        </>
    );
}

export default Login;