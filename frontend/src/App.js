import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ErrorPage from './pages/ErrorPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import UserPage from './pages/UserPage';
import Navbar from './components/Navbar';
import LanguageSelector from './components/LanguageSelector';
import { changeLanguage } from './api/ApiCall';
import { useSelector } from 'react-redux';

const App=()=> { 
  const { isLoggedIn }=useSelector(store=>({isLoggedIn:store.isLoggedIn}));

  useEffect(()=>changeLanguage('en'),[]);

  return (
    <div>
      <Navbar />
      <div className="container">
        <Switch>
          <Route path='/' exact strict component={HomePage} />
          {
            !isLoggedIn &&
            <Route path='/signup' exact strict component={SignupPage} />
          }
          {
            !isLoggedIn &&
            <Route path='/login' exact strict component={LoginPage} />
          }
          <Route path='/user/:username' exact strict component={UserPage} />
          <Route exact strict component={ErrorPage} />
        </Switch>
        <LanguageSelector />
      </div>
    </div>
  );
}

export default App;