import React , {useState , useEffect} from 'react';
import styles from "./Employee.module.css";
import pro_logo from './employee_logo.png'

const Edit_Employee = ({onSubmit , defaultData , requestClose}) => {

    const [empData , setEmpData] = useState({
        picture: "",
        name: "",
        designation: "",
        phone: "",
    });

    useEffect(() => {
        if(defaultData){
            setEmpData(defaultData);
        }
    } , [defaultData]);
    
    const handleChange = (e) => {
        const {name , value , files} = e.target;
        if(name === "picture"){
            const file = files[0];
            const imageURL = URL.createObjectURL(file);
            setEmpData({...empData , picture: imageURL});
        }
        else{
            setEmpData({...empData, [name]: value});
        }
    };
    
    const handleSubmit = (e) =>{
        e.preventDefault();
        onSubmit(empData);
        requestClose();
    };

    return(
        <>
            <form onSubmit={handleSubmit}>
                <div className={styles.editUserPopup_container}>
                    <div className={styles.profileImage}>
                        <label htmlFor="profilePic" className={styles.imageLabel}>
                            <img
                                src={empData.picture || pro_logo}
                                alt={"picture"}
                                className={styles.imageCircle}
                            />
                            <div className={styles.addIcon}>+</div>
                        </label>
                        <input
                            id="profilePic"
                            type="file"
                            name="picture"
                            accept="image/*"
                            onChange={handleChange}
                            className={styles.fileInput}
                        />
                    </div>

                    <strong>Name:</strong>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={empData.name}
                        onChange={handleChange}
                        required
                    /><br />
                    <strong>Designation:</strong>
                    <input
                        type="text"
                        name="designation"
                        placeholder="Designation"
                        value={empData.designation}
                        onChange={handleChange}
                        required
                    /><br />
                    <strong>Phone:</strong>
                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone Number"
                        value={empData.phone}
                        onChange={handleChange}
                        required
                    /><br />
                    <div className={styles.editUserBtn_container}>
                        <button type="submit">Submit</button>
                    </div>
                </div>
            </form>
        </>
    );
}

export default Edit_Employee;