import React, { useCallback, useState } from "react";
import Comment from "./Comment";
import { useUser } from "../../contexts/UserContext";
import { IoIosSend } from "react-icons/io";
import axios from "axios";
import { useToastNotification } from "../../hooks/useToastNotification";
function Comments({ comments, postId, addComment }) {
  const { user } = useUser();
  const [commentText, setCommentText] = useState("");
  const { toastError, toastSuccess } = useToastNotification();

  const onChangeComment = useCallback((e) => {
    setCommentText(e.target.value);
  }, []);

  const handleComment = async () => {
    try {
      const response = await axios
        .post(
          process.env.REACT_APP_API_URL + "api/v1/comments",
          {
            text: commentText,
            post_id: postId,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: localStorage.getItem("token"),
            },
          }
        )
        .catch((err) => err.response);

      const data = response.data;
      if (response.status > 300) throw data;
      console.log(data, "New comment");
      toastSuccess("Успішно");
      addComment(data.comment);
    } catch (err) {
      toastError(err.message);
    }

    setCommentText("");
  };

  return (
    <div className="container-fluid mt-4">
      <h3>Коментарі</h3>
      <div
        className=" container-fluid  overflow-y-scroll  "
        style={{ maxHeight: "300px" }}
      >
        {comments &&
          comments.map((comment, index) => (
            <div
              key={index}
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
      <div className="container-fluid ">
        <div className="row justify-content-between align-content-center ">
          <input
            className="rounded p-3 login-input-text flex-grow-1 me-1 me-sm-3 "
            placeholder="Коментар"
            aria-label="Коментар"
            type="text"
            value={commentText}
            onChange={onChangeComment}
          />
          <button
            className="btn btn-outline-dark col-sm-1 col-3 p-0 m-auto my-1  "
            type="button"
            onClick={handleComment}
          >
            <IoIosSend size={"2rem"} className="m-0" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Comments;
