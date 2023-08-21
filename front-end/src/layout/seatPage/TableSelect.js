import React, { useEffect, useState } from "react";
import { listTables, seatReservation } from "../../utils/api";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import ErrorAlert from "../ErrorAlert";
export default function TableSelect() {
  //when click submit, modify table occupied to true
  let { reservation_id } = useParams();
  const history = useHistory();
  const [tables, setTables] = useState([]);
  const [errors, setErrors] = useState(null);
  const [tableId, setTableId] = useState({});

  useEffect(loadTables, [reservation_id]);
  function loadTables() {
    const abortController = new AbortController();
    listTables(abortController.signal).then(setTables);
    return () => abortController.abort();
  }
  const handleChange = ({ target }) => {
    setTableId({ table_id: target.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const controller = new AbortController();
    try {
      let response = await seatReservation(
        +tableId.table_id,
        reservation_id,
        controller.signal
      );
      console.log("this is table update ", response);
      if (response) {
        history.push(`/dashboard`);
      }
    } catch (error) {
      setErrors(error);
    }
    return () => controller.abort();
  };
  return (
    <div className="row justify-content-around mt-5">
      <ErrorAlert error={errors} />
      <div className="col-5 rounded bg-white p-4 m-3 border-rounded text-center">
        <h3 className="mb-3">Select a Table</h3>
        <select
          name="table_id"
          onChange={handleChange}
          value={tableId.table_id}
          id="table_id"
          className="form-select mb-3"
          aria-label="Default select example"
        >
          <option value="">Open this select menu</option>
          {tables.map((e) => (
            <option value={e.table_id} key={e.table_id}>
              {e.table_name} - {e.capacity}
            </option>
          ))}
        </select>
        <div>
          <button
            type="submit"
            className="btn btn-primary mr-3"
            onClick={handleSubmit}
          >
            Submit
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={history.goBack}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
