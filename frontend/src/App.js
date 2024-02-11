import './App.css';
import { Navbar } from './Components/Navbar/Navbar';
import { LoginSignup } from './Components/LoginandSignup/LoginSignup';
import { BrowserRouter,Routes,Route, useLocation } from 'react-router-dom';
import {Footer} from './Components/Footer/Footer';
function App() {
  const location = useLocation();
  const isLoginOrSignup = location.pathname === '/';
  return (
    <div>
    {!isLoginOrSignup && <Navbar />}
    
    <Routes>
      <Route exact path="/" Component={LoginSignup} />
      <Route path="/Home" element={<div>test</div>} />
      <Route path="/Profile" element={<div>test</div>} />
      <Route path="/Journal" element={<div>test</div>} />
      <Route path="/Community" element={<div>test</div>} />
    </Routes>
    <Footer/>
    </div>
  );
}

export default App;
