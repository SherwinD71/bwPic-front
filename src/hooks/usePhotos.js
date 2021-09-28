import { useState, useEffect } from "react";

const usePhotos = (id, search, setSearch) => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    let res;
    const fetchPhotos = async () => {
      if (!id && !search) {
        res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/photos`);
      } else {
        let queryString = "";

        if (id) {
          queryString += `?user=${id}`;
        }

        if (search && search.length > 2) {
          queryString += id ? `&search=${search}` : `?search=${search}`;
        }

        res = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/photos${queryString}`
        );
      }

      if (res.ok) {
        const body = await res.json();
        setPhotos(body.data);
      }
    };

    fetchPhotos();
  }, [id, search, setSearch]);

  return [photos, setPhotos];
};

export default usePhotos;
