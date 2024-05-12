import React, { useCallback, useEffect, useState } from "react";
import LoginInput from "../../components/Login/LoginInput";
import DropFoto from "../../components/Profile/DropFoto";
import AddMissinPeople from "../../components/Create/AddMissinPeople";
import axios from "axios";
import { useToastNotification } from "../../hooks/useToastNotification";
import PostTable from "../../components/Posts/PostTable";
import { useUser } from "../../contexts/UserContext";
const REQUEST_URL = process.env.REACT_APP_API_URL + "api/v1/posts";

function Create() {
  const { cities, setCities } = useUser();
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

  const onCityChange = useCallback((e) => {
    setCityId(e.target.value);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(
      { title, content, photo, cityId, missingPeople },
      "data to server"
    );

    axios
      .post(
        REQUEST_URL,
        {
          post: {
            title,
            content,
            photo: photo,
            city_id: cityId,
            //missing_people: [...missingPeople],
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
      .catch((err) => {
        console.log(err);

        toastError(err.response?.data?.message);
      });
  };

  const onAddMissingPeople = useCallback((missingPerson) => {
    setMissingPeople((prev) => [missingPerson, ...prev]);
  }, []);

  useEffect(() => {
    if (!cities.length) {
      axios
        .get(process.env.REACT_APP_API_URL + "api/v1/cities")
        .then((resp) => resp.data)
        .then((data) => {
          setCities(data.cities);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [setCities, toastError]);

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

        <select
          className="rounded p-3 login-input-text m-auto  text-truncate border-black"
          style={{
            outline: "0",
          }}
          type="text"
          value={cityId}
          onChange={onCityChange}
          required
        >
          {cities?.map((city) => (
            <option key={city.id} value={city.id}>
              {city.name}
            </option>
          ))}
        </select>

        <AddMissinPeople onAddMissingPeople={onAddMissingPeople} />

        <PostTable missing_people={missingPeople} />

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
