import Avatar from "../Avatar";
import { useState } from "react";

const EditableAvatar = ({ avatar, name, imageInputRef }) => {
  const [newAvatar, setNewAvatar] = useState(avatar);
  const [didUserUpdateAvatar, setDidUserUpdateAvatar] = useState(false);
  return (
    <>
      <label htmlFor="avatar">
        {!didUserUpdateAvatar ? (
          <Avatar avatar={newAvatar} name={name} />
        ) : (
          <img src={newAvatar} alt={`Nuevo avatar de ${name}`} />
        )}
      </label>
      <input
        ref={imageInputRef}
        type="file"
        id="avatar"
        style={{ display: "none" }}
        accept="image/*"
        onChange={(e) => {
          setDidUserUpdateAvatar(true);
          setNewAvatar(URL.createObjectURL(e.target.files[0]));
        }}
      />
    </>
  );
};

export default EditableAvatar;
