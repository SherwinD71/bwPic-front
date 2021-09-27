import { useState, useEffect } from "react";

const usePhotos = (id, search, setSearch, clickedSearch, setClickedSearch) => {
  const [photos, setPhotos] = useState([]);

  console.log("ID USUARIO EN usePhoto", id);

  useEffect(() => {
    let res;
    const fetchPhotos = async () => {
      if (!id && !search) {
        res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/photos`);
      } else {
        let queryString = "";

        if (id) {
          queryString += `user=${id}`;
        }

        if (search) {
          queryString += id ? `&search=${search}` : `search=${search}`;
        }

        console.log(queryString);

        res = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/photos?${queryString}`
        );
      }

      if (res.ok) {
        const body = await res.json();
        setPhotos(body.data);
        setClickedSearch(false);
        setSearch(null);
      }
    };

    fetchPhotos();
  }, [id, search, clickedSearch, setClickedSearch, setSearch]);

  return [photos, setPhotos];
};

export default usePhotos;
