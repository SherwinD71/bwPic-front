import "./style.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages } from "@fortawesome/free-solid-svg-icons";

const PreviewPhoto = ({ entryPlace, filesInputRef }) => {
  const [photoPreview, setPhotoPreview] = useState(null);

  const generatePreview = (e) => {
    const files = e.target.files;
    setPhotoPreview(URL.createObjectURL(files[0]));
  };

  return (
    <div>
      <label>
        <div className="agrega-files pre-top">
          <span className="text-bold">Agrega una foto</span>
          <span className="icono-files cursor-pointer">
            <FontAwesomeIcon icon={faImages} />
          </span>
        </div>
        <input
          className="tagOff"
          id="entry_files_input"
          name="entry_files_input"
          type="file"
          ref={filesInputRef}
          onChange={generatePreview}
          accept="image/*"
        />
      </label>
      {photoPreview && (
        <div className="flex-preview">
          <img
            className="photoPreview-size grayScale"
            src={photoPreview}
            alt={`Foto de ${entryPlace}`}
          ></img>
        </div>
      )}
    </div>
  );
};

export default PreviewPhoto;
