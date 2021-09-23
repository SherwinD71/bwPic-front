import "./style.css";

import { useState } from "react";
import { useHistory } from "react-router";

import Avatar from "../Avatar";

import { useUserTokenContext } from "../../contexts/UserTokenContext";
import { toast } from "react-toastify";

const Photo = ({
  created_at,
  id_photo,
  url,
  id_user,
  likes,
  numComentarios,
  place,
  userName,
  userAvatar,
}) => {
  const [like, setLike] = useState(false);

  const [token] = useUserTokenContext();
  const history = useHistory();

  const likePhoto = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/photos/${id_photo}/like`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );

    if (res.ok) {
      setLike(!like);
      toast.success("Like!");
    } else {
      const error = await res.json();
      toast.error(error.message);
    }
  };

  return (
    <div className="lista-photo-tarjeta">
      {/* foto------------------------------------------------------------------- */}
      <div className="lista-photo">
        <img
          src={`${process.env.REACT_APP_BACKEND_URL}/${url}`}
          alt={`Foto de ${place}`}
        />
      </div>

      {/* avatar y username---------------------------------------------- */}
      <div className="lista-datos">
        <div className="lista-avatar-usuario">
          <div
            onClick={() => {
              history.push(`/photo/${id_photo}`);
            }}
          >
            <Avatar name={userName} avatar={userAvatar} />
          </div>
          <p>{userName}</p>
        </div>
        {/* datos lugar y fecha------------------------------------------------------------------- */}
        <div div className="lista-lugar-fecha">
          <p>{place}</p>
          <p>{created_at.split("T")[0]}</p>
        </div>

        {/* likes y comentarios--------------------------------------------------------------------- */}
        <div className="lista-likes-comentarios">
          <p>{`${numComentarios} comentarios`}</p>
          <p
            onClick={(e) => {
              e.stopPropagation();
              likePhoto();
            }}
          >
            {`${likes} likes`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Photo;
