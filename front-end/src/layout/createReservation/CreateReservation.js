import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { createReservation } from "../../utils/api";
import { isNotOnTuesday } from "../../utils/date-time";
import { isInTheFuture } from "../../utils/date-time";
import ErrorAlert from "../ErrorAlert";
import ReservationForm from "./ReservationForm";


export default function CreateReservation() {
  const history = useHistory();
  const [reservationsError, setReservationsError] = useState(null);
  const initialFormData = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 0,
  };

  const [formData, setFormData] = useState({ ...initialFormData });

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const findErrors = (date, errors) => {
    isNotOnTuesday(date, errors);
    isInTheFuture(date, errors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const controller = new AbortController();
    const errors = [];
    findErrors(formData.reservation_date, errors);
    if (errors.length) {
      setReservationsError({ message: errors });
      return;
    }
    try {
      formData.people = Number(formData.people);
      await createReservation(formData, controller.signal);
      const date = formData.reservation_date;
      history.push(`/dashboard?date=${date}`);
    } catch (error) {
      setReservationsError(error);
    }
    return () => controller.abort();
  };

  return (
    <div className="row justify-content-around">
      <div className="col-5 rounded bg-white m-4 border-rounded">
      <ErrorAlert error={reservationsError} />
      <ReservationForm
        initialData={initialFormData}
        formData={formData}
        onChange={handleFormChange}
        onSubmit={handleSubmit}
      />
      </div>
    </div>
  );
}
