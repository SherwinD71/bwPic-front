import { useState, useRef } from "react";
import { useUserTokenContext } from "../../contexts/UserTokenContext";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import PreviewPhoto from "../PreviewPhoto";

const CreatePhotoForm = () => {
  const [place, setPlace] = useState("");
  const [description, setDescription] = useState("");
  const filesInputRef = useRef();
  const [token] = useUserTokenContext();
  const history = useHistory();

  const createPhoto = async (e) => {
    e.preventDefault();

    const files = filesInputRef.current.files;

    console.log(files);

    const payload = new FormData();

    payload.append("place", place);
    payload.append("description", description);
    payload.append(`foto`, files[0]);

    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/photos`, {
      method: "POST",
      headers: {
        Authorization: token,
      },
      body: payload,
    });

    if (res.ok) {
      const body = await res.json();
      toast.success("¡Photo creada!");
      history.push(`/photo/${body.data.id}`);
    } else {
      const error = await res.json();
      toast.error(error.message);
    }
  };

  return (
    <>
      <form onSubmit={createPhoto}>
        <label className="form-control">
          Lugar
          <input
            required
            id="photo_form_place"
            name="photo_form_place"
            value={place}
            onChange={(e) => {
              setPlace(e.target.value);
            }}
          />
        </label>

        <label className="form-control">
          Descripción
          <input
            required
            id="photo_form_description"
            name="photo_form_description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </label>
        <PreviewPhoto filesInputRef={filesInputRef} entryPlace={place} />
        <div className="btn-container">
          <button type="submit" className="m-t-md btn">
            Guardar
          </button>
        </div>
      </form>
    </>
  );
};

export default CreatePhotoForm;
