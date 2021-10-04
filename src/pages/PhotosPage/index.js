import "./style.css";
import usePhotos from "../../hooks/usePhotos";
import Photo from "../../components/Photo";
import List from "../../components/List";
import { useParams } from "react-router";
import { useState } from "react";

const PhotosPage = () => {
  const { id } = useParams();
  const [search, setSearch] = useState(null);

  const [photos] = usePhotos(id, search, setSearch);

  const searchPhotos = (e) => {
    e.preventDefault();
  };

  return (
    <main className="flex-col paddingTopPage">
      <form className="text-align-center" onSubmit={searchPhotos}>
        <input
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
            />
          )}
        />
      )}
    </main>
  );
};

export default PhotosPage;
