import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import * as actions from '../../../store/Actions/Index';
import {connect} from 'react-redux';

class Logout extends Component {
    componentDidMount(){
        this.props.onLogout(this.props.history);
    }
    render(){
        return (
            <div>
                {window.localStorage.clear()}        
                <Redirect to ='/login'/>
            </div>           
        )
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        onLogout: ()=> dispatch(actions.logout())
    };
}
export default connect(null,mapDispatchToProps)(Logout) ;