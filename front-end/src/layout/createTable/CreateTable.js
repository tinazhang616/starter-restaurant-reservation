import React, {useState} from "react"
export default function CreateTable(){
    const initialFormState={
        table_name:"",
        capacity:""
    }
    const [formData,setFormData]=useState({...initialFormState})
    const handleChange=({target})=>{
        setFormData({
            ...formData,
            [target.name]:target.value
        })

    }
    const handleSubmit=(event)=>{
        event.preventDefault()
        console.log("submitted:",formData)
        setFormData({...initialFormState})

    }
    return (
        <div>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
            <label htmlFor="table_name" className="form-label">
              Table name
            </label>
            <input
              className="form-control"
              type="text"
              minLength="2"
              id="table_name"
              name="table_name"
              onChange={handleChange}
              value={formData.table_name}
              required
            />
          </div>
          <div className="mb-3">
            <label for="capacity" className="form-label">
              Capacity
            </label>
            <input
              type="number"
              className="form-control"
              id="capacity"
              name="capacity"
              min="1"
              onChange={handleChange}
              value={formData.capacity}
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
    )
}