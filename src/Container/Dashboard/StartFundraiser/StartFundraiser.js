import * as actions from '../../../store/Actions/Index';
import {Redirect} from 'react-router-dom';
import React, { Component } from 'react';
import { Icon } from '@iconify/react';
import { connect } from 'react-redux';
import './StartFundraiser.css';
import FormData from 'form-data'; 
import axios from 'axios';

class StartFundraiser extends Component{

    state={
        name:null,
        scientificName:null,
        habitat:null,
        description:null,
        status:'EX',
        selectedFile: null ,
        meetingName: null,
        meetingId: null,     
}
 onFileChange = (event)=> { 
  
        // Update the state 
        this.setState({ ...this.state, selectedFile: event.target.files[0] }); 
        
        }; 

  startMeeting= ()=>{
          const url = 'https://api.cluster.dyte.in/v1/organizations/f6677306-dddd-4341-b78e-00cb88899ad6/meeting';
  
          const options = {
          method: 'POST',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: 'b164c6e6cd0562c38a5f'
          },
          body: JSON.stringify({authorization: {waitingRoom: false}, title: 'TestMeetingNew', presetName: 'newPreset'})
      };
  
      axios(url, options).then(json => {
          console.log(json)
          this.setState({ ...this.state, 
            meetingName: json.data.data.meeting.roomName,
            meetingId: json.data.data.meeting.id,
          });
      })
      }

componentDidMount () {
    
    let token = localStorage.getItem('token')
    let userId = localStorage.getItem('userId')
    this.startMeeting()
};
handleChange = (event) => {
    this.setState({
        [event.target.name]: event.target.value
    })
}
RedirectBackHandler =() =>{
  this.props.history.push('/fund');
}

onFileUpload = () => { 
  

    const formData = new FormData(); 
    let token = localStorage.getItem('token')
 
    const name = this.state.name; 
    const scientificName = this.state.scientificName; 
    const habitat = this.state.habitat; 
    const description = this.state.description; 
    const status = this.state.status; 

    const form =JSON.stringify({ 
        name: name,
        scientificName : scientificName,
        habitat:habitat,
        description:description,
       status:status,
    })
        console.log(form);

    formData.append("name",name);
    formData.append("scientificName",scientificName);
    formData.append("habitat",habitat);
    formData.append("description",description);
    formData.append("status",status);
    formData.append("meetingName",this.state.meetingName)
    formData.append("meetingId",this.state.meetingId)
    formData.append( 
        "image", 
        this.state.selectedFile, 
        this.state.selectedFile.name 
      ); 
   
      console.log("HUEHUEHUEE",formData);
      const url = 'http://localhost:3001/fundraiser/start'
      axios.post(url,formData,{
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    })
}; 

    render(){
       const Goback =(
           <Redirect to='/fund'/>
       )

        return(
            <div className='body'>
              <div className='signup-container-2'>
                <div className='left-container'>
                  <img src='/logo.png' alt="logo" className="logo-1"/>
              </div>
      
            <div className='right-container'>
              <div className="header"> 
                <h2> Your initiative saves the future!</h2>
              </div>
                <div className='set'>
                  <div className='pets-breed'>
                    <label for='pets-breed'>Fundraiser Name</label>
                    <input
                        id='pets-breed'
                        className='pets-input'
                        placeholder="Fundraiser Name"
                        type='text'
                        name='name'
                        value={this.state.name}
                        onChange={event => this.handleChange(event)}
                    />
                  </div>
                </div>

                <div className='set'>
                  <div className='pets-breed'>
                    <label for='pets-breed'>Cover picture</label>
                    <input  
                    id="upload" 
                    className='upload-input'
                    ref="upload"  
                    name="image" 
                    type="file" 
                    accept="image/*"
                    onChange={this.onFileChange}/>
                  </div>
                </div>
   
                
                <div className='set'>
                  <div className='pets-breed'>
                    <label for='pets-breed'>Scientific Name</label>
                    <input
                        id='pets-breed'
                        className='pets-input'
                        placeholder="Scientific Name"
                        type='text'
                        name='scientificName'
                        value={this.state.scientificName}
                        onChange={event => this.handleChange(event)}
                    />
                  </div>
                </div>
      
                <div className='set'>
                  <div className='pets-breed'>
                    <label for='pets-breed'>Habitat</label>
                    <input
                        id='pets-breed'
                        className='pets-input'
                        placeholder="Habitat"
                        type='text'
                        name='habitat'
                        value={this.state.habitat}
                        onChange={event => this.handleChange(event)}
                    />
                  </div>
                </div>
      
                <div className='set'>
                  <div className='pets-breed'>
                    <label for='pets-breed'>Description</label>
                    <textarea
                        id='pets-breed'
                        className='pets-input'
                        placeholder="Description"
                        type='text'
                        rows="4" cols="50"
                        name='description'
                        value={this.state.description}
                        onChange={event => this.handleChange(event)}
                    />
                  </div>
                </div>
                
                <div className='pets-weight'>
                  <label for='pet-weight-0-25'>Status</label>
                  <div name = 'status' className='radio-container'  onChange={event => this.handleChange(event)}>
      
                    <input name='status'  id='ex' name='pet-weight' type='radio' value='ex'/>
                    <label for='ex'>EX</label>
      
                    <input name='status'  id='ew' name='pet-weight' type='radio' value='ew'/>
                    <label for='ew'>EW</label>
      
                    <input name='status'    id='cr' name='pet-weight' type='radio' value='cr'/>
                    <label for='cr'>CR</label>
      
                    <input name='status'   id='en' name='pet-weight' type='radio' value='en'/>
                    <label for='en'>EN</label>
      
                    <input name='status'    id='vu' name='pet-weight' type='radio' value='vu'/>
                    <label for='vu'>VU</label>
      
                    <input name='status'   id='nt' name='pet-weight' type='radio' value='nt'/>
                    <label for='nt'>NT</label>
      
                    <input name='status'   id='lc' name='pet-weight' type='radio' value='lc'/>
                    <label for='lc'>LC</label>
      
                    <input name='status'    id='dd' name='pet-weight' type='radio' value='dd'/>
                    <label for='dd'>DD</label>
      
                    <input name='status'   id='ne' name='pet-weight' type='radio' value='ne'/>
                    <label for='ne'>NE</label>
                    
                  </div>
                </div>
              
      
              <div className= "footer">
                <div className='set'>
                  <button className='back' onClick={this.RedirectBackHandler}href="/fund" >Back</button>
                  <button className='next' onClick={this.onFileUpload} >Next</button>
                </div>
              </div>
      
            </div>
            </div>
          </div>     
        )
    }
   

}
const mapSignInDispatchToProps =dispatch => {
  
    return{
        onCreateFundraiser:(form) =>dispatch(actions.startMyFund(form))
    };
};

export default connect(null, mapSignInDispatchToProps)(StartFundraiser);