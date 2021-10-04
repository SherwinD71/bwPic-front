import "./style.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUserTokenContext } from "../../contexts/UserTokenContext";
import useUserProfile from "../../hooks/useUserProfile";
import Avatar from "../Avatar";
import { toast } from "react-toastify";
import logo from "../../assets/images/ByW.png";
import { useHistory } from "react-router";

const Header = () => {
  const [token, setToken] = useUserTokenContext();
  const [user] = useUserProfile(token);
  const [showAvatarMenu, setShowAvatarMenu] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const handler = () => {
      setShowAvatarMenu(false);
    };

    if (showAvatarMenu) {
      window.addEventListener("click", handler);
    }

    return () => {
      window.removeEventListener("click", handler);
    };
  }, [showAvatarMenu]);

  return (
    <header className="fixed-header">
      <div>
        <Link to="/">
          <img className="logo" src={logo} alt="Black and white" />
        </Link>

        {token ? (
          <>
            <div
              className="header_avatar"
              onClick={() => setShowAvatarMenu(!showAvatarMenu)}
            >
              <Avatar avatar={user.avatar} name={user.name} />
            </div>
            {showAvatarMenu && (
              <div className="header_avatar_menu">
                <div>
                  <Link to={`/photos/user/${user.id}`}>Mis fotos</Link>
                </div>
                <div>
                  <Link to="/create/photo">Subir foto</Link>
                </div>
                <div>
                  <Link to="/profile">Modificar Datos</Link>
                </div>
                <div>
                  <Link to="/editPassword">Cambiar contraseña</Link>
                </div>
                <div
                  onClick={() => {
                    setToken("");
                    toast.success("Has cerrado sesión");
                    history.push(`/`);
                  }}
                >
                  Log out
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="enlaces-header flex-row-rigth h-header text-bold">
            <Link className="registrate" to="/register">
              Regístrate!!!
            </Link>
            <Link className="inicia-sesion" to="/login">
              Inicia sesión
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
