import React from "react";
import { useHistory } from "react-router-dom";

export default function ReservationForm({ onSubmit, onChange, formData }) {
  let history = useHistory();
  const handleCancel = () => {
    history.goBack();
  };
  return (
    <div>
      <form className="m-5" onSubmit={onSubmit}>
        <h3 className="text-center mt-3">Creat New Reservation</h3>
        <div className="mb-3">
          <label htmlFor="first_name" className="form-label">
            First Name:
          </label>
          <input
            className="form-control"
            type="text"
            id="first_name"
            name="first_name"
            onChange={onChange}
            value={formData.first_name}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="last_name" className="form-label">
            Last Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="last_name"
            name="last_name"
            onChange={onChange}
            value={formData.last_name}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="mobile_number" className="form-label">
            Mobile Number:
          </label>
          <input
            type="tel"
            className="form-control"
            id="mobile_number"
            name="mobile_number"
            placeholder="123-456-7890"
            onChange={onChange}
            value={formData.mobile_number}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="reservation_date" className="form-label">
            Date of reservation:
          </label>
          <input
            type="date"
            className="form-control"
            id="reservation_date"
            name="reservation_date"
            placeholder="YYYY-MM-DD"
            onChange={onChange}
            value={formData.reservation_date}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="reservation_time" className="form-label">
            Time of reservation:
          </label>
          <input
            type="time"
            className="form-control"
            id="reservation_time"
            name="reservation_time"
            placeholder="HH:MM"
            pattern="[0-9]{2}:[0-9]{2}"
            onChange={onChange}
            value={formData.reservation_time}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="people" className="form-label">
            Number of people in the party:
          </label>
          <input
            type="number"
            className="form-control"
            id="people"
            name="people"
            onChange={onChange}
            value={formData.people}
            required
          />
        </div>
        <div className="text-center mt-5">
          <button type="submit" className="btn btn-primary mr-3">
            Submit
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
