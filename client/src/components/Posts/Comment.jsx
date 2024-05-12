import React from "react";
import {Link} from "react-router-dom";

function Comment(props) {
    return (
        <div className="comment">
            <div className="comment-header">
                <strong>{props.comment.email}</strong> {/* Припустимо, що в коментарі є поле user з ім'ям користувача */}
                <span>{props.comment.created_at}</span> {/* Припустимо, що в коментарі є поле created_at з датою створення */}
            </div>
            <div className="comment-body">
                <p>{props.comment.text}</p> {/* Припустимо, що в коментарі є поле content з текстом коментаря */}
            </div>
            <div className="comment-footer">
                <Link to={`/users/${comment.user.id}`}>View Profile</Link> {/* Посилання на профіль користувача */}
            </div>
        </div>
    )
}

export default Comment;