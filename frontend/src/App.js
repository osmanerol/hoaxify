import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ErrorPage from './pages/ErrorPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import Navbar from './components/Navbar';
import LanguageSelector from './components/LanguageSelector';
import { changeLanguage } from './api/ApiCall';
import { withTranslation } from 'react-i18next';

class App extends Component {
  constructor(){
    super();
    changeLanguage('en');
  }
  
  render() {
    const { i18n }=this.props;
    return (
      <div>
        <Navbar />
        <div className="container">
          <Switch>
            <Route path='/' exact strict component={HomePage} />
            <Route path='/signup' exact strict component={SignupPage} />
            <Route path='/login' exact strict component={LoginPage} />
            <Route exact strict component={ErrorPage} />
          </Switch>
          <LanguageSelector i18n={i18n} />
        </div>
      </div>
    );
  }
}

const AppWithTranslation=withTranslation()(App);

export default AppWithTranslation;