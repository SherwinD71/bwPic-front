import "./style.css";
import ImagenHome from "../../assets/images/ImagenHome1.jpg";
import blackwhite from "../../assets/images/BLACKWHITE.png";
import { useUserTokenContext } from "../../contexts/UserTokenContext";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";

const HomePage = () => {
  const [token] = useUserTokenContext();

  if (token) {
    return <Redirect to="/photos" />;
  }

  return (
    <div className="homepage">
      <div className="homepage-imagen">
        <img className="imagenhome" src={ImagenHome} alt="B&WPic" />
      </div>
      <div className="homepage-text">
        <img className="homepage-h1" src={blackwhite} alt="B&WPic" />
        {/* <h1 className="homepage-titulo1">
          Black & <font color="#ffffff">White</font>
          <font color="#c0b283"> Pic</font>
        </h1> */}
        <div className="homepage-contenedor-texto">
          <p className="homepage-texto">
            La mayor comunidad de fotos en blanco y negro.
          </p>
          <p className="homepage-texto">
            <Link to="/photos">
              <u>Entra</u> y descúbrela.
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
