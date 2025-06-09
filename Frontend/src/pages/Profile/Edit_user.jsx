// src/components/UserForm.jsx
import React, { useState } from "react";
import styles from './Profile.module.css';

const Edit_user = ({ onSave, requestClose , user }) => {
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [email, setEmail] = useState(user.email);
    const [location , setLocation] = useState(user.location);
    const [shopName , setShopName] = useState(user.shopName);
    const [profilePic , setProfilePic] = useState(user.profilePic);
    const [phoneNumber , setPhoneNumber] = useState(user.phoneNumber);

    const handleChange = (e) => {
        onSave({firstName , lastName , email, location, shopName , profilePic});
    };

    const handleImageUpload = (event) =>{
        const file = event.target.files[0];
        if(file){
            const reader = new FileReader();
            reader.onloadend = () =>{
                setProfilePic(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(user);       // Save data
        requestClose();         // Trigger smooth close from Modal
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className={styles.editUserPopup_container}>
                <strong>First Name:</strong>
                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                /><br />
                <strong>Last Name:</strong>
                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                /><br />
                <strong>Shop Name:</strong>
                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={shopName}
                    onChange={(e) => setShopName(e.target.value)}
                    required
                /><br />
                <strong>Location:</strong>
                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                /><br />
                <strong>Phone Number:</strong>
                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                /><br />
                <strong>Email:</strong>
                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                /><br />
                <div className={styles.editUserBtn_container}>
                    <button type="submit" onClick={handleChange}>Save</button>
                </div>
            </div>
        </form>
    );
};

export default Edit_user;


// <input
//     type="text"
//     name="firstName"
//     placeholder="First Name"
//     value={firstName}
//     onChange={(e) => setFirstName(e.target.value)}
//     required
// /><br />