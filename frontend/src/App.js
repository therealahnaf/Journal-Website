import './App.css';
import { Navbar } from './Components/Navbar/Navbar';
import { LoginSignup } from './Components/LoginandSignup/LoginSignup';
import {Routes,Route, useLocation } from 'react-router-dom';
import {Footer} from './Components/Footer/Footer';
import {PostContent} from './Components/PostContent/PostContent';
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
      <Route path="/Community" element={<PostContent/>} />
    </Routes>
    {!isLoginOrSignup && <Footer />}
    </div>
  );
}

export default App;
