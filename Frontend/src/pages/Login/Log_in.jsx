import React, {useState , useEffect , useContext} from 'react';
import {useNavigate, NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import styles from './Log_in.module.css';
import {FaEye, FaEyeSlash} from "react-icons/fa";
import '@fortawesome/fontawesome-free/css/all.min.css';
import {toast} from "react-toastify";
import {motion} from 'framer-motion';

const Log_in = () => {
    const [showPassword , setShowPassword] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
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


    useEffect(() =>{
        const handleResize = () =>{
            setIsMobile(window.innerWidth <=960);
        };
        handleResize();
        window.addEventListener('resize' , handleResize);

        return () => window.removeEventListener('resize' , handleResize);
    }, []);

    const animationProps = isMobile ?
        {key: 'mobile', initial: {opacity: '0' , y: 40} , animate:{opacity: 1 , y: 0}}
        : {key: 'desktop' , initial: {opacity: '0' , x: -40} , animate:{opacity: 1 , x: 0}}


    return (
        <>
            <motion.div
                {...animationProps}
                transition={{
                    delay: 0.5,
                    duration: 1,
                    ease: 'easeOut'
                }}>
                <div className={styles.main_container}>
                    <div className={styles.header}>
                        <p><strong>Login to StockX</strong></p>
                    </div>

                    <div className={styles.line}></div>

                    <div className={styles.form_container}>
                        <p>Email</p>
                        <i className={`fas fa-envelope ${styles.email_icon}`}></i>
                        <input type = "email"
                               name="email"
                               className = {styles.input_box}
                               placeholder = "John Doe"
                               onChange={handleChange}
                               required
                        >
                        </input>

                        <p>Password</p>
                        <i className={`fas fa-lock ${styles.pass_icon}`}></i>
                        <div className = {styles.password_container}>
                            <input type = {showPassword ? "text" : "password"}
                                   name="password"
                                   onChange={handleChange}
                                   className={styles.input_box}
                                   placeholder = "Minimum 8 characters"
                                   required
                            />
                            <button type = "button"
                                    className={styles.showPass_icon}
                                    onClick={()=> setShowPassword(!showPassword)}>
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                            <div className={styles.footer}>
                                <p>Remember me</p>
                                <input
                                    type="checkbox"
                                    checked={isChecked}
                                    className={styles.check_box}
                                    onChange={handleChange}
                                />
                                <div className={styles.hor_line}></div>
                                <a href="#ki" className={styles.hyper}>Forget Password?</a>
                            </div>
                        </div>

                    </div>

                    <div className={styles.button_container}>
                        <NavLink to="/dashboard" className={styles.navlink}> <button onClick={handleLogin}>Login</button></NavLink>
                        <button>Explore the products</button>
                    </div>
                </div>
            </motion.div>
        </>
    );
}

export default Log_in;