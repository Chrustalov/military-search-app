import React from "react";
import Comment from "./Comment"; // Підключаємо компоненту Comment
import { useContext } from "react";
function Comments({ comments, }) {
    const contextValue = useContext(UserContext);
  return (
    <div className="comments">
      {comments.map((comment) => (
        <div key={comment.id} className={comment.user.id === contextValue.user?.id ? "comment-left" : "comment-right"}>
          <Comment comment={comment} />
        </div>
      ))}
    </div>
  );
}

export default Comments;
