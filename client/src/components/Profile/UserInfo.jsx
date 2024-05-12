import React, { useCallback, useEffect } from "react";
import UserInfoElement from "./UserInfoElement";
import { useReducer } from "react";
import DropFoto from "./DropFoto";

const initialState = {
  first_name: "",
  second_name: "",
  first_phone: "",
  second_phone: "",
  about_me: "",
  avatar: null,
  organization_name: "",
};

function UserInfo({
  profile,
  onEditProfile,
  isEditing,
  onCancel,
  isCompany = false,
}) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    console.log("profile", profile);
    if (profile) {
      dispatch({ type: "SET_STATE", payload: profile });
    }
  }, [profile]);

  const setAvatar = useCallback((file) => {
    dispatch({ type: "SET_AVATAR", payload: file });
  }, []);

  const onFirstNameChange = useCallback((e) => {
    dispatch({ type: "SET_FIRST_NAME", payload: e.target.value });
  }, []);

  const onLastNameChange = useCallback((e) => {
    dispatch({ type: "SET_LAST_NAME", payload: e.target.value });
  }, []);

  const onFirstPhoneChange = useCallback((e) => {
    dispatch({ type: "SET_FIRST_PHONE", payload: e.target.value });
  }, []);

  const onSecondPhoneChange = useCallback((e) => {
    dispatch({ type: "SET_SECOND_PHONE", payload: e.target.value });
  }, []);

  const onCityChange = useCallback((e) => {
    dispatch({ type: "SET_CITY", payload: e.target.value });
  }, []);

  const onAboutMeChange = useCallback((e) => {
    dispatch({ type: "SET_ABOUT_ME", payload: e.target.value });
  }, []);

  const onOrganizationChange = useCallback((e) => {
    dispatch({ type: "SET_ORGANIZATION_NAME", payload: e.target.value });
  }, []);

  const onCancelClick = useCallback(() => {
    dispatch({ type: "SET_STATE", payload: profile });
    onCancel();
  }, [profile, onCancel]);

  return (
    <>
      {isEditing && (
        <div className="col-lg-4 ">
          <div className="mb-4 border border-1 border-black rounded-5 pb-2 ">
            <DropFoto file={state.avatar} setFile={setAvatar} />
          </div>
        </div>
      )}
      <div className="col-lg-8">
        <div className=" mb-4">
          <form
            className="card-body"
            id="edit-profile"
            method="post"
            onSubmit={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onEditProfile(state);
              return false;
            }}
          >
            {isCompany ? (
              <UserInfoElement
                name={"Ім'я організації"}
                value={state.organization_name}
                isEditing={isEditing}
                onChange={onOrganizationChange}
                pattern="^[a-zA-Zа-яА-ЯіІїЇёЁ0-9\s-]{3,50}$"
              />
            ) : (
              <>
                <UserInfoElement
                  name={"Ім'я"}
                  value={state.first_name}
                  isEditing={isEditing}
                  onChange={onFirstNameChange}
                  pattern="^[a-zA-Zа-яА-ЯіІїЇёЁ\s-]{3,50}$"
                />
                <hr />
                <UserInfoElement
                  name={"Прізвище"}
                  value={state.last_name}
                  isEditing={isEditing}
                  onChange={onLastNameChange}
                  pattern="^[a-zA-Zа-яА-ЯіІїЇёЁ\s-]{3,50}$"
                />
              </>
            )}
            <hr />

            <UserInfoElement
              name={"Номер телефону"}
              value={state.first_phone}
              isEditing={isEditing}
              onChange={onFirstPhoneChange}
              title="Номер телефону повинен мати формат +380XXXXXXXXX"
              pattern="^\+?3?8?(0\d{9})$"
            />
            <hr />
            <UserInfoElement
              name={"Додатковий номер телефону"}
              value={state.second_phone}
              isEditing={isEditing}
              onChange={onSecondPhoneChange}
              required={false}
            />
            <hr />
            <UserInfoElement
              name={"Місто"}
              value={state.city}
              isEditing={isEditing}
              onChange={onCityChange}
              pattern="^[a-zA-Zа-яА-ЯіІїЇёЁ0-9\s-]{3,50}$"
            />
            <hr />
            <UserInfoElement
              name={isCompany ? "Про організацію" : "Про мене"}
              value={state.about_me}
              isEditing={isEditing}
              onChange={onAboutMeChange}
            />
          </form>

          {isEditing && (
            <div className="card-footer mt-5 d-flex justify-content-end gap-3">
              <button
                className="btn btn-outline-success  flex-grow-1 "
                onClick={onCancelClick}
              >
                Скасувати
              </button>

              <button
                className="btn btn-outline-success flex-grow-1 "
                type="submit"
                form="edit-profile"
              >
                Зберегти
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case "SET_STATE":
      return { ...state, ...(action.payload || initialState) };
    case "SET_FIRST_NAME":
      return { ...state, first_name: action.payload };
    case "SET_LAST_NAME":
      return { ...state, second_name: action.payload };
    case "SET_FIRST_PHONE":
      return { ...state, first_phone: action.payload };
    case "SET_SECOND_PHONE":
      return { ...state, second_phone: action.payload };
    case "SET_CITY":
      return { ...state, city: action.payload };
    case "SET_ABOUT_ME":
      return { ...state, about_me: action.payload };
    case "SET_AVATAR":
      return { ...state, avatar: action.payload };
    case "SET_ORGANIZATION_NAME":
      return { ...state, organization_name: action.payload };
    default:
      return state;
  }
}

export default UserInfo;
