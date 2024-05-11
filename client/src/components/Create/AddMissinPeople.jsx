import React, { useCallback, useRef, useState } from 'react'
import LoginInput from '../Login/LoginInput';
import DropFoto from '../Profile/DropFoto';

function AddMissinPeople({onAddMissingPeople}) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [photo, setPhoto] = useState(null);
  const [birthdate, setBirthdate] = useState("");
  const [region, setRegion] = useState("");
  const [information, setInformation] = useState("");
  const contentRef = useRef(null);

   const handleOutsideClick = (e) => {
     if (contentRef.current && !contentRef.current.contains(e.target)) {
         setIsOpened(false);
     }
   };

  const [isOpened, setIsOpened] = useState(false);

  const onChangeFirstName = useCallback((e) => {
    setFirstName(e.target.value);
  }, []);

  const onChangeLastName = useCallback((e) => {
    setLastName(e.target.value);
  }, []);

  const onChangeBirthdate = useCallback((e) => {
    setBirthdate(e.target.value);
  }, []);

  const onChangeRegion = useCallback((e) => {
    setRegion(e.target.value);
  }, []);

  const onChangeInformation = useCallback((e) => {
    setInformation(e.target.value);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onAddMissingPeople({firstName, lastName, photo, birthdate, region, information});
    setFirstName("");
    setLastName("");
    setPhoto(null);
    setBirthdate("");
    setRegion("");
    setInformation("");
    setIsOpened(false);
    return false;
  };

  const handleOpen = useCallback(() => {
    setIsOpened(true);
  }, []);

  return (
    <>
      <div>
        <button
          className="btn btn-outline-success p-3"
          type="button"
          onClick={handleOpen}
        >
          Додати втрачену людину
        </button>
      </div>
      <div
        className="position-absolute  w-100 d-flex justify-content-center"
        style={{ top: "20%" }}
        onClick={handleOutsideClick}
      >
        {isOpened && (
          <form
            className=" login-input-text d-flex flex-column bg-white  justify-content-center align-content-center py-3 rounded text-center gap-2 z-3 "
            onSubmit={handleSubmit}
            ref={contentRef}
          >
            <DropFoto file={photo} setFile={setPhoto} />
            <LoginInput
              onChange={onChangeFirstName}
              value={firstName}
              placeholder="Ім'я"
              id="first-name"
              required
            />
            <LoginInput
              onChange={onChangeLastName}
              value={lastName}
              placeholder="Прізвище"
              id="last-name"
              required
            />
            <LoginInput
              onChange={onChangeBirthdate}
              value={birthdate}
              placeholder="Дата народження"
              id="birthdate"
              type="date"
              required
            />
            <LoginInput
              onChange={onChangeRegion}
              value={region}
              placeholder="Регіон"
              id="region"
              required
            />
            <LoginInput
              onChange={onChangeInformation}
              value={information}
              placeholder="Інформація"
              id="information"
              required
            />
            <div className=" text-center">
              <button
                className="login-input-text btn btn-outline-success p-3"
                style={{
                  transition: "transform 0.5s ease-in",
                }}
              >
                Додати
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );

}

export default AddMissinPeople