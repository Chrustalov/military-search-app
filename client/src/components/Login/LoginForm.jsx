import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import LoginInput from "./LoginInput";
import EyeIcon from "./EyeIcon";
import LoginFooter from "./LoginFooter";

function LoginForm({ isNewUser, changeForm, login }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const onChangeEmail = useCallback((e) => {
    setEmail(e.target.value);
  }, []);
  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    login({ email, password });
    return false;
  };

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
            className="position-absolute   h-100  btn rounded-circle border-0  "
            onClick={togglePassword}
          >
            <EyeIcon fill={"#000"} isOpen={showPassword} />
          </button>
        </LoginInput>

        <Link className="text-black me-4 footer-links">Забули пароль?</Link>

        <LoginFooter
          changeForm={changeForm}
          buttonTitle={"Увійти"}
          linkText={"Якщо ви не зареєстровані, ви можете "}
          linkClickText={"зареєструватися"}
        />
      </form>
    </div>
  );
}

export default LoginForm;
