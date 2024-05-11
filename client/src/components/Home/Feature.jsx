import React from "react";

function Feature({ title, content, icon: Icon }) {
    return (
        <div className="feature">
            <Icon />
            <h4 className="feature__title">{ title }</h4>
            <p className="feature__content">
                { content }
            </p>
        </div>
    )
}

export default Feature;
