import './OneFundDeets.css';
import * as actions from '../../../store/Actions/Index';
import {Redirect} from 'react-router-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import dBank from '../../../abis/dBank.json'
import Token from '../../../abis/Token.json'
import Web3 from 'web3';
import {Row, Col} from 'react-bootstrap';

class OneFundDeets extends Component {
    state={
        eventNameArr :[],
        meetingName: null,
        meetingId: null,        
    }
    
    async componentDidMount () {
        await this.loadBlockchainData(this.props.dispatch)
        await this.props.onFetchOneEvents();
        let token = localStorage.getItem('token')
        let userId = localStorage.getItem('userId')

    };
    async loadBlockchainData(dispatch) {
        if(typeof window.ethereum!=='undefined'){
          const web3 = new Web3(window.ethereum)
          const netId = await web3.eth.net.getId()
    
          await window.ethereum.enable();
    
          const accounts = await web3.eth.getAccounts()
    
          //load balance
          
          if(typeof accounts[0] !=='undefined' ){
            const balance = await web3.eth.getBalance(accounts[0]) 
          
            const dbank = new web3.eth.Contract(dBank.abi, dBank.networks[netId].address);
            
          
                
                dbank.methods.displayTotalAmt().call().then( function (result) {
                document.getElementById("id1").innerHTML= web3.utils.fromWei(result);
              });
      
                dbank.methods.displayWithdrawnAmt().call().then( function (result) {
                document.getElementById("id2").innerHTML= web3.utils.fromWei(result);
              });
      
                dbank.methods.displayRemaining().call().then( function (result) {
                document.getElementById("id3").innerHTML= web3.utils.fromWei(result);
              });
      
            
           
            this.setState({account0: accounts[0],account1: accounts[1], balance: balance, web3: web3})
          } else {
            window.alert('Please login with MetaMask')
          }
    
          //load contracts
          try {
            const token = new web3.eth.Contract(Token.abi, Token.networks[netId].address)
            const dbank = new web3.eth.Contract(dBank.abi, dBank.networks[netId].address)
            const dBankAddress = dBank.networks[netId].address
            this.setState({token: token, dbank: dbank, dBankAddress: dBankAddress})
          } catch (e) {
            console.log('Error', e)
            window.alert('Contracts not deployed to the current network')
          }
    
        } else {
          window.alert('Please install MetaMask')
        }
      }
    redirectHandler= ()=> {
        console.log('EVENT!')
        this.props.history.push('/Donate');
    }

    redirectViewHandler= ()=> {
        console.log('EVENT!')
        this.props.history.push('/Dyte');
    }
    
    render(){
    let viewButton =(
        <button class="fund-view-btn" name="btnAddMore" value="DONATE!" href="/Dyte" onClick={() => this.redirectViewHandler()}>View Live Stream</button>
    )
    let donateButton =(
        <button class="fund-donate-btn" name="btnAddMore" value="DONATE!" href="/Donate" onClick={() => this.redirectHandler()}>DONATE NOW!</button>
    )
    let oneEvent;
    let name = this.props.name;
    let scfname = this.props.scfname;
    let habitat = this.props.habitat;
    let status = this.props.status;
    let fullStatus = '';
    switch(status){
        case 'EX':
            fullStatus = 'Extinct';
            break;
        case 'EW':
            fullStatus = 'Extinct in the Wild';
            break;
        case 'CR':
            fullStatus = 'Critically Endangered';
            break;
        case 'EN':
            fullStatus = 'Endangered';
            break;
        case 'VU':
            fullStatus = 'Vulnerable';
            break;
        case 'NT':
            fullStatus = 'Near Threatened';
            break;
        case 'LC':
            fullStatus = 'Least Concern';
            break;
        case 'DD':
            fullStatus = 'Data Deficient';
            break;
        case 'NE':
            fullStatus = 'Not Evaluated';
            break;
    }

    let description = this.props.description;
    let image = 'http://localhost:3001/'+this.props.image;
    console.log("NAME ON EVENTS PAGE",this.props.oneEvent)

    oneEvent=(
        <div>              
            <Row>
                <Col md={8} sm={12}> 
                    <h4 className="title-1 hover-underline-animation"> {name} </h4>
                    <p className="paragh-1"> {description} </p>                    
                </Col>
                <Col> 
                    <img src={image} alt="" class="fund-profilepic"/>
                    {viewButton}
                </Col>
                
            </Row>                

            <Row>
                <Col md={8} sm={12}>
                    <h4> Details About the Funding</h4>       
                    <table className="each-fund">
                        <tr className="fund-item">
                            <td><p>Scientific Name</p></td>
                            <td><p><b>{scfname}</b></p></td>
                        </tr>
                        <tr className="fund-item">
                            <td><p>Conservation Status</p></td>
                            <td><p><b>{fullStatus}</b></p></td>
                        </tr>
                        <tr className="fund-item">
                            <td><p>Habitat Location</p></td>
                            <td><p><b>{habitat}</b></p></td>
                        </tr>
                        <tr className="fund-item">
                            <td><p>Total Funds</p></td>
                            <td><p><b id='id1'> </b></p></td>
                        </tr> 
                        <tr className="fund-item">
                            <td><p>Funds Spent</p></td>
                            <td><p><b id='id2'> </b></p></td>
                        </tr> 
                        <tr className="fund-item">
                            <td><p>Funds Remaining</p></td>
                            <td><p><b id='id3'> </b></p></td>
                        </tr>  
                    </table>
                </Col>
                <Col>{donateButton}</Col>
            </Row>               
        </div>
        
    )
  
    let TokenExpRedirect = null
    if (!localStorage.getItem('token')){
        TokenExpRedirect =<Redirect to ='/'/>
    }
       
        return(
            <div className="onefund">                         
                {oneEvent}                                
                {TokenExpRedirect}
            </div>
        )
    }
}

const mapStatetoProps = state =>{
    console.log('main page',state.oneEvent.events.name)
    return {
         name : state.oneEvent.events.name,
         scfname : state.oneEvent.events.scfname,
         habitat :state.oneEvent.events.habitat,
         status : state.oneEvent.events.status,
         description : state.oneEvent.events.description,
         image : state.oneEvent.events.image,
    };
};
const mapSignInDispatchToProps =dispatch => {
  
    return{
        
        onFetchOneEvents:()=>dispatch(actions.fetchOneEvent())
    };
};


export default connect(mapStatetoProps,mapSignInDispatchToProps)(OneFundDeets);