import React from 'react';
import './ProfileComponent.css';

const profile=(props) =>{
    let name = props.name;
        let email = props.email;
        let lastname = props.lastname;
        let phone = props.phone;
        let image = props.image;
        let imageUrl= 'http://localhost:3001/'+image;

    return(
        <div className="profile-comp">   
            <div className="details"> 
                <tr>
                    <td>First Name</td>
                    <td>{name}</td>
                </tr>
                <tr>
                    <td>Last Name</td>
                    <td>{lastname}</td>
                </tr>
                <tr>
                    <td>Email</td>
                    <td>{email}</td>
                </tr>
                <tr>
                    <td>Phone</td>
                    <td>{phone}</td>
                </tr>                 
            </div>   
            <img src={imageUrl} alt="" className="profilepic"/>             
        </div>
    )
}

export default profile;