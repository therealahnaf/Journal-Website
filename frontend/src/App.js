import './App.css'
import { Navbar } from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import {Routes,Route, useLocation } from 'react-router-dom';
import {Footer} from './Components/Footer/Footer';
import  Community  from './Pages/Community';
import Jounral from './Pages/Journal';
import Profile from './Pages/Profile';
import  About  from './Pages/About';
function App() {
  const location = useLocation();
  const isHomeorLogin = location.pathname === '/' || location.pathname === '/Login' || location.pathname === '/Signup';
  return (
    <div>
    {!isHomeorLogin && <Navbar />}
    
    <Routes>
      <Route exact path="/" element={<Home/> } />
      <Route path="/Profile" element={<Profile/> } />
      <Route path="/Journal" element={<Jounral/> } />
      <Route path="/Community" element={<Community/>} />
      <Route path="/About" element={<About/> } />
      <Route path="/Login" element={<Login/> } />
      <Route path="/Signup" element={<Signup/> } />
    </Routes>
    {!isHomeorLogin && <Footer />}
    </div>
  );
}

export default App;
