import { useState } from "react";
import { useHistory } from "react-router";

import Avatar from "./Avatar";

import { useUserTokenContext } from "../contexts/UserTokenContext";
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
    <div
      onClick={() => {
        history.push(`/photo/${id_photo}`);
      }}
    >
      <Avatar name={userName} avatar={userAvatar} />
      <p>{userName}</p>
      <p>{place}</p>
      <p>{created_at.split("T")[0]}</p>
      <img
        src={`${process.env.REACT_APP_BACKEND_URL}/${url}`}
        alt={`Foto de ${place}`}
      />
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
  );
};

export default Photo;
