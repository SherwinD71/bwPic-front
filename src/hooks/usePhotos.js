import { useState, useEffect } from "react";

const usePhotos = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/photos`);

      if (res.ok) {
        const body = await res.json();
        setPhotos(body.data);
      }
    };

    fetchPhotos();
  }, []);

  return [photos, setPhotos];
};

export default usePhotos;
