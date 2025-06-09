// src/components/Modal.jsx
import React, { useEffect, useState } from "react";
import styles from "./Popup.module.css";

const Popup_modal = ({ isOpen, onClose, children }) => {

    const [isVisible , setIsVisible] = useState(false);
    const [isClosing , setIsClosing] = useState(false);

    useEffect(() =>{
        if(isOpen){
            setIsVisible(true);
        }
    } , [isOpen]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                triggerClose();
            }
        };
        if (isOpen) {
            document.addEventListener("keydown", handleKeyDown);
        }
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen]);

    const triggerClose = () =>{
        setIsClosing(true);
        setTimeout(() => {
            setIsClosing(false);
            setIsVisible(false);
            onClose();
        } , 300);
    };

    if(!isVisible) return null;

    const content =
        typeof children === "function"
            ? children({requestClose: triggerClose})
            : children;

    console.log("Rendered content: " , content);
    return (
        <div
            className={`${styles.overlay} ${isClosing ? styles.fadeOut : ""}`}
            onClick={triggerClose}>
            <div
                className={`${styles.modal} ${isClosing ? styles.zoomOut : ""}`}
                onClick={(e) => e.stopPropagation()} // prevent close on inner click
            >
                <button onClick={triggerClose} className={styles.closeBtn}>X</button>
                {content}
            </div>
        </div>
    );

};

export default Popup_modal;
