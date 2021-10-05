import "./style.css";
import usePhoto from "../../hooks/usePhoto";
import PhotoDetalle from "../../components/PhotoDetalle";
import { useParams } from "react-router";

const PhotoPage = () => {
  const { id } = useParams();
  const [photo] = usePhoto(id);

  return (
    <main className="centered-container">
      <div>
        {Object.values(photo).length && (
          <div className="flex-row">
            <PhotoDetalle photoDet={photo} />
          </div>
        )}
      </div>
    </main>
  );
};

export default PhotoPage;
