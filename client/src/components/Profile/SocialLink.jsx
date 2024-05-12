import React, { useCallback, useEffect, useState } from "react";
// import { getIcon } from "../icons";
import { Link } from "react-router-dom";
import { FaFacebook, FaGoogle, FaInstagram, FaTelegram } from "react-icons/fa";

function SocialLink({
  link,
  onEditLink,
  onRemoveLink,
  isNew = false,
  isLink = false,
}) {
  const [copyLink, setCopyLink] = useState(link[link.key]);
  const [isEditing, setIsEditing] = useState(false);

  const onChange = useCallback((e) => {
    setCopyLink(e.target.value);
  }, []);

  const onEnter = useCallback(
    (e) => {
      if (e.key === "Enter" || e.key === "Escape" || e.key === "Tab") {
        setIsEditing(false);
        if (copyLink === "") {
          onRemoveLink();
        } else {
          onEditLink({
            ...link,
            [link.key]: copyLink,
          });
        }
      }
    },
    [copyLink, onEditLink, onRemoveLink]
  );

  const onDoubleClick = useCallback(() => {
    console.log("onDoubleClick");
    setIsEditing(true);
  }, []);

  useEffect(() => {
    if (isNew) {
      setIsEditing(true);
    }
  }, [isNew]);

  return (
    <li
      onDoubleClick={onDoubleClick}
      className="list-group-item d-flex justify-content-between align-items-center p-3"
    >
      {getIcon(link)}
      {isLink && !isEditing ? (
        <Link
          to={copyLink}
          className="text-black footer-links text-decoration-none "
        >
          {copyLink}
        </Link>
      ) : (
        <input
          className="mb-0 bg-transparent w-75 text-truncate  border-black"
          style={{ outline: "0", borderWidth: isEditing ? " 0 0 2px" : "0" }}
          type="text"
          disabled={!isEditing}
          value={copyLink}
          onChange={onChange}
          onKeyDown={onEnter}
        />
      )}
    </li>
  );
}

function getIcon(link) {
  try {
    if (link.key.includes("facebook")) {
      return <FaFacebook />;
    } else if (link.key.includes("instagram")) {
      return <FaInstagram />;
    } else if (link.key.includes("telegram")) {
      return <FaTelegram />;
    }
  } catch (e) {}
  return <FaGoogle />;
}

export default SocialLink;
