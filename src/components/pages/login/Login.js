/* eslint-disable jsx-a11y/img-redundant-alt */
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import loginImg from '../../assets/Rectangle 16.png';
import './Login.css';
import { useState } from 'react';

const Login = ()=>{

    const navigate = useNavigate();
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    // const [error, setError] = useState('');
    const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']); 
    const [showModal, setShowModal] = useState(false); 
    const [loginMessage, setLoginMessage] = useState(''); 
    const [loginError, setLoginError] = useState(false);

    // const refreshToken = async()=> {
    //     let access_token = localStorage.getItem('access_token');

    //     try {
    //         const response = await fetch('https://abdulrahman-bashir.trainees-mad-s.com/api/v1/auth/refresh-token', {
    //             method: 'GET',
    //             headers: {
    //                 'Authorization': `Bearer ${access_token}`,
    //                 'Accept': 'application/json',
    //             },
    //             // body: JSON.stringify({ refreshToken: localStorage.getItem('refreshToken') }),
    //         });
        
    //         if (response.ok) {
    //             const data = await response.json();
    //             localStorage.setItem('accessToken', data.access_token);
    //             console.log('Token refreshed');
    //         } else {
    //             console.log('Failed to refresh token');
    //             logout();
    //         }
    //         } catch (error) {
    //             console.error('Error:', error);
    //         }
    // };

    // const handleLogin = async(e)=>{
    //     e.preventDefault();

    //     if (!identifier){
    //         console.log("Email is required.");
    //         return;
    //     }
    //     if (!password){
    //         console.log("Password is required.");
    //         return;
    //     }
    //     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //     if (!emailPattern.test(identifier)) {
    //         console.log("Please enter a valid email address.");
    //         // setError('Please enter a valid email address.')
    //         return; 
    //     }
    //     if (password.length < 8) {
    //         console.log("The password must be at least 8 characters long.");
    //         // setError('The password must be at least 8 characters long.');
    //         return; 
    //     }
    //     const formData= {
    //         identifier: identifier,
    //         password: password
    //     };
        
    //     // const formData = new FormData(); 
    //     // formData.append('email', email); 
    //     // formData.append('password', password); 
    //     try{
    //         const response =await fetch('https://abdulrahman-bashir.trainees-mad-s.com/api/v1/auth/login', { 
    //             method: "POST",
    //             headers: { 
    //                 'Accept': 'application/json', // Add headers as needed 
    //                 'Content-Type': 'application/json' 
    //             }, 
    //             body: JSON.stringify(formData),
    //         });

    //         console.log("Response Status:", response.status);

    //         const data = await response.json();
    //         if(response.ok){
    //             console.log("Success:", response.status);
    //             setError("your login registerd successfully!");
    //             setShowModal(true);
    //             localStorage.setItem('authToken', data.access_token); // Store the token in localStorage 
    //             localStorage.setItem('refreshToken', data.refreshToken);
    //             // refreshToken();

    //             setTimeout(()=>{
    //                 navigate("/home");
    //             },2000);
    //         }else{
    //             console.log("Error Response Data:", data);
    //             setError(error.message || 'Incorrect login details');
    //         }
    //     }catch (error){
    //             console.log("Request failed:", error.message);
    //             setError('An error occurred. Please try again later.');
    //         }
    // };

    // const logout = () => {
    //     localStorage.removeItem('access_token');
    //     localStorage.removeItem('refreshToken');
    //     console.log('User logged out');
    // };

    const handleLogin = (event) => { 
        event.preventDefault(); 
     
        const formData = new FormData(); 
        formData.append('identifier', identifier); 
        formData.append('password', password); 
     
        fetch('https://abdulrahman-bashir.trainees-mad-s.com/api/v1/auth/login', { 
          method: 'POST', 
          body: formData, 
        }) 
        .then(response => { 
          console.log('Login Response Status:', response.status); // Print the response status 
     
          if (response.ok) { 
            return response.json().then(data => ({ status: response.status, data })); 
          } else { 
            return response.text().then(text => ({ status: response.status, data: text })); 
          } 
        }) 
     
     
        .then(({ status, data }) => { 
          console.log('Login Response Data:', data); // Print response data 
     
          if (status === 200) { 
            setLoginMessage("User logged in successfully, we sent a 2FA code to your email. Please check it."); 
            setLoginError(false); 
            setShowModal(true); // Display the verification window 
     
          } else { 
            setLoginMessage("Error logging in. Please check your credentials."); 
            setLoginError(true); 
            // setError('Incorrect login details')
          } 
        }) 
        .catch(error => { 
          console.error('Error:', error); 
          setLoginMessage("Error logging in. Please try again."); 
          setLoginError(true); 
        }); 
      }; 

    const handleCodeChange = (index, value) => { 
        const newCode = [...verificationCode]; 
        newCode[index] = value; 
        setVerificationCode(newCode); 
      }; 
     
      const handleVerifyCode = () => { 
        const code = verificationCode.join(''); 
     
        const formData = new FormData(); 
        formData.append('email', identifier); 
        formData.append('TwoFactorAuth', code); 
     
        fetch('https://abdulrahman-bashir.trainees-mad-s.com/api/v1/auth/confirm-2fa-code', { 
          method: 'POST', 
          body: formData, 
        }) 
        .then(response => { 
          console.log('Verify Code Response Status:', response.status); // Print the response status 
          if (response.ok) { 
            return response.json().then(data => ({ status: response.status, data })); 
          } else { 
            return response.text().then(text => ({ status: response.status, data: text })); 
          } 
        }) 
        .then(({ status, data }) => { 
          console.log('Verify Code Response Data:', data); // Print response data 
          if (status === 200) { 
            setLoginMessage("Verification successful!"); 
            setLoginError(false); 
            localStorage.setItem('access_token', data.access_token); 
            localStorage.setItem('token_type', data.token_type); 
            localStorage.setItem('expires_in', data.expires_in); 
     
            // Request to renew the token after successful verification... 
     
            return fetch('https://abdulrahman-bashir.trainees-mad-s.com/api/v1/auth/refresh-token', { 
              method: 'GET',
    headers: { 
                'Authorization': `Bearer ${data.access_token}`, 
              }, 
            }) 
              .then(response => { 
                console.log('Refresh Token Response Status:', response.status);  
                if (response.ok) { 
                  return response.json().then(data => ({ status: response.status, data })); 
                } else { 
                  return response.text().then(text => ({ status: response.status, data: text })); 
                } 
              }) 
              .then(({ status, data }) => { 
                console.log('Refresh Token Response Data:', data);  
                if (status === 200) { 
                  // Store the renewed token 
     
                  localStorage.setItem('access_token', data.access_token); 
                  localStorage.setItem('expires_in', data.expires_in); 
                } else { 
                  console.error("Error refreshing token."); 
                } 
              }); 
          } else { 
            setLoginMessage("Invalid verification code. Please try again."); 
            setLoginError(true); 
          } 
        }) 
        .then(() => { 
          navigate('/home'); 
        }) 
        .catch(error => { 
          console.error('Error:', error); 
          setLoginMessage("Error verifying code. Please try again."); 
          setLoginError(true); 
        }); 
      }; 
     
      const handleResendCode = () => { 
        const formData = new FormData(); 
        formData.append('email', identifier); 
     
        fetch('https://abdulrahman-bashir.trainees-mad-s.com/api/v1/auth/resend-2fa-code', { 
          method: 'POST', 
          body: formData, 
        }) 
        .then(response => { 
          console.log('Resend Code Response Status:', response.status);     
          if (response.ok) { 
            return response.json().then(data => ({ status: response.status, data })); 
          } else { 
            return response.text().then(text => ({ status: response.status, data: text })); 
          } 
        }) 
        .then(({ status, data }) => { 
          console.log('Resend Code Response Data:', data);  
          if (status === 200) { 
            setLoginMessage("2FA code has been resent to your email."); 
            setLoginError(false); 
          } else { 
            setLoginMessage("Error resending 2FA code. Please try again."); 
            setLoginError(true); 
          } 
        }) 
        .catch(error => { 
          console.error('Error:', error); 
          setLoginMessage("Error resending code. Please try again."); 
          setLoginError(true); 
        }); 
      }; 

    return(
        <div className="container">
        <nav className='login-nav'>
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
        
        
        <section className="online-store">
    
            <div className="login-right scroll-left" id="login">
                <div className="login">
                    <h1 id="h1">LOGIN</h1>
                    <form id="form" action="/">
                        <div className="input-control">
                            {/* <label htmlFor="email" className="lab" id="lab_email">Email</label> */}
                            <input 
                                type="email" 
                                value={identifier} 
                                onChange={(e) => setIdentifier(e.target.value)} 
                                placeholder="Email"
                                className='input' 
                                name="email" id="email" autoComplete= 'off'
                            />
                            {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}
                        </div>
                        <div className="input-control">
                            {/* <label htmlFor="password" className="lab" id="lab_password">Password</label> */}
                            <input 
                                type="password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                placeholder="Password"
                                className='input' 
                                name="password" id="password" autoComplete= 'off'
                            />
                            {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}
                        </div>
                        {/* <div className="input-control">
                            <label htmlFor="number" className="lab" id="lab_number">Phone Number</label>
                            <input type="number" className='input' name="number" id="number" />
                            <div className="error"></div>
                        </div> */}

                        

                    
                        <button className="login-btn" onClick={handleLogin}>login</button>
                        <p className="page-link">
                            <span className="page-link-label" id="p1">Forgot Password</span>
                        </p>
                        <div className="link">
                            <p className="sign-in-label" id="p2">
                                Don't have an account? 
                            </p>
                            <Link to='/signup' className="sign-in-link"  id="signUp" >Signup</Link>
                        </div>
                        {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}
                       
                    </form>
                    
                </div>
                {showModal && (
                    <div 
                    className= "towFA fixed inset-0 flex items-center justify-center "
                    style={{ zIndex: 9999 }}  // إضافة zIndex هنا 
                    > 
                    <div className="towFA-form  p-6 rounded-lg shadow-lg "> 
                        <h3 className="towFA-text ">Enter 2FA Code</h3> 
                        <div className="towFA-input flex space-x-2"> 
                            {verificationCode.map((code, index) => ( 
                            <input 
                                key={index} 
                                type="text" 
                                value={code} 
                                onChange={(e) => handleCodeChange(index, e.target.value)} 
                                className= "towFA-code w-10 h-10 text-center border rounded " 
                                maxLength={1} 
                            /> 
                            ))} 
                        </div> 
                        <div className="towFA-button  flex justify-between mt-4"> 
                            <button 
                            onClick={handleVerifyCode} 
                            className= "towFA-verify py-2 px-4 rounded-full " 
                            > 
                            Verify 
                            </button> 
                            <button 
                            onClick={handleResendCode} 
                            className="towFA-resend py-2 px-4 rounded-full " 
                            > 
                            Resend Code 
                            </button> 
                        </div> 
                    </div>
                </div> 
                )}
                
            </div>

            <div className="img-left scroll-right">
                <img src= {loginImg} alt= 'image'></img>
            </div>
    
        </section>
    </div>
    
    );

}

export default Login;