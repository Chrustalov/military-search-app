import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaGoogle, FaInstagram, FaTwitter } from "react-icons/fa";


function Footer() {
  return (
    <footer className="text-center text-lg-start text-black header_underline position-relative">
      <section className="d-flex justify-content-between p-4 bg-black">
        <div className="me-5 fw-bolder fs-5 text-white ">
          <span>Get connected with us on social networks:</span>
        </div>

        <div className="d-flex flex-wrap gap-2 ">
          <Link to={"/"} className="text-white me-4 footer-links">
           <FaFacebook />
          </Link>
          <Link to={"/"} className="text-white me-4 footer-links">
            <FaTwitter />
          </Link>
          <Link to={"/"} className="text-white me-4 footer-links">
            <FaGoogle />
          </Link>
          <Link to={"/"} className="text-white me-4 footer-links">
            <FaInstagram height={32} />
          </Link>
        </div>
      </section>

      <section className="">
        <div className="container text-center text-md-start mt-5">
          <div className="row mt-3">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold footer-links">HMWB</h6>
              <hr
                className="mb-4 mt-0 d-inline-block mx-auto"
                style={{
                  width: "60px",
                  backgroundColor: "#7c4dff",
                  height: "2px",
                }}
              />
              <p>
                Welcome to our platform, where people can request assistance and
                find others willing to provide it. We have created a website
                that aims to connect people in need with generous helpers. Feel
                free to explore our community-driven platform and make a
                positive impact!
              </p>
            </div>

            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold footer-links">
                Useful links
              </h6>
              <hr
                className="mb-4 mt-0 d-inline-block mx-auto"
                style={{
                  width: "60px",
                  backgroundColor: "#7c4dff",
                  height: "2px",
                }}
              />
              <ul className="list-unstyled">
                {["Profile", "Become an Affiliate", "Help"].map((link) => (
                  <p className="footer-links" key={link}>
                    <Link
                      to={"/"}
                      className="text-black  text-decoration-none footer-links"
                    >
                      {link}
                    </Link>
                  </p>
                ))}
              </ul>
            </div>

            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold footer-links">Contact</h6>
              <hr
                className="mb-4 mt-0 d-inline-block mx-auto"
                style={{
                  width: "60px",
                  backgroundColor: "#7c4dff",
                  height: "2px",
                }}
              />

              <ul className="list-unstyled">
                {[
                  "Lviv, Ukraine",
                  "info@example.com",
                  "+ 01 234 567 88",
                  "+ 01 234 567 89",
                ].map((link) => (
                  <p className="footer-links" key={link}>
                    <Link
                      to={"/"}
                      className="text-black  text-decoration-none footer-links"
                    >
                      {link}
                    </Link>
                  </p>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div className="text-center p-3 header_underline">
        <Link
          to={"/"}
          className="text-black footer-links text-decoration-none "
        >
          © 2024 Copyright: HMWB.com
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
