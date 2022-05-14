import './App.css';
import Home from './components/Home';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard';
import Profile from './components/profile/Profile';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Login/>}></Route>
          <Route path="/signup" element={<Signup/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/home" element={<Home/>}>
            <Route path=":email/dashboard" element={<Dashboard/>}></Route>
            <Route path=":email/profile" element={<Profile/>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
