/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from 'react';
import logo from '../../assets/logo.png';
import './ResendVerification.css'

function ResendVerification() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleResend = async () => {
        try {
            const formData = new FormData();  
            formData.append("email", email); 

            const response = await fetch('https://abdulrahman-bashir.trainees-mad-s.com/api/v1/auth/resend-verification-code', {  
                method: "POST",  
                body: formData, 
            }); 
            if (response.ok) {
                setMessage('Verification code sent to your email.');
            } else {
                setMessage('Error resending verification code.');
            }
        } catch (error) {
            console.error('Error resending verification code:', error);
            setMessage('Error resending verification code.');
        }
    };

    return (
        <div className='container'>
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
            <section>
                <div className='resend-verify'>
                    <div className='resendVrerify-code'>
                        <h1>Resend Verification Code</h1>
                        <form>
                            <div className="input-control">
                                <input 
                                    type="email" 
                                    className='input'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    name="email" id="email" 
                                />
                            </div>
                        </form>
                        <button className="resendVrerify-btn" onClick={handleResend}>
                            Resend Code
                        </button>
                        {message && <p>{message}</p>}
                    </div>
                    
                </div>
            </section>
            
           
        </div>
    );
}

export default ResendVerification;
