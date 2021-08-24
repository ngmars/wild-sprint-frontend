import React from 'react';
import './App.css';
import {Switch, Route, Redirect, withRouter} from "react-router-dom";
import Auth from'./Container/Auth/Auth';
import CreateFundraiser from './Container/Dashboard/StartFundraiser/StartFundraiser';
import Logout from'./Container/Auth/Logout/Logout';
import ProfileDisp from './Container/Dashboard/Profile/Profile';
import Events from './Container/Dashboard/Events/Events';
import MyFund from './Container/Dashboard/Fundraiser/Fundraiser';
import MyBills from './Container/Dashboard/MyBills/MyBills'
import OneFundDeets from './Container/Dashboard/OneFundDeets/OneFundDeets';
import DonateEvent from './Container/Dashboard/Donate/Donate';
import Gallery from './Container/Dashboard/Gallery/Gallery';
import DyteMeet from './Container/Dashboard/Dyte/Dyte';
import BlockChain from './Components/BlockChain';
import WithdrawPage from './Container/Dashboard/Fundraiser/withdraw';
import NavbarComponent from './Components/NavbarComponent/NavbarComponent';

const App = ({ location }) => {

    return (
      <div className="App">

        {location.pathname !== '/login' &&  <NavbarComponent role={localStorage.getItem("role")} name={localStorage.getItem("name")} />}
        
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/login" />} />
          <Route exact path="/login" component={Auth}/>
          <Route exact path="/events" component={Events}/>
          <Route exact path="/logout" component={Logout}/>
          <Route exact path="/profile" component={ProfileDisp}/>
          <Route exact path="/fund" component={MyFund}/>
          <Route exact path="/startfund" component={CreateFundraiser}/>
          <Route exact path="/onefund" component={OneFundDeets}/>
          <Route exact path="/donate" component={DonateEvent}/>
          <Route exact path="/mybills" component={MyBills}/>
          <Route exact path="/gallery" component={Gallery}/>
          <Route exact path="/dyte" component={DyteMeet}/>
          <Route exact path="/blockchain" component={BlockChain}/>
          <Route exact path="/withdraw" component={WithdrawPage}/>
        </Switch> 
      </div>
    );
}

export default withRouter(App);