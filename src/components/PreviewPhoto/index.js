import "./style.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages } from "@fortawesome/free-solid-svg-icons";

const PreviewPhoto = ({ entryPlace, filesInputRef }) => {
  const [photoPreview, setPhotoPreview] = useState(null);
  //   const [currentPhoto, setCurrentPhoto] = useState(0);

  const generatePreview = (e) => {
    const files = e.target.files;
    setPhotoPreview(URL.createObjectURL(files[0]));
  };

  return (
    <div className="entry_photos_slider">
      {!photoPreview ? (
        <div className="entry_photos_empty">Añade fotos</div>
      ) : (
        <img
          className="photoPreview-size"
          src={photoPreview}
          alt={`Foto de ${entryPlace}`}
        ></img>
      )}

      <label className="entry_files_add" htmlFor="entry_files_input">
        <FontAwesomeIcon icon={faImages} />
      </label>
      <input
        id="entry_files_input"
        name="entry_files_input"
        type="file"
        ref={filesInputRef}
        onChange={generatePreview}
        accept="image/*"
      />
    </div>
  );
};

export default PreviewPhoto;
