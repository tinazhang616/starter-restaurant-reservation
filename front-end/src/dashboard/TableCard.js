import React, { useState } from "react";
import { removeAssignedTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function TableCard(prop) {
  const [errors, setErrors] = useState(null);
  let history = useHistory();
  const finishButton = async (e) => {
    e.preventDefault();
    const controller = new AbortController();
    let anwser = window.confirm(
      "Is this table ready to seat new guests? This cannot be undone."
    );
    if (anwser) {
      try {
        await removeAssignedTable(
          prop.table.table_id,
          prop.table.reservation_id,
          controller.signal
        );
        prop.loadDashboard();
        history.push("");
      } catch (error) {
        setErrors(error);
      }
    }
    return () => controller.abort();
  };
  return (
    <div key={prop.table.table_id} className="card mb-3">
      <ErrorAlert error={errors} />
      <div className="card-header d-flex justify-content-between align-items-center">
      <h5 >
          <strong>Table Name: </strong>{prop.table.table_name}
      </h5>
        {!prop.table.occupied && (
          <h5
            className="text-primary"
            data-table-id-status={prop.table.table_id}
          >
            Free
          </h5>
        )}
        {prop.table.occupied && (
          <div className="d-flex">
            <h5
              className="text-danger mr-2"
              data-table-id-status={prop.table.table_id}
            >
              Occupied
            </h5>
            <button
              className="btn btn-danger"
              data-table-id-finish={prop.table.table_id}
              onClick={finishButton}
            >
              Finish
            </button>
          </div>
        )}
      
      </div>
      <div className="card-body">
        <p className="card-text">
          <strong>Capacity:</strong> {prop.table.capacity}
        </p>
        <p className="card-text">
          <strong>Table ID:</strong> {prop.table.table_id}
        </p>
      </div>
    </div>
  );
}
