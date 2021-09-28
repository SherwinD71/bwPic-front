import "./style.css";
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
    <div>
      {/* foto------------------------------------------------------------------- */}
      <div className="lista-photo">
        <img
          src={`${process.env.REACT_APP_BACKEND_URL}/${photoDet.url}`}
          alt={`Foto de ${photoDet.place}`}
        />
      </div>

      {/* avatar y username---------------------------------------------- */}
      <div className="lista-datos">
        <div className="lista-avatar-usuario">
          <div>
            <p
              onClick={(e) => {
                e.stopPropagation();
                history.push(`/photos/user/${photoDet.id_users}`);
              }}
            >
              <Avatar name={photoDet.username} avatar={photoDet.userphoto} />
              {photoDet.username}
            </p>
          </div>
        </div>
        {/* datos lugar y fecha------------------------------------------------------------------- */}
        <div className="lista-lugar-fecha">
          <p>{photoDet.place}</p>
          <p>{photoDet.created_at.split("T")[0]}</p>
        </div>

        {/* likes y comentarios--------------------------------------------------------------------- */}
        <div className="lista-likes-comentarios">
          <p>{`${numComments} comentarios`}</p>
          <p
            onClick={(e) => {
              e.stopPropagation();
              likePhoto();
            }}
          >
            {currentLikes} <FontAwesomeIcon icon={faThumbsUp} />
          </p>
        </div>
        <div>
          <p>{photoDet.description}</p>
        </div>
      </div>

      <div>
        <form onSubmit={comenta}>
          <div>
            <input
              required
              id="comento"
              name="comento"
              type="text"
              value={comment}
              placeholder="Añade un comento"
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
          </div>

          <div className="btn-container">
            <button type="submit" className="m-t-md btn">
              Comenta
            </button>
          </div>
        </form>
      </div>

      {photoDet.comments.length > 0 && (
        <List
          data={listComments}
          render={(comment) => (
            <div key={comment.id_comments}>
              {comment.username}
              {comment.comment_text}
              {comment.created_at.split("T")[0]}
            </div>
          )}
        />
      )}
    </div>
  );
};

export default PhotoDetalle;
