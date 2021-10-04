import "./style.css";
import ImagenHome from "../../assets/images/ImagenHome1.jpg";
import blackwhite from "../../assets/images/texto.png";
import { useUserTokenContext } from "../../contexts/UserTokenContext";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";

const HomePage = () => {
  const [token] = useUserTokenContext();

  if (token) {
    return <Redirect to="/photos" />;
  }

  return (
    <main className="vhMax homepage">
      <p className="homepage-flex">
        <img className="imagenhome" src={ImagenHome} alt="Fotos de usuarios" />
        <article className="flex-col">
          <img className="homepage-h1" src={blackwhite} alt="B&WPic" />
          <span className="homepage-flex-col text-bold homepage-margin texthomepage">
            La comunidad de fotos en blanco y negro.
          </span>
          <p className="text-bold texthomepage">
            <Link to="/photos">
              <u>Entra</u> para conocerla...{" "}
            </Link>
          </p>
        </article>
      </p>
    </main>
  );
};

export default HomePage;
