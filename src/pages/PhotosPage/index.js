import "./style.css";
import usePhotos from "../../hooks/usePhotos";
import Photo from "../../components/Photo";
import List from "../../components/List";

const PhotosPage = () => {
  const [photos] = usePhotos();

  return (
    <div className="lista-photos">
      {photos.length > 0 && (
        <List
          data={photos}
          render={(photo) => (
            <Photo
              key={photo.id_photo}
              created_at={photo.created_at}
              id_photo={photo.id_photos}
              url={photo.url}
              id_user={photo.id_user}
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
