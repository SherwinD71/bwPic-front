import "./style.css";
import usePhoto from "../../hooks/usePhoto";
import PhotoDetalle from "../../components/PhotoDetalle";
import { useParams } from "react-router";

const PhotoPage = () => {
  const { id } = useParams();
  const [photo] = usePhoto(id);

  return (
    <main className="centered-container">
      <div className="boxAccount">
        <h2 className="f-s-l">Detalle foto</h2>
        {Object.values(photo).length && <PhotoDetalle photoDet={photo} />}
      </div>
    </main>
  );
};

export default PhotoPage;
