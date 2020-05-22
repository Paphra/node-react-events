import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';

import Header from "./static/Header";
import Footer from "./static/Footer";

import Home from './Home'
import About from './About'
import All from './events/All';
import History from './History'

import Admin from './admin/Admin'

function App() {
  
  return (
    <>
      <Header user={{}}/>
      <div>
        <Switch>
          <Route path="/history">
            <div id="content" className="container">
              <History />
            </div>
          </Route>
          <Route path="/events">
            <div id="content" className="container">
              <All />
            </div>
          </Route>
          <Route path="/about">
            <div id="content" className="container">
              <About />
            </div>
          </Route>
          <Route path="/admin">
            <div id="content" className="container">
              <Admin />
            </div>
          </Route>
          <Route path="/">
            <Home />
          </Route>
          
        </Switch>
        
      </div>
      <Footer />
    </>
  );
}

export default App;
