import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/login.scss";
import { FaFacebook, FaGoogle, FaTwitter } from "react-icons/fa";
import { UserContext } from "../../contexts/UserContext";
import SignupForm from "../../components/Login/SignupForm";
import LoginForm from "../../components/Login/LoginForm";

function Login() {
  const location = useLocation();
  const navigation = useNavigate();

  useEffect(() => {
    setIsNewUser(location.pathname === "/signup");
  }, [location]);

  const [isNewUser, setIsNewUser] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [volunteer, setVolunteer] = useState(false);
  const contextValue = useContext(UserContext);

  const togglePassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const toggleVolunteer = useCallback(() => {
    setVolunteer((prev) => !prev);
  }, []);

  const onChangename = useCallback((e) => {
    setName(e.target.value);
  }, []);
  const onChangeEmail = useCallback((e) => {
    setEmail(e.target.value);
  }, []);
  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  const changeForm = () => {
    navigation(location.pathname === "/signup" ? "/signin" : "/signup", {
      replace: true,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isNewUser) {
      Login({ email, password, name, volunteer }, "/signup");
    } else {
      Login({ email, password });
    }
    return false;
  };

  return (
    <main className="d-flex align-content-center justify-content-center my-3">
      <div
        className="position-relative overflow-hidden mw-100 rounded"
        style={{
          width: "80%",
          minHeight: "550px",
          boxShadow: "0 14px 28px #5161ce",
        }}
        id="container"
      >
        <SignupForm  {...{showPassword, isNewUser, name, email, password, volunteer, onChangename, onChangeEmail, onChangePassword, toggleVolunteer, togglePassword, changeForm, handleSubmit }} />
        <LoginForm {...{ isNewUser, email, password, showPassword, togglePassword, onChangeEmail, onChangePassword, changeForm, handleSubmit }} />

        <div
          className="position-absolute top-0 start-50 w-50 h-100 overflow-hidden d-none d-sm-block "
          style={{
            zIndex: 10,
            transition: "transform 1.6s ease-in-out",
            transform: isNewUser ? "translateX(-100%)" : "none",
          }}
        >
          <div
            className="overlay"
            style={{ transform: isNewUser ? "translateX(50%)" : "none" }}
          >
            <div
              className="position-absolute d-flex flex-column align-content-center justify-content-center text-center top-0 h-100 w-50 px-0 py-3"
              style={{
                transition: "transform 1.6s ease-in-out",
                transform: isNewUser ? "translateX(0)" : "translateX(-20%)",
              }}
            >
              <h1 className="fw-bold fs-5 m-0">Ласкаво просимо!</h1>
              <p className="mx-2">
                Увійдіть за допомогою своїх особистих даних
              </p>
              <div>
                <button
                  className="login-input btn btn-outline-light w-50"
                  style={{
                    transition: "transform 0.5s ease-in",
                  }}
                  onClick={changeForm}
                >
                  Увійти
                </button>
              </div>
            </div>

            <div
              className="position-absolute d-flex flex-column align-content-center justify-content-center text-center top-0 h-100 w-50 px-0 py-3"
              style={{
                transition: "transform 1.6s ease-in-out",
                right: 0,
                transform: isNewUser ? "translateX(20%)" : "translateX(0)",
              }}
            >
              <h1 className="fw-bold fs-5 m-0">Привіт!</h1>
              <p className="mx-2">Введіть свої особисті дані та почніть</p>
              <div>
                <button
                  className="login-input btn btn-outline-light w-50"
                  style={{
                    transition: "transform 0.5s ease-in",
                  }}
                  onClick={changeForm}
                >
                  Зареєструватися
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );

  async function Login(
    { name, password, email, volunteer },
    endPoint = "/login"
  ) {
    try {
      const response = await axios
        .post(
          "https://hackaton-9507e74b8c0c.herokuapp.com" + endPoint,
          {
            user: {
              name,
              password,
              email,
              role: volunteer ? 1 : 0,
            },
          },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        )
        .catch((err) => err.response);

      const data = response.data;
      if (response.status > 300) throw data;
      let data_user;
      if (isNewUser) {
        data_user = data.data;
      } else {
        data_user = data.status.data.user;
      }
      contextValue.login(data_user);
      localStorage.setItem("token", response.headers.get("Authorization"));
      navigation("/");
    } catch (err) {
      console.log("error", err);
    }
  }
}

export default Login;