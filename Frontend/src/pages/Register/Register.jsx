import React  from 'react';
import { NavLink } from "react-router-dom";
import styles from './Register.module.css'
import { FcGoogle } from 'react-icons/fc';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

import { useState } from "react";
import { useNavigate } from "react-router-dom";



const Register = () =>{
    const [inputs, setInputs] = useState({ username: "", email: "", password: "", shopName:"" });
    const navigate = useNavigate();
    
    const handleChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };
    
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
        const res = await fetch("https://stockx-1-0ef9.onrender.com/api/v1/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(inputs),
        });
        const data = await res.json();
        if (res.ok) {
            alert("Registered successfully!");
            navigate("/login");
        } else {
            alert(data.error);
        }
        } catch (err) {
        alert("Registration failed");
        }
    };

    return(
        <>
            <div className={styles.main_container}>
                <div className={styles.form_container}>
                    <div className={styles.header}>
                        <h2>Seconds to sign up!</h2>
                    </div>
                    <button className={styles.googleBtn}>
                        <FcGoogle size={20} />
                        <span>Continue as SH</span>
                    </button>

                    <div className={styles.orline}>
                        <div className={styles.line}></div>
                        <p>OR</p>
                        <div className={styles.line}></div>
                    </div>
                    <form className={styles.form}>

                        <div className={styles.inputBox}>
                            <p>First name</p>
                            <FaUser className={styles.icon} />
                            <input name='username' type="text" placeholder="John Doe" onChange={handleChange} required/>
                        </div>

                        <div className={styles.inputBox}>
                            <p>Email</p>
                            <FaEnvelope className={styles.icon} />
                            <input name='email' type="email" placeholder="example@site.com"  onChange={handleChange} required/>
                        </div>

                        <div className={styles.inputBox}>
                            <p>Password</p>
                            <FaLock className={styles.icon} />
                            <input name='password' type="password" placeholder="Minimum 8 characters"  onChange={handleChange} required/>
                        </div>

                        <div className={styles.inputBox}>
                            <p>Shop name</p>
                            <FaLock className={styles.icon} />
                            <input name='shopName' type="text" placeholder="Minimum 8 characters"  onChange={handleChange} required/>
                        </div>

                        <div className={styles.button_container}>
                            <button onClick={handleRegister}> Sign in</button>
                        </div>

                    </form>
                    <div className={styles.footer}>
                        <p>Already have an account? <NavLink to ="/login">login</NavLink></p>
                    </div>
                </div>
                <div className={styles.help_box}>
                    <i className={`fas fa-question-circle ${styles.help_icon}`}></i>
                    <p>Help</p>
                </div>
            </div>
        </>
    );
}

export default Register;