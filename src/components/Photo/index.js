import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

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
  const [currentLikes, setCurrentLikes] = useState(likes);

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
      const body = await res.json();
      setCurrentLikes(body.data.likes);
      toast.success("Like!");
    } else {
      if (res.status === 401) {
        history.push(`/login`);
        toast.error("Tienes que hacer login");
      } else {
        const error = await res.json();
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="lista-photo-tarjeta">
      {/* foto------------------------------------------------------------------- */}
      <div
        className="lista-photo"
        onClick={() => {
          history.push(`/photo/${id_photo}`);
        }}
      >
        <img
          src={`${process.env.REACT_APP_BACKEND_URL}/${url}`}
          alt={`Foto de ${place}`}
        />
      </div>

      {/* avatar y username---------------------------------------------- */}
      <div className="lista-datos">
        <div className="lista-avatar-usuario">
          <div>
            <p
              onClick={(e) => {
                e.stopPropagation();
                history.push(`/photos/user/${id_user}`);
              }}
            >
              <Avatar name={userName} avatar={userAvatar} />
              {userName}
            </p>
          </div>
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
            {currentLikes} <FontAwesomeIcon icon={faThumbsUp} />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Photo;
