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
    <article className="tarjetaFoto">
      <div
        className="flex-arriba blanco"
        onClick={(e) => {
          e.stopPropagation();
          history.push(`/photos/user/${id_user}`);
        }}
      >
        <span className="cursor-pointer margin-izq margin-top-bottom">
          <Avatar name={userName} avatar={userAvatar} />
        </span>
        <span className="text-bold cursor-pointer">{userName}</span>
      </div>
      <div className="borde-tarjeta">
        <img
          className="fotoTarjeta"
          src={`${process.env.REACT_APP_BACKEND_URL}/${url}`}
          alt={`Foto de ${place}`}
          onClick={() => {
            history.push(`/photo/${id_photo}`);
          }}
        />
      </div>

      <div classname="flex-row-like-comment">
        <div className="datos1 blanco">
          <span className="text-bold ">{userName}</span>
          <span className="text-small text-bold">Lugar: {place}</span>
        </div>

        <div className="datos2 blanco text-small">
          <div className="text-bold text1rem margin-izq margin-top-bottom-small">
            Subida el:
          </div>
          <div className="text-bold margin-izq margin-top-bottom-small">
            {created_at.split("T")[0]}
          </div>
        </div>

        <div className="datos3 blanco">
          <div className="datos31 margin-botton">
            <span className="datos311 text-bold ">{numComentarios}</span>
            <span className="datos312">
              {`comentario${numComentarios === 1 ? "" : "s"}`}
            </span>
          </div>

          <div className="datos32">
            <span className="datos321 text-bold">{currentLikes}</span>
            <span
              className="datos322"
              onClick={(e) => {
                e.stopPropagation();
                likePhoto();
              }}
            >
              <FontAwesomeIcon icon={faThumbsUp} />
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Photo;
