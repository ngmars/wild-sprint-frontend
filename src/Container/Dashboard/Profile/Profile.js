import * as actions from '../../../store/Actions/Index';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import ProfileComponent from '../../../Components/ProfileComponent/ProfileComponent';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormData from 'form-data';
import './Profile.css';

class ProfileDisp extends Component{
    state={
            isEditing:false,
            lastname:null,
            phone:null,
            selectedFile: null
            
    }

    onFileChange = (event)=> {   
        // Update the state 
        this.setState({ selectedFile: event.target.files[0] });         
    }; 

    componentDidMount () {    
        let token = localStorage.getItem('token')
        let userId = localStorage.getItem('userId')
        this.props.onFetchEvents(token,userId);  
    };

    switchEditHandler =()=>{
        this.setState(prevState=>{
                return {isEditing: !prevState.isEditing}
                
        })
        let token = localStorage.getItem('token')
        let userId = localStorage.getItem('userId')
        this.props.onFetchEvents(token,userId); 
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
   
    onFileUpload = () => {  
        // Create an object of formData 
        const formData = new FormData(); 
        let token = localStorage.getItem('token')
        // Update the formData object 
        
        console.log(formData); 
        
        const form = {
            lastname: this.state.lastname,
            phone: this.state.phone,
            }
            console.log(form);
            formData.append("lastname",this.state.lastname);
            formData.append("phone",this.state.phone);
            formData.append( 
                "image", 
                this.state.selectedFile, 
                this.state.selectedFile.name 
              ); 
            let userId = localStorage.getItem('userId')
            let url= ('http://localhost:3001/user/update/'+userId)
            axios.patch(url,formData,{
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                }
            })

            this.props.onFetchEvents(token,userId); 
            this.setState(prevState=>{
                return {isEditing: !prevState.isEditing}
        })
        console.log(form)
    
        }; 

    render (){
        let name = this.props.name;
        let email = this.props.email;
        let lastname = this.props.lastname;
        let profession = this.props.profession;
        let phone = this.props.phone;
        let image = this.props.image;
        let imageUrl= 'http://localhost:3001/'+image;
        console.log(image);
        let isAuth
         if(!localStorage.getItem('token')){
            return (
                isAuth = <Redirect to ='/'/>
            )
        }

        let profile;
        if (!this.state.isEditing){
            profile =(
                <ProfileComponent
                    name={name} 
                    lastname={lastname}
                    email={email}
                    profession={profession}
                    phone={phone}
                    image ={image}    
                />);
        }else{
            profile = (
                <div className="profile-comp">
                    <div className="fill-details">
                        <tr>
                            <td>Email</td>
                            <td>{email}</td>
                        </tr>
                        <tr>
                            <td>First Name</td>
                            <td>{name}</td>
                        </tr>
                        <tr>
                            <td>Last Name</td>
                            <td> <input
                                        name='lastname'
                                        placeholder={lastname}
                                        value={this.state.lastname}
                                        onChange={event => this.handleChange(event)}
                                    />
                                    
                            </td>
                        </tr>
                        <tr>
                            <td>Phone</td>
                            <td>
                                <input
                                    name='phone'
                                    type="text"
                                    placeholder={phone}
                                    value={this.state.phone}
                                    pattern="[0-9]{10}"
                                    onChange={event => this.handleChange(event)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Profile photo</td>
                            <td>
                                <input  id="upload" ref="upload" name="image" type="file" accept="image/*" onChange={this.onFileChange} />
                            </td>
                        </tr>                            
                    </div>                  
                    <img src={imageUrl} alt="" className="profilepic"/>
                </div>
            )
        }

        let stateButton ;
        if (!this.state.isEditing){ 
            stateButton= ( <input onClick={this.switchEditHandler} type="submit" className="profile-edit-btn" name="btnAddMore" value="Edit Profile"/>)
        }
        else{
            stateButton= ( <input onClick={this.onFileUpload}type="submit" className="profile-edit-btn" name="btnAddMore" value="Submit"/>)}
            
        console.log('This is profile name',this.props.name)

        return(
            <div className="profile">
                <div className="intro">
                    <h4 className="title-1 hover-underline-animation">Your Profile</h4>
                </div>
                {profile}<br/>
                {stateButton}
                {isAuth}
            </div>             
        )
        
    }
    
}

const mapSignInDispatchToProps =dispatch => {
  
    return{
        onFetchEvents:(token,userId) =>dispatch(actions.fetchProfile(token,userId)),
        onUpdateProfile:(lastname,phone,image,token,userId) => dispatch(actions.profileUpdate(lastname,phone,image,token,userId))
    };
};

const mapStatetoProps = state =>{
    console.log('main page',state)
    console.log("down in the props",state.profile.events)
    return {
        name:state.profile.events.fname,
        lastname:state.profile.events.lastname,
        phone:state.profile.events.phone,
        email:state.profile.events.email,
        profession:state.profile.events.profession,
        image: state.profile.events.photo
    };
};


export default connect(mapStatetoProps, mapSignInDispatchToProps)(ProfileDisp);