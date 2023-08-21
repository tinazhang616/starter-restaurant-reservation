import React, { useState } from "react";
import TableForm from "./TableForm";
import { createTable } from "../../utils/api";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import ErrorAlert from "../ErrorAlert";
export default function CreateTable() {
  const history = useHistory();
  const initialFormState = {
    table_name: "",
    capacity: 0,
    occupied: false,
  };
  const [tableErrors, setTableErrors] = useState(null);
  const [formData, setFormData] = useState({ ...initialFormState });
  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    formData.capacity = +formData.capacity;
    setTableErrors(null);
    if (formData.capacity <= 0) {
      setTableErrors({ message: "Capacity should greater or equal than 1." });
      return;
    }
    try {
      await createTable(formData, abortController.signal);
      history.push("");
      console.log("submitted:", formData);
    } catch (error) {
      setTableErrors(error);
    }
    return () => abortController.abort();
  };
  return (
    <div className="row justify-content-around">
      <div className="col-5 rounded bg-white m-4 border-rounded">
      <ErrorAlert error={tableErrors} />
      <TableForm
        onChange={handleChange}
        onSubmit={handleSubmit}
        formData={formData}
      />
      </div>
    </div>
  );
}
