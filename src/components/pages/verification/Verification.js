/* eslint-disable jsx-a11y/img-redundant-alt */
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import loginImg from '../../assets/Rectangle 16.png';
import verify from '../../assets/verify.png';
import './Verification.css';
import { useState } from 'react';

const Verificartion = ()=>{
    
    const navigate = useNavigate(); 
   
    const [isResendSuccess, setIsResendSuccess] = useState(false); 
    const [isResendError, setIsResendError] = useState(false); 
    const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']); 
    const [isVerifySuccess, setIsVerifySuccess] = useState(false); 
    const [isVerifyError, setIsVerifyError] = useState(false); 
    const [isRedirecting, setIsRedirecting] = useState(false); 
    const [isLoading, setIsLoading] = useState(false); // For the loading state... 
   
    const [isResending, setIsResending] = useState(false); //For status loading during retransmission 
   
   
  // Retrieve email from localStorage 
  const email = localStorage.getItem('userEmail'); 
//   const authToken = localStorage.getItem('authToken');
   
    const handleResendCode = () => { 
      if (!email) { 
        setIsResendSuccess(false); 
        setIsResendError(true); 
        console.log("No email found in localStorage."); 
        return; 
      } 
   
      setIsResending(true); // start downloading 
   
   
      const formData = new FormData(); 
      formData.append('email', email); 
   
      fetch('https://abdulrahman-bashir.trainees-mad-s.com/api/v1/auth/resend-verification-code', { 
        method: "POST", 
        headers: { 
            // 'Authorization': Bearer ${authToken}, // Add token if required 
            'Accept': 'application/json', // Add headers as needed 
          }, 
        body: formData, 
      }) 
      .then(response => { 
        console.log("Response Status:", response); 
        setIsResending(false); 
   
        switch (response.status) { 
            case 200: 
                return response.json();  
            // case 403:   
            //     setIsResendSuccess(false);   
            //     setIsResendError(true);   
            //     console.log("Forbidden: You don't have permission to access this resource.");   
            //     return Promise.reject("Forbidden.");   
            case 404: 
                setIsResendSuccess(false); 
                setIsResendError(true); 
                console.log("Endpoint not found."); 
                return Promise.reject("Endpoint not found."); 
            case 400: 
                setIsResendSuccess(false); 
                setIsResendError(true); 
                console.log("Bad request."); 
                return Promise.reject("Bad request."); 
            default: 
                setIsResendSuccess(false); 
                setIsResendError(true); 
                console.log("An error occurred."); 
                return Promise.reject("An error occurred."); 
        } 
      }) 
      .then(data => { 
        console.log("Resend Response Data:", data); 
        if (data.access_token) { 
          localStorage.setItem('authToken', data.access_token); // Store the token in localStorage 
   
          setIsResendSuccess(true); 
          setIsResendError(false); 
        } else { 
          setIsResendSuccess(false); 
          setIsResendError(true); 
        } 
      }) 
      .catch(error => { 
        console.error("Resend Error:", error); 
        setIsResendError(true); 
      }); 
    }; 
   
    const handleVerifyCode = () => { 
      if (!email || verificationCode.join('') === '') { 
        setIsVerifySuccess(false); 
        setIsVerifyError(true); 
        console.log("No email or verification code entered."); 
        return; 
      } 
   
    //   setIsLoading(true); // بدء التحميل 
   
      const formData = new FormData(); 
      formData.append('email', email); 
      formData.append('verification_code', verificationCode.join('')); 
   
      fetch('https://abdulrahman-bashir.trainees-mad-s.com/api/v1/auth/verify-code', { 
        method: "POST",
        headers: { 
            // 'Authorization': Bearer ${authToken}, // Add token if required 
            'Accept': 'application/json', // Add headers as needed 
          }, 
        body: formData, 
      }) 
      .then(response => { 
        console.log("Verify Response Status:", response.status); 
        setIsLoading(false);  
   
        switch (response.status) { 
          case 200: 
        //   setTimeout(() => { 
        //     navigate("/login"); 
        // }, 5000);
            return response.json(); // Convert the response to JSON 
             
   
          case 400: 
            setIsVerifySuccess(false); 
            setIsVerifyError(true); 
            console.log("Bad request."); 
            return Promise.reject("Bad request."); 
          case 404: 
            setIsVerifySuccess(false); 
            setIsVerifyError(true);
            console.log("Endpoint not found."); 
            return Promise.reject("Endpoint not found."); 
          case 402: 
            setIsVerifySuccess(false); 
            setIsVerifyError(true); 
            console.log("Payment required."); 
            return Promise.reject("Payment required."); 
          default: 
            setIsVerifySuccess(false); 
            setIsVerifyError(true); 
            console.log("An error occurred."); 
            return Promise.reject("An error occurred."); 
        } 
      }) 
      .then(data => { 
        console.log("Verify Response Data:", data); 
        if (data.access_token) { 
          localStorage.setItem('authToken', data.access_token); // Store the token in localStorage 
   
          setIsVerifySuccess(true); 
          setIsVerifyError(false); 
          setIsRedirecting(true); 
   
        // Go to the login page 
        setTimeout(() => { 
                navigate("/login"); 
            }, 5000); 
            } else { 
            setIsVerifySuccess(false); 
            setIsVerifyError(true); 
            } 
        }) 
        .catch(error => { 
            console.error("Verify Error:", error); 
            setIsVerifyError(true); 
            // setIsLoading(false);// Stop downloading in case of error 
        }); 
    }; 
   
    const handleCodeChange = (index, value) => { 
      const newCode = [...verificationCode]; 
      newCode[index] = value; 
      setVerificationCode(newCode); 
    }; 

    return(
        
        <div className="container">
        <nav >
            <div className="logo" href="#">
                <img src = {logo} alt ='image'></img>
            </div>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
              <span className="navbar-toggler-icon"></span>
            </button>
            <button id="theme-switch">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Z"/></svg>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M480-280q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Z"/></svg>
            </button>
            <select name="" id="">
                <option value="en">English</option>
                <option value="ar">Arabic</option>
                <option value="fr">French</option>
                <option value="deu">Deutsch</option>
            </select>
          </nav>

        <section className="verification">

            <div className="img-left scrollVerify-left">
                <img src= {loginImg} alt= 'image'></img>
            </div>

            <div className="verify-right scrollVerify-right">
                <h1 id="h1">Inter Code</h1>
                <img src={verify} alt="image" width="100px" height="auto"></img>
                <h3 id="h3">The verification code has been sent to your email</h3>
                <p id="email">*****@gmail.com</p>
                <p id="code">The code consists of 6 digits containing letters and numbers and is valid for 10 minutes.</p>
                <form className='veriy-form'>
                    {verificationCode.map((code, index)=> (
                            <input  
                            key={index} 
                            className='verify-code' 
                            type="text" 
                            maxLength="1" 
                            value={code} 
                            onChange={(e) => handleCodeChange(index, e.target.value)} 
                        /> 
                           
                    ))}
                    
                </form>
                <button id="btn" type='submit' onClick={handleVerifyCode}  style={{marginBottom:"0"}}>
                        Verify
                </button>
                {isVerifyError && <p className='text-danger'>Verification failed. Please try again.</p>}
                {isVerifySuccess && <p className='text-success'>Verification successful</p>}
                {isResending && <p className='text-info'>Resending code.. </p>}
                <button id="btn"
                    onClick={handleResendCode} 
                    disabled={isResending} 
                    className={`w-full sm:w-80 py-3 rounded-full border transition text-sm ${ 
                        isResending 
                          ? "opacity-50 cursor-not-allowed"  
                          : "bg-[#6c825a] border-white hover:bg-[#5a6c50]" 
                      } text-white`} 
                    >
                        {isResending ? ("resending") : ("resendCode")} 
                     {/* Resend verification code */}
                </button>
                {/* {isResendSuccess && ( 
                    <p className="mt-4 text-green-500"> 
                    {("resendSuccess")} 
                    </p> 
                )} 
                {isResendError && ( 
                    <p className="mt-4 text-red-500"> 
                    {("resendError")} 
                    </p> 
                )} 
                {isVerifySuccess && ( 
                    <p className="mt-4 text-green-500"> 
                    {("verifySuccess")} 
                    </p> 
                )} 
                {isVerifyError && ( 
                    <p className="mt-4 text-red-500"> 
                    {("verifyError")} 
                    </p> 
                )}  */}
            </div>

        </section>
    </div>
    
    );

}

export default Verificartion;