import React from "react";
import { useHistory } from 'react-router-dom';
import "./MyFunds.css";

export default function MyFunds(props) {
  let name = props.name;
  let image = props.image;
  let fundId = props.fundId;
  let imageUrl = "http://localhost:3001/" + image;
  let history = useHistory();

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
        </div>
      </div>
    </div>
  );
};