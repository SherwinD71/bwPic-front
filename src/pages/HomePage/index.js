import ImagenHome from "../../assets/images/ImagenHome.png";
import { useUserTokenContext } from "../../contexts/UserTokenContext";
import useUserProfile from "../../hooks/useUserProfile";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";

const HomePage = () => {
  const [token, setToken] = useUserTokenContext();
  const [user] = useUserProfile(token);

  if (token) {
    return <Redirect to="/photos" />;
  }

  return (
    <div className="homepage">
      <div className="homepage-imagen">
        <img className="imagenhome" src={ImagenHome} alt="B&WPic" />
      </div>
      <div className="botones_home">
        <div className="iniciar-sesion">
          <Link to="/login">Inicia sesión</Link>
        </div>

        <div className="registrarse">
          <Link to="/register">Registrate</Link>
        </div>

        <div className="seguir-anonimo">
          <Link to="/photos">Seguir como anónimo</Link>
        </div>
      </div>
    </div>
    // </main>
  );
};

export default HomePage;
