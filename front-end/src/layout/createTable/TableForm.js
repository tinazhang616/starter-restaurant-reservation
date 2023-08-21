import React from "react";
import { useHistory } from "react-router-dom";
export default function TableForm({ onChange, onSubmit, formData }) {
  const history = useHistory();
  const handleCancel = (e) => {
    e.preventDefault();
    history.goBack();
  };
  return (
    <div>
      <form className="m-5" onSubmit={onSubmit}>
        <h3 className="text-center mt-3">Create New Table</h3>
        <div className="mb-3">
          <label htmlFor="table_name" className="form-label">
            Table name:
          </label>
          <input
            className="form-control"
            type="text"
            minLength="2"
            id="table_name"
            name="table_name"
            onChange={onChange}
            value={formData.table_name}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="capacity" className="form-label">
            Capacity:
          </label>
          <input
            type="number"
            className="form-control"
            id="capacity"
            name="capacity"
            onChange={onChange}
            value={formData.capacity}
            required
          />
        </div>
        <div className="text-center mt-5">
          <button type="submit" className="btn btn-primary mr-3">
            Submit
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="btn btn-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
