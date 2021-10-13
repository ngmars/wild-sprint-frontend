import * as actions from '../../../store/Actions/Index';
import MyFunds from '../../../Components/MyFunds/MyFunds';
import Spinner from '../../../Components/UI/Spinner/Spinner';
import {Redirect} from 'react-router-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Fundraiser.css';

class Myfunds extends Component {
    state={
        eventNameArr :[]
        
    }
    componentDidMount () {
        let token = localStorage.getItem('token')
        let userId = localStorage.getItem('userId');
        this.props.fetchMyFund(token,userId);
    };

    redirectStartHandler= ()=> {
        console.log('EVENT!')
        this.props.history.push('/startfund');
    }

    redirectWithdrawHandler= ()=> {
        console.log('EVENT!')
        this.props.history.push('/withdraw');
    }

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
        <MyFunds
         name={event.name}
         image={event.image}
         fundId={event.fundId}
           />
        ))
    }
    let TokenExpRedirect = null;
    if (!localStorage.getItem('token')){
        TokenExpRedirect =<Redirect to ='/'/>
    }

    let buttonStartFundraiser =(
        <button className="event-btn funds-btn" onClick={() => this.redirectStartHandler()}>
        START FUNDRAISER
    </button>
    )
    let buttonWithdraw =(
        <button className="event-btn funds-btn" href="/withdraw" onClick={() => this.redirectWithdrawHandler()}>
        WITHDRAW FUNDS
    </button>
    )
       

    
        return(
        <>
            <div className="intro" style={{display:"block"}}>
                <h2 className="title-1 hover-underline-animation">FUNDRAISERS</h2>               
            </div>  
            {buttonStartFundraiser}
            {buttonWithdraw}
            <div className="event-grid">{events}</div>
            {TokenExpRedirect}   
        </> 
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