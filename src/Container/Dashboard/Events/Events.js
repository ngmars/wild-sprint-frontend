import * as actions from "../../../store/Actions/Index";
import Spinner from "../../../Components/UI/Spinner/Spinner";
import { Redirect } from "react-router-dom";
import React, { Component } from "react";
import { connect } from "react-redux";
import MyEventCard from "./MyEventCard";

class Events extends Component {
  state = {
    eventNameArr: [],
    changeFundId: null,
  };
  componentDidMount() {
    let token = localStorage.getItem("token");

    this.props.onFetchEvents(token);
  }

  redirectHandler = (event) => {
    console.log("EVENT", event);
    localStorage.setItem("eventId", event);
    this.props.history.push("/oneFund");
  };

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
        <button
          name="componentButton"
          value={event}
          onClick={() => this.redirectHandler(event.fundId)}
        >
          <MyEventCard
            name={event.name}
            image={event.image}
            scfname={event.scfname}
          />
        </button>
      ));
    }
    let TokenExpRedirect = null;
    if (!localStorage.getItem("token")) {
      TokenExpRedirect = <Redirect to="/" />;
    }

    return (
      <div>
        <div class="fund-pics row">
          <div>{events}</div>
          {TokenExpRedirect}
        </div>
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
