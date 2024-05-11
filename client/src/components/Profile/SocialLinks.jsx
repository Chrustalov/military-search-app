import React, { useEffect, useState } from "react";
import SocialLink from "./SocialLink";

function SocialLinks({ links = [], addLink, removeLink, editLink }) {
  const [elements, setElements] = useState([]);
  
  useEffect(() => {
    setElements(
      links.map((link, index) => (
        <SocialLink
          key={link.key}
          link={link[link.key]}
          isNew={index === links.length - 1 && !link}
          onEditLink={(newLink) => editLink(index, newLink)}
          onRemoveLink={() => removeLink(index)}
          isLink={link.includes("http")}
        />
      ))
    );
  }, [links, removeLink, editLink]);

  const onAddLink = () => {
    addLink("");
  };

  return (
    <div className=" mb-4 mb-lg-0">
      <div className="card-body p-0">
        <ul className="list-group list-group-flush rounded-3">
          {elements}
          <li className="list-group-item d-flex justify-content-center align-items-center p-3">
            <button
              type="button"
              className="btn btn-outline-dark w-75"
              onClick={onAddLink}
            >
              Додати посилання
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SocialLinks;
