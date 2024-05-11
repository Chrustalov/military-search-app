import React from "react";
import { Link } from "react-router-dom";
import SocialFoLogin from "./SocialFoLogin";

function LoginForm({
  isNewUser,
  email,
  password,
  showPassword,
  togglePassword,
  onChangeEmail,
  onChangePassword,
  changeForm,
  handleSubmit,
}) {
  return (
    <div
      className={"form-container"}
      style={{
        zIndex: 2,
        transition: "all 1.6s ease-in-out",
        transform: isNewUser ? "translateX(100%)" : "translateX(0)",
        opacity: isNewUser ? 0 : 1,
      }}
    >
      <form
        className="d-flex justify-content-center align-content-center flex-column py-3 h-100 text-center gap-3"
        onSubmit={handleSubmit}
      >
        <h1 className="fw-bold fs-5 m-0">Увійти</h1>
        <SocialFoLogin />
        
        <span>Або використайте свій обліковий запис:</span>
        <label htmlFor="email" id="email-label">
          <input
            className="rounded w-50 p-2 login-input "
            type="email"
            id="email"
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
          htmlFor="password"
          id="password-label"
        >
          <input
            className=" rounded w-50 p-2 login-input"
            type={!showPassword ? "password" : "text"}
            id="password"
            placeholder="Пароль"
            name="password"
            value={password}
            pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$"
            title="Пароль повинен містити принаймні 8 символів, включаючи цифри, великі та малі літери"
            onChange={onChangePassword}
            required
          />
          <button
            className="position-absolute btn rounded-circle border-0  "
            onClick={togglePassword}
          >
            {/* <Eye fill={"#000"} isOpen={showPassword} /> */}
          </button>
        </label>

        <Link className="text-black me-4 footer-links">Забули пароль?</Link>
        <div>
          <button
            className="login-input btn btn-outline-dark w-50"
            style={{
              transition: "transform 0.5s ease-in",
            }}
          >
            Увійти
          </button>
          <div className="text-center text-dark d-sm-none d-block mt-3">
            Якщо ви не зареєстровані, ви можете{" "}
            <Link
              className="text-dark text-decoration-none footer-links"
              onClick={changeForm}
            >
              зареєструватися
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
