import React from "react";

const Feature = (props) => {
    return (
        <div className="feature">
            <h4>{ props.title }</h4>
            <p>
                { props.content }
            </p>
        </div>
    )
}

export default Feature;
