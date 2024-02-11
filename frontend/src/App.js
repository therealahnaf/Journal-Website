import './App.css';
import { Navbar } from './Components/Navbar/Navbar';
import { LoginSignup } from './Components/LoginandSignup/LoginSignup';
import { BrowserRouter,Routes,Route, useLocation } from 'react-router-dom';
import Community from './Pages/Community';
import Journal from './Pages/Journal';
import Profile from './Pages/Profile';
import Home from './Pages/Home';
function App() {
  const location = useLocation();
  const isLoginOrSignup = location.pathname === '/';
  const isComm = location.pathname === '/Community';
  return (
    <div>
    {!isLoginOrSignup && <Navbar />}
    {isComm && <Community />}
    <Routes>
      <Route exact path="/" Component={LoginSignup} />
      <Route path="/Home" element={Home} />
      <Route path="/Profile" element={Profile} />
      <Route path="/Journal" element={Journal} />
      <Route path="/Community" element={Community} />
    </Routes>
    </div>
  );
}

export default App;
