import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ErrorPage from './pages/ErrorPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import UserPage from './pages/UserPage';
import Navbar from './components/Navbar';
import LanguageSelector from './components/LanguageSelector';
import { changeLanguage } from './api/ApiCall';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';

class App extends Component {
  constructor(){
    super();
    changeLanguage('en');
  }
  
  render() {
    const { i18n, isLoggedIn }=this.props;
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
          <LanguageSelector i18n={i18n} />
        </div>
      </div>
    );
  }
}

const AppWithTranslation=withTranslation()(App);

const mapStateToProps=store=>{
  return store;
}
export default connect(mapStateToProps)(AppWithTranslation);