import { useState } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router";

const SearchForm = () => {
  const [username, setUserName] = useState("");
  const [place, setPlace] = useState("");
  const [description, setDescription] = useState("");
  const history = useHistory();

  const search = async (e) => {
    e.preventDefault();

    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/photos/search=${SearchForm}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, place, description }),
      }
    );

    if (res.ok) {
      toast.success("Buscando fotos");
      history.push(`/photos/user/:id`);
    } else {
      const error = await res.json();
      toast.error(error.message);
    }
  };

  return (
    <main className="centered-container">
      <div className="boxAccount">
        <h1 className="f-s-l">Regístrate</h1>
        <form onSubmit={search}>
          <label className="form-control">
            Usuario
            <input
              id="username"
              name="username"
              type="text"
              value={username}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
          </label>

          <label className="form-control">
            Lugar
            <input
              id="place"
              name="place"
              type="text"
              value={place}
              onChange={(e) => {
                setPlace(e.target.value);
              }}
            />
          </label>

          <label className="form-control">
            Descripción
            <input
              id="description"
              name="description"
              type="text"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </label>
          <div className="btn-container">
            <button type="submit" className="">
              Enviar
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default SearchForm;
