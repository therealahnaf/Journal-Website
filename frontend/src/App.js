import './App.css';
import { Navbar } from './Components/Navbar/Navbar';
import { LoginSignup } from './Components/LoginandSignup/LoginSignup';
import { BrowserRouter,Routes,Route, useLocation } from 'react-router-dom';
function App() {
  const location = useLocation();
  const isLoginOrSignup = location.pathname === '/' || location.pathname === '/signup';
  return (
    <div>
    {!isLoginOrSignup && <Navbar />}
    <Routes>
      <Route exact path="/" Component={LoginSignup} />
      <Route path="/home" element={<home/>} />
      <Route path="/profile" element={<profile/>} />
      <Route path="/home" element={<journal/>} />
      <Route path="/profile" element={<community/>} />
    </Routes>
    </div>
  );
}

export default App;
