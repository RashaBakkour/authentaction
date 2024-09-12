import React, { useState } from "react";
import logo from '../assets/logo.png';
import rafa from '../assets/pexels-rafa-de-21730-97260-removebg-preview 1.png';
import nietjuh from '../assets/pexels-nietjuh-1445416-removebg-preview 1.png';
import shottrotter from '../assets/pexels-shottrotter-1309769-removebg-preview 1.png';
import './Home.css';
import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

const Home = ()=>{

    const navigate = useNavigate();
    const [loggedOut, setLoggedOut] = useState(false); // Logout status

    const handleLogout = () => { 
        const token = localStorage.getItem('access_token'); 
    
        fetch('https://abdulrahman-bashir.trainees-mad-s.com/api/v1/auth/logout', { 
        method: 'POST', 
        headers: { 
            'Authorization': `Bearer ${token}`, 
        }, 
        }) 
        .then(response => { 
        console.log('Logout Response Status:', response.status); // Print the response status 
    
        if (response.ok) { 
            return response.json().then(data => ({ status: response.status, data })); 
        } else { 
            return response.text().then(text => ({ status: response.status, data: text })); 
        } 
        }) 
        .then(({ status, data }) => { 
        console.log('Logout Response Data:', data);// Print response data 
    
        if (status === 200) { 
            alert("You have been logged out successfully."); 
            localStorage.removeItem('access_token'); 
            localStorage.removeItem('token_type'); 
            localStorage.removeItem('expires_in'); 
            setLoggedOut(true); // Update logout status 
    
        } else { 
            alert("Error logging out. Please try again."); 
        } 
        }) 
        .catch(error => { 
        console.error('Error:', error); 
        alert("Error logging out. Please try again."); 
        }); 
    }; 
    
    const handleLoginRedirect = () => { 
        navigate('/login'); 
    };
//   {/* Logout/Login Button */} 
//             <button 
//               onClick={loggedOut ? handleLoginRedirect : handleLogout} 
//               className="px-4 py-2 border border-white rounded-full text-white font-semibold transition hover:bg-[#4b7c4a]" 
//               style={{ borderRadius: "46px" }} 
//             > 
//               {loggedOut ? t('log_in') : t('log_out')} 
//             </button>


    return(
        <>
        <div className="container">
            <nav className='logout-nav'>
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
            <section className="home-page">
                <div className="home">
                    <div className="home-button">
                        <button className="logout" 
                        onClick={loggedOut ? handleLoginRedirect : handleLogout} >
                            logout
                        </button>
                    </div>
                    <div className="home-content">
                        <h1 className="welcome">Welcome to our store</h1>
                        <div className="home-image">
                            <img className="img_1" src={rafa} style={{marginTop:"10px"}}></img>
                            <img className="img_2" src={nietjuh} style={{paddingLeft: "40px"}}></img>
                            <img className="img_3" src={shottrotter} style={{paddingBottom: "30px"}}></img>
                    
                        </div>
                    </div>
                </div>

            </section>
        </div>
        
        </>
    );
}

export default Home;