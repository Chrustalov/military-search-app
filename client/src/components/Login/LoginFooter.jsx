import React from 'react'
import { Link } from 'react-router-dom';

function LoginFooter({ changeForm, buttonTitle, linkText, linkClickText }) {
  return (
    <div>
      <button
        className="login-input btn btn-outline-dark w-50"
        style={{
          transition: "transform 0.5s ease-in",
        }}
      >
        {buttonTitle}
      </button>
      <div className="text-center text-dark d-sm-none d-block mt-3">
        {linkText}
        <Link
          className="text-dark text-decoration-none "
          onClick={changeForm}
        >
          {linkClickText}
        </Link>
      </div>
    </div>
  );
}

export default LoginFooter