import React, { useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../../styles/header.scss";

const updateActiveItem = (target, horiSelector) => {
  if (!target || !horiSelector) return;
  const activeWidthNewAnimHeight = target.clientHeight;
  const activeWidthNewAnimWidth = target.clientWidth;
  const itemPosNewAnimTop = target.offsetTop;
  const itemPosNewAnimLeft = target.offsetLeft;

  horiSelector.style.top = itemPosNewAnimTop + "px";
  horiSelector.style.left = itemPosNewAnimLeft + "px";
  horiSelector.style.height = activeWidthNewAnimHeight + "px";
  horiSelector.style.width = activeWidthNewAnimWidth + "px";
};

function Header() {
  const navigate = useNavigate();
  const tabsNewAnimRef = useRef(null);
  const horiSelectorRef = useRef(null);
  const router = useLocation();

  function logout() {
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token");
    }
    if (localStorage.getItem("appState")) {
      localStorage.removeItem("appState");
    }
    navigate("/");
  }

  useEffect(() => {
    if (!tabsNewAnimRef.current || !horiSelectorRef.current) return;
    const tabsNewAnim = tabsNewAnimRef.current;
    const horiSelector = horiSelectorRef.current;

    const handleClick = (e) => {
      const target = e.target.closest("li");
      if (!target) return;
      const lis = tabsNewAnim.querySelectorAll("li");
      lis.forEach((li) => li.classList.remove("active"));
      target.classList.add("active");
      updateActiveItem(target, horiSelector);
    };

    const handleResize = () => {
      updateActiveItem(tabsNewAnim.querySelector(".active"), horiSelector);
    };

    const handleTogglerClick = () => {
      document.querySelector(".navbar-collapse").classList.toggle("show");
      setTimeout(
        () =>
          updateActiveItem(tabsNewAnim.querySelector(".active"), horiSelector),
        0
      );
    };

    tabsNewAnim.addEventListener("click", handleClick);
    window.addEventListener("resize", handleResize);
    document
      .querySelector(".navbar-toggler")
      .addEventListener("click", handleTogglerClick);

    return () => {
      tabsNewAnim.removeEventListener("click", handleClick);
      window.removeEventListener("resize", handleResize);
      document
        .querySelector(".navbar-toggler")
        .removeEventListener("click", handleTogglerClick);
    };
  }, [tabsNewAnimRef, horiSelectorRef]);

  useEffect(() => {
    const path = router.pathname;
    const target = document.querySelector(
      `#navbar-content ul li a[href="${path}"]`
    );
    if (target && !target.parentElement.classList.contains("active")) {
      console.log("add active");
      const lis = tabsNewAnimRef.current.querySelectorAll("li");
      lis.forEach((li) => li.classList.remove("active"));
      target.parentElement.classList.add("active");
      updateActiveItem(target.parentElement, horiSelectorRef.current);
    }
  }, [tabsNewAnimRef, horiSelectorRef, router]);

  return (
    <header className="sticky-top header-underline bg-white ">
      <nav className="navbar navbar-expand-custom p-0">
        <NavLink className="navbar-brand navbar-logo text-black" to={"/"}>
          <img src="/images/logo.svg" alt="Unity Rescue Platform | Об'єднай людей"/>
        </NavLink>

        <button
          className="navbar-toggler me-3 btn btn-outline-white "
          type="button"
          aria-controls="navbar-content"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <svg
            height={"1.5rem"}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
          </svg>
        </button>

        <div
          className="collapse navbar-collapse justify-content-end "
          ref={tabsNewAnimRef}
          id="navbar-content"
        >
          <ul className="navbar-nav ml-auto">
            <div className="hori-selector" ref={horiSelectorRef}>
              <div className="left"></div>
              <div className="right"></div>
            </div>

            <li className="nav-item">
              <NavLink className="nav-link" to={"/"}>
                Головна
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to={"/posts"}>
                Подати заявку
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to={"/search"}>
                Пошук
              </NavLink>
            </li>

            {!localStorage.getItem("token") ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to={"signin"}>
                    Увійти
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to={"signup"}>
                    Реєстрація
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to={"profile"}>
                    Профіль
                  </NavLink>
                </li>
                <li className="z-3 mx-3  align-content-center ">
                  <button className="btn btn-outline-dark " onClick={logout}>
                    Вийти
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
