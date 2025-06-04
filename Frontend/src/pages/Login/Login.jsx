import React  from 'react';
import { NavLink } from "react-router-dom";
import styles from './Login.module.css'
import { FcGoogle } from 'react-icons/fc';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

const Login = () =>{

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
                            <input type="email" placeholder="example@site.com" />
                        </div>

                        <div className={styles.inputBox}>
                            <p>Password</p>
                            <FaLock className={styles.icon} />
                            <input type="password" placeholder="Minimum 8 characters" />
                        </div>

                        <div className={styles.button_container}>
                            <NavLink to="/dashboard"><button type="submit"> Login</button></NavLink>
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