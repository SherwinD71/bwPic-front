import { useState } from "react";
import { useParams } from "react-router";
import usePhoto from "../hooks/usePhoto";
import Photo from "../components/Photo";

const PhotoPage = () => {
  const { id } = useParams();
  const [refetchPhoto, setRefetchPhoto] = useState(false);
  const [photo] = usePhoto(id, refetchPhoto, setRefetchPhoto);

  return (
    <div>
      PhotoPage
      {/* {Object.values(photo).length > 0 &&
        (!isEditable ? (
          <Photo
            id={photo.id}
            place={photo.place}
            date={photo.date}
            votes={photo.votes}
            photos={photo.photos}
            ownerId={photo.user_id}
            userName={photo.user_name}
            userAvatar={photo.user_avatar}
            userEmail={photo.user_email}
            description={photo.description}
            setIsEditable={setIsEditable}
          />
        ) : (
          <>
            <EditPhotoForm
              id={photo.id}
              place={photo.place}
              description={photo.description}
              photos={photo.photos}
              setRefetchPhoto={setRefetchPhoto}
            />
            <FontAwesomeIcon
              icon={faArrowAltCircleLeft}
              onClick={() => setIsEditable(false)}
            />
          </>
        ))} */}
    </div>
  );
};

export default PhotoPage;
