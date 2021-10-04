import "./style.css";
import "../Photo/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

import { useHistory } from "react-router";
import { useState } from "react";
import { useUserTokenContext } from "../../contexts/UserTokenContext";
import Avatar from "../Avatar";
import List from "../../components/List";
import { toast } from "react-toastify";

const PhotoDetalle = ({ photoDet }) => {
  const [currentLikes, setCurrentLikes] = useState(photoDet.likes);
  const [comment, setComment] = useState("");
  const [numComments, setNumComments] = useState(photoDet.comments.length);
  const [listComments, setListComments] = useState(photoDet.comments);

  const [token] = useUserTokenContext();
  const history = useHistory();

  const likePhoto = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/photos/${photoDet.id_photos}/like`,
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
      const error = await res.json();
      toast.error(error.message);
    }
  };

  const comenta = async (e) => {
    e.preventDefault();

    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/photos/${photoDet.id_photos}/comment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ comment }),
      }
    );

    if (res.ok) {
      setComment("");
      const body = await res.json();
      setNumComments(body.data.nComentarios);
      setListComments(body.data.comments);
      toast.success("Comento añadido");
    } else {
      const error = await res.json();
      toast.error(error.message);
    }
  };

  return (
    <article className="tarjetaFotodetalle">
      <div className="detalle-izq">
        <div
          className="flex-arriba blanco"
          onClick={(e) => {
            e.stopPropagation();
            history.push(`/photos/user/${photoDet.id_users}`);
          }}
        >
          <spam className="cursor-pointer">
            <Avatar name={photoDet.username} avatar={photoDet.userphoto} />
          </spam>
          <spam className="text-bold cursor-pointer">{photoDet.username}</spam>
        </div>

        <div className="borde-tarjeta">
          <img
            className="fotoTarjeta"
            onClick={(e) => {
              e.stopPropagation();
              history.push(`/photos`);
            }}
            src={`${process.env.REACT_APP_BACKEND_URL}/${photoDet.url}`}
            alt={`Foto de ${photoDet.place}`}
          />
        </div>

        <div classname="flex-row-like-comment">
          <div className="datos1 blanco">
            <span className="text-bold margin-izq">{photoDet.username}</span>
            <spam className="text-small text-bold">
              Lugar: {photoDet.place}
            </spam>
          </div>

          <div className="datos2 blanco ">
            <p className="margin-izq">{photoDet.description}</p>

            <p className="text-small text-bold margin-izq">
              Subida el: {photoDet.created_at.split("T")[0]}
            </p>
          </div>

          <div className="datos3 blanco">
            <div className="datos31">
              <span className="datos311 text-bold">{`${numComments}`}</span>
              <span className="datos312 ">
                {`comentario${numComments === 1 ? "" : "s"}`}
              </span>
            </div>

            <div className="datos32">
              <span className="datos321 text-bold">{currentLikes}</span>

              <span
                className="datos322 "
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
      </div>

      {/* zona comentarios*/}
      <div className="detalle-dcha">
        <spam>
          {photoDet.comments.length > 0 && (
            <List
              data={listComments}
              render={(comment) => (
                <div className="caja-comentario">
                  <div
                    className="text-bold margin-izq"
                    key={comment.id_comments}
                  >
                    {comment.username} {comment.created_at.split("T")[0]}
                  </div>
                  <div className="margin-izq">{comment.comment_text}</div>
                </div>
              )}
            />
          )}
          <div>
            <form className="form-comment" onSubmit={comenta}>
              <div>
                <input
                  required
                  id="comento"
                  name="comento"
                  type="text"
                  value={comment}
                  placeholder="      Añade comentario"
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                />
              </div>

              <div>
                <button type="submit">Comentar</button>
              </div>
            </form>
          </div>
        </spam>
      </div>
    </article>
  );
};

export default PhotoDetalle;
