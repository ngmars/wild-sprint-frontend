import React, { Component } from "react";
import { connect } from "react-redux";
import EventCard from '../../../Components/EventCard/EventCard';
import * as actions from "../../../store/Actions/Index";
import Spinner from "../../../Components/UI/Spinner/Spinner";
import './Events.css';

class Events extends Component {
  state = {
    eventNameArr: [],
    changeFundId: null,
  };

  componentDidMount() {
    let token = localStorage.getItem("token");
    this.props.onFetchEvents(token);
  }

  render() {
    
    let events = <Spinner />;
    if (!this.props.loading) {
      let eventsArr = this.props.events.events;
      for (let i = 0; i < eventsArr.length; i++) {
        this.state.eventNameArr.push({
          name: eventsArr[i].name,
          image: eventsArr[i].image,
          fundId: eventsArr[i]._id,
          scfname:eventsArr[i].scfname
        });
        console.log("EVENT NAME", this.state.eventNameArr);
      }

      events = this.state.eventNameArr.map((event) => (
        <div          
          value={event}          
        >
          <EventCard
            name={event.name}
            image={event.image}
            scfname={event.scfname}
            fundId ={event.fundId}
          />
        </div>
      ));
    }

    return (
      <div>
        <div className="intro">
          <h4 className="title-1 hover-underline-animation"> Ongoing Events </h4>
        </div>        
        <div className="event-grid">{events}</div>
      </div>
    );
  }
}

const mapSignInDispatchToProps = (dispatch) => {
  return {
    onFetchEvents: (token) => dispatch(actions.fetchEvents(token)),
    onFetchOneEvents: (fundId) => dispatch(actions.fetchOneEvent(fundId)),
  };
};
const mapStatetoProps = (state) => {
  console.log("main page", state);
  return {
    events: state.events,
    loading: state.events.loading,
    token: state.auth.token,
  };
};

export default connect(mapStatetoProps, mapSignInDispatchToProps)(Events);
