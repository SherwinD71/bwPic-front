import { useState, useEffect } from "react";

const usePhotos = (id) => {
  const [photos, setPhotos] = useState([]);

  console.log("ID USUARIO EN usePhoto", id);

  useEffect(() => {
    let res;
    const fetchPhotos = async () => {
      if (id) {
        res = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/photos?user=${id}`
        );
      } else {
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
