import "./style.css";
import usePhoto from "../../hooks/usePhoto";
import PhotoDetalle from "../../components/PhotoDetalle";
import { useParams } from "react-router";


const PhotoPage = () => {
  const { id } = useParams();
  console.log("ID photo en photo page", id)
  const [photo] = usePhoto(id);

  console.log("Foto detalles", photo)
  
  return (
    <main className="centered-container">
    <div className="boxAccount">
      <h2 className="f-s-l">Detalle foto</h2>
      <PhotoDetalle photoDet={photo}/>
    </div>
  </main>
  );
};

export default PhotoPage;