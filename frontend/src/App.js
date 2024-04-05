import './App.css'
import { Navbar } from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Footer } from './Components/Footer/Footer';
import Community from './Pages/Community';
import Jounral from './Pages/Journal';
import Profile from './Pages/Profile';
import About from './Pages/About';
import Chat from './Pages/Chat';
import Details from './Pages/Details';
import Editprofile from './Pages/Editprofile';

import { useAuthContext } from './Hooks/useAuthContext'

function App() {
  const { user } = useAuthContext()
  const location = useLocation();
  const isHomeorLogin = location.pathname === '/' || location.pathname === '/Login' || location.pathname === '/Signup';
  const isLoggedIn = user !== null;

  return (
    <div>
      {isLoggedIn && !isHomeorLogin && <Navbar />}

      <Routes>
        <Route exact path="/" element={!isLoggedIn ? <Home /> : <Navigate to="/Profile" />} />
        <Route path="/Profile" element={isLoggedIn ? <Profile /> : <Navigate to="/" />} />
        <Route path="/Profile/Editprofile" element={isLoggedIn ? <Editprofile /> : <Navigate to="/" />} />
        <Route path="/Journal" element={isLoggedIn ? <Jounral /> : <Navigate to="/" />} />
        <Route path="/Community" element={isLoggedIn ? <Community /> : <Navigate to="/" />} />
        <Route path="/Community/Details/:id" element={isLoggedIn ? <Details /> : <Navigate to="/" />} />
        <Route path="/About" element={isLoggedIn ? <About /> : <Navigate to="/" />} />
        <Route path="/Chat" element={isLoggedIn ? <Chat /> : <Navigate to="/" />} />
        <Route path="/Login" element={!isLoggedIn ? <Login /> : <Navigate to="/Profile" />} />
        <Route path="/Signup" element={!isLoggedIn ? <Signup /> : <Navigate to="/Profile" />} />
      </Routes>

      {isLoggedIn && !isHomeorLogin && <Footer />}
    </div>
  );
}

export default App;
