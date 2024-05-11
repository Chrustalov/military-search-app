import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import EyeIcon from "./EyeIcon";
import LoginInput from "./LoginInput";
import LoginFooter from "./LoginFooter";
import { useToastNotification } from "../../hooks/useToastNotification";

function SignupForm({ isNewUser, changeForm, login }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeadPassword, setRepeadPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isVolunteer, setVolunteer] = useState(false);
  const { toastError } = useToastNotification();

  const togglePassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const setIsVolunteer = useCallback(() => {
    setVolunteer(true);
  }, []);

  const setIsCompany = useCallback(() => {
    setVolunteer(false);
  }, []);

  const onChangeEmail = useCallback((e) => {
    setEmail(e.target.value);
  }, []);
  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  const onChangeRepeadPassword = useCallback((e) => {
    setRepeadPassword(e.target.value);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (password !== repeadPassword) {
      toastError("Паролі не співпадають");
      return false;
    }
    login({ email, password, isVolunteer }, "/signup");
    return false;
  };

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
        <LoginInput
          onChange={onChangeEmail}
          value={email}
          placeholder="Електронна пошта"
          id="email"
          required
          type={"email"}
        />

        <LoginInput
          onChange={onChangePassword}
          value={password}
          placeholder="Пароль"
          id="password"
          required
          type={!showPassword ? "password" : "text"}
        >
          <button
            className="position-absolute h-100   btn rounded-circle border-0  "
            onClick={togglePassword}
          >
            <EyeIcon fill={"#000"} isOpen={showPassword} />
          </button>
        </LoginInput>
        <LoginInput
          onChange={onChangeRepeadPassword}
          value={repeadPassword}
          placeholder="Повторіть пароль"
          id="repead-password"
          required
          type={!showPassword ? "password" : "text"}
        >
          <button
            className="position-absolute h-100 btn rounded-circle border-0  "
            onClick={togglePassword}
          >
            <EyeIcon fill={"#000"} isOpen={showPassword} />
          </button>
        </LoginInput>

        <LoginCheckBox
          title={"Компанія"}
          id={"company"}
          onChange={setIsCompany}
        />
        <LoginCheckBox
          title={"Волонтер"}
          id={"volunteer"}
          onChange={setIsVolunteer}
          defaultValue={true}
        />

        <LoginFooter
          changeForm={changeForm}
          buttonTitle={"Зареєструватися"}
          linkText={"Якщо ви зареєстровані, ви можете "}
          linkClickText={"увійти"}
        />
      </form>
    </div>
  );
}

function LoginCheckBox({ onChange, title, id, defaultValue = false }) {
  return (
    <div className="d-flex align-content-center justify-content-center gap-2">
      <label
        htmlFor={id}
        id={`${id}-label`}
        className="d-flex w-50 align-content-center justify-content-between"
      >
        <span className="me-2">{title}</span>
        <input
          className="rounded p-2 form-check-input "
          type={"radio"}
          radioGroup="isVolunteer"
          id={id}
          name="isVolunteer"
          onChange={onChange}
          defaultValue={defaultValue}
        />
      </label>
    </div>
  );
}

export default SignupForm;
