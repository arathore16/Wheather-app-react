import React from 'react';
import './App.css';
import { BrowserRouter as Router,Switch,Route,Redirect } from "react-router-dom";
import Countary from "./components/country/Country";
import CountryDetail from "./components/countryDetail/CountatyDetail";
class App  extends React.PureComponent<{},{}>{
  render(){
    return (
      <Router >
          <Switch>
              <Route path="/country" component={Countary}>
              </Route>
              <Route path="/countryDetail" component={CountryDetail}>
              </Route>
              <Redirect from="/" to="/country" exact></Redirect>
          </Switch>
      </Router>
    );
  }
  
}

export default App;
