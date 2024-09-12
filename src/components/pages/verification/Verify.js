import React, { useState, useContext } from 'react'; 
import { Link, useNavigate } from 'react-router-dom'; 
import PlantBackground from './images/Rectangle 16.png'; 
import Logo from './images/logo.png'; 
import { FaSignInAlt } from 'react-icons/fa'; 
// import BackgroundImage from './images/background-image.png'; 
import './App.css'; 
import { useTranslation } from 'react-i18next'; 
import { ThemeContext } from './ThemeContext'; 
import LanguageSwitcher from './components/LanguageSwitcher'; 
 
const ThemeToggleButton = () => { 
  const { darkMode, toggleDarkMode } = useContext(ThemeContext); 
 
  return ( 
    <button onClick={toggleDarkMode} className="theme-toggle-button"> 
      {darkMode ? '☀️' : '🌙'} 
    </button> 
  ); 
}; 
 
function LogIn() { 
  const { t } = useTranslation(); 
  const { darkMode } = useContext(ThemeContext); 
  const navigate = useNavigate(); 
 
  const [identifier, setIdentifier] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [showModal, setShowModal] = useState(false); 
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']); 
  const [loginMessage, setLoginMessage] = useState(''); 
  const [loginError, setLoginError] = useState(false); 
 
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
 
  return ( 
    <div 
      className={`relative min-h-screen flex flex-col items-center justify-center p-4 font-poppins ${darkMode ? 'dark-mode' : ''}`} 
      // style={{ 
      //   backgroundImage: darkMode 
      //     ? "linear-gradient(to bottom, #334B2A 50%, #081C0B 100%)" 
      //     : url(${BackgroundImage}), 
      //   backgroundSize: "cover", 
      //   backgroundPosition: "center", 
      //   overflow: "hidden", 
      // }} 
    > 
      <nav className="navbar"> 
        <LanguageSwitcher /> 
        <ThemeToggleButton /> 
      </nav> 
 
      <div className={`absolute top-4 left-4 md:top-8 md:left-16 hidden lg:block ${darkMode ? 'text-dark-title' : 'text-black'}`}> 
        <img src={Logo} alt="Logo" className="w-20 xl:w-24" /> 
      </div> 
 
      <div 
        className={`absolute inset-0 flex items-center justify-center hidden lg:flex animate-slide-in-image ${darkMode ? 'bg-dark-overlay' : ''}`} 
      > 
        <img 
          src={PlantBackground} 
          alt="Plants Background" 
          className={`object-cover opacity-70 rounded-lg shadow-inner ${darkMode ? 'filter-dark' : ''}`} 
          style={{ 
            width: "400px", 
            height: "420px", 
            borderRadius: "50px", 
          }} 
        /> 
      </div> 
 
      <div 
        className={`relative z-10 flex flex-col items-center justify-center w-full max-w-lg p-6 ${darkMode ? 'bg-dark-form' : 'bg-[#6d996e]'} bg-opacity-90 backdrop-blur-lg rounded-lg shadow-[inset_0_0_50px_rgba(255,255,255,0.5)] animate-slide-in-form`} 
        style={{ 
          borderRadius: "50px", 
        }} 
      > 
        <div className={`text-center mb-4 ${darkMode ? 'text-dark-title' : 'text-black'}`}>
<h2 className="text-2xl sm:text-3xl font-bold mb-2"> 
            {t('login.title')} 
          </h2> 
          <FaSignInAlt className={`text-4xl sm:text-5xl mx-auto p-3 rounded-full shadow-md ${darkMode ? 'text-dark-title bg-gray-700' : 'text-black bg-white'}`} /> 
        </div> 
        <form className="space-y-4 w-full max-w-xs flex flex-col items-center" onSubmit={handleLogin}> 
          <div className="flex flex-col space-y-4 w-full"> 
            <input 
              type="text" 
              value={identifier} 
              onChange={(e) => setIdentifier(e.target.value)} 
              className={`mt-1 p-2 w-full border-b bg-transparent placeholder-white focus:outline-none text-sm ${darkMode ? 'text-dark-title border-gray-600 placeholder-gray-400' : 'text-white border-gray-300 placeholder-white'}`} 
              placeholder={t('login.emailPlaceholder')} 
            /> 
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className={`mt-1 p-2 w-full border-b bg-transparent placeholder-white focus:outline-none text-sm ${darkMode ? 'text-dark-title border-gray-600 placeholder-gray-400' : 'text-white border-gray-300 placeholder-white'}`} 
              placeholder={t('login.passwordPlaceholder')} 
            /> 
          </div> 
 
          <div className="flex flex-col space-y-4 mt-4 w-full"> 
            <button 
              type="submit" 
              className={`w-full py-3 rounded-full border border-white hover:bg-[#5a6c50] transition text-sm text-center ${darkMode ? 'bg-dark-button text-white' : 'bg-[#6c825a] text-white'}`} 
            > 
              {t('login.button')} 
            </button> 
 
            <div className={`text-center ${darkMode ? 'text-dark-title' : 'text-green-800'}`}> 
              <a 
                href="#forgot-password" 
                className={`hover:underline text-sm ${darkMode ? 'text-dark-title' : 'text-green-800'}`} 
              > 
                {t('login.forgotPassword')} 
              </a> 
            </div> 
 
            <div className={`text-center mt-2 text-sm ${darkMode ? 'text-dark-title' : 'text-white'}`}> 
              {t('login.noAccount')}{" "} 
              <Link to="/signup" className={`text-green-800 hover:underline ${darkMode ? 'text-dark-title' : ''}`}> 
                {t('login.signupLink')} 
              </Link> 
            </div> 
          </div> 
        </form> 
      </div> 
 
     {/* تعديل z-index للمودال */} 
{showModal && ( 
  <div 
    className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ${darkMode ? 'text-dark-title' : 'text-white'}`} 
    style={{ zIndex: 9999 }}  // إضافة zIndex هنا 
  > 
    <div className={`bg-white p-6 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}> 
      <h3 className="text-lg font-bold mb-4">Enter 2FA Code</h3> 
      <div className="flex space-x-2"> 
        {verificationCode.map((code, index) => ( 
          <input 
            key={index} 
            type="text" 
            value={code} 
            onChange={(e) => handleCodeChange(index, e.target.value)} 
            className={`w-10 h-10 text-center border rounded ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-100 text-black border-gray-300'}`} 
            maxLength={1} 
          /> 
        ))} 
      </div> 
      <div className="flex justify-between mt-4"> 
        <button 
          onClick={handleVerifyCode} 
          className={`py-2 px-4 rounded-full border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-[#6c825a] border-[#5a6c50] text-white'} hover:bg-[#5a6c50] transition`} 
        > 
          Verify 
        </button> 
        <button 
          onClick={handleResendCode} 
          className={`py-2 px-4 rounded-full border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-[#6c825a] border-[#5a6c50] text-white'} hover:bg-[#5a6c50] transition`} 
        > 
          Resend Code 
        </button> 
      </div> 
    </div>
</div> 
)} 
 
       
    </div> 
  ); 
} 
 
export default LogIn;
