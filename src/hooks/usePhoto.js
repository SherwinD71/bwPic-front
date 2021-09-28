import { useState, useEffect } from "react";
import { useUserTokenContext } from "../contexts/UserTokenContext";
import { toast } from "react-toastify";
import { useHistory } from "react-router";

const usePhoto = (id) => {
  const [photo, setPhoto] = useState({});
  const [token] = useUserTokenContext();
  const history = useHistory();

  useEffect(() => {
    const fetchPhoto = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/photos/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (res.ok) {
        const body = await res.json();
        setPhoto(body.data);
      } else {
        history.push(`/login`);
        toast.error("Tienes que hacer login");
      }
    };

    fetchPhoto();
  }, [id, token]);

  return [photo, setPhoto];
};

export default usePhoto;
