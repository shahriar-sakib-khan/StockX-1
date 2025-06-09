import React from 'react';
import styles from './Employees.module.css';
import employees_pic from './employee_logo.png';

const Employees = ({data , onEdit , onDelete}) =>{
    return (
        <>
            <div className = {styles.employee_box}>
                <div className = {styles.img_box}>
                    {data.picture && (
                        <img src = {data.picture} alt = {employees_pic} className = {styles.employee_pic}/>
                    )}
                </div>
                <div className ={styles.empInfo_box}>
                    <p><strong>Name: </strong> {data.name}</p>
                    <p><strong>Designation: </strong> {data.designation}</p>
                    <p><strong>Phone:</strong>{data.phoneNumber}</p>
                </div>
                <div className = {styles.empButton_container}>
                    <button onClick={onEdit} className={styles.edit_btn}>Edit</button>
                    <button onClick={onDelete} className={styles.remove_btn}>Remove</button>
                </div>
            </div>
        </>
    );
}

export default Employees;