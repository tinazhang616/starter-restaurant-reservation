import React,{useState} from "react"
export default function ReservationDate(){
    const initialFormState = {
        reservation_date:""
      };
      const [formData, setFormData] = useState({ ...initialFormState });
    const handleChange =({target})=>{
        setFormData({
            ...formData,
            [target.name]: target.value,
          });
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        // createReservation({...formData})
        console.log("Submitted:", formData);
        setFormData({ ...initialFormState });
      };
    return (
        <fieldset>
            <div className="mb-3">
          <label for="reservation_date" className="form-label">
          </label>
          <input
            type="date"
            className="form-control"
            id="reservation_date"
            name="reservation_date"
            placeholder="YYYY-MM-DD"
            pattern="\d{4}-\d{2}-\d{2}"
            onChange={handleChange}
            value={formData.reservation_date}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Check
        </button>
        </fieldset>

    )
}