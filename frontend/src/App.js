import { Navbar } from './Components/Navbar/Navbar';
import {Home} from './Components/Home/Home';
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import {Routes,Route, useLocation } from 'react-router-dom';
import {Footer} from './Components/Footer/Footer';
import {PostContent} from './Components/PostContent/PostContent';
function App() {
  const location = useLocation();
  const isHomeorLogin = location.pathname === '/' || location.pathname === '/Login' || location.pathname === '/Signup';
  return (
    <div>
    {!isHomeorLogin && <Navbar />}
    
    <Routes>
      <Route exact path="/" element={<Home/>} />
      <Route path="/Profile" element={<div>test</div>} />
      <Route path="/Journal" element={<div>test</div>} />
      <Route path="/Community" element={<PostContent/> } />
      <Route path="/About" element={<div>Test</div> } />
      <Route path="/Login" element={<Login/> } />
      <Route path="/Signup" element={<Signup/> } />
    </Routes>
    {!isHomeorLogin && <Footer />}
    </div>
  );
}

export default App;
