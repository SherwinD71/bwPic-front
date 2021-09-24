import { useState, useEffect } from "react";

const usePhotos = (id, username, place, description) => {
  const [photos, setPhotos] = useState([]);

  console.log("ID USUARIO EN usePhoto", id);

  useEffect(() => {
    let res;
    const fetchPhotos = async () => {
      if (id) {
        res = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/photos?user=${id}`
        );
      }
      // if (username) {
      //   res = await fetch(
      //     `${process.env.REACT_APP_BACKEND_URL}/photos?user=${username}`
      //   );
      // }
      // if (place) {
      //   res = await fetch(
      //     `${process.env.REACT_APP_BACKEND_URL}/photos?user=${place}`
      //   );
      // }
      // if (description) {
      //   res = await fetch(
      //     `${process.env.REACT_APP_BACKEND_URL}/photos?user=${description}`
      //   );
      // }
      else {
        res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/photos`);
      }

      if (res.ok) {
        const body = await res.json();
        setPhotos(body.data);
      }
    };

    fetchPhotos();
  }, [id]);

  return [photos, setPhotos];
};

export default usePhotos;
