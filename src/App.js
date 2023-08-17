import './App.css';
// import Image from "./components/Image"
import Sign from "./components/Sign"
import Show from './components/Show';
import Login from './components/Logins';
import { Route ,Routes } from 'react-router-dom';
function App() {

 
  // console.log("url",url);
  return (
    <div className="App">
       <Routes>
        <Route path="/" element={<Sign/>} />   
        <Route path="/login" element={<Login/>} />
        <Route path="/show" element={<Show/>}/>
       </Routes>
    </div>
  );
}

export default App;
