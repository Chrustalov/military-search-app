import React, { useCallback } from "react";

function UserBroadcasts({ broadcast , onEdit }) {
  console.log("broadcast in element", broadcast);
  const onChangeEmail = useCallback(
    (e) => {
      onEdit({ ...broadcast, is_email: e.target.checked });
    },
    [broadcast, onEdit]
  );

  const onChangeTelegram = useCallback(
    (e) => {
      onEdit({ ...broadcast, is_telegram: e.target.checked });
    },
    [broadcast, onEdit]
  );

  const onChangeCity = useCallback(
    (e) => {
      onEdit({ ...broadcast, only_my_city: e.target.checked });
    },
    [broadcast, onEdit]
  );

  return (
    <div className="col-lg-4  border border-black   border-1  rounded ">
      <div className=" mb-4 p-3">
        <h3 className="text-center my-2 ">Розсилка</h3>
        <form className="card-body fs-5">
          <div className="form-check mb-3 ">
            <input
              className="form-check-input"
              type="checkbox"
              checked={broadcast.is_email}
              onChange={onChangeEmail}
            />
            <label className="form-check-label">Email</label>
          </div>

          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              checked={broadcast.is_telegram}
              onChange={onChangeTelegram}
            />
            <label className="form-check-label">Telegram</label>
          </div>

          <div className="form-check mb-3">
            <input
              className="form-check-input  "
              type="checkbox"
              checked={broadcast.only_my_city}
              onChange={onChangeCity}
            />
            <label className="form-check-label">Тільки місто</label>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserBroadcasts;
