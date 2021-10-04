import "./style.css";
import Avatar from "../Avatar";
import { useState } from "react";

const EditableAvatar = ({ avatar, name, imageInputRef }) => {
  const [newAvatar, setNewAvatar] = useState(avatar);
  const [didUserUpdateAvatar, setDidUserUpdateAvatar] = useState(false);
  return (
    <div className="text-align-center">
      <label>
        {!didUserUpdateAvatar ? (
          <Avatar avatar={newAvatar} name={name} />
        ) : (
          <img
            className="user_avatar_prew grayScale"
            src={newAvatar}
            alt={`Nuevo avatar de ${name}`}
          />
        )}

        <input
          className="tagOff"
          ref={imageInputRef}
          type="file"
          id="avatar"
          accept="image/*"
          onChange={(e) => {
            setDidUserUpdateAvatar(true);
            setNewAvatar(URL.createObjectURL(e.target.files[0]));
          }}
        />
      </label>
    </div>
  );
};

export default EditableAvatar;
