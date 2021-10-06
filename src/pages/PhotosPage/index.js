import "./style.css";
import usePhotos from "../../hooks/usePhotos";
import Photo from "../../components/Photo";
import List from "../../components/List";
import { useParams } from "react-router";
import { useState } from "react";
import { formatDistance } from "date-fns";
import { es } from "date-fns/locale";
import { useUserTokenContext } from "../../contexts/UserTokenContext";
import useUserProfile from "../../hooks/useUserProfile";

const PhotosPage = () => {
  const { id } = useParams();
  const [search, setSearch] = useState(null);
  const [token, setToken] = useUserTokenContext();
  const [photos] = usePhotos(id, search, setSearch);
  const [user] = useUserProfile(token);

  const searchPhotos = (e) => {
    e.preventDefault();
  };
  const dataActual = new Date();

  let distance;

  if (photos.length > 0 && id) {
    const dateOrig = new Date(photos[0].fecharegistro);
    distance = formatDistance(dateOrig, dataActual, { locale: es });
  }
  console.log("usuario", user.id);
  console.log("otro usuario", id);

  return (
    <main className="flex-col paddingTopPage">
      <form
        className="text-align-center margin-photopage-top"
        onSubmit={searchPhotos}
      >
        <input
          className="texto-search"
          id="filter"
          name="filter"
          type="text"
          value={search}
          placeholder="Busca lugar o descripción"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </form>
      {photos.length > 0 && (
        <>
          <div className="textH2 text-bold">
            <p className="border-bottom">
              {photos[0].username} se registró hace {distance}
            </p>
            <p>
              <span>Tiene {photos.length}</span>
              <span> {`foto${photos.length === 1 ? "" : "s"}`}</span>
            </p>
          </div>
          <List
            className="listado-foto"
            data={photos}
            render={(photo) => (
              <Photo
                key={photo.id_photos}
                created_at={photo.created_at}
                id_photo={photo.id_photos}
                url={photo.url}
                id_user={photo.id_users}
                likes={photo.likes}
                numComentarios={photo.numComentarios}
                place={photo.place}
                userName={photo.username}
                userAvatar={photo.userphoto}
                userRegistrationData={photo.fecharegistro}
              />
            )}
          />
        </>
      )}
    </main>
  );
};

export default PhotosPage;
