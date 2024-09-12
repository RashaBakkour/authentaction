
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from 'react' ;
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import loginImg from '../../assets/Rectangle 16.png';
// import personal from '../../assets/personal photo.png';
import './Signup.css';

const Signup = ()=>{
    const navigate = useNavigate();

    const [userName, setUserName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [certificate, setCertificate] = useState(null);
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [errors, setErrors] =useState('');

    // const [showModal, setShowModal] = useState(false);
    // const [modalMessage, setModalMessage] = useState(false);

    const handelSignUp = ()=>{
        if (!email || !password || !userName || !phoneNumber || !passwordConfirmation ||!profilePhoto ||!certificate){
            console.log("All fields must be filled, including the profile photo and certificate!");
            // setModalMessage("All fields must be filled, including the profile photo and certificate!");
            // setShowModal(true);
        }

        console.log("Form Data:");
        console.log("user_name", userName);
        console.log("phone_number", phoneNumber);
        console.log("email", email);
        console.log("password", password);
        console.log("password_confirmation", passwordConfirmation);
        console.log("profile_photo", profilePhoto ? profilePhoto.name : "No file selected");
        console.log("certificate", certificate ? certificate.name : "No file selected");

        const formData = new FormData();
        formData.append("user_name", userName);
        formData.append("phone_number", phoneNumber);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("password_confirmation", passwordConfirmation);
        formData.append("profile_photo", profilePhoto);
        formData.append("certificate", certificate);

        console.log("FormData Entries:");
        for( let [key, value] of formData.entries()){
            console.log(key, value);
        }

        fetch('https:/abdulrahman-bashir.trainees-mad-s.com/api/v1/auth/register',{
            method: "POST",
            headers: {
                "Accept": "application/json",
            },
            body: formData,
        })
        .then(response => {
            console.log("Response Status:", response.status);
            if (response.ok){
                console.log("Success:", response.status);

                localStorage.setItem('userEmail', email);
                 setErrors('Account registerd successfully! check your email for verification code')
                // setModalMessage("Account registerd successfully! check your email for verification code");
                // setShowModal(true);
                console.log("Account registerd successfully! check your email for verification code");
                setTimeout(()=>{
                    navigate("/verify");
                },2000);
            }else{
                return response.json().then(errorData =>{
                    console.log("Error Response Data:", errorData);
                    setErrors(`Error: ${response.status} - ${errorData.message || "Unknown error"}`);
                    // setModalMessage(`Error: ${response.status} - ${errorData.message || "Unknown error"}`);
                    // setShowModal(true);
                });
            }
        })
        .catch(error =>{
            console.log("Request failed:", error.message);
            setErrors('"Request failed:" + error.message')
            // setModalMessage("Request failed:" + error.message);
            // setShowModal(true);
        });
    };


    return(
        <div className="container">
        <nav >
            <div className="logo" href="#">
                <img src = {logo} alt ='image'></img>
            </div>
            
            <button id="theme-switch">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Z"/></svg>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M480-280q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Z"/></svg>
            </button>
            <select id="language-select">
                <option value="en">English</option>
                <option value="ar">Arabic</option>
                <option value="fr">French</option>
                <option value="deu">Deutsch</option>
            </select>
        </nav>
        
        
        <section className="signup">
    
            <div className="imgSignup-left scrollSignup-left">
                <img src= {loginImg} alt= 'image'></img>
            </div>

            <div className="signup-right scrollSignup-right" >
                <h1 >Sign up</h1>
                {/* <img src= {personal} ></img> */}
                <form  className='form' action="/" >
                    <div className="input-grid">
                        {/* <label htmlFor="name" className='label' id="lab_name">User Name</label> */}
                        <input 
                            type="text"
                            placeholder='User Name'
                            value={userName}
                            onChange={(e)=> setUserName(e.target.value)}
                            id="name" dir="ltr" autoComplete= 'off'
                        />
                    </div>
                    <div className="input-grid">
                        {/* <label htmlFor="number" className='label' id="lab_number">Phone Number</label> */}
                        <input 
                            type="tel"
                            placeholder='Phone Number'
                            value={phoneNumber}
                            onChange={(e)=> setPhoneNumber(e.target.value)}
                            id="number" dir="ltr" autoComplete= 'off'
                        />
                    </div>
                    <div className="input-grid validation">
                        {/* <label htmlFor="email" className='label' id="lab_email">Email</label> */}
                        <input
                            type="email" 
                            placeholder='Email'
                            value={email}
                            onChange={(e)=> setEmail(e.target.value)}
                            id="email" dir="ltr" autoComplete= 'off'
                        />
                        {errors && <p className="text-danger">Enter a valid email</p>}
                    </div>
                    <div className="input-grid validation">
                        {/* <label htmlFor="password" className='label' id="lab_password">Password</label> */}
                        <input 
                            type="password"
                            placeholder='Password'
                            value={password}
                            onChange={(e)=> setPassword(e.target.value)}
                            id="password" dir="ltr" autoComplete= 'off'
                        />
                        {errors && <p className="text-danger">Enter a valid password</p>}
                    </div>
                    <div className="input-grid">
                        {/* <label htmlFor="repassword" className='label' id="lab_repass">Re Password</label> */}
                        <input
                            type="password"
                            placeholder='Re Password'
                            value={passwordConfirmation}
                            onChange={(e)=> setPasswordConfirmation(e.target.value)}
                            id="repassword" dir="ltr" autoComplete= 'off' 
                        />
                    </div>
                    <div className="input-grid">
                        {/* <label htmlFor="profile-photo-upload" className='label' id="lab_certifi">Upload Certificate</label> */}
                        <input 
                            type="file" 
                            
                            placeholder='Upload Certificate'
                            onChange={(e)=> setCertificate(e.target.files[0])}
                            id="profile-photo-upload" dir="ltr" autoComplete= 'off'
                        />
                    </div>

                    <div className="input-grid">
                        {/* <label htmlFor="file-upload" className='label' id="lab_certifi">Upload Image</label> */}
                        <input 
                            type="file" 
                            accept='image/*'
                            placeholder='Upload Image'
                            onChange={(e)=> setProfilePhoto(e.target.files[0])}
                            id="file-upload" dir="ltr" 
                            style={{overflow: "hidden"}}
                            
                        />
                    </div>
                </form>
                <button className='signup-btn' onClick={() => handelSignUp()}>
                    <Link  id="btn"> Sign Up</Link>
                </button>
                <div className="login-link">
                    <p id="p1">Have an account? </p>
                    <Link to='/login' id="login">login</Link>
                </div>
                
            </div>
    
        </section>
    </div>
    
    );

}

export default Signup;