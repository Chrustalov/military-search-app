import React, { useCallback, useState } from "react";
import LoginInput from "../../components/Login/LoginInput";
import DropFoto from "../../components/Profile/DropFoto";
import AddMissinPeople from "../../components/Create/AddMissinPeople";
import axios from "axios";
import { useToastNotification } from "../../hooks/useToastNotification";
const REQUEST_URL = "http://localhost:3001" + "/api/v1/posts";

function Create() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [photo, setPhoto] = useState(null);
  const [cityId, setCityId] = useState(0);
  const [missingPeople, setMissingPeople] = useState([]);
  const { toastSuccess, toastError } = useToastNotification();

  const onTiteChange = useCallback((e) => {
    setTitle(e.target.value);
  }, []);

  const onContentChange = useCallback((e) => {
    setContent(e.target.value);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log({ title, content, photo, cityId, missingPeople });
    //Todo send data to server
    axios
      .post(
        REQUEST_URL,
        {
          request: {
            title,
            content,
            city_id: cityId,
            missing_people: missingPeople,
            status: "in_process",
          },
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((resp) => {
        toastSuccess("Повідомлення успішно створено");
        console.log(resp.data);
      })
      .catch((err) => toastError(err.response?.data?.message));
  };

  const onAddMissingPeople = useCallback((missingPerson) => {
    setMissingPeople((prev) => [missingPerson, prev]);
  }, []);

  return (
    <section>
      <form
        className="d-flex justify-content-center align-content-center flex-column py-3 h-100 text-center gap-2"
        onSubmit={handleSubmit}
      >
        <DropFoto file={photo} setFile={setPhoto} />
        <LoginInput
          placeholder="Title"
          id="title"
          value={title}
          onChange={onTiteChange}
          required
        />
        <LoginInput
          placeholder="Content"
          id="content"
          value={content}
          onChange={onContentChange}
          required
        />

        <AddMissinPeople onAddMissingPeople={onAddMissingPeople} />

        <div className=" text-center mt-5">
          <button
            className="login-input-text btn btn-outline-success p-3 "
            style={{
              transition: "transform 0.5s ease-in",
            }}
          >
            Створити
          </button>
        </div>
      </form>
    </section>
  );
}

export default Create;
