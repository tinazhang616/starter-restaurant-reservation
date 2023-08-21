import { useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

import ReservationCard from "../dashboard/ReservationCard";

export default function Search() {
  const [reservations, setReservations] = useState([]);
  const [number, setNumber] = useState("");
  const [errors, setErrors] = useState(null);
  const [display, setDisplay] = useState(false);
  const onChange = ({ target }) => {
    setNumber(target.value);
  };
  const handleFind = async (e) => {
    e.preventDefault();
    const controller = new AbortController();
    try {
      let response = await listReservations(
        { mobile_number: number },
        controller.signal
      );
      if (response.length) {
        setReservations(response);
        setDisplay(true);
      } else {
        setErrors({ message: <p>No reservations found</p> });
      }
    } catch (error) {
      setErrors(error);
    }
    return () => controller.abort();
  };
  return (
    <div className="row justify-content-around">
      <div className="col-5 rounded bg-white m-5 border-rounded">
        <ErrorAlert error={errors} />
        <div className="text-center m-5">
          <label htmlFor="mobile_number" className="form-label h3">
            Search
          </label>
          <input
            className="form-control"
            type="tel"
            id="mobile_number"
            name="mobile_number"
            onChange={onChange}
            value={number}
            placeholder="Enter a customer's phone number"
          />
          <button
            type="submit"
            onClick={handleFind}
            className="btn btn-primary mt-5"
          >
            Find
          </button>
        </div>
        {display &&
          reservations.map((reservation) => {
            return <ReservationCard card={reservation} />;
          })}
      </div>
    </div>
  );
}
