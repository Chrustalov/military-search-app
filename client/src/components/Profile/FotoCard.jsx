import React from "react";

function FotoCard({
  avatarUrl,
  name = null,
  aboutMe,
  onEditProfile,
  isEditing = false,
  children,
}) {
  return (
    <div className="col-lg-4 ">
      <div className="mb-4 border border-1 border-black rounded-5 pb-2 ">
        <div className="card-body text-center">
          <img
            src={
              "http://localhost:3001" + avatarUrl ||
              "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
            }
            alt="Фото профілю"
            className="rounded-circle img-fluid my-2"
            style={{ width: "150px", height: "150px", objectFit: "cover" }}
          />
          {name && <h5 className="my-3">{name}</h5>}
          <p className="text-muted mb-1">{aboutMe}</p>
          <div className="d-flex justify-content-center mb-2">
            {!isEditing && (
              <button
                type="button"
                data-mdb-button-init
                data-mdb-ripple-init
                className="btn btn-outline-success ms-1 w-75"
                onClick={onEditProfile}
              >
                Редагувати профіль
              </button>
            )}
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}

export default FotoCard;
