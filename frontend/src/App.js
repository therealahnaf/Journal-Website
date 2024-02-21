import './App.css'
import { Navbar } from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import {Routes,Route, useLocation, Navigate } from 'react-router-dom';
import {Footer} from './Components/Footer/Footer';
import  Community  from './Pages/Community';
import Jounral from './Pages/Journal';
import Profile from './Pages/Profile';
import  About  from './Pages/About';
import Chat from './Pages/Chat';

import { useAuthContext } from './Hooks/useAuthContext'
function App() {
  const { user } = useAuthContext()
  const location = useLocation();
  const isHomeorLogin = location.pathname === '/' || location.pathname === '/Login' || location.pathname === '/Signup';
  return (
    <div>
    {!isHomeorLogin && <Navbar />}
    
    <Routes>
      <Route exact path="/" element={<Home/> } />
      <Route path="/Profile" element={user ? <Profile/> : <Navigate to="/"/>} />
      <Route path="/Journal" element={user ? <Jounral/> : <Navigate to="/"/> } />
      <Route path="/Community" element={user ? <Community/> : <Navigate to="/"/>} />
      <Route path="/About" element={user ? <About/>  : <Navigate to="/"/>} />
      <Route path="/Chat" element={user ? <Chat/>  : <Navigate to="/"/>} />
      <Route path="/Login" element={!user ? <Login /> : <Navigate to="/Profile" />} />
      <Route path="/Signup" element={!user ? <Signup /> : <Navigate to="/Profile" />} />
    </Routes>
    {!isHomeorLogin && <Footer />}
    </div>
  );
}

export default App;
