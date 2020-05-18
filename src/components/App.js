import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';

import Header from "./static/Header";
import Footer from "./static/Footer";

import Home from './Home'
import About from './About'
import AllEvents from './events/AllEvents'
import History from './History'

import Admin from './admin/Admin'

function App() {
  
  return (
    <>
      <Header user={{}}/>
      <div id="content" className="container">
        <Switch>
          <Route path="/history">
            <History />
          </Route>
          <Route path="/events">
            <AllEvents />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/admin">
            <Admin />
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
