import React from "react"
export default function ButtonPrevious({previous}){
    return (
        <button type="button" className="btn btn-secondary m-3" onClick={previous}>Previous</button>
    )
}