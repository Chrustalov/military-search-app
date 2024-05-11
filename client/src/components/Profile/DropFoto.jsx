import React, { useCallback, useEffect, useRef, useState } from "react";
import { FaGoogleDrive } from "react-icons/fa";
// import { UploadCloud } from "./icons";

function DropFoto({ className = "", file, setFile }) {
  const inputRef = useRef(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    try {
      if (file?.url) setUrl(file.url);
      if (file) setUrl(URL.createObjectURL(file));
    } catch (e) {}
  }, [file]);

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setFile(e.dataTransfer.files[0]);
  };

  const handleClick = useCallback(() => {
    inputRef.current.click();
  }, []);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    console.log("Вибраний файл:", selectedFile);
  };

  return (
    <div
      className={
        "container-fluid align-content-center justify-content-center  p-4 " +
        className
      }
      accordion
      draggable
      onDragOver={(e) => {
        console.log("dragover");
        e.preventDefault();
      }}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      {!file ? (
        <div className="d-flex align-content-center justify-content-center text-center  flex-column dropzone py-4">
          <FaGoogleDrive className="m-auto" fill={"#000"} size={"6rem"} />
          <p className="mt-4">Перетягніть фото сюди</p>
        </div>
      ) : (
        <div className="container dropzone">
          <div
            className="row justify-content-center align-items-center"
            style={{ height: "300px" }}
          >
            <div className="col-auto">
              <img src={url} className="img-fluid" alt="Завантажене фото" style={{maxHeight: "300px"}} />
            </div>
          </div>
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        className="upload-input d-none"
        ref={inputRef}
        onChange={handleFileChange}
      />
    </div>
  );
}

export default DropFoto;
