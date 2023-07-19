import React from "react";
export default function ReservationCard(prop) {
  return (
    <div class="card">
      <h5 class="card-header">{prop.card.first_name} {prop.card.last_name}</h5>
      <div class="card-body">
        {/* <p class="card-text">Date of Reservation {prop.card.reservation_date}</p> */}
        <p class="card-text"><strong>Reservation time:</strong> {prop.card.reservation_time}</p>
        <p class="card-text"><strong>Reservation date:</strong> {prop.card.reservation_date}</p>
        <p class="card-text"><strong>People:</strong> {prop.card.people}</p>
        <p class="card-text"><strong>Mobile number:</strong> {prop.card.mobile_number}</p>
        <a href="#" class="btn btn-primary">
          Go somewhere
        </a>
      </div>
    </div>
  );
}
