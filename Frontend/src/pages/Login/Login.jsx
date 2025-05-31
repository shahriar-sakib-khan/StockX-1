import React , {useState} from 'react';
import { NavLink } from "react-router-dom";
import styles from './Login.module.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import {toast} from "react-toastify";

const Login = () =>{
    const [email , setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword , setShowPassword] = useState(false);


    const handleLogin = (e) => {
        e.preventDefault();

        if(!email.trim()){
            toast.error("Email is required", {
                toastId: 0,
            });
            return;
        }

        if(!password.trim()){
            toast.error("Password is required",{
                toastId: 1,
            });
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            toast.error("Enter A Valid Email Address" ,{
                toastId: 2,
            });
            return;
        }

        toast.success("Form Submitted Successfully" , {
            toastId: 3,
        });
    }
    return(
        <>
            <div className={styles.main_container}>
                <div className={styles.form_container}>
                    <div className={styles.header}>
                        <h2>Welcome back!</h2>
                    </div>
                    <div className={styles.google_login}>

                    </div>
                    <div className={styles.orLine}>
                        <div className={styles.Line}></div>
                        <span>OR</span>
                        <div className={styles.Line}></div>
                    </div>

                    <div className={styles.form}>
                        <form >
                            <div>
                            <p className={styles.email}>Email</p>
                            <i className={`fas fa-envelope ${styles.email_icon}`}></i>
                            <input type = "email"
                                   className = {styles.input_box}
                                   value = {email}
                                   placeholder = "Enter Your Email"
                                   onChange = {e => setEmail(e.target.value)}
                                   required
                            >
                            </input>
                            </div>


                            <div className = {styles.password_container}>
                                <p>Password</p>

                                <i className={`fas fa-lock ${styles.pass_icon}`}></i>
                                <input type = {showPassword ? "text" : "password"}
                                       value = {password}
                                       placeholder = "Enter Your Password"
                                       onChange = {e => setPassword(e.target.value)}
                                       required
                                />

                                {/*<button type = "button" onClick={()=> setShowPassword(!showPassword)}>*/}
                                {/*    {showPassword ? <FaEyeSlash /> : <FaEye />}*/}
                                {/*</button>*/}
                                <div className={styles.forget_pass}>
                                    <a href="#forget_password">Forget Password?</a>
                                </div>
                            </div>
                            <div className={styles.buttons}>
                                <NavLink to="/dashboard" className={styles.nav}><button>Login</button></NavLink>
                                <NavLink to="/register" className={styles.nav}><button>Register</button></NavLink>
                            </div>
                        </form>
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

export default Login;