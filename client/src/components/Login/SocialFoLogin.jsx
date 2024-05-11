import React from 'react'
import { FaFacebook, FaGoogle, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function SocialFoLogin() {
  return (
    <div className="mx-2">
      {[
        <FaFacebook fill={"#000"} />,
        <FaTwitter fill={"#000"} />,
        <FaGoogle fill={"#000"} />,
      ].map((icon, index) => (
        <Link
          key={index}
          to={"/"}
          className="d-inline-flex align-content-center justify-content-center mx-3 footer-links"
        >
          {icon}
        </Link>
      ))}
    </div>
  );
}

export default SocialFoLogin