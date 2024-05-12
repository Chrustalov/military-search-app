import React from "react";
import Comment from "./Comment";
import { useUser } from "../../contexts/UserContext";
function Comments({ comments }) {
  const { user } = useUser();
  console.log(user);
  console.log(comments);
  return (
    <div className="comments">
      <h3>Коментарі</h3>
      {comments &&
        comments.map((comment, index) => (
          <div
            key={comment?.id || index}
            className={
              user && comment.user?.id === user?.id
                ? "comment-left"
                : "comment-right"
            }
          >
            <Comment comment={comment} />
          </div>
        ))}
    </div>
  );
}

export default Comments;
