import React from "react";
import { useHistory } from 'react-router-dom';
import './EventCard.scss';

export default function EventCard(props) {
  let name = props.name;
  let image = props.image;
  let fundId = props.fundId;
  let imageUrl = "http://localhost:3001/" + image;
  let history = useHistory()

  const redirectHandler = (event) => {
      localStorage.setItem("eventId", event);
      history.push('/oneFund')
    };
    

  return (
    <div class='event-card'>
      <div class='event-box'>
        <img className="event-poster" src={imageUrl} />
        <div class='event-text'>
          <h6> {name} </h6>
          <button
          className="event-btn"
          onClick= {() => redirectHandler(fundId)}>Learn More</button>
        </div>
      </div>
    </div>

  );
}
