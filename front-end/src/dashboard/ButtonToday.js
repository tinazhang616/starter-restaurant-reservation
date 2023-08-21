import React from "react"
export default function ButtonToday({today}){
    return (
        <button type="button" className="btn btn-primary m-3" onClick={today}>Today</button>
    )
}