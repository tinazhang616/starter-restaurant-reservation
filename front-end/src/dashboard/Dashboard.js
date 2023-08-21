import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ButtonNext from "./ButtonNext";
import ButtonPrevious from "./ButtonPrevious";
import ButtonToday from "./ButtonToday";
import ReservationCard from "./ReservationCard";
import TableCard from "./TableCard";
import { useHistory } from "react-router-dom";
import { previous, next } from "../utils/date-time";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const history = useHistory();
  /* fetch reservation and table data and set them into the useState variables */
  useEffect(loadDashboard, [date]);
  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .then(listTables)
      .then(setTables)
      .catch(setReservationsError);
    return () => abortController.abort();
  }
  function handleToday() {
    history.push(`/dashboard`);
  }

  function handlePrevious() {
    const newDate = previous(date);
    history.push(`/dashboard?date=${newDate}`);
  }

  function handleNext() {
    history.push(`/dashboard?date=${next(date)}`);
  }

  return (
    <main className="">
      <ErrorAlert error={reservationsError} />
      <div>
        <div className="text-center bg-warning">
          <h1 className="d-block pt-3">Dashboard</h1>
          <h4 className="d-block">{`Reservations for ${date}`}</h4>
          <div className="d-block mb-5">
            <ButtonPrevious previous={handlePrevious} />
            <ButtonToday today={handleToday} />
            <ButtonNext next={handleNext} />
          </div>
        </div>
        <div className="row justify-content-around">
          {/* list all the reservations. */}
          <div className="col-4">
            {!reservations.length && <p className="bg-white rounded p-3 text-center"><strong>No Reservation</strong></p>}
            {reservations.map((prop) => (
              <ReservationCard card={prop} loadDashboard={loadDashboard} />
            ))}
          </div>
          {/* list all the tables */}
          <div className="col-4">
            {tables.map((e) => (
              <TableCard table={e} loadDashboard={loadDashboard} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
