import React from "react";

function PostTableItem(props) {
  return (
    <tr>
      <td>
        <img src={process.env.REACT_APP_API_URL + props.avatar?.url} alt="" />
      </td>
      <td>{props.first_name + " " + props.last_name}</td>
      <td>{props.birthdate}</td>
      <td>{props.region}</td>
      <td>{props.information}</td>
    </tr>
  );
}

export default PostTableItem;
