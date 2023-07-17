import React,{useState} from "react";

export default function CreateReservation({createReservation}) {
    const initialFormState = {
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people:1,
      };
      const [formData, setFormData] = useState({ ...initialFormState });
      const handleChange = ({ target }) => {
        setFormData({
          ...formData,
          [target.name]: target.value,
        });
      };
    
      const handleSubmit = (event) => {
        event.preventDefault();
        createReservation({...formData})
        console.log("Submitted:", formData);
        setFormData({ ...initialFormState });
      };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="first_name" className="form-label">
            First Name:
          </label>
          <input
            className="form-control"
            type="text"
            id="first_name"
            name="first_name"
            onChange={handleChange}
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
            onChange={handleChange}
            value={formData.last_name}
            required
          />
        </div>
        <div className="mb-3">
          <label for="mobile_number" className="form-label">
            Mobile Number
          </label>
          <input
            type="tel"
            className="form-control"
            id="mobile_number"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            name="mobile_number"
            placeholder="123-456-7890"
            onChange={handleChange}
            value={formData.mobile_number}
            required
          />
        </div>
        <div className="mb-3">
          <label for="reservation_date" className="form-label">
            Date of reservation
          </label>
          <input
            type="date"
            className="form-control"
            id="reservation_date"
            name="reservation_date"
            placeholder="YYYY-MM-DD"
            pattern="\d{4}-\d{2}-\d{2}"
            min
            max
            onChange={handleChange}
            value={formData.reservation_date}
            required
          />
        </div>
        <div className="mb-3">
          <label for="reservation_time" className="form-label">
            Time of reservation
          </label>
          <input
            type="time"
            className="form-control"
            id="reservation_time"
            name="reservation_time"
            placeholder="HH:MM"
            pattern="[0-9]{2}:[0-9]{2}"
            min="11:00"
            max="22:00"
            onChange={handleChange}
            value={formData.reservation_time}
            required
          />
        </div>
        <div className="mb-3">
          <label for="people" className="form-label">
          Number of people in the party
          </label>
          <input
            type="number"
            className="form-control"
            id="people"
            name="people"
            onChange={handleChange}
            value={formData.people}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <button type="button" className="btn btn-secondary">
          Cancel
        </button>
      </form>
    </div>
  );
}
