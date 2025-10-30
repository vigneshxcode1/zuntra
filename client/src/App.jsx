import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from "./pages/Register";
import Login from "./pages/Login";
import DashBroad from "./pages/DashBroad";
import Home from "./pages/Home";
import Taskpage from "./pages/Taskpage";
import Chat from "./pages/Chat";

function App() {
 

  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/dashbroad" element={<DashBroad/>}/>
      <Route path="/taskpage" element={<Taskpage/>}/>
      <Route path="/chatpage" element={<Chat/>}/>
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
