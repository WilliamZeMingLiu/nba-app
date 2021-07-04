import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Home from '../Home/Home';
import Players from '../Players/Players';
import Teams from '../Teams/Teams';
import Compare from '../Compare/Compare';

export default function App() {

  return (
    <div className="app">
        <Router>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/players">
              <Players />
            </Route>
            <Route exact path="/teams">
              <Teams />
            </Route>
            <Route exact path="/compare">
              <Compare />
            </Route>
          </Switch>
        </Router>
    </div>
  );
}