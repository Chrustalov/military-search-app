import React, { useCallback, useRef, useState } from "react";
import LoginInput from "../Login/LoginInput";
import DropFoto from "../Profile/DropFoto";
import { useToastNotification } from "../../hooks/useToastNotification";
import axios from "axios";

function AddMissinPeople({ onAddMissingPeople }) {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [avatar, setPhoto] = useState(null);
  const [birthdate, setBirthdate] = useState("");
  const [region, setRegion] = useState("");
  const [information, setInformation] = useState("");
  const contentRef = useRef(null);
  const inputRef = useRef(null);
  const { toastError, toastSuccess } = useToastNotification();

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
    e.stopPropagation();
    e.preventDefault();

    onAddMissingPeople({
      first_name,
      last_name,
      avatar,
      birthdate,
      region,
      information,
    });
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

  const handleExelButtonClick = useCallback(() => {
    if (!inputRef.current) return;
    inputRef.current.click();
  }, [inputRef]);

  const handleFileUpload = useCallback(
    async (e) => {
      console.log(e.target.files[0]);
      const file = e.target.files[0];
      if (!file) return;
      const fileName = file.name.toLowerCase();
      if (fileName.endsWith(".xlsx") || fileName.endsWith(".xls")) {
        const arr = await sendExelFile(file);
        console.log(arr);
        if (arr) {
          arr.forEach((item) => {
            onAddMissingPeople(item);
          });
          toastSuccess("Дані успішно додані");
        } else {
          toastError("Помилка при завантаженні файлу");
        }
      } else {
        toastError(
          "Будь ласка, виберіть файл Excel з розширенням .xlsx або .xls."
        );
      }

      e.target.value = null;
    },
    [onAddMissingPeople, toastError, toastSuccess]
  );

  return (
    <>
      <div className="text-center d-flex justify-content-center ">
        <div className="d-flex gap-2 justify-content-between login-input-text p-3 rounded    flex-column flex-sm-row ">
          <button
            className="btn btn-outline-success p-3 flex-grow-1 text-truncate "
            type="button"
            onClick={handleOpen}
          >
            Додати втрачену людину
          </button>
          <button
            className="btn btn-outline-success p-3 flex-grow-1 "
            type="button"
            onClick={handleExelButtonClick}
          >
            Додати через Exel
            <input
              ref={inputRef}
              type="file"
              className="d-none"
              onChange={handleFileUpload}
            />
          </button>
        </div>
      </div>
      <div
        className="position-absolute  w-100 d-flex justify-content-center"
        style={{ top: "20%" }}
        onClick={handleOutsideClick}
      >
        {isOpened && (
          <form
            className=" login-input-text d-flex flex-column bg-white  justify-content-center align-content-center py-3 rounded text-center gap-2 z-3 "
            ref={contentRef}
            onSubmit={() => false}
          >
            <DropFoto file={avatar} setFile={setPhoto} />
            <LoginInput
              onChange={onChangeFirstName}
              value={first_name}
              placeholder="Ім'я"
              id="first-name"
              pattern="[A-Za-zА-Яа-яЁёЇїІіЄєҐґ-]{2,}"
              required
            />
            <LoginInput
              onChange={onChangeLastName}
              value={last_name}
              placeholder="Прізвище"
              pattern="[A-Za-zА-Яа-яЁёЇїІіЄєҐґ-]{2,}"
              id="last-name"
              required
            />
            <LoginInput
              onChange={onChangeBirthdate}
              value={birthdate}
              placeholder="Вік"
              id="birthdate"
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
            <div className=" text-center mt-5">
              <button
                className="login-input-text btn btn-outline-success p-3 "
                style={{
                  transition: "transform 0.5s ease-in",
                }}
                type="button"
                onClick={handleSubmit}
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

async function sendExelFile(file) {
  console.log(file);
  return axios
    .post(
      process.env.REACT_APP_API_URL + "api/v1/posts/upload_table_data",
      {
        file,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: localStorage.getItem("token"),
        },
      }
    )
    .then((resp) => resp.data.missing_people)
    .catch((error) => {
      console.log(error);
      return null;
    });
}

export default AddMissinPeople;
