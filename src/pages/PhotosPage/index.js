import "./style.css";
import usePhotos from "../../hooks/usePhotos";
import Photo from "../../components/Photo";
import List from "../../components/List";
import { useParams } from "react-router";
import { useState } from "react";

const PhotosPage = () => {
  const { id } = useParams();
  const [search, setSearch] = useState(null);
  const [clickedSearch, setClickedSearch] = useState(false);

  const [photos] = usePhotos(
    id,
    search,
    setSearch,
    clickedSearch,
    setClickedSearch
  );

  const searchPhotos = (e) => {
    e.preventDefault();
    setClickedSearch(true);
  };

  return (
    <div className="lista-photos">
      <form className="formulario-search" onSubmit={searchPhotos}>
        <label htmFor="filter" className="label-search">
          Filtro:
          <input
            id="filter"
            name="filter"
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </label>

        <button type="submit" className="boton-search">
          Buscar
        </button>
      </form>
      {photos.length > 0 && (
        <List
          data={photos}
          render={(photo) => (
            <Photo
              key={photo.id_photo}
              created_at={photo.created_at}
              id_photo={photo.id_photos}
              url={photo.url}
              id_user={photo.id_users}
              likes={photo.likes}
              numComentarios={photo.numComentarios}
              place={photo.place}
              userName={photo.username}
              userAvatar={photo.userphoto}
            />
          )}
        />
      )}
    </div>
  );
};

export default PhotosPage;
