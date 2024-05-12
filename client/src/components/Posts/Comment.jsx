import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext"
function Comment(props) {
    const contextValue = useContext(UserContext);
  return (
    <div className={` comment-outer row  ${(contextValue.user && props.comment.user_id === contextValue.user.id) ? 'justify-content-end' : 'justify-content-start'} `}>
        <div className="comment col-6 card">
        <div className="comment-header card-header d-flex justify-content-between align-items-center">
            <div>
                <strong>{props.comment.email}</strong>
                <span>{props.comment.created_at}</span>
            </div>
            <Link to={`/users/${props.comment.user_id}`} className="btn btn-primary btn-sm">View Profile</Link>
        </div>
        <div className="comment-body card-body">
            <p>{props.comment.text}</p>
        </div>
        </div>
    </div>
   
  );
}

export default Comment;
