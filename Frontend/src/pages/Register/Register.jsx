import React, {useEffect, useState} from 'react';
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styles from './Register.module.css';
import {FaEnvelope, FaLock, FaUser} from "react-icons/fa";
import {FaShop} from "react-icons/fa6";
import {motion} from "framer-motion";

const Register = () => {
    const [errors, setErrors] = useState({});
    const [isMobile, setIsMobile] = useState(false);
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

    useEffect(() =>{
        const handleResize = () =>{
            setIsMobile(window.innerWidth <=960);
        };
        handleResize();
        window.addEventListener('resize' , handleResize);

        return () => window.removeEventListener('resize' , handleResize);
    }, []);

    const animationProps = isMobile ?
        {key: 'mobile', initial: {opacity: '0' , y: -40} , animate:{opacity: 1 , y: 0}}
        : {key: 'desktop' , initial: {opacity: '0' , x: 40} , animate:{opacity: 1 , x: 0}}



    return(
        <>
            <motion.div
                {...animationProps}
                transition={{
                    delay: 0.3,
                    duration: 1,
                    ease: 'easeOut'
                }}>
                <div className={styles.main_container}>
                    <div className={styles.header}>
                        <p><strong>Register to StockX</strong></p>
                    </div>

                    <div className={styles.line}></div>

                    <div className={styles.form_container}>
                        <p>First name</p>
                        <FaUser className={styles.user_icon} />
                        <input type="text"
                               name ='username'
                               onChange={handleChange}
                               className={styles.input_box}
                               placeholder="John Doe"
                               required />

                        <p>Email</p>
                        <FaEnvelope className={styles.mail_icon} />
                        <input type="email"
                               className={styles.input_box}
                               placeholder="example@site.com"
                               name='email'
                               onChange={handleChange}
                        required/>

                        <p>Password</p>
                        <FaLock className={styles.pass_icon} />
                        <input type="password"
                               className={styles.input_box}
                               placeholder="Minimum 8 characters"
                               name='password'
                               onChange={handleChange}
                        required/>

                        <p>Shop name</p>
                        <FaShop className={styles.shop_icon} />
                        <input type="text"
                               className={styles.input_box}
                               placeholder="ABC Shop"
                               name='shopName'
                               onChange={handleChange}
                        required/>

                    </div>

                    <div className={styles.button_container}>
                        <button onClick={handleRegister}>Register</button>
                    </div>
                </div>
            </motion.div>
        </>
    );
}


export default Register;