import React from 'react'

function UserInfoElement({name, value, isEditing, onChange, required = true, ...props}) {
  return (
    <div className="row">
      <div className="col-sm-3">
        <p className="mb-0">{name}</p>
      </div>
      <div className="col-sm-9">
        <input
          className="mb-0 bg-transparent w-75 text-truncate border-black"
          style={{ outline: "0", borderWidth: isEditing ? " 0 0 2px" : "0" }}
          type="text"
          disabled={!isEditing}
          value={value}
          onChange={onChange}
          required={required}
          {...props}
        />
      </div>
    </div>
  );
}

export default UserInfoElement