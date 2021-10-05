import { useState, useEffect } from "react";
import { useUserTokenContext } from "../../contexts/UserTokenContext";
import { Redirect } from "react-router";
import { toast } from "react-toastify";
import "./style.css";

const EditPasswordForm = ({ userId }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatNewPassword, setRepeatNewPassword] = useState("");
  const [doPasswordsMatch, setDoPasswordMatch] = useState(false);
  const [token, setToken] = useUserTokenContext();

  useEffect(() => {
    if (newPassword === repeatNewPassword) {
      setDoPasswordMatch(true);
    } else {
      setDoPasswordMatch(false);
    }
  }, [newPassword, repeatNewPassword]);

  const editPassword = async (e) => {
    e.preventDefault();

    if (!doPasswordsMatch) {
      return;
    }

    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/users/${userId}/password`,
      {
        method: "PUT",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      }
    );

    if (res.ok) {
      toast.success("Contraseña actualizada, inicia sesión de nuevo");
      setToken("");
    } else {
      const error = await res.json();
      toast.error(error.message);
    }
  };

  if (!token) {
    return <Redirect to="/login" />;
  }

  return (
    <form onSubmit={editPassword}>
      <div className="editpassword-form">
        <label>
          <input
            required
            id="oldPassword"
            name="oldPassword"
            type="password"
            value={oldPassword}
            placeholder="Contraseña actual"
            onChange={(e) => {
              setOldPassword(e.target.value);
            }}
          />
        </label>
      </div>
      <div className="editpassword-form">
        <label>
          <input
            required
            id="newPassword"
            name="newPassword"
            type="password"
            value={newPassword}
            placeholder="Contraseña nueva"
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
          />
        </label>
      </div>
      <div className="editpassword-form">
        <label>
          <input
            required
            id="repeatNewPassword"
            name="repeatNewPassword"
            type="password"
            value={repeatNewPassword}
            placeholder="Repetir nueva contraseña"
            onChange={(e) => {
              setRepeatNewPassword(e.target.value);
            }}
          />
        </label>
      </div>
      <div className="flex-col">
        <button type="submit">Cambia</button>
      </div>
    </form>
  );
};

export default EditPasswordForm;
