import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Register from './components/Register';
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import PageNotFound from './components/PageNotFound';
import { Routes, Route } from 'react-router-dom';
import TokenContext from './myContext/TokenContext';
import DashContext from './myContext/DashContext';
import { useState } from 'react';
import Aos from 'aos';
import { Toaster } from 'sonner';

function App() {
  Aos.init()
  const [token, setToken] = useState("")
  const [dash, setDash] = useState({})
  return (
    <>
      <TokenContext.Provider value={{token, setToken}}>
      <DashContext.Provider value={{dash, setDash}}>
        <Toaster position="top-right" richColors/>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />}/>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/*' element={<PageNotFound />} />
        </Routes>
      </DashContext.Provider>
      </TokenContext.Provider>
    </>
  );
}

export default App;
