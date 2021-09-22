import { useState, useEffect } from "react";

const usePhoto = (id, refetchPhoto, setRefetchPhoto) => {
  const [photo, setPhoto] = useState({});

  useEffect(() => {
    const fetchPhoto = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/photo/${id}`
      );

      if (res.ok) {
        const body = await res.json();
        setPhoto(body.data);
      }
    };

    fetchPhoto();
    setRefetchPhoto(false);
  }, [id, refetchPhoto, setRefetchPhoto]);

  return [photo, setPhoto];
};

export default usePhoto;
