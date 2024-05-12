import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
function Comment(props) {
  const { user } = useUser();
  return (
    <div
      className={` comment-outer row  ${
        user && props.comment.user_id === user?.id
          ? "justify-content-end"
          : "justify-content-start"
      } `}
    >
      <div className="comment p-3 rounded  col-6 border border-1 mb-3 ">
        <div className="comment-header card-header mb-3 gap-2 d-flex justify-content-md-between justify-content-start  align-items-center flex-column flex-md-row">
          <div>
            <span>{props.comment.email}</span>
            <span>{props.comment.created_at}</span>
          </div>
          <Link
            to={`/profile/${props.comment.user_id}`}
            className="btn btn-outline-dark  btn-sm"
          >
            Профіль
          </Link>
        </div>
        <div className="comment-body card-body">
          <p>{props.comment.text}</p>
        </div>
      </div>
    </div>
  );
}

export default Comment;
