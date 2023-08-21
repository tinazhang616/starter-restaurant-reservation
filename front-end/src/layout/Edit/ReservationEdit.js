import { useEffect, useState } from "react";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { readReservation, updatedReservation } from "../../utils/api";
import ReservationForm from "../createReservation/ReservationForm";
import ErrorAlert from "../ErrorAlert";
import { formatAsDate } from "../../utils/date-time";

export default function ReservationEdit() {
  const history = useHistory();
  let { reservation_id } = useParams();
  let [editErrors, setEditErrors] = useState(null);
  const [reservation, setReservation] = useState({});

  useEffect(loadReservation, [reservation_id]);
  function loadReservation() {
    const controller = new AbortController();
    readReservation(reservation_id, controller.signal)
    .then(response=>setReservation({
      ...response,
      reservation_date: formatAsDate(response.reservation_date),
    }))
    .catch(error=>setEditErrors(error))
    return () => controller.abort();
  }
  const handleChange = ({ target }) => {
    setReservation({ ...reservation, [target.name]: target.value });
  };
  /* only reservation is booked status could be edit */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const controller = new AbortController();
    if (reservation.status !== "booked") {
      setEditErrors({
        message: <p>Only booked status reservation could be edit.</p>,
      });
      return;
    }
    try {
      await updatedReservation(reservation, reservation_id, controller.signal);
      history.push(`/dashboard?date=${reservation.reservation_date}`);
    } catch (error) {
      setEditErrors(error);
    }
    return () => controller.abort();
  };

  return (
    <div className="row justify-content-around">
      <div className="col-5 rounded bg-white m-4 border-rounded">
        <ErrorAlert error={editErrors} />
        <ReservationForm
          onSubmit={handleSubmit}
          onChange={handleChange}
          formData={reservation}
        />
      </div>
    </div>
  );
}
