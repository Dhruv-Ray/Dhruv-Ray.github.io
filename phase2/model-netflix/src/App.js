// import logo from './logo.svg';
import './App.css';
// import Featured from './components/featured';
// import ForYou from './components/foryou';
// import TopBar from './components/topbar';
import Home from './components/home';
import Login from './components/login/login';
import './index.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path = "/home" element= {<Home/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
