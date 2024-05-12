import React from "react";
import {Link, NavLink} from "react-router-dom";
import "../../styles/footer.scss";

function Footer() {
  return (
      <footer className="text-center text-white">
          <div className="container">
              <section>
                  <div className="row">
                      <div className="col-4">
                          <div className="info">
                              <img src="/images/white-logo.svg" alt="Unity rescue platform | Допоможи знайти"/>
                          </div>
                      </div>
                      <div className="col-4">
                          <div className="contacts">
                              <h6 className="text-uppercase mb-4 font-weight-bold">Contact</h6>
                              <p>
                                  <i className="fas fa-envelope"></i>
                                  <a href="mail:info@gmail.com">info@gmail.com</a>
                              </p>
                              <p>
                                  <i className="fas fa-phone"></i>
                                  <a href="tel:380689530881">+380 68 95 30 881</a>
                              </p>
                              <p>
                                  <i className="fas fa-print"></i>
                                  <a href="tel:380689530881">+380 68 95 30 881</a>
                              </p>
                          </div>
                      </div>
                      <div className="col-4">
                          <ul className="row text-center d-flex justify-content-center list-links">
                              <li className="footer-link">
                                  <NavLink className="text-white" to={"/"}>
                                      Головна
                                  </NavLink>
                              </li>
                              <li className="footer-link">
                                  <NavLink className="text-white" to={"/posts"}>
                                      Пошук зниклих
                                  </NavLink>
                              </li>
                              {!localStorage.getItem("token") ? (
                                  <>
                                      <li className="footer-link">
                                          <NavLink className="text-white" to={"signin"}>
                                              Увійти
                                          </NavLink>
                                      </li>
                                      <li className="footer-link">
                                          <NavLink className="text-white" to={"signup"}>
                                              Реєстрація
                                          </NavLink>
                                      </li>
                                  </>
                              ) : (
                                  <>
                                      <li className="footer-link">
                                          <NavLink className="text-white" to={"profile"}>
                                              Профіль
                                          </NavLink>
                                      </li>
                                  </>
                              )}
                          </ul>
                      </div>
                  </div>
              </section>
          </div>
          <div className="copyright">
              © 2024 URP (Unity Rescue Platform), Inc.
          </div>
      </footer>
  );
}

export default Footer;
