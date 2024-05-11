import React from "react";

function PostTableItem(props) {
    return (
        <tr>
            <td scope="col">
                <img src={process.env.REACT_APP_API_URL + props.avatar.url} alt=""/>
            </td>
            <td scope="col">{ props.first_name + ' ' + props.last_name }</td>
            <td scope="col">{ props.birthdate }</td>
            <td scope="col">{ props.region }</td>
            <td scope="col">{ props.information }</td>
        </tr>
    )
}

export default PostTableItem;
