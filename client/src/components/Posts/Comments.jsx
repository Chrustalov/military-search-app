import React from "react";
import Comment from "./Comment"; // Підключаємо компоненту Comment
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext"
function Comments({ comments }) {
    const contextValue = useContext(UserContext);
  return (
    <div className="comments">
        <h3>Коментарі</h3>
      {comments && comments.map((comment) => (
        <div key={comment.id} className={(contextValue.user && comment.user.id === contextValue.user?.id) ? "comment-left" : "comment-right"}>
          <Comment comment={comment} />
        </div>
      ))}
    </div>
  );
}

export default Comments;
