import axios from 'axios';
import React, { Component } from 'react';
import dBank from '../../../abis/dBank.json'
import Token from '../../../abis/Token.json'
import Web3 from 'web3';
import './Donate.css';

class EventDonate extends Component{
    state={
        amount:null,
        fullAmt:null,
    }

    async componentDidMount () {
        await this.loadBlockchainData(this.props.dispatch)
        let token = localStorage.getItem('token')
        let userId = localStorage.getItem('userId')

    };
    
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
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
          
          setInterval(function(){
  
            dbank.methods.displayTotalAmt().call().then( function (result) {
              console.log('THIS IS ID 1:', web3.utils.fromWei(result))
              
                //document.getElementById("id1").innerHTML= web3.utils.fromWei(result);
                //BankAmt = web3.utils.fromWei(result)
               
          });
  
           
  
            
  
        }, 1000);
         
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
  
    async deposit(amount) {
      if(this.state.dbank!=='undefined'){
        try{
          await this.state.dbank.methods.deposit().send({value: amount.toString(), from: this.state.account0})
        } catch (e) {
          console.log('Error, deposit: ', e)
        }
      }
    }
  

  
    constructor(props) {
      super(props)
      this.state = {
        web3: 'undefined',
        account0: '',
        account1: '',
        token: null,
        dbank: null,
        balance: 0,
        dBankAddress: null
      }
    }
    onFileUpload = () => {
        const formData = new FormData(); 
        let token = localStorage.getItem('token')
        let fundId = localStorage.getItem('eventId')
        const amount = this.state.amount; 
        let tmpamount = amount * 10**18 
        this.deposit(tmpamount)
        formData.append("amount",amount);
        console.log(amount)
        if (parseInt(amount)>=0){
        const url = 'http://localhost:3001/bill/'+fundId
        axios.post(url,formData,{
          headers: {
              'Authorization': 'Bearer ' + token,
              'Content-Type': 'application/json'
          }
      }).then(
            this.props.history.push('/oneFund')
        )
    }else{
        let error
        error=(
            <p>PLEASE ENTER AN AMOUNT GREATER THAN 0</p>
        )
    }
    }

    RedirectBackHandler =() =>{
      this.props.history.push('/oneFund');
    }
     
    render(){
        let fundId = localStorage.getItem('eventId')

        return(
            <div className="body">
              <div className='signup-container'>
                <div className='left-container'>
                  <img src='/logo.png' alt="logo" className="logo-1"/>
                </div>
                <div className='right-container'>
                    <div className="header">
                        <h2> Thank you for stepping up today!</h2>
                    </div>

                    <div className='set'>
                        <div className='pets-breed'>
                            <label for='pets-breed'>Fundraiser Name</label>
                            <p><strong>The Anti-Poaching Rhinoceros Fund</strong></p>
                        </div>
                    </div>
                                                
                    <div className='set'>
                        <div className='pets-breed'>
                            <label for='pets-breed'>Fundraiser ID</label>
                            <p><strong>{fundId}</strong></p>
                        </div>
                    </div>
                                    
                    <div className='set'>
                        <div className='pets-breed'>
                            <label for='pets-breed'>Account ID</label>
                            <p><strong>{this.state.account0}</strong></p>
                        </div>
                    </div>
                    
                    <div className='set'>
                      <div className='pets-breed'>
                          <label for='pets-breed'>Amount</label>
                          <input
                                  placeholder="Amount"
                                  name='amount'
                                  value={this.state.amount}
                                  onChange={event => this.handleChange(event)}/>
                      </div>
                      {this.error}
                    </div>

                    <div className="footer">
                        <div className='set'>
                        <button className='back' onClick={this.RedirectBackHandler}>Back</button>
                        <button className='next' onClick={this.onFileUpload}>DONATE</button>                        
                    </div>

                  </div>            
                </div>                
            </div>
        </div>
        )
    }
}


export default EventDonate;
