import { useState, useRef } from "react";
import { useUserTokenContext } from "../../contexts/UserTokenContext";
import { useHistory } from "react-router";
import EditableAvatar from "../EditableAvatar";
import { toast } from "react-toastify";

const EditUserForm = ({
  userId,
  userAvatar,
  oldEmail,
  oldName,
  oldUserName,
}) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [token, setToken] = useUserTokenContext();
  const history = useHistory();
  const imageInputRef = useRef();

  const updateUser = async (e) => {
    e.preventDefault();

    const newUser = new FormData();
    const newAvatar = imageInputRef.current.files[0];

    newUser.append("email", email || oldEmail);
    newUser.append("name", name || oldName);
    newUser.append("username", username || oldUserName);
    if (newAvatar) {
      newUser.append("userphoto", newAvatar);
    }

    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/users/${userId}`,
      {
        method: "PUT",
        headers: {
          Authorization: token,
        },
        body: newUser,
      }
    );

    if (res.ok) {
      if (email) {
        const body = await res.json();
        toast.success(body.message);
        setToken("");
      } else {
        history.go();
      }
    } else {
      const error = await res.json();
      toast.error(error.message);
    }
  };

  return (
    <>
      <form className="form user_profile" onSubmit={updateUser}>
        <EditableAvatar
          userId={userId}
          avatar={userAvatar}
          name={oldName}
          imageInputRef={imageInputRef}
        />

        <label>
          Email
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder={oldEmail}
          />
        </label>

        <label>
          Nombre
          <input
            id="name"
            name="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder={oldName}
          />
        </label>
        <label>
          User
          <input
            id="user"
            name="user"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            placeholder={oldUserName}
          />
        </label>

        <div className="btn-container">
          <button type="submit" className="m-t-md btn">
            Guardar
          </button>
        </div>
      </form>
    </>
  );
};

export default EditUserForm;
