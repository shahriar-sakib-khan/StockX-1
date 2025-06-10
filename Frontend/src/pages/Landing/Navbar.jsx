import React from 'react';
import styles from './Navbar.module.css';
import {motion} from 'framer-motion';
import {NavLink} from "react-router-dom";
const navVariants = {
    hidden: {y: '-100%' , opacity: 0},
    visible: {y: 0 , opacity: 1, transition: {duration: 1 , ease: 'easeOut'}},
};

const Navbar = () =>{
    return(
        <>
            <motion.nav className={styles.navbar}
                        initial = "hidden"
                        animate = "visible"
                        exit = "hidden"
                        variants={navVariants}>
                <div className={styles.logo}>
                </div>
                <ul className={styles.navItems}>
                    <li><a href="#contact">Contact</a> </li>
                    <li><a href="#products">Products</a></li>
                    <li><a href="#about">about</a></li>
                </ul>
                <div className={styles.loginBtn}>
                    <NavLink to="/login"><button>Login</button></NavLink>
                </div>
            </motion.nav>
        </>
    );
}

export default Navbar;