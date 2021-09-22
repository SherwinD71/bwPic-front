import { useState, useEffect } from "react";
import { useUserTokenContext } from "../contexts/UserTokenContext";
import { Redirect } from "react-router";
import { toast } from "react-toastify";

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
    <>
      <form onSubmit={editPassword}>
        <label className="form-control">
          Contraseña actual
          <input
            required
            id="oldPassword"
            name="oldPassword"
            type="password"
            value={oldPassword}
            onChange={(e) => {
              setOldPassword(e.target.value);
            }}
          />
        </label>

        <label className="form-control">
          Contraseña nueva
          <input
            required
            id="newPassword"
            name="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
          />
        </label>

        <label className="form-control">
          Repetir contraseña nueva
          <input
            required
            id="repeatNewPassword"
            name="repeatNewPassword"
            type="password"
            value={repeatNewPassword}
            onChange={(e) => {
              setRepeatNewPassword(e.target.value);
            }}
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

export default EditPasswordForm;
