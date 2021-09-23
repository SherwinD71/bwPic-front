import "./style.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUserTokenContext } from "../../contexts/UserTokenContext";
import useUserProfile from "../../hooks/useUserProfile";
import Avatar from "../Avatar";
import { toast } from "react-toastify";
import logo from "../../assets/images/logo.png";
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
    <header className="header">
      <div className="title-header">
        <Link to="/" className="h1-header">
          B&WPic
        </Link>
      </div>
      <div className="logo-header">
        <img className="logo" src={logo} alt="B&WPic" />
        {token && (
          <>
            <div
              className="header_avatar"
              onClick={() => setShowAvatarMenu(!showAvatarMenu)}
            >
              <Avatar avatar={user.avatar} name={user.name} />
            </div>
            {showAvatarMenu && (
              <div className="header_avatar_menu">
                <Link to={`/photos/user/${user.id}`}>Mis fotos</Link>

                <Link to="/create/photo">Subir foto</Link>

                <Link to="/profile">Modificar Datos</Link>

                <Link to="/editPassword">Cambiar contraseña</Link>

                <div
                  className="menu_logout"
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
        )}
      </div>
    </header>
  );
};

export default Header;
