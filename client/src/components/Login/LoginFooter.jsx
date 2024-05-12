import React from 'react'

function LoginFooter({ changeForm, buttonTitle, linkText, linkClickText }) {
  return (
    <div>
      <button
        className="login-input-text btn btn-outline-success p-3"
        style={{
          transition: "transform 0.5s ease-in",
        }}
      >
        {buttonTitle}
      </button>
      <div className="text-center text-dark d-sm-none d-block mt-3">
        {linkText}
        <b
          className="text-dark text-decoration-none"
          style={{ cursor: "pointer" }}
          onClick={changeForm}
        >
          {linkClickText}
        </b>
      </div>
    </div>
  );
}

export default LoginFooter