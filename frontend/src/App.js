import './App.css';
import { Navbar } from './Components/Navbar/Navbar';
import { LoginSignup } from './Components/LoginandSignup/LoginSignup';
import { BrowserRouter,Routes,Route, useLocation } from 'react-router-dom';
import Community from './Pages/Community';
import journal from './Pages/journal';
import profile from './Pages/profile';
import home from './Pages/home';
function App() {
  const location = useLocation();
  const isLoginOrSignup = location.pathname === '/' || location.pathname === '/signup';
  return (
    <div>
    {!isLoginOrSignup && <Navbar />}
    <Routes>
      <Route exact path="/" Component={LoginSignup} />
      <Route path="/home" element={home} />
      <Route path="/profile" element={profile} />
      <Route path="/journal" element={journal} />
      <Route path="/Community" element={Community} />
    </Routes>
    </div>
  );
}

export default App;
