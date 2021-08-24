import * as actions from '../../../store/Actions/Index';
import Event from '../../../Components/Events/Event';
import MyFund from '../../../Components/MyFunds/MyFunds';
import Spinner from '../../../Components/UI/Spinner/Spinner';
import {Redirect} from 'react-router-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavbarComp from "../../../Components/NavbarComponent/NavbarComponent"
import { Button } from 'antd';

class Myfunds extends Component {
    state={
        eventNameArr :[]
        
    }
    componentDidMount () {
        let token = localStorage.getItem('token')
        let userId = localStorage.getItem('userId');
        this.props.fetchMyFund(token,userId);
    };

    render(){
    //let eventsArr = this.props.events.events;
    //console.log(eventsArr.length,"THIS IS MAIN");
    console.log("THIS PAGE NOEEE",this.props.myFunds)
    let events = <Spinner/>;
    if ( !this.props.loading ) {
        let myFundsArr= this.props.myFunds;
        for (let i=0;i<myFundsArr.length;i++){
            //console.log(i);
            this.state.eventNameArr.push({
                
                description: myFundsArr[i].description,
                habitat: myFundsArr[i].habitat,
                name: myFundsArr[i].name,
                scfname: myFundsArr[i].scfname,
                name: myFundsArr[i].name,
                image: myFundsArr[i].image
            });
         console.log('EVENT NAME',this.state.eventNameArr) 
        }
    
    events = this.state.eventNameArr.map( event => (
     //console.log("NOOB",event.name),
        <MyFund
         name={event.name}
         image={event.image}
         scfname={event.scfname}
           />
        ))
    }
    let TokenExpRedirect = null;
    if (!localStorage.getItem('token')){
        TokenExpRedirect =<Redirect to ='/'/>
    }

    let buttonStartFundraiser =(
        <Button href="/StartFundForm" type="primary" block>
        START FUNDRAISER
    </Button>
    )
    let buttonWithdraw =(
        <Button href="/withdraw" type="primary" block>
        WITHDRAW FUNDS
    </Button>
    )
       

    
        return(
            <div className="myfunds">
                <NavbarComp name={localStorage.getItem("name")} role={localStorage.getItem("role")} item="fundraiser"/>
                <div class="fund-pics row">
                
                <h2 className="yourFund">YOUR FUNDRAISERS</h2>
                {buttonStartFundraiser}<br/><br/>{buttonWithdraw}<br/><br/><br/><br/>
                <div className="row">{events}</div>
                {TokenExpRedirect}
                </div>
                
            </div>

        )
    }
}


const mapSignInDispatchToProps =dispatch => {
  
    return{
        fetchMyFund:(token,userId) =>dispatch(actions.fetchMyFund(token,userId))
    };
};
const mapStatetoProps = state =>{
    console.log('main page',state.myFund.myFunds
    )
    return {
        events:state.events,
        loading:state.events.loading,
        token:state.auth.token,
        myFunds: state.myFund.myFunds,
    };
};


export default connect(mapStatetoProps, mapSignInDispatchToProps)(Myfunds);