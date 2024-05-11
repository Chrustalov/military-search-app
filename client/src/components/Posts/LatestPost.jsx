import React from "react";
import {Link} from "react-router-dom";

function LatestPost(props) {
    return (
        <div className="card card-latest">
            <div className="card-image">
                <img src={process.env.REACT_APP_API_URL + props.photo.url} alt="Card Image" />
            </div>
            <div className="card-content">
                <p className="card-title"><b>{props.title}</b></p>

                <p className="card-city"><b>Місто: </b><span>Львів</span></p>
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

export default LatestPost;
