import React, { useState } from "react";
import { updatedReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
export default function ReservationCard(prop) {
  const [editErrors, setEditErrors] = useState(null);
  const handleCancel = async (e) => {
    e.preventDefault();
    const controller = new AbortController();
    try {
      if (
        window.confirm(
          "Do you want to cancel this reservation? This cannot be undone."
        )
      ) {
        await updatedReservation(
          { status: "cancelled" },
          prop.card.reservation_id,
          controller.signal
        );
        prop.loadDashboard();
      }
    } catch (error) {
      setEditErrors(error);
    }
    return () => controller.abort();
  };
  return (
    <div key={`${prop.card.reservation_id}`} className="card mb-3">
      <ErrorAlert error={editErrors} />
      <h5 className="card-header">
        <strong>Reservation Name: </strong>
        {prop.card.first_name} {prop.card.last_name}
      </h5>
      <div className="card-body">
        <p className="card-text">
          <strong>Reservation time:</strong> {prop.card.reservation_time}
        </p>
        <p className="card-text">
          <strong>Reservation date:</strong> {prop.card.reservation_date}
        </p>
        <p className="card-text">
          <strong>People:</strong> {prop.card.people}
        </p>
        <p className="card-text">
          <strong>Mobile number:</strong> {prop.card.mobile_number}
        </p>
        <p data-reservation-id-status={prop.card.reservation_id}>
          <strong>Status: </strong> {prop.card.status}
        </p>
        <div className="d-flex justify-content-between">
          <div><a
            className="btn btn-secondary mr-2"
            href={`/reservations/${prop.card.reservation_id}/edit`}
          >
            <span className="oi oi-pencil" />
              &nbsp;
            Edit
          </a>

          {prop.card.status === "booked" && (
            <a
              href={`/reservations/${prop.card.reservation_id}/seat`}
              className="btn btn-primary"
            >
              Seat
            </a>
          )}
          </div>
          <div>
          {prop.card.status !== "cancelled" && (
            <button
              className="btn btn-danger"
              onClick={handleCancel}
              data-reservation-id-cancel={prop.card.reservation_id}
            >
              <span className="oi oi-trash" />
              &nbsp;Cancel
            </button>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}
