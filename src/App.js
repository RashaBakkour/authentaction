
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Signup from './components/pages/signup/Signup';
import Login from './components/pages/login/Login';
import Verificartion from './components/pages/verification/Verification';
import Home from './components/pages/Home';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
            <Route path='/'  element={<Navigate to ='/signup' />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/verify" element={<Verificartion />} />
            <Route path="/home" element={<Home />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
