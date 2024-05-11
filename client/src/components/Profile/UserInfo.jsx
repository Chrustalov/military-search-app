import React, { useCallback, useEffect } from "react";
import UserInfoElement from "./UserInfoElement";
import { useReducer } from "react";
import DropFoto from "../DropFoto";

const initialState = {
  first_name: "",
  last_name: "",
  phone_number: "",
  city: "",
  about_me: "",
  avatar: null,
};

function UserInfo({ profile, onEditProfile, isEditing, onCancel }) {
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
  const onPhoneNumberChange = useCallback((e) => {
    dispatch({ type: "SET_PHONE_NUMBER", payload: e.target.value });
  }, []);
  const onCityChange = useCallback((e) => {
    dispatch({ type: "SET_CITY", payload: e.target.value });
  }, []);
  const onAboutMeChange = useCallback((e) => {
    dispatch({ type: "SET_ABOUT_ME", payload: e.target.value });
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
              return false;
            }}
          >
            <UserInfoElement
              name={"First name"}
              value={state.first_name}
              isEditing={isEditing}
              onChange={onFirstNameChange}
            />
            <hr />
            <UserInfoElement
              name={"Last name"}
              value={state.last_name}
              isEditing={isEditing}
              onChange={onLastNameChange}
            />
            <hr />
            <UserInfoElement
              name={"Phone"}
              value={state.phone_number}
              isEditing={isEditing}
              onChange={onPhoneNumberChange}
            />
            <hr />
            <UserInfoElement
              name={"Sity"}
              value={state.city}
              isEditing={isEditing}
              onChange={onCityChange}
            />
            <hr />
            <UserInfoElement
              name={"About me"}
              value={state.about_me}
              isEditing={isEditing}
              onChange={onAboutMeChange}
            />
          </form>
          {isEditing && (
            <div className="card-footer mt-5 d-flex justify-content-end gap-3">
              <button
                className="btn btn-outline-dark flex-grow-1 "
                onClick={onCancelClick}
              >
                Cancel
              </button>

              <button
                className="btn btn-outline-dark flex-grow-1 "
                onClick={() => onEditProfile(state)}
                type="submit"
                form="edit-profile"
              >
                Save
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function reducer(state, action) {
  switch (action.type) {
    case "SET_STATE":
      return { ...state, ...(action.payload || initialState) };
    case "SET_FIRST_NAME":
      return { ...state, first_name: action.payload };
    case "SET_LAST_NAME":
      return { ...state, last_name: action.payload };
    case "SET_PHONE_NUMBER":
      return { ...state, phone_number: action.payload };
    case "SET_CITY":
      return { ...state, city: action.payload };
    case "SET_ABOUT_ME":
      return { ...state, about_me: action.payload };
    case "SET_AVATAR":
      console.log("reducer SET_AVATAR ", action.payload, state.avatar);
      return { ...state, avatar: action.payload };
    default:
      return state;
  }
}

export default UserInfo;
