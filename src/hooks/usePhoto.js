import { useState, useEffect } from "react";

//const usePhoto = (id, refetchPhoto, setRefetchPhoto) => {
const usePhoto = (id) => {
  const [photo, setPhoto] = useState({});

  useEffect(() => {
    const fetchPhoto = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/photos/${id}`
      );

      if (res.ok) {
        const body = await res.json();
        setPhoto(body.data);
      }
    };

    fetchPhoto();
  }, [id]);

  return [photo, setPhoto];
};

export default usePhoto;
