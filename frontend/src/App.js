import './App.css';
import { Navbar } from './Components/Navbar/Navbar';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element = {<home/>}/>
        <Route path='/journal' element = {<journal/>}/>
        <Route path='/community' element = {<community/>}/>
        <Route path='/profile' element = {<profile/>}/>
        <Route path='/chat' element = {<chat/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
