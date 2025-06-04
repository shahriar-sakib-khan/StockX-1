import React  from 'react';
import { NavLink } from "react-router-dom";
import styles from './Register.module.css'
import { FcGoogle } from 'react-icons/fc';
import { FaUser, FaEnvelope, FaLock , FaShopify } from 'react-icons/fa';
import {FaShop} from "react-icons/fa6";

const Register = () =>{

    return(
        <>
            <div className={styles.main_container}>
                <div className={styles.form_container}>
                    <div className={styles.header}>
                        <h2>Seconds to sign up!</h2>
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
                            <p>First name</p>
                            <FaUser className={styles.icon} />
                            <input type="text" placeholder="John Doe" />
                        </div>

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

                        <div className={styles.inputBox}>
                            <p>Shop name</p>
                            <FaShop className={styles.icon} />
                            <input type="text" placeholder="Minimum 8 characters" />
                        </div>

                        <div className={styles.button_container}>
                            <button type="submit"> Sign in</button>
                        </div>

                    </form>
                    <div className={styles.footer}>
                        <p>Already have an account?<NavLink to="/login"> <a href="">login</a> </NavLink></p>
                    </div>
                </div>

            </div>
        </>
    );
}

export default Register;