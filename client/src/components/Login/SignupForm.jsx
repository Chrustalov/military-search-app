import React from "react";
import { Link } from "react-router-dom";
import SocialFoLogin from "./SocialFoLogin";

function SignupForm({
  isNewUser,
  name,
  email,
  password,
  volunteer,
  onChangename,
  onChangeEmail,
  onChangePassword,
  toggleVolunteer,
  togglePassword,
  changeForm,
  handleSubmit,
  showPassword,
}) {
  return (
    <div
      className={"form-container"}
      style={
        !isNewUser
          ? { transition: "all 1.6s ease-in-out", opacity: 0, zIndex: 2 }
          : {
              transition: "all 1.6s ease-in-out",
              transform: "translateX(100%)",
              opacity: 1,
              zIndex: 5,
              animation: "show 1.6s",
            }
      }
    >
      <form
        className="d-flex justify-content-center align-content-center flex-column py-3 h-100 text-center gap-2"
        onSubmit={handleSubmit}
      >
        <h1 className="fw-bold fs-5 m-0">Створити обліковий запис</h1>
        <SocialFoLogin />
        <span>Або використайте свою електрону пошту для реєстрації:</span>

        <label htmlFor="name1" id="name-label">
          <input
            className="rounded w-50 p-2 login-input "
            type="text"
            id="name1"
            placeholder="Ім'я"
            name="name"
            value={name}
            onChange={onChangename}
            required
          />
        </label>
        <label htmlFor="email1" id="email-label">
          <input
            className="rounded w-50 p-2 login-input "
            type="email"
            id="email1"
            placeholder="Електронна пошта"
            aria-label="Електронна пошта"
            name="email"
            value={email}
            onChange={onChangeEmail}
            required
          />
        </label>

        <label
          className="position-relative"
          htmlFor="password1"
          id="password-label"
        >
          <input
            className="rounded w-50 p-2 login-input "
            type={!showPassword ? "password" : "text"}
            id="password1"
            placeholder="Пароль"
            name="password"
            title="Пароль повинен містити принаймні 8 символів, включаючи цифри, великі та малі літери"
            value={password}
            onChange={onChangePassword}
            pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$"
            required
          />
          <button
            className="position-absolute btn rounded-circle border-0  "
            onClick={togglePassword}
          >
            {/* <Eye fill={"#000"} isOpen={showPassword} /> */}
          </button>
        </label>

        <div className="d-flex align-content-center justify-content-center gap-2">
          <label
            htmlFor="volunteer"
            id="volunteer-label"
            className="d-flex w-50 align-content-center justify-content-between"
          >
            <span className="me-2">Я волонтер</span>
            <input
              className="rounded p-2 form-check-input login-input "
              type="checkbox"
              id="volunteer"
              placeholder="Волонтер"
              aria-label="Волонтер"
              name="volunteer"
              value={volunteer}
              onChange={toggleVolunteer}
            />
          </label>
        </div>

        <div>
          <button
            className="login-input btn btn-outline-dark w-50"
            style={{
              transition: "transform 0.5s ease-in",
            }}
          >
            Зареєструватися
          </button>
          <div className="text-center text-dark d-sm-none d-block mt-3">
            Якщо ви зареєстровані, ви можете{" "}
            <Link
              className="text-dark text-decoration-none footer-links"
              onClick={changeForm}
            >
              увійти
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignupForm;
