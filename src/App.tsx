import React from 'react';
import './App.css';
import { Navigate, Navigation, Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import loadable from '@loadable/component';

const Login = loadable(() =>  import('./pages/Login'));
const SignUp = loadable(() =>  import('./pages/SignUp'));

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/login' Component={Login}/>
        <Route path='/signup' Component={SignUp}/>
        <Route path='/' element={<Navigate to="/login" replace />}/>
      </Routes>
    </div>
  );
}

export default App;
