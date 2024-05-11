import React from "react";
import {Link} from "react-router-dom";

function PostCard(props) {
    return (
        <div className="card">
            <div className="card-image">
                <img src="/images/intro.png" alt="Card Image" />
            </div>
            <div className="card-content">
                <h2 className="card-title">Title Here</h2>
                <p className="card-description">Description text goes here. You can provide a brief overview of the content.</p>
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

export default PostCard;
