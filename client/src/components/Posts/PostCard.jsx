import React from "react";
import {Link} from "react-router-dom";

function PostCard(props) {
    function limitString(text, maxLength) {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + "...";
        }
        return text;
    }

    return (
        <div className="card">
            <div className="card-image">
                <img src={process.env.REACT_APP_API_URL + props.photo} alt="Card Image" />
            </div>
            <div className="card-content">
                <h2 className="card-title">{props.title}</h2>
                <p className="card-description">{limitString(props.content, 45)}</p>
                <p className="card-city"><b>Місто: </b><span>{props.city.name}</span></p>
                <Link
                    className="btn btn-outline-dark"
                    to={{
                        pathname: `/posts/${props.id}`,
                        state: { post_id: props.id }
                    }}
                >
                    Перейти
                </Link>
            </div>
        </div>
    )
}

export default PostCard;
