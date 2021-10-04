import { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const register = async (e) => {
    e.preventDefault();

    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, name, username }),
    });

    if (res.ok) {
      toast.success("Te has registrado correctamente");
      history.push(`/login`);
    } else {
      const error = await res.json();
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={register}>
      <div className="flex-col">
        <label>
          <input
            required
            id="name"
            name="name"
            type="text"
            value={name}
            placeholder="Nombre"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </label>
      </div>

      <div className="flex-col">
        <label>
          <input
            required
            id="username"
            name="username"
            type="text"
            value={username}
            placeholder="Usuario"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
        </label>
      </div>
      <div className="flex-col">
        <label>
          <input
            required
            id="email"
            name="email"
            type="email"
            value={email}
            placeholder="E-mail"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </label>
      </div>
      <div className="flex-col">
        <label>
          <input
            required
            id="password"
            name="password"
            type="password"
            value={password}
            placeholder="Contraseña"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </label>
      </div>
      <div className="flex-col">
        <button className="buttonform" type="submit">
          Regístrarse
        </button>
      </div>
      <div className="text-align-center text-bold">
        <Link to="/login">¡Inicia sesión!</Link>
      </div>
    </form>
  );
};
export default RegisterForm;
